Layouts.create_account = function () {

	var win = Titanium.UI.createWindow({  
	    title:'Create Account',
			backgroundImage:'images/newaccount/bg_full.png'
	});

	var first_name = Titanium.UI.createTextField({  
	    color:'#336699',
	    top:20,   
			left:15,
	    width:140,  
	    height:35,  
	    hintText:'First Name',  
	    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	    returnKeyType:Titanium.UI.RETURNKEY_NEXT,  
	    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
	});
	
	first_name.addEventListener('return', function() {
		last_name.focus();
	});
	
	var last_name = Titanium.UI.createTextField({  
	    color:'#336699',
	    top:20, 
	  	right:15,
	    width:140,  
	    height:35,  
	    hintText:'Last Name',  
	    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	    returnKeyType:Titanium.UI.RETURNKEY_NEXT,  
	    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
	});
	
	last_name.addEventListener('return', function() {
		username.focus();
	});

	var username = Titanium.UI.createTextField({  
	    color:'#336699',
	    top:65,   
	    width:290,  
	    height:35,  
	    hintText:'Username',  
	    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	    returnKeyType:Titanium.UI.RETURNKEY_NEXT,  
	    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
	});  
	
	username.addEventListener('return', function() {
		email.focus();
	});
	
	var email = Titanium.UI.createTextField({  
	    color:'#336699',
	    top:110,   
	    width:290,  
	    height:35,  
	    hintText:'Enter Email',  
	    keyboardType:Titanium.UI.KEYBOARD_EMAIL,  
	    returnKeyType:Titanium.UI.RETURNKEY_NEXT,  
	    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
	});
	
	email.addEventListener('return', function() {
		email_confirm.focus();
	});
	
	var password = Titanium.UI.createTextField({  
	    color:'#336699',
	    top:155,  
	    width:290,  
	    height:35,  
	    hintText:'Password',  
	    passwordMask:true,  
	    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	    returnKeyType:Titanium.UI.RETURNKEY_next,  
	    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
	});

	password.addEventListener('return', function() {
		password_confirm.focus();
	});
	
	var password_confirm = Titanium.UI.createTextField({  
	    color:'#336699',
	    top:200,  
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
	    bottom:150,
	  	right:10,
	    width:133,  
	    height:49
	});
	
	var cancel_button = Titanium.UI.createButton({  
	    title:'Cancel',
  		backgroundColor:'white',
	    bottom:150,
	  	left:10,
	    width:133,  
	    height:49
	});
	
	cancel_button.addEventListener('click', function() {
		win.close();
	});

	create_account_button.addEventListener('click', function(){
		first_name.blur();
		last_name.blur();
		username.blur();
		email.blur();
		password.blur();
		password_confirm.blur();

		// controller action
	});

	win.add(first_name);
	win.add(last_name);
	win.add(username);
	win.add(email);
	win.add(password_confirm);
	win.add(password);
	win.add(create_account_button);
	win.add(cancel_button);
	
	
	win.open();
};