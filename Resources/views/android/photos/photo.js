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
		width:"150dp",
		height:"150dp",
		visible: false
	});
	
	parent_win.add(view);
	
	self.close = function(v) {
		v.visible = false;
	};
	
	self.show = function(v) {
		v.visible = true;
	};
	
	return view;
};
