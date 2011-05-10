describe("RepliesController", function() {
	var view, response;
	
	beforeEach(function() {
		response = {title : "Yo"};
		spyOn(Controllers.replies.db, "all");
		view = FakeView;
	});


	describe("init", function() {
		beforeEach(function() {
			TempId = { generate : function() { return "temp-123"; }};
			Controllers.replies.init(view, {story : {id : 1}});
		});
		
		it("calls the view with a new reply that has a temp id", function() {
			expect(view.render).toHaveBeenCalledWith({id:"temp-123", story_id : 1}, {story : {id : 1}});
		});
	});
	
	
	describe("create", function() {
		var old_reply, reply, response, story;
		
		beforeEach(function() {
			reply = {upload: "fake upload", story_id : 3};
			response = {upload: "fake upload", story_id : 3, id : 3};
			Controllers.replies.db.save = stubDb(response);
		});
		
		describe("valid", function() {			
		  beforeEach(function() {
				fakeSuccess = jasmine.createSpy("success");
				fakeError = jasmine.createSpy("error");
		  });
		
			it("calls save", function() {
				Controllers.replies.create(view, {reply: reply, success : fakeSuccess, error : fakeError, http_options : {progress_bar:"bar"}});
				expect(Controllers.replies.db.save).toHaveBeenCalledWith(reply,{success : fakeSuccess, error : fakeError}, {progress_bar : "bar"});
			});
		});
	});
});
