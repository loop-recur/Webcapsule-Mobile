describe("StoriesController", function() {
	var view;
	
	beforeEach(function() {
		App.http_client = LoopRecur.HttpClient(HttpClient);
		view = jasmine.createSpy("view");
	});
	
	describe("index", function() {
		beforeEach(function() {
			App.http_client.get = jasmine.createSpy().andCallFake(function(url, callback) {
				callback.success({responseText:"[{\"story\": {\"title\":\"Yo\"}}]"});
			});
			Controllers.stories.index(view);
		});
		
		it("renders stories view with the stories", function() {
			expect(view).toHaveBeenCalledWith(JSON.parse("[{\"story\": {\"title\":\"Yo\"}}]"));
		});
	});
	
	describe("show", function() {
		beforeEach(function() {
			App.http_client.get = jasmine.createSpy().andCallFake(function(url, callback) {
				callback.success({responseText:"{\"story\": {\"title\":\"Yo\"}}"});
			});
			Controllers.stories.show(view, 10);
		});
		
		it("calls the right url", function() {
			expect(App.http_client.get).toHaveBeenCalledWith("http://localhost:3000/i_phone/stories/10.json", {
		        success: jasmine.any(Function),
						error: jasmine.any(Function)
		    });
		});
		
		it("renders stories view with the stories", function() {
			expect(view).toHaveBeenCalledWith(JSON.parse("{\"story\": {\"title\":\"Yo\"}}"));
		});
	});
});