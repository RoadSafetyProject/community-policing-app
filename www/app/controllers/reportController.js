var app = angular.module('app');
app.controller('NewReportController', function($scope,ProgramManger,MobileService,Event){
	$scope.data = {
		//event: new Event()
	}
	$scope.data.event = new Event(

	);
	ProgramManger.loadProgramByName("Community Police").then(function(communityPolicingProgram){
		$scope.data.program = communityPolicingProgram;
	});

	$scope.takeAPhoto = function(){
		MobileService.getPhoto(function(imageData) {
			alert("Tooke a picture");
				var image = document.getElementById('myImage');
				image.src = "data:image/jpeg;base64," + imageData;
		});
	}
});