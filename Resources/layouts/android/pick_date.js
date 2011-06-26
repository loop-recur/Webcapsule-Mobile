Layouts.pick_date = function(win) {	
	var story = Views.stories.form.source;
	
	if (Helpers.application.densityIsMedium())
	  {
	  var view_top = 0;
		var picker_top = 0;
		var done_button_right = 0;
		var done_button_bottom = 0;
	  }
	else
	  {
		var view_top = 0;
		var picker_top = 0;
		var done_button_right = 0;
		var done_button_bottom = 0;
	  }
	
	var view = Titanium.UI.createView({
		backgroundColor:'black',
		height:"290dp",
		top:view_top,
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
		top:picker_top,
		selectionIndicator:true,
		zIndex:500
	});
	
	picker.addEventListener('change',function(e) {
		var story = Views.stories.form.source;
		story.when = e.value;
	});

	var done_button = Titanium.UI.createButton({  
	    value:false,
			backgroundImage:'images/app_wide/ok_normal.png',
			backgroundSelectedImage:'images/app_wide/ok_pressed.png',  
	  	right:done_button_right,
			bottom:done_button_bottom,
	    width:"83dp",  
	    height:"49dp",
			zIndex:500
	});

	done_button.addEventListener('click', function() {
		view.hide();
		Views.stories.form.toggle_date_icon(true);
	});

	view.add(done_button);
	view.add(picker);
	win.add(view);
};
