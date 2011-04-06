var win = Titanium.UI.currentWindow;  

var logo = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'images/logo.png');

var imageView = Titanium.UI.createImageView({
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
  
var loginBtn = Titanium.UI.createButton({  
    title:'Login',  
    top:210,  
    width:90,  
    height:35,  
    borderRadius:1,  
    font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}  
});  

var new_account_label = Titanium.UI.createLabel({
	text:'Create an Account',
	top: 230,
	width:150,
	height:'auto',
	color:'#616161',
	textAlign:'center'
});

new_account_label.addEventListener('click', BasicAuth.login);

win.add(imageView);
win.add(username);
win.add(password);
win.add(loginBtn);