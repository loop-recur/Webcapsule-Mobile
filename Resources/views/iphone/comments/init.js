Views.comments.init = Views.extend();

Views.comments.init.template = function() {
	var self = this;
	var story = self.params.story;
	var comment = self.source;
	var win = self.win;
	
	var view = Titanium.UI.createView({
		backgroundImage:'images/add_comment/add_comment.png',
		height:148,
		width:313,
		zIndex:30,
		top:45
	});
	
	var field = Titanium.UI.createTextArea({
		backgroundColor:false,
		color:text_field_text_color,
		value:'Add Comment...',
		height:55,
		width:275,
		top:15,
		textAlign:'left',
		font:{fontSize:12,fontFamily:'Helvetica Neue', fontWeight:'regular'},
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType:Titanium.UI.RETURNKEY_DONE
	});
	
	var ok_button = Titanium.UI.createButton({  
	    value:false,
			backgroundImage:'images/app_wide/ok_normal.png',
			backgroundSelectedImage:'images/app_wide/ok_pressed.png',  
	  	right:15,
			bottom:18,
	    width:83,  
	    height:49
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
	
	ok_button.addEventListener('click', function() {
		comment.content = field.value;
		App.action(self.win, "comments#create", {
			comment : comment,
			story : story,
			success : function() {
				win.remove(view);
			}
		});
	});
	
	var cancel_button = Titanium.UI.createView({
		backgroundImage:'images/add_tag/remove_icon.png',
		left:0,
		top: 0,
		width: 25,
		height: 25
	});
	
	cancel_button.addEventListener('click', function() {
		win.remove(view);
	});
	
	view.add(ok_button);
	view.add(field);
	view.add(cancel_button);
	
	win.add(view);
};
