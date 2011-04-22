Layouts.login = function () {

	var win = Titanium.UI.createWindow({  
	    title:'Login',
			backgroundImage:'images/login/splash-bg.png'
	});

	var username = Titanium.UI.createTextField({  
	    color:'#336699',
	    top:145,   
	    width:270,  
	    height:40,  
	    hintText:'Email',  
	    keyboardType:Titanium.UI.KEYBOARD_EMAIL,  
	    returnKeyType:Titanium.UI.RETURNKEY_NEXT,  
	    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
	});  

	var password = Titanium.UI.createTextField({  
	    color:'#336699',
	    top:195,  
	    width:270,  
	    height:40,  
	    hintText:'Password',  
	    passwordMask:true,  
	    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	    returnKeyType:Titanium.UI.RETURNKEY_DONE,  
	    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
	});

	var login_button = Titanium.UI.createButton({  
	    value:false,
			backgroundImage:'images/login/login-normal.png',
			backgroundSelectedImage:'images/login/login-pressed.png',  
	    top:245,
	  	right:10,
	    width:90,  
	    height:35,  
	    borderRadius:1,  
	    font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}  
	});

	login_button.addEventListener('click', function(){
		password.blur();
		username.blur();
		Controllers.user_sessions.create(username.value, password.value);
	});

	var new_account_label = Titanium.UI.createLabel({
		text:'Create an Account',
		top: 330,
		width:150,
		height:'auto',
		color:'#616161',
		textAlign:'center'
	});

	win.add(username);
	win.add(password);
	win.add(login_button);
	
	win.open();
};