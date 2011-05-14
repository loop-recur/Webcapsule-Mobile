Views.comments.init = Views.extend();

Views.comments.init.template = function() {
	var self = this;
	var story = self.params.story;
	var comment = self.source;
	var win = self.win;
	var view = Titanium.UI.createView({
		height:100,
		width:300,
		zIndex:30,
		top:45
	});
	
	var field = Titanium.UI.createTextArea({
		value:'Add Comment...',
		height:100,
		width:300,
		color:'#303030',
		backgroundColor:'#d6d6d6',
		textAlign:'left',
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType:Titanium.UI.RETURNKEY_DONE
	});
	
	field.addEventListener('focus', function() {
		if(field.value === "Add Comment...") { field.value = ""; }
	});

	field.addEventListener('return', function() {
		comment.content = field.value;
		App.action(self.win, "comments#create", {
			comment : comment,
			story : story,
			success : function() {
				win.remove(view);
			}
		});
	});
	
	var cancel_button = Titanium.UI.createLabel({
		text:'Cancel',
		height:30,
		width:70,
		bottom:0,
		right:0,
		zIndex:31,
		color:'black'
	});
	
	cancel_button.addEventListener('click', function() {
		win.remove(view);
	});
	
	view.add(field);
	view.add(cancel_button);
	
	win.add(view);
};
