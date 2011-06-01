Views.stories.show = Views.extend();

Views.stories.show.template = function() {
	var self = this;
	var story = self.source;
	var win = self.win;
	var player = self.params.player;
	
	// TODO: offline
	// player.url =  App.file_url+story.video_url;
	player.play();
	
	// var new_account_label = Titanium.UI.createLabel({
	// 	text:story.name,
	// 	bottom:30,
	// 	width:150,
	// 	height:40,
	// 	color:'gray',
	// 	textAlign:'center',
	// 	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:10}
	// });
	// 
	// win.add(new_account_label);
	// 
	// player.comments = story.comments;
	// player.photos = story.photos;
		
	// Views.stories.show_form.render(story, {win: win, player:player});
};
