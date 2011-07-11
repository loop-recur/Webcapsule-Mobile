Views.tags.create = Views.extend();

Views.tags.create.template = function() {
	var self = this;
	var scrollview = self.scrollview;
	
	if (Helpers.application.densityIsMedium())
	  {
	  var makeView_left = 0;
		var added_tag_top = 1;
		var tag_name_bottom = 4;
		var delete_button_left = -3;
		var delete_button_top = -3;
		var added_width = 70;
	  }
	else
	  {
		  var makeView_left = 0;
			var added_tag_top = 4;
			var tag_name_bottom = 4;
			var delete_button_left = -2;
			var delete_button_top = -2;
			var added_width = 100;
	  }
	
	update();
	
	function update() {
		if(self.view){ scrollview.remove(self.view); self.view.visible = false; };
		self.view = makeView();
		scrollview.add(self.view);
		makeFriends();
	};
	
	function makeView() {
		return Titanium.UI.createView({
			width:"60dp",
			height:"70dp",
			left:makeView_left
		});
	};
	
	function makeFriends(position, friend) {
		Functional.reduce(makeFriend, 10, self.source);
	};
	
	function makeFriend(position, friend) {
		var added_tag = Titanium.UI.createView({
			top:added_tag_top,
			left:position,
			width:"60dp",
			height:"60dp",
		});
		
		var added_tag_border = Titanium.UI.createView({
			width:"60dp",
			height:"60dp",
			backgroundImage:'images/add_tag/tag_border.png'
		});
		
		var image = Titanium.UI.createImageView({
			image:friend.image,
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
		
		var delete_button = Titanium.UI.createView({
			backgroundImage:'images/add_tag/remove_icon.png',
			left:delete_button_left,
			top:delete_button_top,
			width:"25dp",
			height:"25dp"
		});
				
		delete_button.addEventListener('click', function() {
			App.action(self.view, "tags#destroy", {friend : friend, story : self.params.story});
			update();
		});
		
		added_tag.add(image);
		added_tag.add(tag_name);
		added_tag.add(added_tag_border);
		added_tag.add(delete_button);
		self.view.add(added_tag);
		self.view.width = Helpers.application.addDp(self.view.width, added_width);
		return position + added_width;
	};
	
};
