var app = angular.module('app');
app.factory('Event', function($http,DHIS2URL,ProgramManger){
	function Event(eventData) {
        if(eventData) {
            this.setData(eventData);
        }else{
            this.setData({
                dataValues:[]
            });
        }
        // Remaining initialisations
    };
    Event.prototype = {
    		setData: function(eventData) {
	            angular.extend(this, eventData);
	        },
	        save:function(){
                console.log(JSON.stringify(this));
	        	return $http.post(DHIS2URL + "/api/events.json",this);
	        },
            setDataValue:function(dataElementName,dataElementValue){
                var dataElement = ProgramManger.getDataElementByName(dataElementName);
                var isSet = false;
                this.dataValues.forEach(function(dataValue){
                    if(dataValue.dataElement == dataElement.id){
                        isSet = true;
                        dataValue.value = dataElementValue;
                    }
                })
                if(!isSet){
                    this.dataValues.push({dataElement:dataElementName,value:dataElementValue})
                }
            }
    }
    return Event;
});