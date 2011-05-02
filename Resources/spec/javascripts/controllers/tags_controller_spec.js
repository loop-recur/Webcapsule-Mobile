describe("TagsController", function() {
	var view, response;
	
	beforeEach(function() {
		response = [];
		view = FakeView;
	});
	
	describe("init", function() {
		beforeEach(function() {
			Controllers.tags.db.all = jasmine.createSpy().andCallFake(function(fun){ fun(response); });
			Controllers.tags.init(view, {});
		});
		
		it("calls the view with a new tag", function() {
			expect(view.render).toHaveBeenCalledWith(response);
		});
	});
	
	describe("create", function() {
	  beforeEach(function() {
			Views.stories = {_form : { source : {tag_ids : "4"}} };
			response = {id : 14};
			Controllers.tags.db.save = jasmine.createSpy().andCallFake(function(obj, fun){ fun(response); });
			Controllers.tags.create(view, {friend: {label: "Jimmy Dean"}});
	  });

		it("calls save with updated tag", function() {
		  expect(Controllers.tags.db.save).toHaveBeenCalledWith({label: "Jimmy Dean", name: "Jimmy Dean"}, jasmine.any(Function));
		});
		
		it("updates the source of the form when complete", function() {
		  expect(Views.stories._form.source).toEqual({tag_ids: "14,4"});
		});
		
		it("update's the view's source", function() {
		  expect(view.source[0]).toEqual({label: "Jimmy Dean", name: "Jimmy Dean"});
		});
					
		it("renders the view", function() {
		  expect(view.render).toHaveBeenCalled();
		});
	});
	
	describe("destroy", function() {
	  beforeEach(function() {
			Views.tags = { create : {source : [{id : '4', name : "Joe"}, {id : '14', name : "Bob"}]} };
			Views.stories = {_form : { source : {tag_ids : "14,4,"}} };
			Controllers.tags.destroy(view, {friend: {id : '14', name : "Bob"}});
	  });
	
		it("update's the view's source", function() {
		  expect(Views.tags.create.source).toEqual([{id : '4', name : "Joe"}]);
		});
		
		it("updates the source of the form when complete", function() {
		  expect(Views.stories._form.source).toEqual({tag_ids: "4,"});
		});
	});
	
});
