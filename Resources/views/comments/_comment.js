Views.comments._comment = Views.extend();

Views.comments._comment.template = function() {
	var self = this;
	var parent_win = Views.stories._show_form.comment_bar;
	var comment = self.source;

	view = Ti.UI.createView({
		height:58,
		width:265,
		right:0,
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
	
	self.close = function() {
		parent_win.remove(view);
	};
};

Views.comments._comment.close = function(){};