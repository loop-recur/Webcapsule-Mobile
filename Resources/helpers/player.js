Helpers.player = {};

Helpers.player.timeMonitor = function(win, player, comments, photos) {
	var appear_time = 4;
	var self = this;
	var done = false;
	var stop;
	
	player.addEventListener('complete',finish);
		
	start();
	
	function start() {
		var intervalId = setInterval(showOverlays, 1000);
		stop = function() {
			clearInterval(intervalId);
		};
	};
	
	function showOverlays(interval) {
		if(done){ return stop(); };
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
		Ti.API.info("===============FINISHING");
		done = true;
		hideAllOverlays();
	}
	
	function hideAllOverlays() {
		Ti.API.info("===============HIDING");
		Functional.map("x.close()", [Views.comments._comment, Views.photos._photo]);
	};
};
