Views.stories.show_form = Views.extend();

Views.stories.show_form.template = function() {
	var self = this;
	var parent_win = self.params.win;
	var player = self.params.player;
	var form_view = Titanium.UI.createView({top: 0, height: 245, zIndex:10, modal:true});
	
	var buttons_from_top_length = 72;
	var button_width = 64;
	var button_height = 60;
	
	var functionality_view = Titanium.UI.createView({
		height:193,
		width:320,
		top:0
	});
	
	var comment_bar = Titanium.UI.createView({
		backgroundImage:'images/storyshow/comment_bar.png',
		height:58,
		width:275,
		right:0,
		top:0
	});
	
	self.comment_bar = comment_bar;

	var tray = Titanium.UI.createView({
		backgroundImage:'images/storyshow/story_drawer.png',
		height:137,
		width:320,
		bottom:0
	});


	var date = Ti.UI.createLabel({
		color:'#6b6b6b',
		font:{
			fontFamily:'Helvetica Neue',
			fontSize:10,
			fontWeight:'regular'
		},
		right:10,
		top:50,
		height:15,
		width:"auto",
		text: "Posted on " + self.source.when
	});
	
	var title = Ti.UI.createLabel({
		color:'#6b6b6b',
		font:{
			fontFamily:'Helvetica Neue',
			fontSize:18,
			fontWeight:'bold'
		},
		left:10,
		top:5,
		height:25,
		width:240,
		shadowColor:"#999",
		shadowOffset:{x:0,y:1},
		text:self.source.name
	});
	
	var duration = Ti.UI.createLabel({
		color:'#6b6b6b',
		font:{
			fontFamily:'Helvetica Neue',
			fontSize:10,
			fontWeight:'bold'
		},			
		right:10,
		top:10,
		height:10,
		width:30,
		text:self.source.duration,
		zIndex:40
	});
	
	var user_icon = Titanium.UI.createImageView({
		backgroundImage:'images/feed/user_ico.png',
		left:10,
		top:50,
		width:10,
		height:10
	});
	
	var user = Ti.UI.createLabel({
		color:'#525252',
		font:{fontSize:11,fontWeight:'regular', fontFamily:'Helvetica Neue'},
		left:21,
		top:51,
		height:10,
		width:160,
		text:self.source.user.full_name
	});

	tray.add(date);
	tray.add(title);
	tray.add(duration);
	tray.add(user_icon);
	tray.add(user);

	var comment_button = Titanium.UI.createButton({
		value:false,
		top:buttons_from_top_length,
		left:8,
		height:button_height,
		width:button_width,
		backgroundImage:'images/storyshow/comment_normal.png',
		backgroundSelectedImage:'images/storyshow/comment_pressed.png'
	});

	comment_button.addEventListener('click', function() {
		App.action(player, "comments#init", {story : self.source});
	});
	
	var photo_button = Titanium.UI.createButton({
		value:false,
		top:buttons_from_top_length,
		left: 68,
		height:button_height,
		width:button_width,
		backgroundImage:'images/postrecord/addphotos_normal.png',
		backgroundSelectedImage:'images/postrecord/addphotos_pressed.png'
	});

	photo_button.addEventListener('click', function() {
		player.stop();
		App.action(player, "photos#init", {story_id : self.source.id, photos : self.source.photos, story: self.source, hide_delete: true, from_show:true});
	});

	var video_button = Titanium.UI.createButton({
		value:false,
		top:buttons_from_top_length,
		height:button_height,
		width:button_width,
		backgroundImage:'images/storyshow/video_normal.png',
		backgroundSelectedImage:'images/storyshow/video_pressed.png'
	});

	video_button.addEventListener('click', function() {
		player.stop();
		player.hide();
		App.action(player, "videos#init", {story : self.source});
	});

	var edit_button = Titanium.UI.createButton({	
		value:false,
		top:buttons_from_top_length,
		right: 8,
		height:button_height,
		width:button_width,
		backgroundImage:'images/storyshow/edit_normal.png',
		backgroundSelectedImage:'images/storyshow/edit_pressed.png'
	});

	edit_button.addEventListener('click', function() {
		player.stop();
		player.hide();
		App.action(parent_win, "stories#edit", {story : self.source});
	});
	
	var share_button = Titanium.UI.createButton({
		value:false,
		top:buttons_from_top_length,
		right: 68,
		height:button_height,
		width:button_width,
		backgroundImage:'images/postrecord/share_normal.png',
		backgroundSelectedImage:'images/postrecord/share_pressed.png',
	});
	
	share_button.addEventListener('click', function() {
		App.action(player, "sharings#init", {story : self.source, automatic_share: true});
	});
	
	functionality_view.add(comment_bar);
	functionality_view.add(tray);
	
	tray.add(comment_button);
	tray.add(photo_button);
	tray.add(video_button);
	tray.add(share_button);
	if(Helpers.user.canEdit(self.source)) tray.add(edit_button);

	form_view.add(functionality_view);
	player.add(form_view);	
};
