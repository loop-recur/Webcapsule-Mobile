var win = Titanium.UI.currentWindow;

var tag_tray = Titanium.UI.createView({
	height:317,
	backgroundImage:'../images/add_tag/tag_friends_tray.png',
});

var name = Titanium.UI.createTextField({  
    color:'#303030',
		backgroundColor:'#d6d6d6',
		borderRadius:4,
		paddingLeft:5,
    top:15,  
    width:300,  
    height:30,  
    hintText:'Search for a friend...',  
    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
    returnKeyType:Titanium.UI.RETURNKEY_DONE
});

var done_button = Titanium.UI.createButton({  
    value:false,
		backgroundImage:'../images/app_wide/ok_normal.png',
		backgroundSelectedImage:'../images/app_wide/ok_pressed.png',  
  	right:15,
		bottom:20,
    width:83,  
    height:49
});

done_button.addEventListener('click', function() {
	win.close();
});

tag_tray.add(name);
tag_tray.add(done_button);

win.add(tag_tray);