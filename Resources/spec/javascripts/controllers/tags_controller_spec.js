describe("TagsController", function() {
	var view, response;
	
	beforeEach(function() {
		response = {user_id : 1};
		spyOn(Controllers.tags.db, "all");
		view = FakeView;
	});
	
	describe("init", function() {
		beforeEach(function() {
			Controllers.tags.init(view, {});
		});
		
		it("calls the view with a new story that has a temp id", function() {
			expect(view.render).toHaveBeenCalledWith({id:"temp-123"}, {});
		});
	});
	
});
