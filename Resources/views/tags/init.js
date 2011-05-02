Views.tags.init = Views.extend();

Views.tags.init.template = function() {
	var self = this;
	
	var win = Titanium.UI.createWindow({
		opacity:0.9,
		backgroundColor:'black'
	});

	var tag_tray = Titanium.UI.createView({
		height:317,
		backgroundImage:'images/add_tag/tag_friends_tray.png'
	});

	// needs real scroll
	var founds_tags_view = Ti.UI.createView({
		top : 140,
		height:100,
		width: 300
	});

	var name = Titanium.UI.createTextField({  
	    color:'#303030',
			backgroundColor:'#d6d6d6',
			borderRadius:4,
			paddingLeft:5,
	    top:15,  
	    width:300,  
	    height:30,  
	    hintText:'Search for a friend...',  
	    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	    returnKeyType:Titanium.UI.RETURNKEY_DONE
	});
	
	name.addEventListener('change', function() {
		if(name.value.length >= 3) updateFriends();
	});

	var done_button = Titanium.UI.createButton({  
	    value:false,
			backgroundImage:'images/app_wide/ok_normal.png',
			backgroundSelectedImage:'images/app_wide/ok_pressed.png',  
	  	right:15,
			bottom:20,
	    width:83,  
	    height:49
	});

	done_button.addEventListener('click', function() { win.close(); });

	tag_tray.add(name);
	tag_tray.add(done_button);

	win.add(tag_tray);
	win.add(founds_tags_view);

	win.open();
	
	function updateFriends() {
		Functional.reduce(makeFriends, 10, foundFriends());
	};
	
	function foundFriends() {
		return self.source;
		var val = name.value.toString();
		return Functional.select('x y -> y.match(x)'.lambda().partial(val), self.source);
	};
	
	function makeFriends(position, friend) {
		var image = Titanium.UI.createImageView({
			image:friend.image,
			defaultImage:'images/avatar_medium.jpg',
			top:0,
			left: position,
			width:50,
			height:50
		});
		
		image.addEventListener('click', function() {
			App.action(win, "tags#create", {friend : friend});
		});
		
		founds_tags_view.add(image);
		return position+60;
	}

};
