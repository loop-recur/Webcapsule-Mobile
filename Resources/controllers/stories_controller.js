Controllers.stories = {
	index: function(view) {
		App.http_client.get("/stories.json", {
			success: function(response) {
				var stories = JSON.parse(response.responseText);
				view(stories);
			},
			error: function(response) {
				alert(response.error);
			}
		});
	},
	
	create: function(view, params) {
		var video = params.video;
		var progress = params.progress;
		var movieFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'mymovie.mov');
		movieFile.write(video);
		
		App.http_client.post("/stories.json", {upload:video}, {
			success: function(response) {
				Ti.API.info(response.responseText);
				progress.hide();
			},
			error: function(response) {
				alert(response.responseText);
			},
			progress_bar : progress
		});
		
		view(progress);
	},
	
	show: function(view, id) {
		App.http_client.get("/stories/"+id+".json", {
			success: function(response) {
				var stories = JSON.parse(response.responseText);
				view(stories);
			},
			error: function(response) {
				alert(response.error);
			}	
		});
	}
}

