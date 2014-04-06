/* Script */

$(document).ready(function(){
	
	//console.log("current page = " + $.mobile.activePage.attr("id"));
	
	/*$.ajax({
		url: "data/appData.json",
		type: "GET",
		dataType: "json",
		success: function(data, status, xHR){
			//var rawData = $.toJSON(data);
			var appDataEN = $.evalJSON($.toJSON(data)).en;
			 $("#live").text(appDataEN.menuButtons.liveText);
			$("#matches").text(appDataEN.menuButtons.gamesText);
			$("#squads").text(appDataEN.menuButtons.teamsText);
			$("#stats").text(appDataEN.menuButtons.statsText);
			$("#settings").text(appDataEN.menuButtons.settingsText); 
			
		},
		error: function(xHR, status, error){
			console.log("ERROR! " + error);
		}
	});*/
	
	// set the date we're counting down to
	var target_date = new Date("June 12, 2014").getTime();
	 
	// variables for time units
	var days, hours, minutes, seconds;
	 
	// get tag element
	var countdownDays = document.getElementById("countdown-timer-days");
	var countdownHours = document.getElementById("countdown-timer-hours");
	var countdownMinutes = document.getElementById("countdown-timer-minutes");
	var countdownSeconds = document.getElementById("countdown-timer-seconds");
	 
	// update the tag with id "countdown" every 1 second
	setInterval(function () {
	 
		// find the amount of "seconds" between now and target
		var current_date = new Date().getTime();
		var seconds_left = (target_date - current_date) / 1000;
	 
		// do some time calculations
		days = parseInt(seconds_left / 86400);
		seconds_left = seconds_left % 86400;
		 
		hours = parseInt(seconds_left / 3600);
		seconds_left = seconds_left % 3600;
		 
		minutes = parseInt(seconds_left / 60);
		seconds = parseInt(seconds_left % 60);
		
		// format countdown string + set tag value
		//countdown.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s";
		//countdown.innerHTML = appendZero(days) + ":" + appendZero(hours) + ":" + appendZero(minutes) + ":" + appendZero(seconds);		
		/* countdownDays.innerHTML = appendZero(days);
		countdownHours.innerHTML = appendZero(hours);
		countdownMinutes.innerHTML = appendZero(minutes);
		countdownSeconds.innerHTML = appendZero(seconds); */
	 
	}, 1000);
	
	function appendZero(val) {
		var retVal = "";
		
		if( val >= 0 && val < 10)
			retVal = "0" + val;
		else	
			retVal = val;
			
		return retVal; 
	}
	
	var jcarousel = $('.jcarousel');

	jcarousel.on('jcarousel:create jcarousel:reload', function () {
		var width = jcarousel.innerWidth();
		
		if (width >= 600) {
			width = width / 3;
		} else if (width >= 350) {
			width = width / 2;
		}else{
			width = 300;
		}
		//width = 300;
		console.log("carousel width = " + width + " AND parent width = " + jcarousel.width());
		jcarousel.jcarousel('items').css('width', width + 'px');
	}).jcarousel({wrap: 'null'});

	$('.jcarousel-control-prev').jcarouselControl({
		target: '-=1'
	});
	
	$('.jcarousel-control-next').jcarouselControl({
		target: '+=1'
	});  
	
	$('.jcarousel-control-prev').addClass('jcarousel-disabled-control');
	$('.jcarousel').on('jcarousel:fullyvisiblein', 'li', function(event, carousel) {
		var tableID = $('table', this).attr('id');
		if(tableID == "groupATable"){
			$('.jcarousel-control-prev').addClass('jcarousel-disabled-control');
			$('.jcarousel-control-next').removeClass('jcarousel-disabled-control');
		}else if(tableID == "groupHTable"){
			$('.jcarousel-control-prev').removeClass('jcarousel-disabled-control');
			$('.jcarousel-control-next').addClass('jcarousel-disabled-control');
		}else{
			$('.jcarousel-control-prev').removeClass('jcarousel-disabled-control');
			$('.jcarousel-control-next').removeClass('jcarousel-disabled-control');
		}
			
		
	});
	
});
