Views.stories.show = Views.extend();

Views.stories.show.template = function() {
	var self = this;
	var story = self.source;
	var win = self.win;
	var url = App.file_url+"/streams/000/000/737/f12e8c15f6dcfa51e6aebcfdfcc9318bb56fce56.mp4";
	
	var player = Titanium.Media.createVideoPlayer({
		movieControlMode:Titanium.Media.VIDEO_CONTROL_DEFAULT,
		scalingMode:Titanium.Media.VIDEO_SCALING_MODE_FILL,
		url:url
	});
	
	var asset_overlay = Titanium.UI.createView({
		height:180,
		top:20,
		id:"story play asset overlay"
	});
	
	var close_button = Titanium.UI.createButton({
		backgroundImage:"images/postrecord/return.png",
		height:26,
		width:26,
		top:5,
		left:5
	});
	
	close_button.addEventListener('click', function() {
		player.stop();
		player.hide();
		win.close();
	});
	
	var started;
	player.addEventListener('load', function() {
		Ti.API.info("loaded!");
		if(!started) {
			Helpers.player.timeMonitor(player, player, story.comments, story.photos);
			started = true;
		}
	});
	
	var movieLabel = Titanium.UI.createLabel({
		text:'Do not try this at home',
		width:'auto',
		height:35,
		color:'white',
		font:{fontSize:24,fontFamily:'Helvetica Neue'}
	});

	// add label to view
	player.add(movieLabel);

	// label click
	movieLabel.addEventListener('click',function()
	{
		movieLabel.text = "You clicked the video label. Sweet!";
	});

	player.play();

	// player.add(asset_overlay);
	player.add(close_button);
		
	// Views.stories.show_form.render(story, {win: win, player:player});
};
