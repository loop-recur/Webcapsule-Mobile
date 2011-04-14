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
		alert("in create");
		var video = params.video;
		var progress = params.progress;
		alert("write movie");
		var movieFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'mymovie.mov');
		movieFile.write(video);
		alert("post start");
		
		App.http_client.post("/stories.json", {upload:video}, {
			success: function(response) {
				Ti.API.info(response.responseText);
			},
			error: function(response) {
				alert(response.error);
			},
			progress_bar : progress
		});
		
		alert("done");
		view();
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

