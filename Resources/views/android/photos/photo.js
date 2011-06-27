Views.photos.photo = Views.extend();

Views.photos.photo.template = function() {
	var self = this;
	var parent_win = self.params.win;
	var photo = self.source;
	
	if (Helpers.application.densityIsMedium())
	  {
	  var view_top = 0;
		var view_left = 0;
	  }
	else
	  {
		  var view_top = 0;
			var view_left = 0;
	  }
	
	var view = Titanium.UI.createImageView({
		image: Helpers.images.escape(photo.url),
		defaultImage:'images/avatar_medium.jpg',
		top:view_top,
		left:view_left,
		width:"150dp",
		height:"150dp",
		visible: false
	});
	
	parent_win.add(view);
	
	return view;
};
