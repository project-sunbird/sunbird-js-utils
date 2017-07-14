var httpUtil = require('sb-http-util');
var configUtil = require('sb-config-util');

getHttpOptions = function(url, data, method, formData) {

    var http_options = {
        url: url,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': configUtil.getConfig('Authorization_TOKEN')
        },
        method: method,
        json: true
    };
    if (data)
        http_options.body = data;

    if (formData)
        http_options.formData = formData;

    return http_options;
};


createContent = function(data, cb) {
    var url = configUtil.getConfig('EKSTEP_BASE_URL') + configUtil.getConfig('EKSTEP_CREATE_CONTENT_URI');
    var options = getHttpOptions(url, data, "POST", false);
    sendRequest(options, cb);
};

searchContent = function(data, cb) {

    var url = configUtil.getConfig('EKSTEP_BASE_URL') + configUtil.getConfig('EKSTEP_SEARCH_CONTENT_URI');
    var options = getHttpOptions(url, data, "POST", false);
    sendRequest(options, cb);
};

updateContent = function(data, content_id, cb) {

    var url = configUtil.getConfig('EKSTEP_BASE_URL') + configUtil.getConfig('EKSTEP_UPDATE_CONTENT_URI') + "/" + content_id;
    var options = getHttpOptions(url, data, "PATCH", false);
    sendRequest(options, cb);
};

getContent = function(content_id, cb) {

    var url = configUtil.getConfig('EKSTEP_BASE_URL') + configUtil.getConfig('EKSTEP_GET_CONTENT_URI') + "/" + content_id;
    var options = getHttpOptions(url, null, "GET", false);
    sendRequest(options, cb);
};

getContentUsingQuery = function(content_id, query, cb) {

    var url = configUtil.getConfig('EKSTEP_BASE_URL') + configUtil.getConfig('EKSTEP_GET_CONTENT_URI') + "/" + content_id;
    var options = getHttpOptions(url, null, "GET", false);
    options.qs = query;
    sendRequest(options, cb);
};

reviewContent = function(data, content_id, cb) {

    var url = configUtil.getConfig('EKSTEP_BASE_URL') + configUtil.getConfig('EKSTEP_REVIEW_CONTENT_URI') + "/" + content_id;
    var options = getHttpOptions(url, data, "POST", false);
    sendRequest(options, cb);
};

publishContent = function(data, content_id,cb) {

    var url = configUtil.getConfig('EKSTEP_BASE_URL') + configUtil.getConfig('EKSTEP_PUBLISH_CONTENT_URI') + "/" + content_id;
    var options = getHttpOptions(url, data, "POST", false);
    sendRequest(options, cb);
};

listContent = function(data, cb) {

    var url = configUtil.getConfig('EKSTEP_BASE_URL') + configUtil.getConfig('EKSTEP_LIST_CONTENT_URI');
    var options = getHttpOptions(url, null, "POST", false);
    sendRequest(options, cb);
};

retireContent = function(content_id, cb) {
    var url = configUtil.getConfig('EKSTEP_BASE_URL') + configUtil.getConfig('EKSTEP_RETIRE_CONTENT_URI') + '/' + content_id;
    var options = getHttpOptions(url, null, "DELETE", false);
    sendRequest(options, cb);
};

uploadContent = function(formData, content_id, cb) {
    var url = configUtil.getConfig('EKSTEP_BASE_URL') + configUtil.getConfig('EKSTEP_UPLOAD_CONTENT_URI') + '/' + content_id;
    var options = getHttpOptions(url, null, "POST", formData);
    sendRequest(options, cb);
};

contentHierarchy = function(content_id, cb) {
    var url = configUtil.getConfig('EKSTEP_BASE_URL') + configUtil.getConfig('EKSTEP_HIERARCHY_CONTENT_URI') + '/' + content_id;
    var options = getHttpOptions(url, null, "GET", false);
    sendRequest(options, cb);
};

contentHierarchyUsingQuery = function(content_id, query, cb) {

    var url = configUtil.getConfig('EKSTEP_BASE_URL') + configUtil.getConfig('EKSTEP_HIERARCHY_CONTENT_URI') + '/' + content_id;
    var options = getHttpOptions(url, null, "GET", false);
    options.qs = query;
    sendRequest(options, cb);
};

uploadMedia = function(formData, cb) {
    var url = configUtil.getConfig('EKSTEP_BASE_URL') + configUtil.getConfig('EKSTEP_UPLOAD_MEDIA_URI');
    var options = getHttpOptions(url, null, "POST", formData);
    sendRequest(options, cb);
};

getDomains = function(cb) {
    var url = configUtil.getConfig('EKSTEP_BASE_URL') + configUtil.getConfig('EKSTEP_GET_DOMAIN_URI');
    var options = getHttpOptions(url, null, "GET", false);
    sendRequest(options, cb);
};

