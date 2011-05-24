Views.accounts.init = Views.extend();

Views.accounts.init.template = function() {
	var self = this;
	var account = self.source;
	
	var view = Titanium.UI.createView({
		title:'Account',
		backgroundImage:'images/newaccount/bg_create_account.png'
	});
	
	var full_name = Titanium.UI.createTextField({  
	    color:'#336699',
	    top:30,   
	    width:290,  
	    height:35,  
	    hintText:'Full Name',  
	    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	    returnKeyType:Titanium.UI.RETURNKEY_NEXT,  
	    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
	});  

	full_name.addEventListener('return', function() {
		email.focus();
	});

	var email = Titanium.UI.createTextField({  
	    color:'#336699',
	    top:80,   
	    width:290,  
	    height:35,  
	    hintText:'Email',  
	    keyboardType:Titanium.UI.KEYBOARD_EMAIL,  
	    returnKeyType:Titanium.UI.RETURNKEY_NEXT,  
	    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
	});

	email.addEventListener('return', function() {
		password.focus();
	});

	var password = Titanium.UI.createTextField({  
	    color:'#336699',
	    top:130,  
	    width:290,  
	    height:35,  
	    hintText:'Password',  
	    passwordMask:true,  
	    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	    returnKeyType:Titanium.UI.RETURNKEY_NEXT,  
	    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
	});

	password.addEventListener('return', function() {
		password_confirm.focus();
	});

	var password_confirm = Titanium.UI.createTextField({  
	    color:'#336699',
	    top:180,  
	    width:290,  
	    height:35,  
	    hintText:'Confirm Password',  
	    passwordMask:true,  
	    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	    returnKeyType:Titanium.UI.RETURNKEY_DONE,  
	    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
	});

	var create_account_button = Titanium.UI.createButton({  
	    value:false,
			backgroundImage:'images/newaccount/make_account_normal.png',
			backgroundSelectedImage:'images/newaccount/make_account_pressed.png',  
	    bottom:160,
	  	right:10,
	    width:133,  
	    height:49
	});
	
	var cancel_button = Titanium.UI.createButton({  
	    value:false,
			backgroundImage:'images/newaccount/btn_cancel.png',
			backgroundSelectedImage:'images/newaccount/btn_cancel_pressed.png',  
	    bottom:160,
	  	left:10,
	    width:133,  
	    height:49
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
