Views.stories._form = Views.extend();

Views.stories._form.template = function() {
	var self = this;
	
	var camera_overlay = self.params.win;
	var enable = self.params.enable;
	var player = self.params.player;
	var story = self.source;
	var form_view = Titanium.UI.createView({bottom: 0, height: 245, zIndex:10});

	// Layouts.pick_date(camera_overlay);
	
	var buttons_from_top_length = 60;
	var button_height = 60;
	var button_width = 64;
	
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
	
	var record_tray = Titanium.UI.createView({
		backgroundImage:'images/record/bar-recordupload.png',
		height:56,
		width:115,
		top:0,
		right:0,
		visible:false
	});
	
	Views.stories._form.toggle_record_tray = function (state) {
		record_tray.visible = state;
	};

	var start_stop_button = Titanium.UI.createButton({
		backgroundImage:'images/record/rec_button.png',
		backgroundSelectedImage:'images/record/rec_button_pressed.png',
		left:6,
		width:49,
		height:43,
		value:false,
		visible:false
	});
	
	start_stop_button.addEventListener('click',function()
	{	
		Views.stories._form.toggle_upload(false);
		Ti.Media.startVideoCapture();
		start_stop_button.backgroundImage = "images/record/rec_stop_button.png";
	});
	
	Views.stories._form.toggle_start_stop = function (state) {
		start_stop_button.visible = state;
	};
	
	var uploadvid_button = Titanium.UI.createButton({
		backgroundImage:'images/record/uploadvid_normal.png',
		backgroundSelectedImage:'images/record/uploadvid_pressed.png',
		right:6,
		width:49,
		height:43,
		value:false,
		visible:false
	});
	
	uploadvid_button.addEventListener('click',function() {
		Views.stories.init.chooseVideo();
	});
	
	Views.stories._form.toggle_upload = function(state) {
		uploadvid_button.visible = state;
	};
		
	var accept_button = Titanium.UI.createButton({
		value:false,
		top:0,
		right:0,
		height:43,
		width:49,
		backgroundImage:'images/postrecord/accept_btn.png',
		backgroundSelectedImage:'images/postrecord/accept_btn_pressed.png',
		visible:false
	});
	
	Views.stories._form.accept_button_toggle = function(state) {
		accept_button.visible = state;
	};
	
	var saving_label = Titanium.UI.createLabel({
		text:'Saving...',
		right:-100,
		top:5,
		width:100,
		height:'auto',
		color:'black',
		textAlign:'center',
		visible:false
	});
	
	var edit_play_controls = Titanium.UI.createView({
		backgroundImage:"images/playercontrols/player_bar-fullwidth.png",
		height:56,
		top:0,
		width:320,
		visible:false
	});
	
	Views.stories._form.player_controls_toggle = function (state) {
		edit_play_controls.visible = state;
	};

	var play_pause_button = Titanium.UI.createButton({
		backgroundImage:"images/playercontrols/play_btn.png",
		height:32,
		width:32
	});

	var ff_button = Titanium.UI.createButton({
		backgroundImage:"images/playercontrols/ffw_btn.png",
		height:32,
		width:32,
		right:100
	});

	ff_button.addEventListener('click', function() {
		player.stop();
		player.initialPlaybackTime = player.currentPlaybackTime + 5;
		player.play();
	});

	var rw_button = Titanium.UI.createButton({
		backgroundImage:"images/playercontrols/rw_btn.png",
		height:32,
		width:32,
		left:90
	});

	rw_button.addEventListener('click', function() {
		player.stop();
		player.initialPlaybackTime = player.currentPlaybackTime - 5;
		player.play();
	});
	
	var rerecord_button = Titanium.UI.createButton({
		backgroundImage:"images/playercontrols/rec_btn.png",
		height:32,
		width:32,
		right:60
	});

	rerecord_button.addEventListener('click', function() {
		
		Helpers.ui.confirm("Re-record entire video", {
			yes : function() {
				camera_overlay.close();
				Layouts.record();
			},
			cancel : function() {}
		});
	});

	play_pause_button.addEventListener('click', function() {
		if(player.playing) {
			player.stop();
			play_pause_button.backgroundImage = "images/playercontrols/play_btn.png";		
		} else {
			player.play();
			play_pause_button.backgroundImage = "images/playercontrols/pause_btn.png";
			Helpers.player.timeMonitor(asset_overlay, player, player.comments, player.photos);
		}
	});
	
	if(player) {
			player.addEventListener('complete',function() {
				player.stop();
				play_pause_button.backgroundImage = "images/playercontrols/play_btn.png";
		});
	};
											
	var tray = Titanium.UI.createView({
		backgroundImage:'images/postrecord/edit_details_drawer.png',
		height:137,
		width:320,
		bottom:0
	});
	
	var story_title_field = Titanium.UI.createTextField({  
	    color:'#303030',
			backgroundColor:'#d6d6d6',
			borderRadius:4,
			paddingLeft:5,
	    top:10,  
	    width:300,  
	    height:30,
	    hintText:'Title',
			value: self.source.name,
	    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	    returnKeyType:Titanium.UI.RETURNKEY_DONE
	});
	
	story_title_field.addEventListener('focus', function()
	{			
		functionality_view.animate({bottom:129, duration:250});
	});

	story_title_field.addEventListener('blur', function()
	{			
		functionality_view.animate({bottom:0, duration:250});
	});

	var tag_friends_button = Titanium.UI.createButton({
		value:false,
		top:buttons_from_top_length,
		left:8,
		width:button_width,
		height:button_height,
		backgroundImage:'images/postrecord/tag_normal.png',
		backgroundSelectedImage:'images/postrecord/tag_pressed.png',
		enabled:enable
	});
	
	if(enable) tag_friends_button.addEventListener('click', function() {
		App.action(camera_overlay, "tags#init", {story_tags : self.source.tags, story: self.source });
	});
	
	Views.stories._form.toggle_tag_icon = function(state) {
		tag_friends_button.backgroundImage = state ? 'images/postrecord/tag_activated.png' : 'images/postrecord/tag_normal.png';
	};
	
	(Helpers.application.isBlank(self.source.tags)) ? self.toggle_tag_icon(false) : self.toggle_tag_icon(true);

	var location_button = Titanium.UI.createButton({
		value:false,
		top:buttons_from_top_length,
		left:68,
		width:button_width,
		height:button_height,
		backgroundImage:'images/postrecord/location_normal.png',
		backgroundSelectedImage:'images/postrecord/location_pressed.png'
	});

	location_button.addEventListener('click', function() {
		
		function setGeo() {
			Layouts.geolocation(self.source);
		}
		
		function clearGeo() {
			story.where = "";
		}
			
		if(Helpers.application.isBlank(story.where)) {
			setGeo();
		} else {
			clearGeo();
			Views.stories._form.toggle_geolocation(false);
		}
	});	

	Views.stories._form.toggle_geolocation = function(state) {
		location_button.backgroundImage = state ? 'images/postrecord/location_activated.png' : 'images/postrecord/location_normal.png';
	};
	
	if(self.source.where){ self.toggle_geolocation(true) };
	
	photos_backgroundImage = (story.photos) ? 'images/postrecord/addphotos_activated.png' : 'images/postrecord/addphotos_normal.png';
	
	var add_photos_button = Titanium.UI.createButton({
		value:false,
		top:buttons_from_top_length,
		width:button_width,
		height:button_height,
		backgroundImage:photos_backgroundImage,
		backgroundSelectedImage:'images/postrecord/addphotos_pressed.png',
		enabled:enable
	});

	if(enable) add_photos_button.addEventListener('click', function() {
		App.action(camera_overlay, "photos#init", { photos : self.source.photos, story: self.source });
	});	
	
	Views.stories._form.toggle_photo_icon = function(state) {
		add_photos_button.backgroundImage = state ? 'images/postrecord/addphotos_activated.png' : 'images/postrecord/addphotos_normal.png';
	};

	(Helpers.application.isBlank(self.source.photos)) ? self.toggle_photo_icon(false) : self.toggle_photo_icon(true);
	
	var add_date_button = Titanium.UI.createButton({
		value:false,
		top:buttons_from_top_length,
		right:68,
		width:button_width,
		height:button_height,
		backgroundImage:'images/postrecord/date_activated.png',
		backgroundSelectedImage:'images/postrecord/date_pressed.png'
	});
	
	Views.stories._form.toggle_date_icon = function(state) {
		add_date_button.backgroundImage = state ? 'images/postrecord/date_activated.png' : 'images/postrecord/date_normal.png';
	};
	
	add_date_button.addEventListener('click', function() {
		function setDate() {
			story.when = new Date();
		}
		
		function clearDate() {
			story.when = "";
		}
			
		if(Helpers.application.isBlank(story.when)) {
			setDate();
			Views.stories._form.toggle_date_icon(true);
		} else {
			clearDate();
			Views.stories._form.toggle_date_icon(false);
		}
		
	});
	
	var share_button = Titanium.UI.createButton({
		value:false,
		top:buttons_from_top_length,
		right:8,
		width:button_width,
		height:button_height,
		backgroundImage:'images/postrecord/share_normal.png',
		backgroundSelectedImage:'images/postrecord/share_pressed.png',
		enabled:enable
	});
	
	if(enable) share_button.addEventListener('click', function() {
		App.action(camera_overlay, "sharings#init", {story : self.source});
	});
	
	story_title_field.addEventListener("blur", function() {
		if(story_title_field.value == "") { story_title_field.value = "Untitled Story"; };
		self.source.name = story_title_field.value;
	});
	
	accept_button.addEventListener('click', function() {
		if(!self.source.video_id) return alert("Video has not uploaded yet");
		
		accept_button.visible = false;
		saving_label.visible = true;
		saving_label.animate({right:10, duration:700});
		
		App.action(form_view, 'stories#update', {
			story : self.source,
			success : function(updated) {
				accept_button.visible = true;
				saving_label.visible = false;
			},
			error : function(errors) {
				alert(errors);
				accept_button.visible = true;
				saving_label.visible = false;
			}
		});
	});
	
	self.accept_button = accept_button;

	edit_details_btn.addEventListener('click', function() {
		if(edit_details_btn.backgroundImage === 'images/postrecord/btn_retract_normal.png') {
				edit_details_btn.backgroundImage = 'images/postrecord/edit_details_pressed.png';
				functionality_view.animate({bottom:-137, duration:500});
			} else {
				edit_details_btn.backgroundImage = 'images/postrecord/btn_retract_normal.png';
				functionality_view.animate({bottom:0, duration:500});
			};
	});
	
	self.edit_details_btn = edit_details_btn;
	
	Views.stories._form.accept_button_toggle = function(state) {
		accept_button.visible = state;
	};
	
	functionality_view.add(edit_play_controls);
	edit_play_controls.add(play_pause_button);
	edit_play_controls.add(ff_button);
	edit_play_controls.add(rw_button);
	edit_play_controls.add(rerecord_button);
	
	functionality_view.add(record_tray);
	record_tray.add(start_stop_button);
	record_tray.add(uploadvid_button);
	
	functionality_view.add(edit_details_btn);
	functionality_view.add(accept_button);
	functionality_view.add(saving_label);
	functionality_view.add(tray);
	
	tray.add(story_title_field);
	tray.add(tag_friends_button);
	tray.add(location_button);
	tray.add(add_photos_button);
	tray.add(add_date_button);
	tray.add(share_button);

	form_view.add(functionality_view);
	camera_overlay.add(form_view);
	
};
