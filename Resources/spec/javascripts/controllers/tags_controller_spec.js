describe("TagsController", function() {
	var view, response;
	
	beforeEach(function() {
		response = [];
		view = FakeView;
		view.finishLoading = jasmine.createSpy("finishLoading");
	});
	
	describe("init", function() {
		beforeEach(function() {
			Controllers.tags.db.all = jasmine.createSpy().andCallFake(function(fun){ fun(response); });
			Controllers.tags.init(view, {});
		});
		
		it("calls the view with a new tag", function() {
			expect(view.render).toHaveBeenCalledWith(response, {});
		});
		
		it("finishes loading", function() {
		  expect(view.finishLoading).toHaveBeenCalled();
		});
	});
	
	describe("create", function() {
		var story;
		
	  beforeEach(function() {
			story = {tag_ids : "4"};
			response = {id : 14};
			Views.tags = { create : {source : [{id : '15', name : "Bob"}, {id : '4', name : "Joe"}]} };
			Controllers.tags.db.save = jasmine.createSpy().andCallFake(function(obj, fun){ fun(response); });
			Controllers.tags.create(view, {friend: {label: "Jimmy Dean"}, story: story});
	  });

		it("calls save with updated tag", function() {
		  expect(Controllers.tags.db.save).toHaveBeenCalledWith({label: "Jimmy Dean", name: "Jimmy Dean"}, jasmine.any(Function));
		});
		
		it("updates the source of the form when complete", function() {
		  expect(story.tag_ids).toEqual("4,14");
		});
		
		it("update's the view's source", function() {
		  expect(view.source[0]).toEqual({label: "Jimmy Dean", name: "Jimmy Dean"});
		});
					
		it("renders the view", function() {
		  expect(view.render).toHaveBeenCalled();
		});
	});
	
	describe("destroy", function() {
		var story;
		
	  beforeEach(function() {
			Views.tags = { create : {source : [{id : '15', name : "Bob"}, {id : '4', name : "Joe"}]} };
			story = {tag_ids : "4,15,"};
			Controllers.tags.destroy(view, {friend: {id : '15', name : "Bob"}, story: story});
	  });
	
		it("update's the view's source", function() {
		  expect(Views.tags.create.source).toEqual([{id : '4', name : "Joe"}]);
		});
		
		it("updates the source of the form when complete", function() {
		  expect(story).toEqual({tag_ids: "4,"});
		});
	});
	
});
