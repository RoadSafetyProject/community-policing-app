var app = angular.module('app');
app.controller('NewReportController', function($scope,ProgramManger,MobileService,Event,$q){
	$scope.data = {
		//event: new Event()
	}
	$scope.data.event = new Event(

	);
    $scope.loading = false;
    $scope.saveEvent = function(){
        $scope.loading = true;
		$scope.uploadFiles().then(function(){
			$scope.data.event.save().then(function(){
				Materialize.toast('Report Sent Successfully!', 4000, 'rounded');
				$scope.loading = false;
			});
		});

    }
	ProgramManger.loadProgramByName("Community Police").then(function(communityPolicingProgram){
		$scope.data.program = communityPolicingProgram;
	});
	$scope.imageData = {};
	$scope.takeAPhoto = function(){
		MobileService.getPhoto(function(imageData) {
			$scope.imageData = imageData;
			Materialize.toast('Photo Taken Successfully!', 4000);
		},function(){
			Materialize.toast('Error while taking photo! Please Try again', 4000);
		});
	}
	$scope.videoData = {};
	$scope.takeAVideo = function(){
		MobileService.getVideo(function(videoData) {
			$scope.videoData = videoData;
			Materialize.toast('Video Taken Successfully!', 4000);
		},function(){
			Materialize.toast('Error while taking video! Please Try again', 4000);
		});
	}
	$scope.uploadFiles = function(){
		var defer = $q.defer();
		var promises = [];
		if($scope.imageData.localURL) {
			promises.push(MobileService.uploadFile($scope.imageData).then(function(imageDataUpload){
                var data = JSON.parse(imageDataUpload.response);
				$scope.data.event.setDataValue("Community Report Image",data.response.fileResource.id);
			}));
		}
		if($scope.videoData.localURL) {
			promises.push(MobileService.uploadFile($scope.videoData).then(function(videoDataUpload){
                var data = JSON.parse(videoDataUpload.response);
				$scope.data.event.setDataValue("Community Report Video",data.response.fileResource.id);
			}));
		}
		$q.all(promises).then(function(){
			defer.resolve();
		});
		return defer.promise;
	}
});