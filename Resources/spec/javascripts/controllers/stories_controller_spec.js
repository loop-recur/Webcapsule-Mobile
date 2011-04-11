describe("StoriesController", function() {
	describe("Success", function() {
		beforeEach(function() {
			App.http_client.get = jasmine.createSpy().andCallFake(function(url, params, callback) {
				callback.success({responseText:"[{\"story\": {\"title\":\"Yo\"}}]"});
			});
			StoriesController().index();
		});
		
		it("calls the server", function() {
		});
		
		it("renders stories view", function() {
		});
		
		it("gets stories", function() {
		});
	});
});