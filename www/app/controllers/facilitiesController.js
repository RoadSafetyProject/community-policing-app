/**
 * Created by Vincent P. Minde on 11/30/2015.
 */
var app = angular.module('app');
app.controller('FacilitiesController', function($scope,ProgramManger,MobileService,Event,$http,DHIS2URL,uiGmapGoogleMapApi){
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
    $scope.currentPosition = {};
    $scope.facilities = {
        hospitals:[],
        polices:[],
        fire:[]
    };
    uiGmapGoogleMapApi.then(function(maps) {
        alert(JSON.stringify(maps));
        $scope.map = {center: {latitude: -6.771430, longitude: 39.239946}, options:baseOptions, zoom:8, showTraffic: true,  show: true,mapObject:{}};
        console.log('map: ', JSON.stringify(maps));
    });

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
});