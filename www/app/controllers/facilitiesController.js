/**
 * Created by Vincent P. Minde on 11/30/2015.
 */
var app = angular.module('app');
app.controller('FacilitiesController', function($scope,ProgramManger,MobileService,Event){
    $scope.mapObject = {};
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
    $scope.map = {center: {latitude: -6.771430, longitude: 39.239946}, options:baseOptions, zoom:8, showTraffic: true,  show: true,mapObject:{}};
    MobileService.getGeoLocation(function(position){
        alert(JSON.stringify(position));
        $scope.currentPosition = position;
    },function(error){
        alert("Error");
    });
    $http.get(DHIS2URL+'/api/organisationUnitGroups.json?paging=false&' + this._fields)
        .success(function(data){
            console.log(data);
            data.organisationUnitGroups.forEach(function(organisationUnitGroup){
                if(organisationUnitGroup.name != "Hospitals"){

                }
            });
        })
        .error(function(errorMessageData){
            alert(JSON.stringify(errorMessageData));
        });
});