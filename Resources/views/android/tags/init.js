Views.tags.init = Views.extend();

Views.tags.init.template = function() {
	var self = this;
	var parent_win = self.win;
	self.view = makeView();
	
	var story_tags = self.params.story_tags || [];
	
	var win = Titanium.UI.createView({
		opacity:0.9,
		zIndex:30,
		backgroundColor:'black'
	});
	
	if (Helpers.application.densityIsMedium())
	  {
		var tag_tray_top = 0;
		var available_tags_view_top = 60;
		var added_tags_view_top = 155;
		var name_top = 15;
		var activity_top = 20;
		var activity_left = 145;
		var done_button_right = 15;
		var done_button_bottom = 20;
		var makeView_left = 0;
		var makeView_top = 5;
		var available_tag_top = 4;
		var tag_name_bottom = 4;
		var added_width = 70;
		var added_tags_view_height = 80;
		var available_tags_view_height = 85;
		var available_tags_view_contentheight = 85;
		var added_tags_view_contentheight = 70;
	  }
	else
	  {
		var tag_tray_top = 0;
		var available_tags_view_top = 60;
		var added_tags_view_top = 155;
		var name_top = 15;
		var activity_top = 20;
		var activity_left = 145;
		var done_button_right = 15;
		var done_button_bottom = 20;
		var makeView_left = 0;
		var makeView_top = 5;
		var available_tag_top = 4;
		var tag_name_bottom = 4;
		var added_width = 70;
		var added_tags_view_height = 120;
		var available_tags_view_height = 125;
		var available_tags_view_contentheight = 125;
		var added_tags_view_contentheight = 110;
	  }

	var tag_tray = Titanium.UI.createView({
		height:"317dp",
		top:tag_tray_top,
		backgroundImage:'images/add_tag/tag_friends_tray.png',
		zIndex:100,
		visible:true
	});
	
	var available_tags_view = Titanium.UI.createScrollView({
		top:available_tags_view_top,
		height:available_tags_view_height,
		width:"300dp",
		contentwidth:"auto",
		contentheight:available_tags_view_contentheight,
		showHorizontalScrollIndicator:true
	});
	
	var added_tags_view = Titanium.UI.createScrollView({
		top:added_tags_view_top,
		height:added_tags_view_height,
		width:"300dp",
		contentwidth:"auto",
		contentheight:added_tags_view_contentheight,
		showHorizontalScrollIndicator:true
	});

	var name = Titanium.UI.createTextField({  
	    backgroundColor:text_field_background_color,
			color:text_field_text_color,
			borderRadius:4,
			paddingLeft:"5dp",
	    top:name_top,  
	    width:"300dp",  
	    height:"30dp",
	    hintText:'Loading Friends',  
	    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	    returnKeyType:Titanium.UI.RETURNKEY_DONE
	});
	
	name.addEventListener('change', function() {
		if(name.value.length >= 1) { update(); };
	});
	
	var activity = Titanium.UI.createActivityIndicator({
		top:activity_top, 
		left:activity_left,
		height:"20dp",
		width:"20dp",
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
	  	right:done_button_right,
			bottom:done_button_bottom,
	    width:"83dp",  
	    height:"49dp"
	});

	done_button.addEventListener('click', function() {
		(Helpers.application.isBlank(story_tags)) ? Views.stories.form.toggle_tag_icon(false) : Views.stories.form.toggle_tag_icon(true);
		win.visible = false;
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
	parent_win.add(win);
	
	
	function makeView() {
		return Titanium.UI.createView({
			width:"10dp",
			height:"100dp",
			left:makeView_left,
			top:makeView_top
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
		var val = name.value || "";
		val = val.toLowerCase();
		var isMatch = function(tag) { return (tag.label.indexOf(val) != -1); };
		
		var friends = Functional.select(isMatch, self.source);
		var taken = Helpers.array_funs.take(5, friends);
		return taken;
	};
	
	function makeFriend(position, friend) {

		var available_tag = Titanium.UI.createView({
			top:available_tag_top,
			left:position,
			width:"60dp",
			height:"60dp"
		});
		
		var tag_border = Titanium.UI.createView({
			width:"60dp",
			height:"60dp",
			backgroundImage:'images/add_tag/tag_border_dark.png'
		});
		
		var image = Titanium.UI.createImageView({
			image: friend.image,
			defaultImage:'images/avatar_medium.jpg',
			width:"52dp",
			height:"54dp"
		});
		
		var tag_name = Titanium.UI.createLabel({
			text:friend.label,
			bottom:tag_name_bottom,
			width:"52dp",
			height:"10dp",
			backgroundColor:'black',
			color:'white',
			textAlign:'center',
			font:{fontFamily:'Arial',fontWeight:'regular',fontSize:"8dp"}
		});

		available_tag.addEventListener('click', function() {
			App.action(tag_tray, "tags#create", {friend : friend, story: self.params.story});
		});
		
		available_tag.add(image);
		available_tag.add(tag_name);
		available_tag.add(tag_border);
		
		
		self.view.width += added_width;
		self.view.add(available_tag);
		return position + added_width;
	}
};
