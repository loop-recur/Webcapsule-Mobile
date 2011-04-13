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

