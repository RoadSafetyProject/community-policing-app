/**
 * Created by Vincent P. Minde on 11/30/2015.
 */
var app = angular.module('app');
app.controller('FacilitiesController', function($scope,ProgramManger,MobileService,Event,$http,DHIS2URL){
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
    $scope.map = {center: {latitude: -6.771430, longitude: 39.239946}, options:baseOptions, zoom:8, showTraffic: true,  show: true,mapObject:{}};
    MobileService.getGeoLocation(function(position){
        $scope.currentPosition = position;
    },function(error){
        alert("Error Getting Current Position.");
    });
    document.addEventListener("deviceready", function() {
        alert("Here");
        // Define a div tag with id="map_canvas"
        var mapDiv = document.getElementById("map_canvas");
        alert("Here1");
        // Initialize the map plugin
        var map = plugin.google.maps.Map.getMap(mapDiv);
        alert("Here2");
        // You have to wait the MAP_READY event.
        map.on(plugin.google.maps.event.MAP_READY, onMapInit);
        alert("Here3");
    });

    function onMapInit(map) {
    }
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