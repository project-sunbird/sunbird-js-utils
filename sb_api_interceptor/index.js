/**
 * name : index.js
 * author : Anuj Gupta
 * Date : 23-sept-2017
 */

var keyCloakAuthUtils = require('keycloak-auth-utils');
// var CacheManager  = require('sb_cache_manager');
const Token = require('keycloak-auth-utils/lib/token.js')
const jwt = require('jsonwebtoken');
const NodeRSA = require('node-rsa');
const fs = require('fs');
const CONSTANTS = {
    logPrefix: "Offline token -"
}
let useKidBasedValidation = false;

function ApiInterceptor(keyclock_config, cache_config) {
	this.config = keyclock_config;
	this.keyCloakConfig = new keyCloakAuthUtils.Config(this.config);
	this.grantManager = new keyCloakAuthUtils.GrantManager(this.keyCloakConfig);

	// this.cacheManagerConfig = cache_config;
	// this.cacheManager = new CacheManager(cache_config);
}

/**
 * [validateToken is used for validate user]
 * @param  {[string]}   token    [x-auth-token]
 * @param  {Function} callback []
 * @return {[Function]} callback [its retrun err or object with fields(token, userId)]
 */
ApiInterceptor.prototype.validateToken = function (token, callback) {
	// var self = this;
	// self.cacheManager.get(token, function(err, tokenData) {
	//     if(err || !tokenData) {
	//         self.grantManager.userInfo(token, function(err, userData) {
	// 			if(err) {
	// 				return callback(err, null);
	// 			} else {
	// 				if(self.cacheManagerConfig.ttl) {
	// 					self.cacheManager.set({key : token, value : {token : token, userId : userData.sub}}, function(err, res){ });
	// 				}
	// 				return callback(null, {token : token, userId : userData.sub});
	// 			}
	// 		});
	//     } else {
	//         return callback(null, tokenData);
	//     }
	// });
	if (!useKidBasedValidation) {
		return this.grantManager.validateToken(new Token(token))
		.then(userData => callback(null, { token, userId: userData.content.sub }))
		.catch(err => callback(err, null))
	}

	const decoded = jwt.decode(token, {complete: true});
    if(!decoded){
        console.error(`${ CONSTANTS.logPrefix } invalid jwt token - 401.`);
        return cb("INVALID_JWT");
	}
	
	var kid = decoded.header.kid;
	var publicKey = kidToPublicKeyMap[kid];
	
	// Converting single line public key to PEM format. 
    // JWT.verify methos is expecting the publick key in pem format only
	var key = new NodeRSA(publicKey, 'public');
	
	try {
        publicKey = key.exportKey('public');        
    } catch (error) {
        console.error(`${ CONSTANTS.logPrefix } invalid kid - 401. kid: ${ kid }`);
        return cb("INVALID_KID");
	}
	
	const verificationOption = {
        ignoreExpiration: false, // verify expiry time also
        // ignoreNotBefore: false, // verify not before also
        issuer: this.validIssuers ? this.validIssuers : "",
        algorithms: ['RS256']
	};
	
	jwt.verify(token, publicKey, verificationOption, (err, payload) => {
        if(err){
            console.error(`${ CONSTANTS.logPrefix } invalid signature - 401. kid: ${ kid }`, err);
            return cb("INVALID_SIGNATURE");
        }

        console.info(`${ CONSTANTS.logPrefix } verification is success. kid: ${ kid }`);
		cb(null, { token, userId: payload.sub }) 
    });
};

function loadTokenPublicKeys(basePath){
    return new Promise((resolve, reject) => {
        fs.readdir(basePath, function(err, filenames) {
            if (err || !filenames.length) {
              console.error("error while reading publicKey directory: " + basePath, err);
              console.info("Defaulting to Keycloak validation");
              return resolve(err);
            }
            filenames = filenames.filter(isHiddenFileOrDir => !(/(\/|^|.)\.[^\/\.]/g).test(isHiddenFileOrDir))
            let fileCount = filenames.length;
            filenames.forEach(function(filename) {
              fs.readFile(basePath + filename, 'utf-8', function(err, content) {
                fileCount--;
                if (err) {
                    console.error(`${ CONSTANTS.logPrefix } error while reading content at: ${ basePath} ${ filename}`, err);
                    return reject(err);
                }
                kidToPublicKeyMap[filename] = content;
                console.log(`${ CONSTANTS.logPrefix } loaded kid: ${ filename }`);
                if (fileCount === 0) {
                    console.info("loaded all public key for authentication");
                    useKidBasedValidation = true;
                    resolve();
                }
              });
            });
        });
    });
}

module.exports = ApiInterceptor , loadTokenPublicKeys ;