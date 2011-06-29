Views.accounts.init = Views.extend();

Views.accounts.init.template = function() {
	var self = this;
	var account = self.source;
	
	var view = Titanium.UI.createView({
		backgroundImage:'images/newaccount/bg_create_account.png'
	});
	
	if (Helpers.application.densityIsMedium())
	  {
	  var full_name_top = 40;
		var email_top = 90;
		var password_top = 140;
		var password_confirm_top = 190;
		var create_account_button_bottom = 160;
		var create_account_button_right = 10;
		var cancel_button_bottom = 160;
		var cancel_button_left = 10;
	  }
	else
	  {
		var full_name_top = 40;
		var email_top = 115;
		var password_top = 190;
		var password_confirm_top = 265;
		var create_account_button_bottom = 355;
		var create_account_button_right = 15;
		var cancel_button_bottom = 355;
		var cancel_button_left = 15;
	  }
	
	var full_name = Titanium.UI.createTextField({  
  		backgroundColor:text_field_background_color,
			color:text_field_text_color,
	    paddingLeft:"5dp",
			top:full_name_top,   
	    width:"290dp",  
	    height:"35dp",  
	    hintText:'Full Name',  
	    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	    returnKeyType:Titanium.UI.RETURNKEY_NEXT,  
	    borderRadius:4
	});  

	full_name.addEventListener('return', function() {
		email.focus();
	});

	var email = Titanium.UI.createTextField({  
	    backgroundColor:text_field_background_color,
			color:text_field_text_color,
	    paddingLeft:"5dp",
			top:email_top,   
	    width:"290dp",  
	    height:"35dp",  
	    hintText:'Email',  
	    keyboardType:Titanium.UI.KEYBOARD_EMAIL,  
	    returnKeyType:Titanium.UI.RETURNKEY_NEXT,  
	    borderRadius:4
	});

	email.addEventListener('return', function() {
		password.focus();
	});

	var password = Titanium.UI.createTextField({  
	    backgroundColor:text_field_background_color,
			color:text_field_text_color,
	    top:password_top,
			paddingLeft:"5dp", 
	    width:"290dp",  
	    height:"35dp",  
	    hintText:'Password',  
	    passwordMask:true,  
	    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	    returnKeyType:Titanium.UI.RETURNKEY_NEXT,  
	    borderRadius:4
	});

	password.addEventListener('return', function() {
		password_confirm.focus();
	});

	var password_confirm = Titanium.UI.createTextField({  
	    backgroundColor:text_field_background_color,
			color:text_field_text_color,
	    paddingLeft:"5dp",
			top:password_confirm_top,  
	    width:"290dp",  
	    height:"35dp",  
	    hintText:'Confirm Password',  
	    passwordMask:true,  
	    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	    returnKeyType:Titanium.UI.RETURNKEY_DONE,  
	    borderRadius:4
	});

	var create_account_button = Titanium.UI.createButton({  
	    value:false,
			backgroundImage:'images/newaccount/make_account_normal.png',
			backgroundSelectedImage:'images/newaccount/make_account_pressed.png',  
	    bottom:create_account_button_bottom,
	  	right:create_account_button_right,
	    width:"133dp",  
	    height:"49dp"
	});
	
	var cancel_button = Titanium.UI.createButton({  
	    value:false,
			backgroundImage:'images/newaccount/btn_cancel.png',
			backgroundSelectedImage:'images/newaccount/btn_cancel_pressed.png',  
	    bottom:cancel_button_bottom,
	  	left:cancel_button_left,
	    width:"133dp",  
	    height:"49dp"
	});

	cancel_button.addEventListener('click', function() {
		self.win.remove(view);
	});

	create_account_button.addEventListener('click', function(){
		full_name.blur();
		email.blur();
		password.blur();
		password_confirm.blur();
		
		account.full_name = full_name.value;
		account.email = email.value;
		account.password = password.value;
		account.password_confirm = password_confirm.value;

		App.action(view, "accounts#create", {
			account : account,
			success : function() {
				alert("You've created an account.  Please log in.");
				self.win.remove(view);
			}
		});
	});

	view.add(full_name);
	view.add(email);
	view.add(password_confirm);
	view.add(password);
	view.add(create_account_button);
	view.add(cancel_button);


	self.win.add(view);
};
