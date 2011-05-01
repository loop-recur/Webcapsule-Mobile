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
			Controllers.stories.init(view, {overlay : true});
		});
		
		it("calls the view with a new story that has a temp id", function() {
			expect(view.render).toHaveBeenCalledWith({id:"temp-123"}, {overlay : true});
		});
	});
	
	
	describe("create", function() {
		describe("valid", function() {
		  beforeEach(function() {
				Views.stories = {_form : {} };
				Controllers.stories.db.save = jasmine.createSpy().andCallFake(function(obj, fun){ fun(response); });
				bar = {hide: jasmine.createSpy()};
				Controllers.stories.create(view, {story: {upload: "fake upload"}, progress:bar});
		  });

			it("calls save", function() {
			  expect(Controllers.stories.db.save).toHaveBeenCalledWith({upload: "fake upload"}, jasmine.any(Function), {progress_bar: bar});
			});
			
			it("updates the source of the form when complete", function() {
			  expect(Views.stories._form.source).toEqual({title: "Yo"});
			});
						
			it("hides the progress bar", function() {
			  expect(bar.hide).toHaveBeenCalled();
			});
			
			it("renders the view", function() {
			  expect(view.render).toHaveBeenCalledWith({upload: "fake upload"}, { progress : bar});
			});
		});
	});
	
	describe("update", function() {
		describe("valid", function() {
		  beforeEach(function() {
				story = {name: "some name"};
				Controllers.stories.db.save = jasmine.createSpy();
				fakeSuccess = jasmine.createSpy("success");
				fakeError = jasmine.createSpy("error");
				Controllers.stories.update(view, {story: {name: "blah"}, success : fakeSuccess, error : fakeError});
		  });

			it("calls save with the callbacks from the params", function() {
			  expect(Controllers.stories.db.save).toHaveBeenCalledWith({name: "blah"}, {success : fakeSuccess, error : fakeError});
			});
		});
	});
});
