Views.replies.init = Views.extend();

Views.replies.init.template = function() {
	var self = this;
	var reply = self.source;
	var win = Titanium.UI.createWindow({backgroundColor: "#ccc"});
	var progress_bar = Helpers.ui.progressBar();
	
	
	Titanium.Media.showCamera({
		success:function(event)
		{
			reply.upload = event.media;
			progress_bar.show();
			win.add(progress_bar);
			
			App.action(win, "replies#create", {
				reply : reply,
				success : function(updated_reply) {
					alert("it was uploaded!");
					win.remove(progress_bar);
				},
				error : function(errors) {
					win.remove(progress_bar);
					alert(errors);
					save_button.visible = true;
					saving_label.visible = false;
				},
				http_options : {progress_bar : progress_bar}
			});
		},
		cancel:function() {},
		error:function(error)
		{
			alert("can't show");
			win.close();
		},
		mediaTypes: Titanium.Media.MEDIA_TYPE_VIDEO,
		videoQuality:Ti.Media.QUALITY_MEDIUM
	});
	
	
	win.open();
}