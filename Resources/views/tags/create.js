Views.tags.create = Views.extend();

Views.tags.create.template = function() {
	var self = this;
	Ti.API.info(self.params.story);
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
			width:60,
			height:70,
			left:0
		});
	};
	
	function makeFriends(position, friend) {
		Functional.reduce(makeFriend, 10, tags);
	};
	
	function makeFriend(position, friend) {
		var added_tag = Titanium.UI.createView({
			top:4,
			left:position,
			width:60,
			height:60
		});
		
		var added_tag_border = Titanium.UI.createView({
			width:60,
			height:60,
			backgroundImage:'images/add_tag/tag_border.png'
		});
		
		var image = Titanium.UI.createImageView({
			image:Helpers.images.escape(friend.image),
			defaultImage:'images/avatar_medium.jpg',
			width:52,
			height:54
		});
		
		var delete_button = Titanium.UI.createView({
			backgroundImage:'images/add_tag/remove_icon.png',
			right:-5,
			top: -5,
			width: 25,
			height: 25
		});
				
		delete_button.addEventListener('click', function() {
			App.action(self.view, "tags#destroy", {friend : friend, story : self.params.story});
			update();
		});
		
		added_tag.add(image);
		added_tag.add(added_tag_border);
		added_tag.add(delete_button);
		self.view.add(added_tag);
		self.view.width += 70;
		return position+70;
	};
	
};
