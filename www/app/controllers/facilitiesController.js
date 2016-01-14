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
    //$scope.currentPosition = {};
    $scope.facilities = {
        hospitals:[],
        polices:[],
        fire:[]
    };
    uiGmapGoogleMapApi.then(function(maps) {
        $scope.map = {center: {latitude: -6.771430, longitude: 39.239946}, options:baseOptions, zoom:8, showTraffic: true,  show: true,mapObject:{}};
    });
    $http.get(DHIS2URL+'/api/organisationUnitGroups.json?paging=false&fields=:all,organisationUnits[:all]')
        .success(function(data){
            data.organisationUnitGroups.forEach(function(organisationUnitGroup){
                if(organisationUnitGroup.name == "Hospitals"){
                    console.log(organisationUnitGroup);
                    organisationUnitGroup.organisationUnits.forEach(function(organisationUnit){
                        var coordinates = eval(organisationUnit.coordinates);
                        organisationUnit.coordinates = {"latitude":coordinates[0],"longitude":coordinates[1]};
                        organisationUnit.windowOptions = {
                                visible: false
                            }
                        organisationUnit.onClick = function() {
                        	organisationUnit.windowOptions.visible = !organisationUnit.windowOptions.visible;
                        };
                        organisationUnit.closeClick = function() {
                        	organisationUnit.windowOptions.visible = false;
                        };
                        $scope.facilities.hospitals.push(organisationUnit);
                    });
                }
            });
	
        })
        .error(function(errorMessageData){
            Materialize.toast('Error Contacting server. Ensure network is available.', 4000);
        });
    $scope.currentPosition = {
    		arr:[]
    };
    MobileService.getGeoLocation(function(position){
        //alert(JSON.stringify(position));
        position.windowOptions = {
            visible: false
        }
        position.onClick = function() {
            position.windowOptions.visible = !position.windowOptions.visible;
        };
        position.closeClick = function() {
            position.windowOptions.visible = false;
        };
        $scope.currentPosition.arr.push(position);//position;
    },function(error){
        Materialize.toast('Error Getting Current Position. Please Ensure GPS is enabled', 4000);
    });
});