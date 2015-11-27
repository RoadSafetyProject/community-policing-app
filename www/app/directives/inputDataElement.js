/**
 * Created by Vincent P. Minde on 11/24/2015.
 */
var app = angular.module('app');
app.directive('elementModel', function() {
    var controller = function($scope){
        $scope.ngDataModel = {
            dataElement:$scope.elementData.id
        }
    }
    return {
        scope: {
            elementData: '=',
            ngDataModel: '='
        },
        restrict: 'E',
        controller:controller,
        templateUrl: 'app/directives/inputDataElement.html'
    };
});