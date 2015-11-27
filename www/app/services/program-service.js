var app = angular.module('app');
app.factory('Program', function($http){
	function Program(programData) {
        if(programData){
            this.setData(programData);
        }
        // Remaining initialisations
    };
    Program.prototype = {
    		setData: function(eventData) {
	            angular.extend(this, eventData);
	        }
    }
    return Program;
});
app.factory('ProgramManger', function($http,$q,Program,DHIS2URL){
	var ProgramManger = {
			_pool: {},
			_programObjectName: "programs",
			_fields:"fields=id,name,description,version,programStages[id,version,programStageSections[id],programStageDataElements[compulsory,sortOrder,dataElement[id,name,type,description,code,optionSet[id,name,options[id,name],version]]]]",
	        _retrieveInstance: function(programId,programData){
	            var instance = this._pool[programId];
	            if(instance){
	                instance.setData(programData);
	            }else {
	                instance = new Program(programData);
	                this._pool[programId] = instance;
	            }

	            return instance;
	        },
	        loadAllPrograms: function() {
	            var deferred = $q.defer();
	            var thisProgramManger = this;
	            $http.get(DHIS2URL+'/api/programs.json?paging=false&' + this._fields)
	            .success(function(programsData){
	                var programs = [];
					programsData[thisProgramManger._programObjectName].forEach(function(programData){
	                        // @todo convert project data into black bird data
							// structure before persistance;
	                	
	                        var program = thisProgramManger._retrieveInstance(programData.id,programData);
	                        programs.push(program);
	                    });
	                    deferred.resolve(programs);
	            })
	            .error(function(errorMessageData){
	                deferred.reject();
	            });
	            return deferred.promise;
	        },
	        loadProgramByName:function(programName){
	        	var deferred = $q.defer();
	        	var thisProgramManger = this;
	        	if(Object.keys(this._pool).length > 0){
	        		deferred.resolve(thisProgramManger.getProgramByName(programName));
	        	}else{
	        		this.loadAllPrograms().then(function(){
	        			
	        			deferred.resolve(thisProgramManger.getProgramByName(programName));
	        		});
	        	}
	        	return deferred.promise;
	        },
	        getProgramByName:function(programName){
	        	var returnProgam = null; 
	        	angular.forEach(this._pool,function(program){
        			if(program.name == programName){
        				returnProgam = program;
        			}
        		});
	        	return returnProgam;
	        }
	}
	return ProgramManger;
});