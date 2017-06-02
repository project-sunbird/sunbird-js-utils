/**
 * index
 * 
 * @module      ::js-utils
 * @description :: Represent utility functions for config requests and acts as entry file for config utility package
 * @author      :: Loganathan
 */






getConfig = function (configuration_name) {
    var config_data = {

        EKSTEP_BASE_URL: "https://dev.ekstep.in/api",
        
        EKSTEP_CREATE_CONTENT_URI: "/learning/v2/content",
        EKSTEP_SEARCH_CONTENT_URI: "/search/v2/search",
        EKSTEP_UPDATE_CONTENT_URI: "/learning/v2/content",
        EKSTEP_GET_CONTENT_URI: "/learning/v2/content",
        EKSTEP_REVIEW_CONTENT_URI: "/learning/v3/content/review",
        EKSTEP_PUBLISH_CONTENT_URI: "/learning/v2/content/publish",
        EKSTEP_LIST_CONTENT_URI: "/learning/v2/content/list",
        EKSTEP_RETIRE_CONTENT_URI: "/learning/v2/content",
        EKSTEP_UPLOAD_CONTENT_URI: "/learning/v2/content/upload",
        EKSTEP_HIERARCHY_CONTENT_URI: "/learning/v2/content/hierarchy",
        
        EKSTEP_UPLOAD_MEDIA_URI: "/language/v1/language/dictionary/word/media/upload",

        //Micro Service configuration for Course and Content service
        PREFIX_CODE : 'org.sunbird.'
    };
    return config_data[configuration_name];
};


module.exports = {
    getConfig: getConfig
};
