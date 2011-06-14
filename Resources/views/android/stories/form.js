Views.stories.form = Views.extend();

Views.stories.form.template = function() {
	var self = this;
	
	var win = self.params.win;
	var player = self.params.player;
	var form_view = Titanium.UI.createView({bottom: 0, height: 245, zIndex:10});

	Layouts.pick_date(player);
	
	var buttons_from_top_length = 60;
	var button_height = 60;
	var button_width = 64;
	
	var functionality_view = Titanium.UI.createView({
		height:193,
		width:320,
		bottom:0
	});
	
	var record_tray = Titanium.UI.createView({
		backgroundImage:'images/record/bar-recordupload.png',
		height:56,
		width:115,
		top:0,
		right:0,
		visible:true
	});
	
	var accept_button = Titanium.UI.createButton({
		value:false,
		top:0,
		right:0,
		height:43,
		width:49,
		backgroundImage:'images/postrecord/accept_btn.png',
		backgroundSelectedImage:'images/postrecord/accept_btn_pressed.png',
		visible:true
	});
	
	var saving_label = Titanium.UI.createLabel({
		text:'Saving..',
		right:-100,
		top:12,
		width:'auto',
		height:'auto',
		color:'white',
		textAlign:'center',
		visible:false
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
				Layouts.record(self.source);
			},
			cancel : function() {}
		});
	});
												
	var tray = Titanium.UI.createView({
		backgroundImage:'images/postrecord/edit_details_drawer.png',
		height:137,
		width:320,
		bottom:0
	});
	
	var story_title_field = Titanium.UI.createTextField({  
	    backgroundColor:text_field_background_color,
			color:text_field_text_color,
			borderRadius:4,
			paddingLeft:5,
	    top:10,  
	    width:300,  
	    height:30,
	    hintText:'Add a title...',
			value: self.source.name,
	    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	    returnKeyType:Titanium.UI.RETURNKEY_DONE
	});
	
	var tag_friends_button = Titanium.UI.createButton({
		value:false,
		top:buttons_from_top_length,
		left:8,
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
		right:68,
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
		right:8,
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
				saving_label.right = -100;
				win.close();
				Layouts.stories();
			},
			error : function(errors) {
				alert(errors);
				accept_button.visible = true;
				saving_label.visible = false;
				saving_label.right = -100;
			}
		});
	});
	
	story_title_field.fireEvent('blur');
	
	self.accept_button = accept_button;
	
	Views.stories.form.accept_button_toggle = function(state) {
		accept_button.visible = state;
	};
	
	functionality_view.add(record_tray);
	
	functionality_view.add(accept_button);
	functionality_view.add(rerecord_button);
	functionality_view.add(saving_label);
	functionality_view.add(tray);
	
	tray.add(story_title_field);
	tray.add(tag_friends_button);
	tray.add(location_button);
	tray.add(add_photos_button);
	tray.add(add_date_button);
	tray.add(share_button);

	form_view.add(functionality_view);
	player.add(form_view);
};
