Helpers.player = {};

Helpers.player.timeMonitor = function(win, player, comments, photos) {
	var appear_time = 4;
	var done = false;
	var stop;
	
	player.addEventListener('complete',finish);
		
	start();
	
	function buildViews(view, items) {
		Functional.map(_build, items);

		function _build(item) {
			var v = view.render(item, {win:win});
			item.view = v;
		};
	}
	
	function start() {
		buildViews(Views.comments.comment, comments);
		buildViews(Views.photos.photo, photos);
		var intervalId = setInterval(showOverlays, 1000);
		stop = function() {
			clearInterval(intervalId);
		};
	};
	
	var time = 0;
	function showOverlays() {
		if(done){ return stop(); };
		var position = time; //player.currentPlaybackTime;
		Functional.map(showOverlay.partial(Views.comments.comment, position), comments);
		Functional.map(showOverlay.partial(Views.photos.photo, position), photos);
		time += 1;
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
			item.view.visible = true;
			item.showing = true;
		}

		function hide() {
			if(!item.showing) return true;
			item.view.visible = false;
			item.showing = false;
		}
	};
	
	function finish() {
		done = true;
		stop();
		hideAllOverlays();
	}
	
	function hideAllOverlays() {
		// Functional.map("x.close()", [Views.comments.comment, Views.photos.photo]);
	};
};
