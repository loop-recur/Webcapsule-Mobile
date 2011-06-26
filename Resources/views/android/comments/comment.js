Views.comments.comment = Views.extend();

Views.comments.comment.template = function() {
	var self = this;
	var parent_win = self.params.win;
	var comment = self.source;

	if (Helpers.application.densityIsMedium())
	  {
	  var view_right = 0;
		var avatar_left = 0;
		var user_left = 55;
		var user_top = 0;
		var title_left = 55;
		var title_bottom = 0;
	  }
	else
	  {
	  var view_right = 0;
		var avatar_left = 0;
		var user_left = 55;
		var user_top = 0;
		var title_left = 55;
		var title_bottom = 0;
	  }

	view = Ti.UI.createView({
		height:"58dp",
		width:"265dp",
		right:view_right,
		visible: false
	});
	
	var avatar = Titanium.UI.createImageView({
		image:App.file_url+comment.user.image,
		defaultImage:'images/avatar_medium.jpg',
		left:avatar_left,
		width:"50dp",
		height:"50dp"
	});
	
	var user = Titanium.UI.createLabel({
		text: comment.user.full_name + " says:",
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:"10dp"},
		left:user_left,
		top:user_top,
		height:"15dp",
		width:'auto',
		color:'white'
	});
	
	var title = Titanium.UI.createLabel({
		text: comment.content,
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:"10dp"},
		left:title_left,
		bottom:title_bottom,
		height:"43dp",
		width:'auto',
		color:'white'
	});
	
	view.add(avatar);
	view.add(user);
	view.add(title);
	parent_win.add(view);
	
	return view;
};
