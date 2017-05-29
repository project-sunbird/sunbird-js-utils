var httpUtil = require('sb-http-util');
var configUtil = require('sb-config-util');

getHttpOptions = function(url, data, method, formData) {

    var http_options = {
        url: url,
        headers: {
            'Content-Type': 'application/json'
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

publishContent = function(content_id, cb) {

    var url = configUtil.getConfig('EKSTEP_BASE_URL') + configUtil.getConfig('EKSTEP_PUBLISH_CONTENT_URI') + "/" + content_id;
    var options = getHttpOptions(url, null, "GET", false);
    sendRequest(options, cb);
};

listContent = function(data, cb) {

    var url = configUtil.getConfig('EKSTEP_BASE_URL') + configUtil.getConfig('EKSTEP_LIST_CONTENT_URI');
    var options = getHttpOptions(url, null, "POST", false);
    sendRequest(options, cb);
};

retireContent = function(data, content_id, cb) {
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
    contentHierarchyUsingQuery: contentHierarchyUsingQuery

};
