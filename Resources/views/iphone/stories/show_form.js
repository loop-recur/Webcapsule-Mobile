Views.stories.show_form = Views.extend();

Views.stories.show_form.template = function() {
	var self = this;
	var win = self.params.win;
	var form_view = Titanium.UI.createView({bottom: 0, height: 245, zIndex:10});
	
	var buttons_from_top_length = 72;
	var button_width = 64;
	var button_height = 60;
	
	var functionality_view = Titanium.UI.createView({
		height:193,
		width:320,
		bottom:-137
	});

	var edit_details_btn = Titanium.UI.createButton({
		backgroundImage:'images/postrecord/edit_details_pressed.png',
		height:56,
		width:55,
		top:0,
		left:0
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



	// var story_title = Titanium.UI.createLabel({
	// 	text:self.source.name,
	// 	font:{fontSize:18,fontWeight:'regular',fontFamily:'Helvetica Neue'},
	// 	color:'#616161',
	// 	top:8,
	// 	left:10,
	// 	height:20,
	// 	width:300
	// });
	// 
	// var story_duration = Titanium.UI.createLabel({
	// 	text:self.source.duration,
	// 	font:{fontSize:11, fontWeight:'bold'},
	// 	color:'#616161',
	// 	top:35,
	// 	left:10,
	// 	height:15,
	// 	width:40
	// });
	// 
	// var story_user = Titanium.UI.createLabel({
	// 	text:self.source.user.full_name,
	// 	font:{fontSize:13,fontWeight:'regular',fontFamily:'Helvetica Neue'},
	// 	color:'#616161',
	// 	top:,
	// 	left:10,
	// 	height:15,
	// 	width:100
	// });
	
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
		App.action(win, "comments#init", {story : self.source});
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
		App.action(win, "photos#init", {story_id : self.source.id, photos : self.source.photos, story: self.source, hide_delete: true});
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
		App.action(win, "videos#init", {story : self.source});
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
		win.remove(form_view);
		App.action(win, "stories#edit", {win: win, story : self.source});
		Views.stories.form.edit_details_btn.fireEvent('click');
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
		App.action(win, "sharings#init", {story : self.source, automatic_share: true});
	});

	edit_details_btn.addEventListener('click', function() {
		if(edit_details_btn.backgroundImage === 'images/postrecord/btn_retract_normal.png') {
				edit_details_btn.backgroundImage = 'images/postrecord/edit_details_pressed.png';
				functionality_view.animate({bottom:-137, duration:500});
			} else {
				edit_details_btn.backgroundImage = 'images/postrecord/btn_retract_normal.png';
				functionality_view.animate({bottom:0, duration:500});
			};
	});

	Layouts.story.toggle_compact_play_controls(true);
	// Views.stories.form.player_controls_toggle(false);
	
	functionality_view.add(comment_bar);
	functionality_view.add(edit_details_btn);
	functionality_view.add(tray);
	
	// tray.add(story_title);
	// tray.add(story_duration);
	// tray.add(story_user);
	tray.add(comment_button);
	tray.add(photo_button);
	tray.add(video_button);
	tray.add(share_button);
	if(Helpers.user.canEdit(self.source)) tray.add(edit_button);

	form_view.add(functionality_view);
	win.add(form_view);	
};
