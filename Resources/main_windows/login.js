var win = Titanium.UI.currentWindow;

var logo = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'images/logo.png');

var imageView = Titanium.UI.createImageView({
	image:logo,
	width:304,
	height:89,
	top:10
});

var new_account_label = Titanium.UI.createLabel({
	text:'Create an Account',
	top: 230,
	width:150,
	height:'auto',
	color:'#616161',
	textAlign:'center'
});

new_account_label.addEventListener('click', function()
{
	Titanium.UI.createAlertDialog({title:"Doh!", message:"I don't do anything yet. Sorry. :("}).show();
});

win.add(imageView);
win.add(new_account_label);
