var win = Titanium.UI.currentWindow;  
// 
// var logo = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'images/logo.png');
// 
// var imageView = Titanium.UI.createImageView({
// 	image:logo,
// 	width:304,
// 	height:89,
// 	top:10
// });
//   
// var username = Titanium.UI.createTextField({  
//     color:'#336699',  
//     top:110,  
//     left:10,  
//     width:300,  
//     height:40,  
//     hintText:'Username',  
//     keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
//     returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,  
//     borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
// });  
//   
// var password = Titanium.UI.createTextField({  
//     color:'#336699',  
//     top:160,  
//     left:10,  
//     width:300,  
//     height:40,  
//     hintText:'Password',  
//     passwordMask:true,  
//     keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
//     returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,  
//     borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
// });
//   
// var loginBtn = Titanium.UI.createButton({  
//     title:'Login',  
//     top:210,  
//     width:90,  
//     height:35,  
//     borderRadius:1,  
//     font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}  
// });
// 
// loginBtn.addEventListener('click', function(){
// 	AuthController(alert).login(username.value, password.value);
// });
// 
// var new_account_label = Titanium.UI.createLabel({
// 	text:'PROOF',
// 	top: 330,
// 	width:150,
// 	height:'auto',
// 	color:'#616161',
// 	textAlign:'center'
// });
// 
// win.add(imageView);
// win.add(username);
// win.add(password);
// win.add(loginBtn);


var basicSwitch = Titanium.UI.createSwitch({
	value:false,
	top:10,
	backgroundImage:'../images/sharestory/handle.png'
});

var shareButton = Titanium.UI.createButton({
	value:false,
	top:50,
	height:44,
	width:131,
	backgroundImage:'../images/sharestory/share_btn.png'
});

var uploadButton = Titanium.UI.createButton({
	value:false,
	top:100,
	left:20,
	height:110,
	width:128,
	backgroundImage:'../images/record/upload_btn.png'
});

var recordButton = Titanium.UI.createButton({
	value:false,
	top:100,
	right:20,
	height:110,
	width:128,
	backgroundImage:'../images/record/record_btn.png'
});

// BUTTON GROUP ON RECORD PAGE 

var tagFriendsButton = Titanium.UI.createButton({
	value:false,
	top:250,
	left: 20,
	height:56,
	width:55,
	backgroundImage:'../images/record/tag_normal.png',
	backgroundSelectedImage:'../images/record/tag_pressed.png'
});

var locationButton = Titanium.UI.createButton({
	value:false,
	top:250,
	left: 94,
	height:56,
	width:55,
	backgroundImage:'../images/record/location_normal.png',
	backgroundSelectedImage:'../images/record/location_pressed.png'
});

var addPhotosButton = Titanium.UI.createButton({
	value:false,
	top:250,
	right: 94,
	height:56,
	width:55,
	backgroundImage:'../images/record/addphotos_normal.png',
	backgroundSelectedImage:'../images/record/addphotos_pressed.png'
});

var addDateButton = Titanium.UI.createButton({
	value:false,
	top:250,
	right: 20,
	height:56,
	width:55,
	backgroundImage:'../images/record/date_normal.png',
	backgroundSelectedImage:'../images/record/date_pressed.png'
});

// BUTTON GROUP ON RECORD PAGE 

win.add(basicSwitch);
win.add(shareButton);

win.add(recordButton);
win.add(uploadButton);

win.add(tagFriendsButton);
win.add(locationButton);
win.add(addPhotosButton);
win.add(addDateButton);