Views.stories._form = Views.extend();

Views.stories._form.template = function() {
	var self = this;
	var story = self.source;
	
	var win = self.params.win;
	var overlay = Titanium.UI.createView({bottom: 0, height: 245, zIndex:10});

	var functionality_view = Titanium.UI.createView({
		height:193,
		width:320,
		bottom:-137
	});
	
	var edit_details_btn = Titanium.UI.createButton({
		backgroundImage:'images/postrecord/edit_details_pressed.png',
		backgroundSelectedImage:'images/postrecord/edit_details_normal.png',
		height:56,
		width:55,
		top:0,
		left:0
	});
	
	var tray = Titanium.UI.createView({
		backgroundImage:'images/postrecord/edit_details_drawer.png',
		height:137,
		width:320,
		bottom:0
	});
	
	functionality_view.add(edit_details_btn);
	functionality_view.add(tray);
	
	var story_title_field = Titanium.UI.createTextField({  
	    color:'#303030',
			backgroundColor:'#d6d6d6',
			borderRadius:4,
			paddingLeft:5,
	    top:10,  
	    width:300,  
	    height:30,  
	    hintText:'Title',  
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
		top:64,
		left: 8,
		height:56,
		width:55,
		backgroundImage:'images/postrecord/tag_normal.png',
		backgroundSelectedImage:'images/postrecord/tag_pressed.png'
	});
	
	tag_friends_button.addEventListener('click', function() {
		App.action(overlay, "tags#init");
	});
	
	var location_button = Titanium.UI.createButton({
		value:false,
		top:64,
		left: 71,
		height:56,
		width:55,
		backgroundImage:'images/postrecord/location_normal.png',
		backgroundSelectedImage:'images/postrecord/location_pressed.png'
	});
	
	location_button.addEventListener('click', function() {
		
		var location_win = Titanium.UI.createWindow({
			backgroundColor:'white',
			url:'layouts/geolocation.js'
		});

		location_win.open({fullscreen:true});
	});

	var add_photos_button = Titanium.UI.createButton({
		value:false,
		top:64,
		right: 133,
		height:56,
		width:55,
		backgroundImage:'images/postrecord/addphotos_normal.png',
		backgroundSelectedImage:'images/postrecord/addphotos_pressed.png'
	});
	
	add_photos_button.addEventListener('click', function() {
		App.action(overlay, "photos#init");
	});	

	var add_date_button = Titanium.UI.createButton({
		value:false,
		top:64,
		right: 71,
		height:56,
		width:55,
		backgroundImage:'images/postrecord/date_normal.png',
		backgroundSelectedImage:'images/postrecord/date_pressed.png'
	});
	
	add_date_button.addEventListener('click', function() {
		Layouts.pick_date(story);
	});
	
	var share_button = Titanium.UI.createButton({
		value:false,
		top:64,
		right: 8,
		height:54,
		width:53,
		backgroundImage:'images/postrecord/share_normal.png',
		backgroundSelectedImage:'images/postrecord/share_pressed.png'
	});
	
	share_button.addEventListener('click', function() {
		
	});
	
	var save_button = Titanium.UI.createButton({
		value:false,
		top:137,
		right:7,
		height:44,
		width:131,
		backgroundImage:'images/postrecord/save_btn.png',
		backgroundSelectedImage:'images/postrecord/save_btn_pressed.png'
	});
	
	var saving_label = Titanium.UI.createLabel({
		text:'Saving your story...',
		right:-150,
		bottom:25,
		width:150,
		height:'auto',
		color:'black',
		textAlign:'center',
		visible: false
	});
	
	save_button.addEventListener('click', function() {
		saving_label.visible = true;
		saving_label.animate({right:10, duration:700});
		save_button.visible = false;
		story.name = story_title_field.value;
		var http_options = getHttpOptions();
		
		App.action(overlay, 'stories#update', {
			story : story,
			success : function(updated) {
				save_button.visible = true;
				saving_label.visible = false;
				if(http_options.progress_bar) http_options.progress_bar.hide();
				story = updated; // TODO: don't know this is necessary, but it is.
			},
			error : function(errors) {
				alert(errors);
				save_button.visible = true;
				saving_label.visible = false;
			},
			http_options : http_options
		});
	});

	edit_details_btn.addEventListener('click', function() {
		if(edit_details_btn.backgroundImage === 'images/postrecord/edit_details_normal.png') {
				functionality_view.animate({bottom:-137, duration:500});
				edit_details_btn.backgroundImage = 'images/postrecord/edit_details_pressed.png';
				edit_details_btn.backgroundSelectedImage = 'images/postrecord/edit_details_normal.png';
			} else {
				functionality_view.animate({bottom:0, duration:500});
				edit_details_btn.backgroundImage = 'images/postrecord/edit_details_normal.png';
				edit_details_btn.backgroundSelectedImage = 'images/postrecord/edit_details_pressed.png';
			};
	});
	
	tray.add(story_title_field);
	tray.add(tag_friends_button);
	tray.add(location_button);
	tray.add(add_photos_button);
	tray.add(add_date_button);
	tray.add(share_button);
	tray.add(save_button);
	tray.add(saving_label);
	
	overlay.add(functionality_view);
	win.add(overlay);
	
	function getHttpOptions() {
		return (TempId.isTemp(story.id) && story.upload) ? makeProgressBar() : {};
	};
	
	function makeProgressBar() {
		var progress_bar = Helpers.ui.progressBar();
		progress_bar.show();
		win.add(progress_bar);
		return {progress_bar : progress_bar};
	}
};
