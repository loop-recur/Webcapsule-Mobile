describe("PhotosController", function() {
	var view, response;
	
	beforeEach(function() {
		response = [];
		view = FakeView;
	});
	
	describe("create", function() {
		var story;
		
	  beforeEach(function() {
			App.currentUser = function(){ return {id: 1}};
			story = {photo_ids : "2,1,14"};
			response = {id : 14};
			Views.photos = { create : {source : [{id : 2, upload: "Fake Upload Two"},{id : 1, upload: "Fake Upload One"}]} };
			Controllers.photos.db.save = jasmine.createSpy().andCallFake(function(obj, fun){ fun(response); });
			Controllers.photos.create(view, {photo: {upload: "Fake Upload"}, story : story});
	  });

		it("calls save with updated photo", function() {
		  expect(Controllers.photos.db.save).toHaveBeenCalledWith({upload: "Fake Upload", story_id : undefined, user_id : 1}, jasmine.any(Function));
		});
		
		it("updates the source of the form when complete", function() {
		  expect(story).toEqual({photo_ids: "2,1,14"});
		});
		
		it("update's the view's source", function() {
		  expect(view.source[0]).toEqual({upload: "Fake Upload", story_id : undefined, user_id : 1 });
		});
					
		it("renders the view", function() {
		  expect(view.render).toHaveBeenCalled();
		});
	});
	
	describe("init", function() {
		beforeEach(function() {
			Controllers.photos.init(view, {photos : []});
		});
		
		it("calls the view with a new story that has a temp id", function() {
			expect(view.render).toHaveBeenCalledWith({id:"temp-123"}, {photos : []});
		});
	});
	
	describe("destroy", function() {
		var story; 
		
	  beforeEach(function() {
			story = {photo_ids : "1,2,"};
			Views.photos = { create : {source : [{id : 2, upload: "Fake Upload Two"},{id : 1, upload: "Fake Upload One"}]} };
			Controllers.photos.destroy(view, {photo: {id : 2, upload: "Fake Upload Two"}, story: story});
	  });
	
		it("update's the view's source", function() {
		  expect(Views.photos.create.source).toEqual([{id : 1, upload: "Fake Upload One"}]);
		});
		
		it("updates the source of the form when complete", function() {
		  expect(story).toEqual({photo_ids: "1,"});
		});
	});
	
});
