Helpers.player = {};

Helpers.player.timeMonitor = function(win, player, comments, photos) {
	Ti.API.info("in timeMonitor");
	var appear_time = 4;
	var self = this;
	var done = false;
	var stop;
	
	player.addEventListener('complete',finish);
		
	start();
	
	function start() {
		Functional.map(function(c){ Views.comments.comment.render(c, {win : win}) }, comments);
		Functional.map(function(p){ Views.photos.photo.render(p, {win : win}) }, photos);
		var intervalId = setInterval(showOverlays, 1000);
		stop = function() {
			clearInterval(intervalId);
		};
	};
	
	var time = 0;
	function showOverlays() {
		Ti.API.info("Trying");
		if(done){ Ti.API.info("stopping"); return stop(); };
		var position = time += 1; //player.currentPlaybackTime;		
		Functional.map(showOverlay.partial(Views.comments.comment, position), comments);
		Functional.map(showOverlay.partial(Views.photos.photo, position), photos);
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
			Ti.API.info("Rendering!");
			Ti.API.info(item);
			view.show();
			item.showing = true;
		}

		function hide() {
			if(!item.showing) return true;
			view.close();
			item.showing = false;
		}
	};
	
	function finish() {
		Ti.API.info("finishing");
		done = true;
		stop();
		hideAllOverlays();
	}
	
	function hideAllOverlays() {
		Functional.map("x.close()", [Views.comments.comment, Views.photos.photo]);
	};
};
