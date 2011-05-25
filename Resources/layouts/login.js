Layouts.login = function () {

	var win = Titanium.UI.createWindow({  
	    title:'Login',
			backgroundImage:'images/login/bg_login.png'
	});

	var username = Titanium.UI.createTextField({  
	    color:'#336699',
	    top:100,   
	    width:250,  
	    height:35, 
	    hintText:'Email',  
	    keyboardType:Titanium.UI.KEYBOARD_EMAIL,  
	    returnKeyType:Titanium.UI.RETURNKEY_NEXT,  
	    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
	});  
	
	username.addEventListener('return', function() {
		password.focus();
	});

	var password = Titanium.UI.createTextField({  
	    color:'#336699',
	    top:142,  
	    width:250,  
	    height:35,  
	    hintText:'Password',  
	    passwordMask:true,  
	    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	    returnKeyType:Titanium.UI.RETURNKEY_GO,  
	    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
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
	    top:197,
	  	right:10,
	    width:133,  
	    height:49  
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
	    bottom:135,
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
	    bottom:75,
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
		bottom:30,
		width:150,
		height:40,
		color:'gray',
		textAlign:'center',
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:10}
	});

	new_account_label.addEventListener('click', function() {
		App.action(win, "accounts#init");
	});
	
	var deauth_label = Titanium.UI.createLabel({
		text:'Deauth',
		bottom:5,
		width:150,
		height:40,
		color:'gray',
		textAlign:'center',
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:10}
	});

	deauth_label.addEventListener('click', function() {
		b = new BirdHouse({consumer_key: "CgIDnN8kDKPu1uKhMK5Qg", consumer_secret: "AULwvohyIehfXfPUaKAaEifYRtzlDuOIo80qHQVRnyI", callback_url: "http://webcapsule.com"});
		alert("deauthing");
		b.deauthorize();
	});
	

	win.add(username);
	win.add(password);
	win.add(login_button);
	win.add(facebook_login);
	win.add(twitter_login);
	win.add(new_account_label);
	win.add(deauth_label);
	
	win.open();
};