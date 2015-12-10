/**
 * Created by Vincent P. Minde on 11/30/2015.
 */
var app = angular.module('app');
app.controller('FacilitiesController', function($scope,MobileService,$http,DHIS2URL,uiGmapGoogleMapApi){
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
        $scope.map = {center: {latitude: -6.771430, longitude: 39.239946}, options:baseOptions, zoom:8, showTraffic: true,  show: true,mapObject:{}};
        console.log('map: ', JSON.stringify(maps));
    });
    MobileService.getGeoLocation(function(position){
        $scope.currentPosition = position;
    },function(error){
        Materialize.toast('Error Getting Current Position. Please Ensure GPS is enabled', 4000);
    });
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
            Materialize.toast('Error Contacting server. Ensure network is available.', 4000);
        });
});