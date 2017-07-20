/**
 * index
 * 
 * @module      ::js-utils
 * @description :: Represent utility functions for config requests and acts as entry file for config utility package
 * @author      :: Loganathan
 */



var config_data = {

    EKSTEP_BASE_URL: "https://qa.ekstep.in/api",
    
    EKSTEP_CREATE_CONTENT_URI: "/content/v3/create",
    EKSTEP_SEARCH_CONTENT_URI: "/composite/v3/search",
    EKSTEP_UPDATE_CONTENT_URI: "/content/v3/update",
    EKSTEP_GET_CONTENT_URI: "/content/v3/read",
    EKSTEP_REVIEW_CONTENT_URI: "/content/v3/review",
    EKSTEP_PUBLISH_CONTENT_URI: "/content/v3/publish",
    EKSTEP_LIST_CONTENT_URI: "/content/v3/list",
    EKSTEP_RETIRE_CONTENT_URI: "/learning/v2/content",
    EKSTEP_UPLOAD_CONTENT_URI: "/content/v3/upload",
    EKSTEP_HIERARCHY_CONTENT_URI: "/content/v3/hierarchy",
    EKSTEP_REJECT_CONTENT_URI: "/content/v3/reject",
    
    EKSTEP_UPLOAD_MEDIA_URI: "/language/v1/language/dictionary/word/media/upload",
    
    //Domains API
    EKSTEP_GET_DOMAIN_URI: "/learning/v2/domains",
    EKSTEP_GET_CONCEPT_URI: "/learning/v2/concepts",
    EKSTEP_LIST_TERMS_URI: "/domain/v3/terms/list",
    EKSTEP_LIST_RESOURCE_BUNDLES_URI: "/meta/v3/resourcebundles/list",
    EKSTEP_LIST_ORDINALS_URI: "/meta/v3/ordinals/list",
    
    //Micro Service configuration for Course and Content service
    PREFIX_CODE : 'org.sunbird.',

    //Configuration for setting ownership for content created from Sunbird
    CREATED_FOR: ['sunbird'],
    CONTENT_CHANNEL: 'sunbird',
    
    Authorization_TOKEN : ''

};

setConfig = function (name, value) {
    config_data[name] = value;
};

getConfig = function (configuration_name) {
    return config_data[configuration_name];
};


module.exports = {
    setConfig: setConfig,
    getConfig: getConfig
};
