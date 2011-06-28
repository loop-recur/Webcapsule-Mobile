Views.comments.init = Views.extend();

Views.comments.init.template = function() {
	var self = this;
	var story = self.params.story;
	var comment = self.source;
	var win = self.win;
	
	if (Helpers.application.densityIsMedium())
	  {
	  var view_top = 45;
		var field_top = 15;
		var ok_button_right = 15;
		var ok_button_bottom = 18;
		var cancel_button_left = 0;
		var cancel_button_top = 0;
	  }
	else
	  {
	  var view_top = 45;
		var field_top = 15;
		var ok_button_right = 25;
		var ok_button_bottom = 25;
		var cancel_button_left = 0;
		var cancel_button_top = 0;
	  }
	
	var view = Titanium.UI.createView({
		backgroundImage:'images/add_comment/add_comment.png',
		height:"148dp",
		width:"313dp",
		zIndex:30,
		top:view_top
	});
	
	var field = Titanium.UI.createTextArea({
		// backgroundColor:false,
		color:text_field_text_color,
		value:'Add Comment...',
		height:"55dp",
		width:"275dp",
		top:field_top,
		textAlign:'left',
		font:{fontSize:"12dp",fontFamily:'Helvetica Neue', fontWeight:'regular'},
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType:Titanium.UI.RETURNKEY_DONE
	});
	
	var ok_button = Titanium.UI.createButton({  
	    value:false,
			backgroundImage:'images/app_wide/ok_normal.png',
			backgroundSelectedImage:'images/app_wide/ok_pressed.png',  
	  	right:ok_button_right,
			bottom:ok_button_bottom,
	    width:"83dp",  
	    height:"49dp"
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
				view.visible = false;
			}
		});
	});
	
	ok_button.addEventListener('click', function() {
		comment.content = field.value;
		App.action(self.win, "comments#create", {
			comment : comment,
			story : story,
			success : function() {
				view.visible = false;
			}
		});
	});
	
	var cancel_button = Titanium.UI.createView({
		backgroundImage:'images/add_tag/remove_icon.png',
		left:cancel_button_left,
		top:cancel_button_top,
		width:"25dp",
		height:"25dp"
	});
	
	cancel_button.addEventListener('click', function() {
		view.visible = false;
	});
	
	view.add(ok_button);
	view.add(field);
	view.add(cancel_button);
	
	win.add(view);
};
