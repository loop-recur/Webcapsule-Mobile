Views.stories.init = function(win, overlay, story) {
	
	Views.stories._form(overlay, story);

	Titanium.Media.showCamera({
		success: function(event){
			var progress = progressBar();
			story.upload = event.media;
			App.action(win, "stories#create", {story: story, progress: progress, overlay: overlay});
		},
		cancel:function(){},
		error:function(error)
		{
		},
		overlay:overlay,
		showControls:false,	// don't show system controls
		mediaTypes:Ti.Media.MEDIA_TYPE_VIDEO,
		videoQuality:Ti.Media.QUALITY_640x480,
		autohide:false 	// tell the system not to auto-hide and we'll do it ourself
	});
	
	function progressBar() {
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
};
