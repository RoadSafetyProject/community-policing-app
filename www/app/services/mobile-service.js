/**
 * Created by Vincent P. Minde on 11/24/2015.
 */
var app = angular.module('app');
app.factory('MobileService', function($q,$cordovaCamera){
    var MobileService  = {
        getPhoto: function(cameraSuccess) {
            $cordovaCamera.getPicture().then(cameraSuccess, function(err) {
                // error
            });
            this.onDeviceReady().then(function(){
                console.log(navigator);
                /*var options = {
                    quality: 50,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 100,
                    targetHeight: 100,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false,
                    correctOrientation:true
                };*/


            })
        },
        onDeviceReady:function(callBack){
            var defer = $q.defer();
            document.addEventListener("deviceready", function(){
                defer.resolve();
            }, false);
            return defer.promise;
        }
    }
    return MobileService;
});