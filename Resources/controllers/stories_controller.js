StoriesController = function() {
		
	function index(render) {
		App.http_client.get("http://localhost:3000/i_phone/stories.json", {}, {
			success: function(response) {
				var stories = JSON.parse(response.responseText);
				render(stories);
			},
			error: function(response) {
				alert(response.error);
			}
		});
	}
		
	return {index:index};
};
