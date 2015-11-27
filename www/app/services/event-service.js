var app = angular.module('app');
app.factory('Event', function($http,DHIS2URL){
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
	        }
    }
    return Event;
});