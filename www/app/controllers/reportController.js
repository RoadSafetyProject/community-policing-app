var app = angular.module('app');
app.controller('NewReportController', function($scope,ProgramManger,MobileService,Event){
	$scope.data = {
		//event: new Event()
	}
	$scope.data.event = new Event(

	);
    $scope.loading = false;
    $scope.saveEvent = function(){
        $scope.loading = true;
        $scope.data.event.save().then(function(){
            Materialize.toast('Report Sent Successfully!', 4000, 'rounded');
            $scope.loading = false;
        })
    }
	ProgramManger.loadProgramByName("Community Police").then(function(communityPolicingProgram){
		$scope.data.program = communityPolicingProgram;
	});

	$scope.takeAPhoto = function(){
		MobileService.getPhoto(function(imageData) {
			Materialize.toast('Photo Uploaded Successfully!', 4000, 'rounded');
		},function(error){
			alert("Error:" + JSON.stringify(imageData));
		});
	}
	$scope.takeAVideo = function(){
		MobileService.getVideo(function(imageData) {
			Materialize.toast('Video Uploaded Successfully!', 4000, 'rounded');
		},function(error){
			alert("Error:" + JSON.stringify(imageData));
		});
	}
});