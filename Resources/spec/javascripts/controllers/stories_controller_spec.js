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
		
		it("calls the right url", function() {
			expect(App.http_client.get).toHaveBeenCalledWith("/stories.json", {
		        success: jasmine.any(Function),
						error: jasmine.any(Function)
		    });
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
			expect(App.http_client.get).toHaveBeenCalledWith("/stories/10.json", {
		        success: jasmine.any(Function),
						error: jasmine.any(Function)
		    });
		});
		
		it("renders stories view with the stories", function() {
			expect(view).toHaveBeenCalledWith(JSON.parse("{\"story\": {\"title\":\"Yo\"}}"));
		});
	});
	
	describe("create", function() {
		describe("valid", function() {
		  beforeEach(function() {
		    App.http_client.post = jasmine.createSpy().andCallFake(function(url, params, callback) {
					callback.success({responseText:"{\"story\": {\"title\":\"Yo\"}}"});
				});
				Controllers.stories.create(view, {video: "fake video"});
		  });
		
			it("calls the right url", function() {
				expect(App.http_client.post).toHaveBeenCalledWith("/stories.json", {video: "fake video"}, {
			        success: jasmine.any(Function),
							error: jasmine.any(Function)
			    });
			});
			
			it("renders the view", function() {
			  expect(view).toHaveBeenCalled();
			});
		});
	});
});
