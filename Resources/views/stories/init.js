Views.stories.init = {
	render : function(source, params) {
		this.source = source;
		this.params = params;
		this.template();
	}
};

Views.stories.init.template = function() {
	var self = this;
	
	Views.stories._form.render(self.source, {win: self.params.overlay});

	Titanium.Media.showCamera({
		success: function(event){
			var progress = progressBar();
			self.source.upload = event.media;
			App.action(self.win, "stories#create", {story: self.source, progress: progress});
		},
		cancel:function(){},
		error:function(error)
		{
		},
		overlay:self.params.overlay,
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
