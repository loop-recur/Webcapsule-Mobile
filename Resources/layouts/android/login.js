Layouts.login = function () {

	var win = Titanium.UI.createWindow({  
	    title:'Login',
			backgroundImage:'images/login/bg_login.png'
	});

	var username = Titanium.UI.createTextField({  
	    backgroundColor:text_field_background_color,
			color:text_field_text_color,
	    top:100,
			paddingLeft:5,
			borderRadius:4,
	    width:250,  
	    height:35, 
	    hintText:'Email',  
	    keyboardType:Titanium.UI.KEYBOARD_EMAIL,  
	    returnKeyType:Titanium.UI.RETURNKEY_NEXT,  
	});
	
	username.addEventListener('return', function() {
		password.focus();
	});

	var password = Titanium.UI.createTextField({  
    	backgroundColor:text_field_background_color,
			color:text_field_text_color,		
	    top:142,  
	    width:250,  
	    height:35,
			paddingLeft:5,  
	    hintText:'Password',  
	    passwordMask:true,  
	    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	    returnKeyType:Titanium.UI.RETURNKEY_GO,  
			borderRadius:4,
		});
	
	password.addEventListener('return', function(){
		password.blur();
		username.blur();
		Controllers.user_sessions.create(username.value, password.value);
	});
	
	var login_button = Titanium.UI.createButton({  
	    value:false,
			backgroundImage:'images/login/login-normal.png',
			backgroundSelectedImage:'images/login/login-pressed.png',   
			top:207,
	  	right:10,
	    width:133,  
	    height:49,
			id:'login_button'
	});

	login_button.addEventListener('click', function(){
		password.blur();
		username.blur();
		Controllers.user_sessions.create(username.value, password.value);
	});


	var facebook_login = Titanium.UI.createButton({  
	    value:false,
			backgroundImage:'images/login/login-facebook.png',
			backgroundSelectedImage:'images/login/login-facebook-down.png',  
	    top:280,
	    width:182,  
	    height:44
	});

	facebook_login.addEventListener('click', function(){
		Helpers.user.connectFacebook(function(user) {
			Layouts.site();
		});
	});
	
	var twitter_login = Titanium.UI.createButton({  
	    value:false,
			backgroundImage:'images/login/twitter.png',
			backgroundSelectedImage:'images/login/twitter-down.png',  
	    top:335,
	    width:182,  
	    height:44
	});

	twitter_login.addEventListener('click', function(){
		Helpers.user.connectTwitter(function(user) {
			Layouts.site();
		});
	});

	var new_account_label = Titanium.UI.createLabel({
		text:'Create a New Account',
		top:380,
		width:150,
		height:40,
		color:'gray',
		textAlign:'center',
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:10}
	});

	new_account_label.addEventListener('click', function() {
		App.action(win, "accounts#init");
	});

	win.add(username);
	win.add(password);
	win.add(login_button);
	win.add(facebook_login);
	win.add(twitter_login);
	win.add(new_account_label);

	
	win.open();
};