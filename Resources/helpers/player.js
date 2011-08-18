Helpers.player = {};

Helpers.player.timeMonitor = function(win, player, comments, photos) {
	var appear_time = 4
	, self = this
	, done = null
	, stop = null;
	
	player.addEventListener('complete',finish);
	
	Ti.App.addEventListener('addedMedia',function(e) {
		Ti.API.info("====================GOT IT!!!!!============");
		if(e.type === "comment") {
			comments.push(e.source);
		} else {
			photos.push(e.source);
		}
	});

	Ti.App.addEventListener('removedMedia',function(e) {
		Helpers.array_funs.removeById(e.id, photos); //can't delete comments right now.
	});
	
	player.addEventListener('playing',start);
		
	start();
	
	function restart() {
		stop();
		hideAllOverlays();
		start();
	}
	
	function start() {
		Ti.API.info("======STARTED=====");
		done = false;
		var intervalId = setInterval(showOverlays, 1000);
		stop = function() {
			clearInterval(intervalId);
		};
	};
	
	function showOverlays(interval) {
		Ti.API.info("======RUNNING=====");
		if(done) return stop();
		var position = player.currentPlaybackTime;
		Functional.map(showOverlay.partial(Views.comments._comment, position), comments);
		Functional.map(showOverlay.partial(Views.photos._photo, position), photos);
	};

	function showOverlay(view, position, item) {
		if(!item){ return };
		var appear_at = item.appear_at;

		shouldShow() ? show() : hide();

		function shouldShow() {
			return appear_at && (position >= appear_at) && position <= appear_at+appear_time;
		};

		function show() {
			if(item.showing) return true;
			view.render(item, {win : win});
			item.showing = true;
		}

		function hide() {
			if(!item.showing) return true;
			view.close();
			item.showing = false;
		}
	};
	
	function finish() {
		Ti.API.info("======Finishing=====");
		done = true;
		hideAllOverlays();
	}
	
	function hideAllOverlays() {
		Functional.map("x.close()", [Views.comments._comment, Views.photos._photo]);
	};
};
