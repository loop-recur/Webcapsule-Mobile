Layouts.video_options = function(win, story) {

	var functionality_view = Titanium.UI.createView({
		height:247,
		width:320,
		bottom:-191
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
		height:191,
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
		functionality_view.animate({bottom:75, duration:250});
	});

	story_title_field.addEventListener('blur', function()
	{			
		functionality_view.animate({bottom:0, duration:250});
	});

	var tag_friends_button = Titanium.UI.createButton({
		value:false,
		top:64,
		left: 20,
		height:56,
		width:55,
		backgroundImage:'images/postrecord/tag_normal.png',
		backgroundSelectedImage:'images/postrecord/tag_pressed.png'
	});

	var location_button = Titanium.UI.createButton({
		value:false,
		top:64,
		left: 94,
		height:56,
		width:55,
		backgroundImage:'images/postrecord/location_normal.png',
		backgroundSelectedImage:'images/postrecord/location_pressed.png'
	});

	var add_photos_button = Titanium.UI.createButton({
		value:false,
		top:64,
		right: 94,
		height:56,
		width:55,
		backgroundImage:'images/postrecord/addphotos_normal.png',
		backgroundSelectedImage:'images/postrecord/addphotos_pressed.png'
	});

	var add_date_button = Titanium.UI.createButton({
		value:false,
		top:64,
		right: 20,
		height:56,
		width:55,
		backgroundImage:'images/postrecord/date_normal.png',
		backgroundSelectedImage:'images/postrecord/date_pressed.png'
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
		textAlign:'center'
	});
	
	save_button.addEventListener('click', function() {
		win.add(saving_label);
		saving_label.animate({right:10, duration:700});
		save_button.visible = false;
		story.name = story_title_field.value;
		App.action(win, 'stories#update', {story : story, callback : function(updated){ save_button.visible = true; win.remove(saving_label); story = updated; }});
	});

	edit_details_btn.addEventListener('click', function() {
		if(edit_details_btn.backgroundImage === 'images/postrecord/edit_details_normal.png') {
				functionality_view.animate({bottom:-191, duration:500});
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
	tray.add(save_button);
	
	win.add(functionality_view);
}
