describe("FollowingsController", function() {
	var view, bar, response;
	
	beforeEach(function() {
		response = [{full_name : "joe"}];
		view = jasmine.createSpy("view");
	});
	
	describe("index", function() {
		beforeEach(function() {
			Controllers.followings.db.all = jasmine.createSpy().andCallFake(function(vw){ vw(response); });
			Controllers.followings.index(view);
		});
		
		it("calls the db", function() {
			expect(Controllers.followings.db.all).toHaveBeenCalledWith(view, undefined);
		});
		
		it("renders followings view with the followings", function() {
			expect(view).toHaveBeenCalledWith(response);
		});
	});
	
	describe("index with followees", function() {
	  beforeEach(function() {
			Controllers.followings.db.all = jasmine.createSpy().andCallFake(function(vw){ vw(response); });
			Controllers.followings.index(view, {followees : true});
		});
		
		it("calls the db", function() {
			expect(Controllers.followings.db.all).toHaveBeenCalledWith(view, {followees : true});
		});
		
		it("renders followings view with the followings", function() {
			expect(view).toHaveBeenCalledWith(response);
		});
	});
	
	
	describe("show", function() {
		beforeEach(function() {
			Controllers.followings.db.find = jasmine.createSpy().andCallFake(function(id, vw){ vw(response); });
			Controllers.followings.show(view, 10);
		});
		
		it("calls the db", function() {
			expect(Controllers.followings.db.find).toHaveBeenCalledWith(10, view);
		});
		
		it("renders followings view with the followings", function() {
			expect(view).toHaveBeenCalledWith(response);
		});
	});

	// describe("create", function() {
	// 	describe("valid", function() {
	// 	  beforeEach(function() {
	// 			Controllers.followings.create(view, {following: {} });
	// 	  });
	// 
	// 		it("calls save", function() {
	// 		  expect(Controllers.followings.db.save).toHaveBeenCalled();
	// 		});
	// 		
	// 		it("renders the view", function() {
	// 		  expect(view).toHaveBeenCalled();
	// 		});
	// 	});
	// });
});
