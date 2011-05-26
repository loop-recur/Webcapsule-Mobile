Helpers.ui = {};

Helpers.ui.progressBar = function() {
	var bar = Titanium.UI.createProgressBar({
		width:240,
		top:10,
		height:0,
		min:0,
		max:1,
		value:0,
		style:Titanium.UI.iPhone.ProgressBarStyle.PLAIN,
		color:'black'
	});	
	
	bar.show();
	return bar;
};

Helpers.ui.confirm = function(title, callbacks) {
	if (!callbacks.cancel) callbacks.cancel = function() {};
	var alert = Titanium.UI.createAlertDialog({ 
		title:title, 
		message: "Are you sure?", 
		buttonNames: ['Yes', 'Cancel'], 
		cancel:1 
	});
	
	alert.addEventListener('click', function(e) { 
		if (e.cancel === e.index || e.cancel === true) {return;}
		(e.index === 0) ? callbacks.yes() : callbacks.cancel();
	});
		
	alert.show();
};

Helpers.ui.spinner = function(position_obj) {
	
	var activity = Titanium.UI.createActivityIndicator({
		top:position_obj.top, 
		left:position_obj.left,
		style:style
	});
	
	activity.show();
	return activity;
};


