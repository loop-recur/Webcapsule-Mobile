describe("BasicAuth", function() {
	var http_client, basic_auth, user;

  beforeEach(function() {
		http_client = {get:function(){}};
		spyOn(http_client, "get");
		basic_auth = LoopRecur.BasicAuth(http_client);
		user = basic_auth.login({username:"blah", password:"yadda"});
  });

	it("authenticates on server", function() {
		expect(false).toBeTruthy();
	});
	
	it("alerts if it can't log in", function() {
		expect(false).toBeTruthy();
	});
	
	it("return the user if it can log in", function() {
		expect(user).toBeTruthy();
	});
	
	it("encodes credentials", function() {
		expect(false).toBeTruthy();
	});
	
	it("writes credentials to disk", function() {
		expect(false).toBeTruthy();
	});
	
	it("doesn't write credentials to disk if previously saved", function() {
		expect(false).toBeTruthy();
	});

});
