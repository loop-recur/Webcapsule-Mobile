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
