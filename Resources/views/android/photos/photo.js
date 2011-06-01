Views.photos.photo = Views.extend();

Views.photos.photo.template = function() {
	var self = this;
	var parent_win = self.params.win;
	var photo = self.source;
	
	var view = Titanium.UI.createImageView({
		image: Helpers.images.escape(photo.url),
		defaultImage:'images/avatar_medium.jpg',
		top:0,
		left:0,
		width:150,
		height:150
	});
	
	parent_win.add(view);
	
	self.close = function() {
		parent_win.remove(view);
	};
	
};

Views.photos.photo.close = function(){};