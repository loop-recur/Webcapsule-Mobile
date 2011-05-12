Layouts.create_account = function () {

	var win = Titanium.UI.createWindow({  
	    title:'Create Account',
			backgroundImage:'images/newaccount/bg_full.png'
	});

	var first_name = Titanium.UI.createTextField({  
	    color:'#336699',
	    top:40,   
	    width:270,  
	    height:35,  
	    hintText:'First Name',  
	    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	    returnKeyType:Titanium.UI.RETURNKEY_NEXT,  
	    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
	});
	
	var last_name = Titanium.UI.createTextField({  
	    color:'#336699',
	    top:90,   
	    width:270,  
	    height:35,  
	    hintText:'Last Name',  
	    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	    returnKeyType:Titanium.UI.RETURNKEY_NEXT,  
	    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
	});

	var username = Titanium.UI.createTextField({  
	    color:'#336699',
	    top:140,   
	    width:270,  
	    height:35,  
	    hintText:'Username',  
	    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	    returnKeyType:Titanium.UI.RETURNKEY_NEXT,  
	    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
	});  
	
	var email = Titanium.UI.createTextField({  
	    color:'#336699',
	    top:190,   
	    width:270,  
	    height:35,  
	    hintText:'Enter Email',  
	    keyboardType:Titanium.UI.KEYBOARD_EMAIL,  
	    returnKeyType:Titanium.UI.RETURNKEY_NEXT,  
	    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
	});
	
	var email_confirm = Titanium.UI.createTextField({  
	    color:'#336699',
	    top:240,   
	    width:270,  
	    height:35,  
	    hintText:'Confirm Email',  
	    keyboardType:Titanium.UI.KEYBOARD_EMAIL,  
	    returnKeyType:Titanium.UI.RETURNKEY_NEXT,  
	    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
	});

	var password = Titanium.UI.createTextField({  
	    color:'#336699',
	    top:290,  
	    width:270,  
	    height:35,  
	    hintText:'Password',  
	    passwordMask:true,  
	    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	    returnKeyType:Titanium.UI.RETURNKEY_DONE,  
	    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
	});

	var password_confirm = Titanium.UI.createTextField({  
	    color:'#336699',
	    top:340,  
	    width:270,  
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
	    bottom:30,
	  	right:10,
	    width:133,  
	    height:49
	});

	create_account_button.addEventListener('click', function(){
		first_name.blur();
		last_name.blur();
		username.blur();
		email.blur();
		email_confirm.blur();
		password.blur();
		password_confirm.blur();

		// controller action
	});

	win.add(first_name);
	win.add(last_name);
	win.add(username);
	win.add(email_confirm);
	win.add(email);
	win.add(password_confirm);
	win.add(password);
	win.add(create_account_button);
	
	win.open();
};