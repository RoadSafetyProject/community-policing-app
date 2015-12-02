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
            Materialize.toast('Report Sent Successfully!', 4000, 'rounded')
            $scope.loading = false;
        })
    }
	ProgramManger.loadProgramByName("Community Police").then(function(communityPolicingProgram){
		$scope.data.program = communityPolicingProgram;
	});

	$scope.takeAPhoto = function(){
		MobileService.getPhoto(function(imageData) {
			alert("Good:" + JSON.stringify(imageData));
				var image = document.getElementById('myImage');
				image.src = "data:image/jpeg;base64," + imageData;
		},function(error){
			alert("Error:" + JSON.stringify(imageData));
		});
	}
	$scope.takeAVideo = function(){
		MobileService.getVideo(function(imageData) {
			alert("Good:" + JSON.stringify(imageData));
			var image = document.getElementById('myImage');
			image.src = "data:image/jpeg;base64," + imageData;
		},function(error){
			alert("Error:" + JSON.stringify(imageData));
		});
	}
});