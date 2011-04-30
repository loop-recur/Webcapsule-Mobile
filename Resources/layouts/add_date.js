var win = Titanium.UI.currentWindow;

var value = new Date();

var picker = Ti.UI.createPicker({
	type:Ti.UI.PICKER_TYPE_DATE,
	maxDate:value,
	value:value
});

picker.selectionIndicator = true;

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

win.add(done_button);
win.add(picker);
