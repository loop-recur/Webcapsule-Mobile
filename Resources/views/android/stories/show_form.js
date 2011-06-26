Views.stories.show_form = Views.extend();

Views.stories.show_form.template = function() {
	var self = this;
	var parent_win = self.params.win;
	var player = self.params.player;
	var form_view = Titanium.UI.createView({top: 0, height:"245dp", zIndex:10});
	
	var buttons_from_top_length = "72dp";
	var button_width = "64dp";
	var button_height = "60dp";
	
	if (Helpers.application.densityIsMedium())
	  {
	  var functionality_view_top = 0;
		var comment_bar_right = 0;
		var comment_bar_top = 0;
		var tray_bottom = 0;
		var date_right = 10;
		var date_top = 50;
		var title_left = 10;
		var title_top = 5;
		var duration_right = 10;
		var duration_top = 10;
		var user_icon_left = 10;
		var user_icon_top = 50;
		var user_left = 21;
		var user_top = 51;
		var comment_button_left = 8;
		var photo_button_left = 68;
		var edit_button_right = 8;
		var share_button_right = 68;
	  }
	else
	  {
	  var functionality_view_top = 0;
		var comment_bar_right = 0;
		var comment_bar_top = 0;
		var tray_bottom = 0;
		var date_right = 10;
		var date_top = 50;
		var title_left = 10;
		var title_top = 5;
		var duration_right = 10;
		var duration_top = 10;
		var user_icon_left = 10;
		var user_icon_top = 50;
		var user_left = 21;
		var user_top = 51;
		var comment_button_left = 8;
		var photo_button_left = 68;
		var edit_button_right = 8;
		var share_button_right = 68;
	  }
	
	var functionality_view = Titanium.UI.createView({
		height:"193dp",
		width:"320dp",
		top:functionality_view_top
	});
	
	var comment_bar = Titanium.UI.createView({
		backgroundImage:'images/storyshow/comment_bar.png',
		height:"58dp",
		width:"275dp",
		right:comment_bar_right,
		top:comment_bar_top
	});
	
	self.comment_bar = comment_bar;

	var tray = Titanium.UI.createView({
		backgroundImage:'images/storyshow/story_drawer.png',
		height:"137dp",
		width:"320dp",
		bottom:tray_bottom
	});


	var date = Ti.UI.createLabel({
		color:'#6b6b6b',
		font:{
			fontFamily:'Helvetica Neue',
			fontSize:"10dp",
			fontWeight:'regular'
		},
		right:date_right,
		top:date_top,
		height:"15dp",
		width:"auto",
		text: "Posted on " + self.source.when
	});
	
	var title = Ti.UI.createLabel({
		color:'#6b6b6b',
		font:{
			fontFamily:'Helvetica Neue',
			fontSize:"18dp",
			fontWeight:'bold'
		},
		left:title_left,
		top:title_top,
		height:"25dp",
		width:"240dp",
		shadowColor:"#999",
		shadowOffset:{x:0,y:1},
		text:self.source.name
	});
	
	var duration = Ti.UI.createLabel({
		color:'#6b6b6b',
		font:{
			fontFamily:'Helvetica Neue',
			fontSize:"10dp",
			fontWeight:'bold'
		},			
		right:duration_right,
		top:duration_top,
		height:"10dp",
		width:"30dp",
		text:self.source.duration,
		zIndex:40
	});
	
	var user_icon = Titanium.UI.createImageView({
		backgroundImage:'images/feed/user_ico.png',
		left:user_icon_left,
		top:user_icon_top,
		width:"10dp",
		height:"10dp"
	});
	
	var user = Ti.UI.createLabel({
		color:'#525252',
		font:{fontSize:"11dp",fontWeight:'regular', fontFamily:'Helvetica Neue'},
		left:user_left,
		top:user_top,
		height:"10dp",
		width:"160dp",
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
		left:comment_button_left,
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
		left:photo_button_left,
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
		right:edit_button_right,
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
		right:share_button_right,
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
