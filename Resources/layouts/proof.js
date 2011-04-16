Layouts.proof = function() {
	var win = Titanium.UI.currentWindow;
	
	var functionality_view = Titanium.UI.createView({
		height:225,
		bottom:-190
	}); 
	
	var open = Titanium.UI.createButton({
		value:false,
		title:"open",
		top:0,
		left:30,
		height:30,
		width:50
	});

	open.addEventListener('click', function() {
		functionality_view.animate({bottom:0, duration:500});
	});
		
	var close = Titanium.UI.createButton({
		value:false,
		title:"close",
		top:0,
		right:30,
		height:30,
		width:50
	});
	
	close.addEventListener('click', function() {
		functionality_view.animate({bottom:-190, duration:500});
	});
	
	var story_title_field = Titanium.UI.createTextField({  
	    color:'#303030',
			backgroundColor:'#d6d6d6',
			borderRadius:4,
			paddingLeft:5,
	    top:50,  
	    width:300,  
	    height:30,  
	    hintText:'Title',  
	    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	    returnKeyType:Titanium.UI.RETURNKEY_DONE,  
	});

	var tag_friends_button = Titanium.UI.createButton({
		value:false,
		top:100,
		left: 20,
		height:56,
		width:55,
		backgroundImage:'images/record/tag_normal.png',
		backgroundSelectedImage:'images/record/tag_pressed.png'
	});

	var location_button = Titanium.UI.createButton({
		value:false,
		top:100,
		left: 94,
		height:56,
		width:55,
		backgroundImage:'images/record/location_normal.png',
		backgroundSelectedImage:'images/record/location_pressed.png'
	});

	var add_photos_button = Titanium.UI.createButton({
		value:false,
		top:100,
		right: 94,
		height:56,
		width:55,
		backgroundImage:'images/record/addphotos_normal.png',
		backgroundSelectedImage:'images/record/addphotos_pressed.png'
	});

	var add_date_button = Titanium.UI.createButton({
		value:false,
		top:100,
		right: 20,
		height:56,
		width:55,
		backgroundImage:'images/record/date_normal.png',
		backgroundSelectedImage:'images/record/date_pressed.png'
	});
	
	var save_button = Titanium.UI.createButton({
		value:false,
		top:170,
		height:44,
		width:131,
		backgroundImage:'images/record/save_btn.png'
	});

	
	win.add(functionality_view);
	
	functionality_view.add(open);
	functionality_view.add(close);
	functionality_view.add(story_title_field);
	functionality_view.add(tag_friends_button);
	functionality_view.add(location_button);
	functionality_view.add(add_photos_button);
	functionality_view.add(add_date_button);
	functionality_view.add(save_button);
}
