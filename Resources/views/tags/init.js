Views.tags.init = Views.extend();

Views.tags.init.template = function() {
	var self = this;
	self.view = makeView();
	
	var story_tags = self.params.story_tags || [];
	
	var win = Titanium.UI.createWindow({
		opacity:0.9,
		backgroundColor:'black'
	});

	var tag_tray = Titanium.UI.createView({
		height:317,
		top:0,
		backgroundImage:'images/add_tag/tag_friends_tray.png',
		zIndex:100,
		visible:true
	});
	
	var available_tags_view = Titanium.UI.createScrollView({
		top:60,
		height:85,
		width:300,
		contentWidth:"auto",
		contentHeight:85,
		showHorizontalScrollIndicator:true
	});
	
	var added_tags_view = Titanium.UI.createScrollView({
		top:155,
		height:80,
		width:300,
		contentWidth:"auto",
		contentHeight:70,
		showHorizontalScrollIndicator:true
	});

	var name = Titanium.UI.createTextField({  
	    backgroundColor:text_field_background_color,
			color:text_field_text_color,
			borderRadius:4,
			paddingLeft:5,
	    top:15,  
	    width:300,  
	    height:30,  
	    hintText:'Loading Friends',  
	    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	    returnKeyType:Titanium.UI.RETURNKEY_DONE
	});
	
	name.addEventListener('change', function() {
		if(name.value.length >= 1) { update(); };
	});
	
	var activity = Titanium.UI.createActivityIndicator({
		top:20, 
		left:145,
		height:20,
		width:20,
		zIndex: 20,
		style:Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
	});
	
	activity.show();
	
	self.finishLoading = function() {
		makeFriends();
		activity.hide();
		name.hintText = "Search for a friend...";
	};

	var done_button = Titanium.UI.createButton({  
	    value:false,
			backgroundImage:'images/app_wide/ok_normal.png',
			backgroundSelectedImage:'images/app_wide/ok_pressed.png',  
	  	right:15,
			bottom:20,
	    width:83,  
	    height:49
	});

	done_button.addEventListener('click', function() {
		(Helpers.application.isBlank(story_tags)) ? Views.stories._form.toggle_tag_icon(false) : Views.stories._form.toggle_tag_icon(true);
		win.close();
	});
	
	available_tags_view.add(self.view);
	
	Views.tags.create.scrollview = added_tags_view;
	Views.tags.create.render(story_tags, {story: self.params.story});

	tag_tray.add(name);
	tag_tray.add(activity);
	tag_tray.add(available_tags_view);
	tag_tray.add(added_tags_view);
	tag_tray.add(done_button);
	win.add(tag_tray);
	win.open();
	
	
	function makeView() {
		return Titanium.UI.createView({
			width:10,
			height:100,
			left:0,
			top:5
		});
	};	
	
	function update() {
		available_tags_view.remove(self.view);
		self.view = makeView();
		makeFriends();
		available_tags_view.add(self.view);
	};
	
	function makeFriends() {
		var found = foundFriends();
		Functional.reduce(makeFriend, 10, found);
	};
	
	function foundFriends() {
		var val = name.value.toLowerCase();
		var isMatch = function(tag) { return (tag.label.indexOf(val) != -1); };
		
		var friends = Functional.select(isMatch, self.source);
		var taken = Helpers.array_funs.take(5, friends);
		return taken;
	};
	
	function makeFriend(position, friend) {

		var available_tag = Titanium.UI.createView({
			top:4,
			left:position,
			width:60,
			height:60
		});
		
		var tag_border = Titanium.UI.createView({
			width:60,
			height:60,
			backgroundImage:'images/add_tag/tag_border_dark.png'
		});
		
		var image = Titanium.UI.createImageView({
			image: friend.image,
			defaultImage:'images/avatar_medium.jpg',
			width:52,
			height:54
		});
		
		var tag_name = Titanium.UI.createLabel({
			text:friend.label,
			bottom:4,
			width:52,
			height:10,
			backgroundColor:'black',
			color:'white',
			textAlign:'center',
			font:{fontFamily:'Arial',fontWeight:'regular',fontSize:8}
		});

		available_tag.addEventListener('click', function() {
			App.action(tag_tray, "tags#create", {friend : friend, story: self.params.story});
		});
		
		available_tag.add(image);
		available_tag.add(tag_name);
		available_tag.add(tag_border);
		
		
		self.view.width += 70;
		self.view.add(available_tag);
		return position+70;
	}
};
