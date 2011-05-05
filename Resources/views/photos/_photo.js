Views.photos._photo = Views.extend();

Views.photos._photo.template = function() {
	var self = this;
	var parent_win = self.params.win;
	var photo = self.source;
	
	Titanium.API.info(App.file_url+photo.url);
	
	var view = Titanium.UI.createImageView({
		image: (App.file_url+"/"+photo.url),
		defaultImage:'images/avatar_medium.jpg',
		top:0,
		left: 0,
		width:150,
		height:150
	});
	
	parent_win.add(view);
	
	self.close = function() {
		parent_win.remove(view);
	};
	
};
