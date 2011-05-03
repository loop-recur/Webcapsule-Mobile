Layouts.pick_date = function(story) {	
	var win = Titanium.UI.createWindow({
		opacity:0.9,
		backgroundColor:'black'
	});
	
	var value = new Date();

	var picker = Ti.UI.createPicker({
		type:Ti.UI.PICKER_TYPE_DATE,
		maxDate:value,
		value:value,
		selectionIndicator : true
	});

	var done_button = Titanium.UI.createButton({  
	    value:false,
			backgroundImage:'images/app_wide/ok_normal.png',
			backgroundSelectedImage:'images/app_wide/ok_pressed.png',  
	  	right:15,
			bottom:20,
	    width:83,  
	    height:49
	});

	done_button.addEventListener('click', function() {
		story.when = picker.value;
		App.action(win, "stories#update", {story : story});
		win.close({opacity:0, duration:500});
	});

	win.add(done_button);
	win.add(picker);
	win.open({fullscreen:true});
};
