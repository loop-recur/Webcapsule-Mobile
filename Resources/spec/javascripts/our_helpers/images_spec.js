describe("Helpers.images", function() {
	describe("escape", function() {
		beforeEach(function() {
			App.file_url = "http://testhost.com/"
		});
		
		it("appends the base file path", function() {
			expect(Helpers.images.escape("blah.png")).toEqual("http://testhost.com/blah.png");
		});
		
		it("escapes the spaces", function() {
			expect(Helpers.images.escape("some blah.png")).toEqual("http://testhost.com/some%20blah.png");
		});
		
		it("removes the cache string", function() {
			expect(Helpers.images.escape("blah.png?1231")).toEqual("http://testhost.com/blah.png");
		});
		
		it("doesn't append the url when the full path is there", function() {
			expect(Helpers.images.escape("http://twitter.com/blah.png")).toEqual("http://twitter.com/blah.png");
		});
	});
});
