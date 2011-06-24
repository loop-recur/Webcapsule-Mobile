Views.tags.create = Views.extend();

Views.tags.create.template = function() {
	var self = this;
	var scrollview = self.scrollview;
	var tags = self.source || [];
	
	update();
	
	function update() {
		if(self.view){ scrollview.remove(self.view); };
		self.view = makeView();
		scrollview.add(self.view);
		makeFriends();
	};
	
	function makeView() {
		return Titanium.UI.createView({
			width:"60dp",
			height:"70dp",
			left:0
		});
	};
	
	function makeFriends(position, friend) {
		Functional.reduce(makeFriend, 10, tags);
	};
	
	function makeFriend(position, friend) {
		var added_tag = Titanium.UI.createView({
			top:1,
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
			bottom:4,
			width:"52dp",
			height:"10dp",
			backgroundColor:'black',
			color:'white',
			textAlign:'center',
			font:{fontFamily:'Arial',fontWeight:'regular',fontSize:"8dp"}
		});
		
		var delete_button = Titanium.UI.createView({
			backgroundImage:'images/add_tag/remove_icon.png',
			left:-5,
			top: -5,
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
		self.view.width += 70;
		return position + 70;
	};
	
};
