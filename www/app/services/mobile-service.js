/**
 * Created by Vincent P. Minde on 11/24/2015.
 */
var app = angular.module('app');
app.factory('MobileService', function($q,$cordovaCamera){
    var MobileService  = {
        getPhoto: function(cameraSuccess,cameraError) {
            navigator.device.capture.captureImage(cameraSuccess,  cameraError, {limit: 1});
        }
    }
    return MobileService;
});