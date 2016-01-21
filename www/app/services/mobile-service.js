/**
 * Created by Vincent P. Minde on 11/24/2015.
 */
var app = angular.module('app');
app.factory('MobileService', function($q,DHIS2URL){
    var MobileService  = {
        takePhoto: function(cameraSuccess,cameraError) {
            navigator.device.capture.captureImage(cameraSuccess,  cameraError, {limit: 1});
        },
        getPhoto: function(cameraSuccess,cameraError) {
            navigator.camera.getPicture(cameraSuccess,cameraError, { quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY });
        },
        takeVideo: function(cameraSuccess,cameraError) {
            navigator.device.capture.captureVideo(cameraSuccess,  cameraError, {limit: 1});
        },
        getVideo: function(cameraSuccess,cameraError) {
            navigator.device.capture.captureVideo(cameraSuccess,  cameraError, {limit: 1});
        },
        getGeoLocation: function(onSuccess,onError) {
            navigator.geolocation.getCurrentPosition(onSuccess, onError, {timeout: 10000, enableHighAccuracy: true});
        },
        uploadFile : function(mediaFile) {
            var defer = $q.defer();
            var ft = new FileTransfer(),path = mediaFile;
            var options = {};
            ft.upload(path, encodeURI(DHIS2URL + "/api/fileResources"), function(result) {
                    defer.resolve(result);
                },
                function(error) {
                    defer.reject(error);
                }, options);
            return defer.promise;
        }

    }
    return MobileService;
});