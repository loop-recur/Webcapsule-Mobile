describe("RepliesController", function() {
	var view, response;
	
	beforeEach(function() {
		response = {title : "Yo"};
		spyOn(Controllers.videos.db, "all");
		view = FakeView;
	});


	describe("init", function() {
		beforeEach(function() {
			TempId = { generate : function() { return "temp-123"; }};
			Controllers.videos.init(view, {story : {id : 1}});
		});
		
		it("calls the view with a new video that has a temp id", function() {
			expect(view.render).toHaveBeenCalledWith({id:"temp-123", story_id : 1}, {story : {id : 1}});
		});
	});
	
	
	describe("create", function() {
		var old_video, video, response, story;
		
		beforeEach(function() {
			video = {upload: "fake upload", story_id : 3};
			response = {upload: "fake upload", story_id : 3, id : 3};
			Controllers.videos.db.save = stubDb(response);
		});
		
		describe("valid", function() {			
		  beforeEach(function() {
				fakeSuccess = jasmine.createSpy("success");
				fakeError = jasmine.createSpy("error");
		  });
		
			it("calls save", function() {
				Controllers.videos.create(view, {video: video, success : fakeSuccess, error : fakeError, http_options : {progress_bar:"bar"}});
				expect(Controllers.videos.db.save).toHaveBeenCalledWith(video,{success : fakeSuccess, error : fakeError}, {progress_bar : "bar"});
			});
		});
	});
});