getDomainById = function(domainId, cb) {
    var url = configUtil.getConfig('EKSTEP_BASE_URL') + configUtil.getConfig('EKSTEP_GET_DOMAIN_URI') + '/' + domainId;
    var options = getHttpOptions(url, null, "GET", false);
    sendRequest(options, cb);
};

getObjects = function(domainId, objectType, cb) {
    var url = configUtil.getConfig('EKSTEP_BASE_URL') + configUtil.getConfig('EKSTEP_GET_DOMAIN_URI') + '/' + domainId + '/' + objectType;
    var options = getHttpOptions(url, null, "GET", false);
    sendRequest(options, cb);
};

getObjectById = function(domainId, objectType, objectId, cb) {
    var url = configUtil.getConfig('EKSTEP_BASE_URL') + configUtil.getConfig('EKSTEP_GET_DOMAIN_URI') + '/' + domainId + '/' + objectType + '/' + objectId;
    var options = getHttpOptions(url, null, "GET", false);
    sendRequest(options, cb);
};

getConceptById = function(conceptId, cb) {
    var url = configUtil.getConfig('EKSTEP_BASE_URL') + configUtil.getConfig('EKSTEP_GET_CONCEPT_URI') + '/' + conceptId;
    var options = getHttpOptions(url, null, "GET", false);
    sendRequest(options, cb);
};

searchObjectsType = function(data, domainId, objectType, cb) {
    var url = configUtil.getConfig('EKSTEP_BASE_URL') + configUtil.getConfig('EKSTEP_GET_DOMAIN_URI') + '/' + domainId + '/' + objectType + '/' + 'search';
    var options = getHttpOptions(url, data, "POST", false);
    sendRequest(options, cb);
};

createObjectType = function(data, domainId, objectType, cb) {
    var url = configUtil.getConfig('EKSTEP_BASE_URL') + configUtil.getConfig('EKSTEP_GET_DOMAIN_URI') + '/' + domainId + '/' + objectType + '/';
    var options = getHttpOptions(url, data, "POST", false);
    sendRequest(options, cb);
};

updateObjectType = function(data, domainId, objectType, objectId, cb) {
    var url = configUtil.getConfig('EKSTEP_BASE_URL') + configUtil.getConfig('EKSTEP_GET_DOMAIN_URI') + '/' + domainId + '/' + objectType + '/' + objectId;
    var options = getHttpOptions(url, data, "PATCH", false);
    sendRequest(options, cb);
};

retireObjectType = function(data, domainId, objectType, objectId, cb) {
    var url = configUtil.getConfig('EKSTEP_BASE_URL') + configUtil.getConfig('EKSTEP_GET_DOMAIN_URI') + '/' + domainId + '/' + objectType + '/' + objectId + '/retire' ;
    var options = getHttpOptions(url, data, "POST", false);
    sendRequest(options, cb);
};

listTerms = function(cb) {
    var url = configUtil.getConfig('EKSTEP_BASE_URL') + configUtil.getConfig('EKSTEP_LIST_TERMS_URI');
    var options = getHttpOptions(url, null, "GET", false);
    sendRequest(options, cb);
};

listResourceBundles = function(cb) {
    var url = configUtil.getConfig('EKSTEP_BASE_URL') + configUtil.getConfig('EKSTEP_LIST_RESOURCE_BUNDLES_URI');
    var options = getHttpOptions(url, null, "GET", false);
    sendRequest(options, cb);
};

listOrdinals = function(cb) {
    var url = configUtil.getConfig('EKSTEP_BASE_URL') + configUtil.getConfig('EKSTEP_LIST_ORDINALS_URI');
    var options = getHttpOptions(url, null, "GET", false);
    sendRequest(options, cb);
};

function sendRequest(http_options, cb) { 
    httpUtil.sendRequest(http_options, function(err, resp, body) { 
        if (resp && resp.statusCode && body) { 
            body.statusCode = resp.statusCode ? resp.statusCode : 500; 
            cb(null, body); 
        } else { 
            cb(true, null); 
        } 
    }); 
} 

module.exports = {
    createContent: createContent,
    searchContent: searchContent,
    updateContent: updateContent,
    getContent: getContent,
    reviewContent: reviewContent,
    uploadContent: uploadContent,
    publishContent: publishContent,
    listContent: listContent,
    retireContent: retireContent,
    contentHierarchy: contentHierarchy,
    getContentUsingQuery: getContentUsingQuery,
    uploadMedia: uploadMedia,
    contentHierarchyUsingQuery: contentHierarchyUsingQuery,
    getDomains: getDomains,
    getDomainById: getDomainById,
    getObjects: getObjects,
    getObjectById: getObjectById,
    getConceptById: getConceptById,
    searchObjectsType: searchObjectsType,
    createObjectType: createObjectType,
    updateObjectType: updateObjectType,
    retireObjectType: retireObjectType,
    listTerms: listTerms,
    listResourceBundles: listResourceBundles,
    listOrdinals: listOrdinals
};
