document.addEventListener("deviceready", function () {
    console.log(navigator.camera);
}, false);
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
var app = angular.module('app', ['ui.materialize','ngRoute','ngCordova','uiGmapgoogle-maps'])
.value('DHIS2URL', 'http://localhost:8080/demo')
.config(function($routeProvider) {

	$routeProvider.when('/', {
        templateUrl: 'app/views/home.html',
        controller: 'BodyController'
    }).when('/new', {
        templateUrl: 'app/views/newReport.html',
        controller: 'NewReportController'
    }).when('/facilities', {
        templateUrl: 'app/views/facilities.html',
        controller: 'FacilitiesController'
    }).otherwise({
        redirectTo : '/'
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
    .controller('DateController', ["$scope", function ($scope) {
        var currentTime = new Date();
        $scope.currentTime = currentTime;
        $scope.month = ['Januar', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        $scope.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        $scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        $scope.weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        $scope.today = 'Today';
        $scope.clear = 'Clear';
        $scope.close = 'Close';
        $scope.onStart = function () {
            console.log('onStart');
        };
        $scope.onRender = function () {
            console.log('onRender');
        };
        $scope.onOpen = function () {
            console.log('onOpen');
        };
        $scope.onClose = function () {
            console.log('onClose');
        };
        $scope.onSet = function () {
            console.log('onSet');
        };
        $scope.onStop = function () {
            console.log('onStop');
        };
    }]);