/**
 * Created by Vincent P. Minde on 11/24/2015.
 */
var app = angular.module('app');
app.factory('MobileService', function($q){
    var MobileService  = {
        getPhoto: function(cameraSuccess,cameraError) {
            navigator.device.capture.captureImage(cameraSuccess,  cameraError, {limit: 1});
        },
        getVideo: function(cameraSuccess,cameraError) {
            navigator.device.capture.captureVideo(cameraSuccess,  cameraError, {limit: 1});
        },
        getGeoLocation: function(onSuccess,onError) {
            navigator.geolocation.getCurrentPosition(onSuccess, onError, {timeout: 10000, enableHighAccuracy: true});
        },
        uploadFile : function(mediaFile) {
            var ft = new FileTransfer(),
                path = mediaFile.localURL;
            //name = mediaFile.name;
            var options = {};
            options.fileKey = "upload";
            //options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
            //options.mimeType = "text/plain";
            var params = {};
            params.name = "test";
            params.external = false;

            options.params = params;
            ft.upload(path, encodeURI($rootScope.configuration.url + "/dhis-web-reporting/saveDocument.action"), function (result) {
                    alert('results : ' + JSON.stringify(result));
                },
                function (error) {
                    alert('Error uploading file ' + path + ': ' + JSON.stringify(error));
                }, options);


        }

    }
    return MobileService;
});