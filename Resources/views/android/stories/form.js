Views.stories.form = Views.extend();

Views.stories.form.template = function() {
	var self = this;
	
	var win = self.params.win;
	var player = self.params.player;
	
	if (Helpers.application.densityIsMedium())
	  {
	  var form_view_top = 0;
		var functionality_view_top = 0;
		var record_tray_top = 0;
		var record_tray_right = 0;
		var accept_button_top = 0;
		var accept_button_right = 0;
		var saving_label_right = -100;
		var saving_label_top = 12;
		var rerecord_button_right = 60;
		var tray_bottom = 0;
		var story_title_field_top = 10;
		var story_title_field_left = 3;
		var tag_friends_button_left = 8;
		var location_button_left = 68;
		var add_date_button_right = 68;
		var share_button_right = 8;
	  }
	else
	  {
	  var form_view_top = 0;
		var functionality_view_top = 0;
		var record_tray_top = 0;
		var record_tray_right = 0;
		var accept_button_top = 0;
		var accept_button_right = 0;
		var saving_label_right = -100;
		var saving_label_top = 12;
		var rerecord_button_right = 60;
		var tray_bottom = 0;
		var story_title_field_top = 10;
		var story_title_field_left = 6;
		var tag_friends_button_left = 10;
		var location_button_left = 100;
		var add_date_button_right = 100;
		var share_button_right = 10;
	  }
	
	var form_view = Titanium.UI.createView({top: form_view_top, height:"245dp", zIndex:10});

	Layouts.pick_date(player);
	
	var buttons_from_top_length = "71dp";
	var button_height = "60dp";
	var button_width = "64dp";
	
	var functionality_view = Titanium.UI.createView({
		height:"137dp",
		width:"320dp",
		top:functionality_view_top
	});
	
	// var record_tray = Titanium.UI.createView({
	// 	backgroundImage:'images/record/bar-recordupload.png',
	// 	height:"56dp",
	// 	width:"115dp",
	// 	top:record_tray_top,
	// 	right:record_tray_right,
	// 	visible:true
	// });
	
	var accept_button = Titanium.UI.createButton({
		value:false,
		top:accept_button_top,
		right:accept_button_right,
		height:"43dp",
		width:"49dp",
		backgroundImage:'images/postrecord/accept_btn.png',
		backgroundSelectedImage:'images/postrecord/accept_btn_pressed.png',
		visible:true
	});
	
	var saving_label = Titanium.UI.createLabel({
		text:'Saving..',
		right:saving_label_right,
		top:saving_label_top,
		width:'auto',
		height:'auto',
		color:'white',
		textAlign:'center',
		visible:false
	});	
	
	var rerecord_button = Titanium.UI.createButton({
		backgroundImage:"images/playercontrols/rec_btn.png",
		height:"32dp",
		width:"32dp",
		right:rerecord_button_right
	});

	rerecord_button.addEventListener('click', function() {
		Helpers.ui.confirm("Re-record entire video", {
			yes : function() {
				Layouts.record(self.source);
			},
			cancel : function() {}
		});
	});
												
	// var tray = Titanium.UI.createView({
	// 	backgroundImage:'images/postrecord/edit_details_drawer.png',
	// 	height:"137dp",
	// 	width:"320dp",
	// 	bottom:tray_bottom
	// });
	
	var tray = Titanium.UI.createView({
		backgroundImage:'images/storyshow/story_drawer.png',
		height:"137dp",
		width:"320dp",
		bottom:tray_bottom
	});
	
	var story_title_field = Titanium.UI.createTextField({  
	    backgroundColor:text_field_background_color,
			color:text_field_text_color,
			borderRadius:4,
			paddingLeft:"3dp",
	    top:story_title_field_top,
			left:story_title_field_left,
	    width:"250dp",  
	    height:"40dp",
	    hintText:'Add a title...',
			value: self.source.name,
	    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	    returnKeyType:Titanium.UI.RETURNKEY_DONE
	});
	
	var tag_friends_button = Titanium.UI.createButton({
		value:false,
		top:buttons_from_top_length,
		left:tag_friends_button_left,
		width:button_width,
		height:button_height,
		backgroundImage:'images/postrecord/tag_normal.png',
		backgroundSelectedImage:'images/postrecord/tag_pressed.png'
	});
	
	tag_friends_button.addEventListener('click', function() {
		App.action(player, "tags#init", {story_tags : self.source.tags, story: self.source });
	});
	
	Views.stories.form.toggle_tag_icon = function(state) {
		tag_friends_button.backgroundImage = state ? 'images/postrecord/tag_activated.png' : 'images/postrecord/tag_normal.png';
	};
	
	(Helpers.application.isBlank(self.source.tags)) ? self.toggle_tag_icon(false) : self.toggle_tag_icon(true);

	var location_button = Titanium.UI.createButton({
		value:false,
		top:buttons_from_top_length,
		left:location_button_left,
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
			self.source.where = "";
		}
			
		if(Helpers.application.isBlank(self.source.where)) {
			setGeo();
		} else {
			clearGeo();
			Views.stories.form.toggle_geolocation(false);
		}
	});	

	Views.stories.form.toggle_geolocation = function(state) {
		location_button.backgroundImage = state ? 'images/postrecord/location_activated.png' : 'images/postrecord/location_normal.png';
	};
	
	if(self.source.where){ self.toggle_geolocation(true) };
	
	photos_backgroundImage = (self.source.photos) ? 'images/postrecord/addphotos_activated.png' : 'images/postrecord/addphotos_normal.png';
	
	var add_photos_button = Titanium.UI.createButton({
		value:false,
		top:buttons_from_top_length,
		width:button_width,
		height:button_height,
		backgroundImage:photos_backgroundImage,
		backgroundSelectedImage:'images/postrecord/addphotos_pressed.png'
	});

	add_photos_button.addEventListener('click', function() {
		App.action(player, "photos#init", { photos : self.source.photos, story: self.source });
	});	
	
	Views.stories.form.toggle_photo_icon = function(state) {
		add_photos_button.backgroundImage = state ? 'images/postrecord/addphotos_activated.png' : 'images/postrecord/addphotos_normal.png';
	};

	(Helpers.application.isBlank(self.source.photos)) ? self.toggle_photo_icon(false) : self.toggle_photo_icon(true);
	
	var add_date_button = Titanium.UI.createButton({
		value:false,
		top:buttons_from_top_length,
		right:add_date_button_right,
		width:button_width,
		height:button_height,
		backgroundImage:'images/postrecord/date_activated.png',
		backgroundSelectedImage:'images/postrecord/date_pressed.png'
	});
	
	Views.stories.form.toggle_date_icon = function(state) {
		add_date_button.backgroundImage = state ? 'images/postrecord/date_activated.png' : 'images/postrecord/date_normal.png';
	};
	
	add_date_button.addEventListener('click', function() {
		
		function setDate() {
			Layouts.pick_date.toggle_pick_date(true);
		}
		
		function clearDate() {
			self.source.when = "";
		}
			
		if(Helpers.application.isBlank(self.source.when)) {
			setDate();
		} else {
			clearDate();
			Views.stories.form.toggle_date_icon(false);
		}

	});
	
	var share_button = Titanium.UI.createButton({
		value:false,
		top:buttons_from_top_length,
		right:share_button_right,
		width:button_width,
		height:button_height,
		backgroundImage:'images/postrecord/share_normal.png',
		backgroundSelectedImage:'images/postrecord/share_pressed.png'
	});
	
	Views.stories.form.toggle_sharing_icon = function(state) {
		share_button.backgroundImage = state ? 'images/postrecord/share_activated.png' : 'images/postrecord/share_normal.png';
	};
	
	share_button.addEventListener('click', function() {
		App.action(player, "sharings#init", {story : self.source});
	});
	
	story_title_field.addEventListener("blur", function() {
		if(Helpers.application.isBlank(story_title_field.value)) { story_title_field.value = "Untitled Story"; };
		self.source.name = story_title_field.value;
	});
	
	accept_button.addEventListener('click', function() {
		if(!self.source.video_id) return alert("Video has not uploaded yet");
		
		accept_button.visible = false;
		saving_label.visible = true;
		saving_label.animate({right:0, duration:500});
		
		App.action(form_view, 'stories#update', {
			story : self.source,
			success : function(updated) {
				accept_button.visible = true;
				saving_label.visible = false;
				saving_label.right = saving_label_right;
				win.close();
				Layouts.stories();
			},
			error : function(errors) {
				alert(errors);
				accept_button.visible = true;
				saving_label.visible = false;
				saving_label.right = saving_label_right;
			}
		});
	});
	
	story_title_field.fireEvent('blur');
	
	self.accept_button = accept_button;
	
	Views.stories.form.accept_button_toggle = function(state) {
		accept_button.visible = state;
	};
	
	// functionality_view.add(record_tray);

	// functionality_view.add(rerecord_button);
	functionality_view.add(saving_label);
	functionality_view.add(tray);

	tray.add(accept_button);	
	tray.add(story_title_field);
	tray.add(tag_friends_button);
	tray.add(location_button);
	tray.add(add_photos_button);
	tray.add(add_date_button);
	tray.add(share_button);

	form_view.add(functionality_view);
	player.add(form_view);
};
