describe("CommentsController", function() {
	var view, response;
	
	beforeEach(function() {
		response = {title : "Yo"};
		spyOn(Controllers.comments.db, "all");
		view = FakeView;
	});


	describe("init", function() {
		beforeEach(function() {
			TempId = { generate : function() { return "temp-123"; }};
			Controllers.comments.init(view, {story : {id : 1}});
		});
		
		it("calls the view with a new comment that has a temp id", function() {
			expect(view.render).toHaveBeenCalledWith({id:"temp-123", story_id : 1}, {story : {id : 1}});
		});
	});
	
	
	describe("create", function() {
		var old_comment, comment, response, story;
		
		beforeEach(function() {
			old_comment = {content: "old", story_id : 3, appear_at : 2};
		  comment = {content: "blah", story_id : 3};
			response = {content: "blah", appear_at : 1, story_id : 3};
			story = {comments : [old_comment], id : 100 };
			Controllers.comments.db.save = stubDb(response);
		});
		
		describe("valid", function() {			
		  beforeEach(function() {
				fakeSuccess = jasmine.createSpy("success");
		  });
		
			it("calls save", function() {
				Controllers.comments.create(view, {comment: comment, story : story, success : fakeSuccess});
			  expect(Controllers.comments.db.save).toHaveBeenCalledWith(comment, jasmine.any(Function));
			});
		
			it("updates the story form's source", function() {
				Controllers.comments.create(view, {comment: comment, story : story, success : fakeSuccess});
			  expect(story.comments).toEqual([old_comment, response]);
			});
			
			it("calls the success", function() {
				Controllers.comments.create(view, {comment: comment, story : story, success : fakeSuccess});
			  expect(fakeSuccess).toHaveBeenCalled();
			});
		});

	});
});
