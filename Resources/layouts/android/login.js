Layouts.login = function () {

	var win = Titanium.UI.createWindow({  
			backgroundImage:'images/login/bg_login.png'
	});
	
		if (Helpers.application.densityIsMedium())
		  {
		  var username_top = 100;
			var password_top = 142;
			var login_button_top = 185;
			var login_button_right = 10;
			var facebook_login_bottom = 135;
			var twitter_login_bottom = 75; 
			var new_account_label_bottom = 30;
		  }
		else
		  {
	  	var username_top = 155;
			var password_top = 225;
			var login_button_top = 310;
			var login_button_right = 30;
			var facebook_login_bottom = 360;
			var twitter_login_bottom = 270; 
			var new_account_label_bottom = 210;
		  }
		
	var username = Titanium.UI.createTextField({  
	    backgroundColor:text_field_background_color,
			color:text_field_text_color,	
			paddingLeft:"5dp",
			borderRadius:4,
	    width:"250dp",  
	    height:"35dp", 
	    hintText:'Email',  
	    keyboardType:Titanium.UI.KEYBOARD_EMAIL,  
	    returnKeyType:Titanium.UI.RETURNKEY_NEXT,
			top:username_top
	});
	
	username.addEventListener('return', function() {
		password.focus();
	});

	var password = Titanium.UI.createTextField({  
    	backgroundColor:text_field_background_color,
			color:text_field_text_color,		
	    top:password_top,  
	    width:"250dp",  
	    height:"35dp",
			paddingLeft:"5dp",  
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
			top:login_button_top,
	  	right:login_button_right,
	    width:"133dp",  
	    height:"49dp",
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
	    bottom:facebook_login_bottom,
	    width:"182dp",  
	    height:"44dp"
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
	    bottom:twitter_login_bottom,
	    width:"182dp",  
	    height:"44dp"
	});

	twitter_login.addEventListener('click', function(){
		Helpers.user.connectTwitter(function(user) {
			Layouts.site();
		});
	});

	var new_account_label = Titanium.UI.createLabel({
		text:'Create a New Account',
		bottom:new_account_label_bottom,
		width:"150dp",
		height:"40dp",
		color:'gray',
		textAlign:'center',
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:"11dp"}
	});

	new_account_label.addEventListener('click', function() {
		App.action(win, "accounts#init");
	});
	// 
	// var deauth = Titanium.UI.createLabel({
	// 	text:'Deauth',
	// 	bottom:4,
	// 	width:"150dp",
	// 	height:"40dp",
	// 	color:'gray',
	// 	textAlign:'center',
	// 	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:"16dp"}
	// });
	// 
	// deauth.addEventListener('click', function() {
	// 	alert("deauthing");
	// 	b = new BirdHouse({consumer_key: "CgIDnN8kDKPu1uKhMK5Qg", consumer_secret: "AULwvohyIehfXfPUaKAaEifYRtzlDuOIo80qHQVRnyI", callback_url: "/webcapsule-mobile://" });
	// 	b.deauthorize();
	// });
	
	facebook_logout = Titanium.Facebook.createLoginButton({bottom: 4});

	win.add(username);
	win.add(password);
	win.add(login_button);
	win.add(facebook_login);
	win.add(facebook_logout);
	win.add(twitter_login);
	win.add(new_account_label);
	// win.add(deauth);

	
	win.open();
};