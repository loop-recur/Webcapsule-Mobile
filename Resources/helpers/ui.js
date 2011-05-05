Helpers.ui = {};

Helpers.ui.progressBar = function() {
	return Titanium.UI.createProgressBar({
		width:200,
		height:40,
		min:0,
		max:1,
		value:0,
		style:Titanium.UI.iPhone.ProgressBarStyle.PLAIN,
		top:30,
		message:'Uploading',
		font:{fontSize:12, fontWeight:'bold'},
		color:'black'
	});	
};
