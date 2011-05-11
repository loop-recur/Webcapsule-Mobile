Views.comments.init = Views.extend();

Views.comments.init.template = function() {
	var self = this;
	var story = self.params.story;
	var comment = self.source;
	var win = self.win;
	var view = Titanium.UI.createView({zIndex:30});
	
	var field = Titanium.UI.createTextField({  
	    color:'#303030',
			backgroundColor:'#d6d6d6',
			borderRadius:4,
			paddingLeft:5,
	    top:10,  
	    width:300,  
	    height:30,  
	    hintText:'Comment',  
	    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	    returnKeyType:Titanium.UI.RETURNKEY_DONE
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
	
	view.add(field);
	
	win.add(view);
};
