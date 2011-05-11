Views.comments._comment = Views.extend();

Views.comments._comment.template = function() {
	var self = this;
	var parent_win = self.params.win;
	var comment = self.source;
	
	view = Ti.UI.createView({
		height:100,
		width:300,
		backgroundColor:'#fff'
	});
	
	var title = Titanium.UI.createLabel({
		text: comment.content,
		height:'auto',
		color:'#616161',
		textAlign:'center'
	});
	
	view.add(title);
	parent_win.add(view);
	
	self.close = function() {
		parent_win.remove(view);
	};
};
