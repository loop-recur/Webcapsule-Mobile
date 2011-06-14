Views.comments.comment = Views.extend();

Views.comments.comment.template = function() {
	var self = this;
	var parent_win = self.params.win;
	var comment = self.source;

	view = Ti.UI.createView({
		height:58,
		width:265,
		right:0,
		visible: false
	});
	
	var avatar = Titanium.UI.createImageView({
		image:App.file_url+comment.user.image,
		defaultImage:'images/avatar_medium.jpg',
		left:0,
		width:50,
		height:50
	});
	
	var user = Titanium.UI.createLabel({
		text: comment.user.full_name + " says:",
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:10},
		left:55,
		top:0,
		height:15,
		width:'auto',
		color:'white'
	});
	
	var title = Titanium.UI.createLabel({
		text: comment.content,
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:10},
		left:55,
		bottom:0,
		height:43,
		width:'auto',
		color:'white'
	});
	
	view.add(avatar);
	view.add(user);
	view.add(title);
	parent_win.add(view);
	
	return view;
};
