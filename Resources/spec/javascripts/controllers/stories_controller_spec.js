describe("StoriesController", function() {
	var view, bar, response;
	
	beforeEach(function() {
		response = {title : "Yo"};
		spyOn(Controllers.stories.db, "all");
		view = FakeView;
	});
	
	describe("index", function() {
		beforeEach(function() {
			Controllers.stories.db.all = jasmine.createSpy().andCallFake(function(fun){ fun(response); });
			Controllers.stories.index(view);
		});
		
		it("calls the db", function() {
			expect(Controllers.stories.db.all).toHaveBeenCalledWith(jasmine.any(Function), undefined);
		});
		
		it("renders stories view with the stories", function() {
			expect(view.render).toHaveBeenCalledWith(response);
		});
	});
	
	
	describe("feed", function() {
		beforeEach(function() {
			Controllers.stories.db.all = jasmine.createSpy().andCallFake(function(fun){ fun(response); });
			Controllers.stories.index(view, {feed : true});
		});
		
		it("calls the db", function() {
			expect(Controllers.stories.db.all).toHaveBeenCalledWith(jasmine.any(Function), {feed : true});
		});
		
		it("renders stories view with the stories", function() {
			expect(view.render).toHaveBeenCalledWith(response);
		});
	});
	
	describe("show", function() {
		beforeEach(function() {
			Controllers.stories.db.find = jasmine.createSpy().andCallFake(function(id, fun){ fun(response); });
			Controllers.stories.show(view, {id : 10});
		});
		
		it("calls the db", function() {
			expect(Controllers.stories.db.find).toHaveBeenCalledWith(10, jasmine.any(Function));
		});
		
		it("renders stories view with the stories", function() {
			expect(view.render).toHaveBeenCalledWith(response);
		});
	});
	
	
	describe("init", function() {
		beforeEach(function() {
			TempId = { generate : function() { return "temp-123"; }};
			Controllers.stories.init(view, {overlay : true});
		});
		
		it("calls the view with a new story that has a temp id", function() {
			expect(view.render).toHaveBeenCalledWith({id:"temp-123"}, {overlay : true});
		});
	});
	
	
	describe("edit", function() {
		describe("valid", function() {
		  beforeEach(function() {
				Views.stories = {_form : {} };
				Controllers.stories.db.save = jasmine.createSpy().andCallFake(function(obj, fun){ fun(response); });
				Controllers.stories.edit(view, {story: {upload: "fake upload"}});
		  });
			
			it("renders the view", function() {
			  expect(view.render).toHaveBeenCalledWith({upload: "fake upload"});
			});
		});
	});
	
	describe("update", function() {
		beforeEach(function() {
		  story = {name: "some name"};
			response = {name: "blah", id : 1};
			Views.stories = {_form : { source : story} };
			Controllers.stories.db.save = stubDb(response);
		});
		
		describe("valid", function() {
			var fakeSuccess;
			
		  beforeEach(function() {
				fakeSuccess = jasmine.createSpy("success");
		  });
		
			it("updates the form's source", function() {
				Controllers.stories.update(view, {story: {name: "blah"}, success : fakeSuccess});
			  expect(Views.stories._form.source).toEqual({name: "blah", id : 1});
			});

			it("calls save", function() {
				Controllers.stories.update(view, {story: {name: "blah"}});
			  expect(Controllers.stories.db.save).toHaveBeenCalledWith({name: "blah"}, {success : jasmine.any(Function), error : undefined}, {});
			});
			
			it("calls success if there is one", function() {
				Controllers.stories.update(view, {story: {name: "blah"}, success : fakeSuccess});
			  expect(fakeSuccess).toHaveBeenCalled();
			});
			
			it("sets the progress bar if there is one", function() {
				Controllers.stories.update(view, {story: {name: "blah"}, http_options : {progress_bar:"bar"}});
				expect(Controllers.stories.db.save).toHaveBeenCalledWith({name: "blah"},{success : jasmine.any(Function), error : undefined}, {progress_bar : "bar"});
			});
		});
		
		describe("invalid", function() {
			var fakeError;
			
		  beforeEach(function() {
				fakeError = jasmine.createSpy("error");
		  });
		
			it("calls the error callback if there is one", function() {
				Controllers.stories.update(view, {story: {name: "blah"}, error : fakeError});
			 	expect(fakeError).toHaveBeenCalled();
			});
		});
	});
});
