Views.tags.create = Views.extend();

Views.tags.create.template = function() {
	var self = this;
	
	update();
	
	function update() {
		if(self.view) Views.tags.create.added_tags_view.remove(self.view);
		self.view = makeView();
		Views.tags.create.added_tags_view.add(self.view);
		makeFriends();
	};
	
	function makeView() {
		self.view = Titanium.UI.createView({
			width:60,
			height:70,
			left:0
		});
		return self.view;
	};
	
	function makeFriends(position, friend) {
		Functional.reduce(makeFriend, 10, (self.source || []));
	}
	
	function makeFriend(position, friend) {
		
		var thumb = Ti.UI.createView({
			top:0,
			left:position,
			height:70,
			width: 70
		});
		
		var image = Titanium.UI.createImageView({
			image:friend.image,
			defaultImage:'images/avatar_medium.jpg',
			top:0,
			left: 0,
			width:50,
			height:50
		});
		
		var delete_button = Titanium.UI.createButton({
			title:"X",
			right:3,
			top: -5,
			width: 20,
			height: 20
		});
				
		delete_button.addEventListener('click', function() {
			App.action(self.view, "tags#destroy", {friend : friend});
			update();
		});
		
		thumb.add(image);
		thumb.add(delete_button);
		self.view.add(thumb);
		self.view.width += 70;
		return position+70;
	}
	
};
