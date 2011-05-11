describe("Controllers.user_sessions", function() {
  beforeEach(function() {
		App.http_client = LoopRecur.HttpClient(HttpClient);
		spyOn(App.http_client, "get");
		spyOn(Titanium.Utils, "base64encode");
		spyOn(FakeFile, "write");
		spyOn(FakeFile, "deleteFile");
		Layouts.login = jasmine.createSpy("login");
		Layouts.site = jasmine.createSpy("site");
  });

	describe("Create", function() {
		beforeEach(function() {
			Controllers.user_sessions.create("brian","password");
		});
		
		it("authenticates on server", function() {
			expect(App.http_client.get).toHaveBeenCalled();
		});

		it("encodes credentials", function() {
			expect(Titanium.Utils.base64encode).toHaveBeenCalledWith('brian:password');
		});
		
		it("calls the right url", function() {
			expect(App.http_client.get).toHaveBeenCalledWith("/accounts.json", {
				success: jasmine.any(Function),
				error: jasmine.any(Function)
		  });
		});

		describe("Success", function() {
			beforeEach(function() {
				spyOn(Titanium.Filesystem, "getFile").andReturn(FakeFile);
				Titanium.Filesystem.applicationDataDirectory = "/somedir";
				App.http_client.get = jasmine.createSpy().andCallFake(function(url, callback) {
					if(App.http_client.credentials) {
						callback.success({responseText:"{\"full_name\":\"brian\"}"});
					};
				});
				Controllers.user_sessions.create("brian","password");
			});
		
			it("sets the user", function() {
				expect(App.current_user.full_name).toEqual('brian');
			});
		
			it("calls the site", function() {
				expect(Layouts.site).toHaveBeenCalled();
			});
		
			it("writes credentials to disk", function() {
				expect(Titanium.Filesystem.getFile).toHaveBeenCalledWith("/somedir", "credentials");
				expect(FakeFile.write).toHaveBeenCalled();
			});		
		});
	
		describe("Fail", function() {
			beforeEach(function() {
				App.http_client.get = jasmine.createSpy().andCallFake(function(url, callback) {
					callback.error({responseText:"Wrong!"});
				});
				Controllers.user_sessions.alerter = jasmine.createSpy("Alerter");
				Controllers.user_sessions.create("brian","password");
			});
		
			it("alerts if it can't log in", function() {
				expect(Controllers.user_sessions.alerter).toHaveBeenCalledWith("Invalid login");
			});
		
			it("doesn't write credentials to disk", function() {
				expect(FakeFile.write).not.toHaveBeenCalled();
			});
		});
	});

	describe("Destroy", function() {

		describe("Success", function() {
			beforeEach(function() {
				Controllers.user_sessions.create("brian","password");
			});
			
			it("deletes credentials from disk", function() {
				Controllers.user_sessions.destroy();
				expect(FakeFile.deleteFile).toHaveBeenCalled();
			});
		
			it("clears the authstring cache from the http client", function() {
		  	
			});
		
			it("calls the login", function() {
				Controllers.user_sessions.destroy();
				expect(Layouts.login).toHaveBeenCalled();
			});
		
		});
	});
});
