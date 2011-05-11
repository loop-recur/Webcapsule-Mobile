Views.tags.init = Views.extend();

Views.tags.init.template = function() {
	var self = this;
	
	var camera_overlay = self.win;

	var tag_tray = Titanium.UI.createView({
		height:317,
		top:0,
		backgroundImage:'images/add_tag/tag_friends_tray.png',
		opacity:0.9,
		zIndex:100,
		visible:false
	});
	
	Views.tags.init.template.toggle_tag_tray = function(state) {
		tag_tray.visible = state;
	};
	
	var available_tags_view = Titanium.UI.createScrollView({
		top:75,
		height:70,
		width:300,
		contentWidth:'auto',
		contentHeight:90,
		showHorizontalScrollIndicator:true
	});
	
	var added_tags_view = Titanium.UI.createScrollView({
		top:155,
		height:80,
		width:300,
		contentWidth:'auto',
		contentHeight:70,
		showHorizontalScrollIndicator:true
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
		if(name.value.length >= 1) { update(); };
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

	done_button.addEventListener('click', function() { Views.tags.init.template.toggle_tag_tray(false); });

	tag_tray.add(name);
	tag_tray.add(available_tags_view);
	tag_tray.add(added_tags_view);
	tag_tray.add(done_button);
	camera_overlay.add(tag_tray);
	
	
	function makeView() {
		self.view = Titanium.UI.createView({
			width:70,
			height:100,
			left:0
		});
		
		return self.view;
	};	
	
	available_tags_view.add(makeView());
	
	// Views.tags.create.win = win; I DON'T THINK I'M USING THIS
	Views.tags.create.added_tags_view = added_tags_view;
	Views.tags.create.render();
	
	function update() {
		tag_tray.remove(self.view);
		available_tags_view.add(makeView());
		makeFriends();
	};
	
	function makeFriends() {
		Functional.reduce(makeFriend, 10, foundFriends());
	};
	
	function foundFriends() {
		var matches = function(tag) {
			if(!tag.label){ tag.label = ""; };
			var label = (tag.label || "");
			return (label.toLowerCase().indexOf(name.value) != -1);
		};
		return Functional.select(matches, self.source);
	};
	
	function makeFriend(position, friend) {
		var image = Titanium.UI.createImageView({
			image:friend.image,
			defaultImage:'images/avatar_medium.jpg',
			top:0,
			left: position,
			width:60,
			height:60
		});
		
		image.addEventListener('click', function() {
			App.action(tag_tray, "tags#create", {friend : friend});
		});
		
		self.view.width += 70;
		self.view.add(image);
		return position+70;
	}
};
