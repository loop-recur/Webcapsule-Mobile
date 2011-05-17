describe("PhotosController", function() {
	var view, response;
	
	beforeEach(function() {
		response = [];
		view = FakeView;
	});
	
	describe("create", function() {
	  beforeEach(function() {
			Views.stories = {_form : { source : {photo_ids : "4"}} };
			response = {id : 14};
			Controllers.photos.db.save = jasmine.createSpy().andCallFake(function(obj, fun){ fun(response); });
			Controllers.photos.create(view, {photo: {upload: "Fake Upload"}});
	  });

		it("calls save with updated photo", function() {
		  expect(Controllers.photos.db.save).toHaveBeenCalledWith({upload: "Fake Upload"}, jasmine.any(Function));
		});
		
		it("updates the source of the form when complete", function() {
		  expect(Views.stories._form.source).toEqual({photo_ids: "14,4"});
		});
		
		it("update's the view's source", function() {
		  expect(view.source[0]).toEqual({upload: "Fake Upload"});
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
	  beforeEach(function() {
			Views.photos = { create : {source : [{id : 2, upload: "Fake Upload Two"},{id : 1, upload: "Fake Upload One"}]} };
			Views.stories = {_form : { source : {photo_ids : "1,2,"}} };
			Controllers.photos.destroy(view, {photo: {id : 1, upload: "Fake Upload One"}});
	  });
	
		it("update's the view's source", function() {
		  expect(Views.photos.create.source).toEqual([{id : 2, upload: "Fake Upload Two"}]);
		});
		
		// it("updates the source of the form when complete", function() {
		//   expect(Views.stories._form.source).toEqual({photo_ids: "2,"});
		// });
	});
	
});
