var Application = {
	dataObject: '',
	
	initApplication: function () {
		console.log('inside initPage');
		$(document)
			.on('pageinit', '#index-page', function() {
				Application.initIndexPage();
			})
			.on('pageinit', '#live-page', function () {
				Application.initLivePage();
			})
			.on('pageinit', '#teams-page', function () {
				Application.initTeamsPage();
			})
			.on('pageinit', '#matches-page', function () {
				Application.initSchedulePage();
			})
			.on('pageinit', '#stats-page', function () {
				Application.initStatsPage();
			})
			.on('pageinit', '#settings-page', function () {
				Application.initSettingsPage();
			});
		//Application.openLinksInApp();
		
	},
	deviceReadyFunction: function () {
		navigator.splashscreen.show();
	},
	initIndexPage: function () {
		//alert("initIndexPage :: " + $(this).attr('id'));
		Application.loadData();
		
		$.mobile.allowCrossDomainPages = true;
		$('#indexContent').removeClass('hidden');
		
		// set the date we're counting down to
		var target_date = new Date("June 12, 2014").getTime();
		 
		// variables for time units
		var days, hours, minutes, seconds;
		 
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
			
			$("#countdown-timer-days").html(Application.appendZero(days));
			$("#countdown-timer-hours").html(Application.appendZero(hours));
			$("#countdown-timer-minutes").html(Application.appendZero(minutes));
			$("#countdown-timer-seconds").html(Application.appendZero(seconds));
			
		}, 1000);	
	},
	initLivePage: function () {
		$('#refreshLiveMatch').on("click", function (event) {
			event.preventDefault();         
			return false;
		});
  
		$("closeLiveMatch").on("click", function (event){
			event.preventDefault();
			return false;
		});
	},
	initTeamsPage: function () {
		console.log(" Teams ::: " + Application.dataObject.teams.length);
		
		$.each(Application.dataObject.teams, function(team){
			//console.log("team: " + this.team);
			
			
			var team = this;
			var teamName = this.team;
			
			var playerHTML = '';
			
			//console.log('players : ' + team.players.length);
			$.each(team.players, function(player){
				//console.log("player: " + this.playerName);
				if(this.playerPosition == 'def'){
					playerHTML += 
					'<li class="ui-li-static ui-body-inherit ui-li-has-thumb"><img src="img/teams/' + teamName + '/' + this.playerSquadNum + '.png" width="60px" height="60px" /><h2>' + this.playerSquadNum + '. ' + this.			   playerName + '</h2><p class="player-details"><span class="width33pc"><b>Born: </b>' + this.playerBirthDate +  '</span><span class="width33pc"><b>Caps: </b>' + this.playerCaps + '</span><span class="width33pc"><b>Goals: </b>' + this.playerGoals + '</span></p></li>'; 
					//$('#' + this.playerPosition + '-' + teamName).append(playerHTML);
					//console.log('playerHTML ' + playerHTML);
				}
				
			});
			return false; 
		});
	},
	initSchedulePage: function () {

	},
	initStatsPage: function () {
	
		var groupTitleArray = ['GROUP A', 'GROUP B', 'GROUP C', 'GROUP D', 'GROUP E', 'GROUP F', 'GROUP G', 'GROUP H'];
		var groupCounter = 0;
		
		var recordTitleArray = ['GOALS AND ASSISTS', 'CLEAN SHEETS', 'DISCIPLINE'];
		var recordCounter = 0;
		
		/* GROUP STANDINGS */
		var groupCarousel = $('#groupCarousel');
        groupCarousel
            .on('jcarousel:reload jcarousel:create', function () {
                var width = groupCarousel.innerWidth();

                if (width >= 600) {
                    width = width / 3;
                } else if (width >= 350) {
                    width = width / 2;
                }

                groupCarousel.jcarousel('items').css('width', width + 'px');
            })
            .jcarousel({
                wrap: 'null'
            });

        $('#groupPrev')
            .jcarouselControl({
                target: '-=1'
            })
			.on('click', function(){
				groupCounter--;
				$('#groupTitle').html(groupTitleArray[groupCounter]);
			});

        $('#groupNext')
            .jcarouselControl({
                target: '+=1'
            })
			.on('click', function(){
				groupCounter++;
				$('#groupTitle').html(groupTitleArray[groupCounter]);
			});
			
		$('#groupPrev').addClass('jcarousel-disabled-control');
		$('#groupTitle').html(groupTitleArray[groupCounter]);
		
		groupCarousel.on('jcarousel:fullyvisiblein', 'li', function(event, carousel) {
			var tableID = $('table', this).attr('id');
			if(tableID == "groupATable"){
				$('#groupPrev').addClass('jcarousel-disabled-control');
				$('#groupNext').removeClass('jcarousel-disabled-control');
			}else if(tableID == "groupHTable"){
				$('#groupPrev').removeClass('jcarousel-disabled-control');
				$('#groupNext').addClass('jcarousel-disabled-control');
			}else{
				$('#groupPrev').removeClass('jcarousel-disabled-control');
				$('#groupNext').removeClass('jcarousel-disabled-control');
			}		
		});
		
		/* INDIVIDUAL RECORDS */
		var recordCarousel = $('#recordCarousel');
        recordCarousel
            .on('jcarousel:reload jcarousel:create', function () {
                var width = groupCarousel.innerWidth();

                if (width >= 600) {
                    width = width / 3;
                } else if (width >= 350) {
                    width = width / 2;
                }

                recordCarousel.jcarousel('items').css('width', width + 'px');
            })
            .jcarousel({
                wrap: 'null'
            });

        $('#recordPrev')
            .jcarouselControl({
                target: '-=1'
            })
			.on('click', function(){
				recordCounter--;
				$('#recordTitle').html(recordTitleArray[recordCounter]);
			});

        $('#recordNext')
            .jcarouselControl({
                target: '+=1'
            })
			.on('click', function(){
				recordCounter++;
				$('#recordTitle').html(recordTitleArray[recordCounter]);
			});
			
		$('#recordPrev').addClass('jcarousel-disabled-control');
		$('#recordTitle').html(recordTitleArray[recordCounter]);
		
		recordCarousel.on('jcarousel:fullyvisiblein', 'li', function(event, carousel) {
			var tableID = $('table', this).attr('id');
			if(tableID == "goalsAssistsTable"){
				$('#recordPrev').addClass('jcarousel-disabled-control');
				$('#recordNext').removeClass('jcarousel-disabled-control');
			}else if(tableID == "disciplineTable"){
				$('#recordPrev').removeClass('jcarousel-disabled-control');
				$('#recordNext').addClass('jcarousel-disabled-control');
			}else{
				$('#recordPrev').removeClass('jcarousel-disabled-control');
				$('#recordNext').removeClass('jcarousel-disabled-control');
			}		
		});
	},
	initSettingsPage: function () {

	},
	checkRequirements: function () {
		if (navigator.connection.type === Connection.NONE) {
			return false;
		}
		return true;
	},
	updateIcons: function () {
		var $buttons = $('a[data-icon], button[data-icon]');
		var isMobileWidth = ($(window).width() <= 480);
		isMobileWidth ? $buttons.attr('data-iconpos', 'notext') : $buttons.removeAttr('data-iconpos');
	},
	openLinksInApp: function () {
		$(document).on('click', 'a[target=_blank]', function (event) {
			event.preventDefault();
			window.open($(this).attr('href'), '_blank');
		});
	},
	appendZero: function (val) {
		var retVal = "";
		
		if( val >= 0 && val < 10)
			retVal = "0" + val;
		else	
			retVal = val;
			
		return retVal; 
	},
	loadTrivia: function () {
		var triviaIndex = Math.floor((Math.random()*Application.dataObject.index.trivia.length));
		console.log('triviaIndex ' + triviaIndex);
		//alert('Data parsed successfully ' + Application.dataObject.index.trivia[triviaIndex].triviaText);
		$("#triviaText").html('<div id="triviaText">' + Application.dataObject.index.trivia[triviaIndex].triviaText + '</div');
	},
	loadData: function () {
		if(Application.dataObject == '' || Application.dataObject == undefined || Application.dataObject == null){
			$.get( "data/appData.json", function() {
				//alert( "success" );
			})
			.done(function(data, status, xHR) {
				/* Simple browser testing */
				Application.dataObject = data;
				
				/* Emulator */
				//Application.dataObject = $.parseJSON(data);
				
				Application.loadTrivia();
				
			})
			.fail(function(xHR, status, error) {
				//console.log("Error :: ");
				//alert('Error');
			})
			.always(function(xHR, status, error) {
				//alert( "finished" );
			});
		}
		
	}
};
