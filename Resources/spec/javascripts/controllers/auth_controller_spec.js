App.http_client = LoopRecur.HttpClient(HttpClient);

describe("AuthController", function() {
	var auth_controller, user, alerter;

  beforeEach(function() {
		spyOn(App.http_client, "get");
		spyOn(Titanium.Utils, "base64encode");
		spyOn(FakeFile, "write");
		alerter = jasmine.createSpy("Alerter");
  });

	describe("Regardless", function() {
		beforeEach(function() {
			AuthController(alerter).login("brian","password");
		});
		
		it("authenticates on server", function() {
			expect(App.http_client.get).toHaveBeenCalled();
		});

		it("encodes credentials", function() {
			expect(Titanium.Utils.base64encode).toHaveBeenCalledWith('brian:password');
		});
	});

	describe("Success", function() {
		beforeEach(function() {
			spyOn(Titanium.Filesystem, "getFile").andReturn(FakeFile);
			Titanium.Filesystem.applicationDataDirectory = "/somedir";
			App.http_client.get = jasmine.createSpy().andCallFake(function(url, params, callback) {
				if(App.http_client.credentials) callback.success({responseText:"{\"user\": {\"full_name\":\"brian\"}}"});
			});
			AuthController(alerter).login("brian","password");
		});
		
		it("return the user", function() {
			expect(App.current_user.full_name).toEqual('brian');
		});
		
		it("writes credentials to disk", function() {
			expect(Titanium.Filesystem.getFile).toHaveBeenCalledWith("/somedir", "credentials");
			expect(FakeFile.write).toHaveBeenCalled();
		});		
	});
	
	describe("Fail", function() {
		beforeEach(function() {
			App.http_client.get = jasmine.createSpy().andCallFake(function(url, params, callback) {
				callback.error({responseText:"{\"user\": {\"full_name\":\"brian\"}}"});
			});
			AuthController(alerter).login("brian","password");
		});
		
		it("alerts if it can't log in", function() {
			App.http_client.get = jasmine.createSpy('get').andCallFake(function(url, params, callback) {
				callback.error({responseText:"Wrong!"});
			});
			expect(alerter).toHaveBeenCalledWith("Invalid login");
		});
		
		it("doesn't write credentials to disk", function() {
			expect(FakeFile.write).not.toHaveBeenCalled();
		});
	});
});
