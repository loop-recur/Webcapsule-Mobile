Layouts.pick_date = function(win) {	
	var story = Views.stories._form.source;
	
	var view = Titanium.UI.createView({
		backgroundColor:'black',
		height:290,
		top:0,
		zIndex:90,
		opacity:.9,
		visible:false
	});
	
	Layouts.pick_date.toggle_pick_date = function(state) {
		view.visible = state;
	};
	
	var value = new Date();

	var picker = Ti.UI.createPicker({
		type:Ti.UI.PICKER_TYPE_DATE,
		maxDate:value,
		value:value,
		top:0,
		selectionIndicator:true,
		zIndex:500
	});
	
	picker.addEventListener('change',function(e) {
		var story = Views.stories._form.source;
		story.when = e.value;
	});

	var done_button = Titanium.UI.createButton({  
	    value:false,
			backgroundImage:'images/app_wide/ok_normal.png',
			backgroundSelectedImage:'images/app_wide/ok_pressed.png',  
	  	right:15,
			bottom:10,
	    width:83,  
	    height:49,
			zIndex:500
	});

	done_button.addEventListener('click', function() {
		view.hide();
		Views.stories._form.toggle_date_icon(true);
	});

	view.add(done_button);
	view.add(picker);
	win.add(view);
};
