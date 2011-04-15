Layouts.login = function () {

	var win = Titanium.UI.createWindow({  
	    title:'Login',
	    backgroundColor:'#fff'
	});

	var logo = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'images/logo.png');

	var image_view = Titanium.UI.createImageView({
		image:logo,
		width:304,
		height:89,
		top:10
	});

	var username = Titanium.UI.createTextField({  
	    color:'#336699',  
	    top:110,  
	    left:10,  
	    width:300,  
	    height:40,  
	    hintText:'Username',  
	    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	    returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,  
	    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
	});  

	var password = Titanium.UI.createTextField({  
	    color:'#336699',  
	    top:160,  
	    left:10,  
	    width:300,  
	    height:40,  
	    hintText:'Password',  
	    passwordMask:true,  
	    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	    returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,  
	    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
	});

	var login_button = Titanium.UI.createButton({  
	    title:'Login',  
	    top:210,  
	    width:90,  
	    height:35,  
	    borderRadius:1,  
	    font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}  
	});

	login_button.addEventListener('click', function(){
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

	win.add(image_view);
	win.add(username);
	win.add(password);
	win.add(login_button);
	
	win.open();
};