Helpers.player = {};

Helpers.player.timeMonitor = function(win, player, comments, photos) {
	var appear_time = 4;
	var self = this;
	var done = false;
	
	player.addEventListener('complete',function(e){
		done = true;
		hideAllOverlays();
	});
	
	
	showOverlays();
	
	function hideAllOverlays() {
		Functional.map(".close", [Views.comments._comment, Views.photos._photo]);
	};
	
	function showOverlays() {
		if(done){ clearInterval(showOverlays); };
		var position = player.currentPlaybackTime;
		Functional.map(showOverlay.partial(Views.comments._comment, position), comments);
		Functional.map(showOverlay.partial(Views.photos._photo, position), photos);
		setInterval(showOverlays, 1000);
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
};
