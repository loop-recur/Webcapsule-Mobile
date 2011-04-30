describe("StoriesController", function() {
	var view, bar, response;
	
	beforeEach(function() {
		response = {title : "Yo"};
		spyOn(Controllers.stories.db, "all");
		view = jasmine.createSpy("view");
	});
	
	describe("index", function() {
		beforeEach(function() {
			Controllers.stories.db.all = jasmine.createSpy().andCallFake(function(fun){ fun(response); });
			Controllers.stories.index(view);
		});
		
		it("calls the db", function() {
			expect(Controllers.stories.db.all).toHaveBeenCalledWith(view, undefined);
		});
		
		it("renders stories view with the stories", function() {
			expect(view).toHaveBeenCalledWith(response);
		});
	});
	
	
	describe("feed", function() {
		beforeEach(function() {
			Controllers.stories.db.all = jasmine.createSpy().andCallFake(function(fun){ fun(response); });
			Controllers.stories.index(view, {feed : true});
		});
		
		it("calls the db", function() {
			expect(Controllers.stories.db.all).toHaveBeenCalledWith(view, {feed : true});
		});
		
		it("renders stories view with the stories", function() {
			expect(view).toHaveBeenCalledWith(response);
		});
	});
	
	describe("show", function() {
		beforeEach(function() {
			Controllers.stories.db.find = jasmine.createSpy().andCallFake(function(id, fun){ fun(response); });
			Controllers.stories.show(view, 10);
		});
		
		it("calls the db", function() {
			expect(Controllers.stories.db.find).toHaveBeenCalledWith(10, view);
		});
		
		it("renders stories view with the stories", function() {
			expect(view).toHaveBeenCalledWith(response);
		});
	});
	
	
	describe("init", function() {
		beforeEach(function() {
			Controllers.stories.init(view);
		});
		
		it("calls the view with a new story that has a temp id", function() {
			expect(view).toHaveBeenCalledWith({id:"temp-123"});
		});
	});
	
	
	describe("create", function() {
		describe("valid", function() {
		  beforeEach(function() {
				Controllers.stories.db.save = jasmine.createSpy().andCallFake(function(obj, fun){ fun(response); });
				bar = {hide: jasmine.createSpy()};
				spyOn(FakeFile, "write");
				Controllers.stories.create(view, {story: {upload: "fake upload"}, progress:bar});
		  });

			it("calls save", function() {
			  expect(Controllers.stories.db.save).toHaveBeenCalledWith({upload: "fake upload"}, jasmine.any(Function), {progress_bar: bar});
			});
			
			it("writes the file", function() {
			  expect(FakeFile.write).toHaveBeenCalledWith("fake upload");
			});
			
			it("hides the progress bar", function() {
			  expect(bar.hide).toHaveBeenCalled();
			});
			
			it("renders the view", function() {
			  expect(view).toHaveBeenCalledWith({upload: "fake upload"}, bar);
			});
		});
	});
	
	describe("update", function() {
		describe("valid", function() {
		  beforeEach(function() {
				story = {name: "some name"};
				Controllers.stories.db.save = jasmine.createSpy().andCallFake(function(obj, fun){ fun(response); });
				spyOn(FakeFile, "write");
				Controllers.stories.update(view, {story: {name: "blah"}});
		  });

			it("calls save", function() {
			  expect(Controllers.stories.db.save).toHaveBeenCalledWith({name: "blah"}, jasmine.any(Function));
			});
		});
	});
});
