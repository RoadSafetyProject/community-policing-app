var Base64 = {
// private property
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

// public method for encoding
    encode : function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) +
                Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);

        }

        return output;
    },

// public method for decoding
    decode : function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = Base64._keyStr.indexOf(input.charAt(i++));
            enc2 = Base64._keyStr.indexOf(input.charAt(i++));
            enc3 = Base64._keyStr.indexOf(input.charAt(i++));
            enc4 = Base64._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;

    },

// private method for UTF-8 encoding
    _utf8_encode : function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

// private method for UTF-8 decoding
    _utf8_decode : function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while ( i < utftext.length ) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }
        return string;
    }
}
var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, true);
    },

    onDeviceReady: function() {
        angular.element(document).ready(function() {
            angular.bootstrap(document, ['app']);
        });
    },
};
app.initialize();
var app = angular.module('app', ['ui.materialize','ngRoute','uiGmapgoogle-maps'])
    .run(function($http) {
        var username = "admin";
        var password = "IROAD2015";
        $http.defaults.headers.common.Authorization = 'Basic ' + Base64.encode(username + ':' + password);
    })
.value('DHIS2URL', 'http://roadsafety.go.tz/demo')//'http://roadsafety.go.tz/demo')
.config(function($routeProvider,uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //key: 'xxx',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
	$routeProvider.when('/', {
        /*templateUrl: 'app/views/home.html',
        controller: 'BodyController'*/
        templateUrl: 'app/views/facilities.html',
        controller: 'DateController'
    }).when('/new', {
        templateUrl: 'app/views/newReport.html',
        controller: 'NewReportController'
    }).when('/facilities', {
        templateUrl: 'app/views/facilities.html',
        controller: 'FacilitiesController'
    }).otherwise({
        redirectTo : '/new'
    });
})
    .controller('BodyController', ["$scope", function ($scope) {
        $scope.select = {
            value1: "Option1",
            value2: "I'm an option",
            choices: ["Option1", "I'm an option", "This is materialize", "No, this is Patrick."]
        };

        $scope.dummyInputs = {};

    }])
    .controller('PaginationController', ["$scope", function ($scope) {
        $scope.changePage = function (page) {
            toast("Changed to page " + page, 1000);
        }
    }])
    .controller('DateController', ["$scope",'MobileService','$http','DHIS2URL', function ($scope,MobileService,$http,DHIS2URL){
        alert("Main1");
        var baseOptions = {
            'maxZoom': 15,
            'minZoom': 4,
            'backgroundColor': '#b0d1d4',
            'panControl': false,
            'zoomControl': true,
            'draggable': true,
            'zoomControlOptions': {
                'position': 'RIGHT_TOP',
                'style': 'SMALL'
            }
        };
        alert("Main2");
        $scope.currentPosition = {};
        $scope.facilities = {
            hospitals:[],
            polices:[],
            fire:[]
        };
        alert("Main3");
        $scope.map = {center: {latitude: -6.771430, longitude: 39.239946}, options:baseOptions, zoom:8, showTraffic: true,  show: true,mapObject:{}};

        alert("Main4");
        MobileService.getGeoLocation(function(position){
            $scope.currentPosition = position;
        },function(error){
            alert("Error Getting Current Position.");
        });
        /*function GoogleMap(){

         this.initialize = function(){
         var map = showMap();
         }

         var showMap = function(){
         var mapOptions = {
         zoom: 4,
         center: new google.maps.LatLng(-33, 151),
         mapTypeId: google.maps.MapTypeId.ROADMAP
         }

         var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

         return map;
         }
         }
         var map = new GoogleMap();
         map.initialize();
         document.addEventListener("deviceready", function() {
         alert("Here");
         var map = new GoogleMap();
         map.initialize();
         alert("Here3");
         });

         function onMapInit(map) {
         }*/
        alert("Main5");
        $http.get(DHIS2URL+'/api/organisationUnitGroups.json?paging=false&fields=:all,organisationUnits[:all]')
            .success(function(data){
                data.organisationUnitGroups.forEach(function(organisationUnitGroup){
                    if(organisationUnitGroup.name == "Hospitals"){
                        console.log(organisationUnitGroup);
                        organisationUnitGroup.organisationUnits.forEach(function(organisationUnit){
                            var coordinates = eval(organisationUnit.coordinates);
                            organisationUnit.coordinates = {"latitude":coordinates[0],"longitude":coordinates[1]};
                            $scope.facilities.hospitals.push(organisationUnit);
                        });
                    }
                });
            })
            .error(function(errorMessageData){
                alert("Error Contacting server.");
            });
        alert("Main6");
    }]);