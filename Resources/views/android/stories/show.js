Views.stories.show = Views.extend();

Views.stories.show.template = function() {
	var self = this;
	var story = self.source;
	var win = self.win;	
	var url = App.file_url+story.android_url;
	
	Views.stories.show.makePlayer = function() {
		var player = Titanium.Media.createVideoPlayer({
			movieControlMode:Titanium.Media.VIDEO_CONTROL_DEFAULT,
			url:url,
			id: "show player"
		});
		
		var movieLabel = Titanium.UI.createLabel({
				text:'Loading movie...',
				width:'auto',
				height:50,
				color:'#FFF',
				font:{fontSize:24,fontFamily:'Helvetica Neue'}
		});
		movieLabel.show();
		player.add(movieLabel);
		
		var started;
		player.addEventListener('load', function() {
			movieLabel.hide();
			if(!started) {
				Helpers.player.timeMonitor(player, player, story.comments, story.photos);
				started = true;
			}
		});
		
		win.addEventListener('close', function() {
			player.stop();
			player.hide();
		});
		
		// for really poor design where we ask for the form's source everywhere to get the story.
		Views.stories.form.source = self.source;
		Views.stories.show_form.render(self.source, {win: win, player:player});
		try{ player.play(); }catch(e) { movieLabel.text = "Can't load movie.  Please check your connection and try again."; };
	};
	
	Views.stories.show.makePlayer();
};
