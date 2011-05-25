Views.stories._show_form = Views.extend();

Views.stories._show_form.template = function() {
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

	var story_title = Titanium.UI.createLabel({
		text:self.source.name,
		font:{fontSize:12, fontWeight:'bold'},
		color:'black',
		top:10,
		left:10,
		height:15,
		width:300
	});
	
	var story_duration = Titanium.UI.createLabel({
		text:self.source.duration,
		font:{fontSize:11, fontWeight:'bold'},
		color:'gray',
		top:25,
		left:115,
		height:15,
		width:40
	});
	
	var story_user = Titanium.UI.createLabel({
		text:self.source.user.full_name,
		font:{fontSize:11, fontWeight:'bold'},
		color:'gray',
		top:25,
		left:10,
		height:15,
		width:100
	});
	
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
		Views.stories._form.edit_details_btn.fireEvent('click');
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
		App.action(win, "sharings#init", {story : self.source});
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
	Views.stories._form.player_controls_toggle(false);
	
	functionality_view.add(comment_bar);
	functionality_view.add(edit_details_btn);
	functionality_view.add(tray);
	
	tray.add(story_title);
	tray.add(story_duration);
	tray.add(story_user);
	tray.add(comment_button);
	tray.add(photo_button);
	tray.add(video_button);
	tray.add(share_button);
	if(Helpers.user.canEdit(self.source)) tray.add(edit_button);

	form_view.add(functionality_view);
	win.add(form_view);	
};
