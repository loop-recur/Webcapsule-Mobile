describe("FollowingsController", function() {
	var view, bar, response;
	
	beforeEach(function() {
		response = {title : "Yo"};
		spyOn(Controllers.followings.db, "all");
		view = jasmine.createSpy("view");
	});
	
	describe("index", function() {
		beforeEach(function() {
			Controllers.followings.db.all = jasmine.createSpy().andCallFake(function(fun){ fun(response); });
			Controllers.followings.index(view);
		});
		
		it("calls the db", function() {
			expect(Controllers.followings.db.all).toHaveBeenCalledWith(view);
		});
		
		it("renders followings view with the followings", function() {
			expect(view).toHaveBeenCalledWith(response);
		});
	});
	
	
	describe("show", function() {
		beforeEach(function() {
			Controllers.followings.db.find = jasmine.createSpy().andCallFake(function(id, fun){ fun(response); });
			Controllers.followings.show(view, 10);
		});
		
		it("calls the db", function() {
			expect(Controllers.followings.db.find).toHaveBeenCalledWith(10, view);
		});
		
		it("renders followings view with the followings", function() {
			expect(view).toHaveBeenCalledWith(response);
		});
	});
});
