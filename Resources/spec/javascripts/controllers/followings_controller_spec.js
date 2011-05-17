describe("FollowingsController", function() {
	var view, bar, response;
	
	beforeEach(function() {
		response = [{full_name : "joe"}];
		view = FakeView;
	});
	
	describe("index", function() {
		beforeEach(function() {
			Controllers.followings.db.all = jasmine.createSpy().andCallFake(function(vw){ vw(response); });
			Controllers.followings.index(view, {});
		});
		
		it("calls the db", function() {
			expect(Controllers.followings.db.all).toHaveBeenCalledWith(jasmine.any(Function), {});
		});
		
		it("renders followings view with the followings", function() {
			expect(view.render).toHaveBeenCalledWith(response, {});
		});
	});
	
	describe("index with followees", function() {
	  beforeEach(function() {
			Controllers.followings.db.all = jasmine.createSpy().andCallFake(function(vw){ vw(response); });
			Controllers.followings.index(view, {followees : true});
		});
		
		it("calls the db", function() {
			expect(Controllers.followings.db.all).toHaveBeenCalledWith(jasmine.any(Function), {followees : true});
		});
		
		it("renders followings view with the followings", function() {
			expect(view.render).toHaveBeenCalledWith(response, {followees : true});
		});
	});
	
	
	describe("show", function() {
		beforeEach(function() {
			Controllers.followings.db.find = jasmine.createSpy().andCallFake(function(id, vw){ vw(response); });
			Controllers.followings.show(view, {id : 10});
		});
		
		it("calls the db", function() {
			expect(Controllers.followings.db.find).toHaveBeenCalledWith(10, jasmine.any(Function));
		});
		
		it("renders followings view with the followings", function() {
			expect(view.render).toHaveBeenCalledWith(response, {id : 10});
		});
	});

	describe("create", function() {
		describe("valid", function() {
			var fakeSuccess;
			
		  beforeEach(function() {
				fakeSuccess = jasmine.createSpy("fakeSuccess");
				Controllers.followings.db.save = stubDb(response);
				Controllers.followings.create(view, {friend: {id : 1}, success: fakeSuccess});
		  });
	
			it("calls save", function() {
			  expect(Controllers.followings.db.save).toHaveBeenCalled();
			});
			
			it("calls the success", function() {
			  expect(fakeSuccess).toHaveBeenCalled();
			});
		});
	});
	
	describe("destroy", function() {
		var fakeSuccess;
		
	  beforeEach(function() {
			fakeSuccess = jasmine.createSpy("fakeSuccess");
			Controllers.followings.db.destroy = stubDb(response);
			Controllers.followings.destroy(view, {friend: {id : 1}, success: fakeSuccess});
	  });

		it("calls destroy", function() {
		  expect(Controllers.followings.db.destroy).toHaveBeenCalled();
		});
		
		it("calls the success", function() {
		  expect(fakeSuccess).toHaveBeenCalled();
		});
	});
});
