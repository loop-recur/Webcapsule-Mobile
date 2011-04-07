describe("HttpClient", function() {
	var credentials, http_client, titanium_client;

  beforeEach(function() {
		titanium_client = HttpClient;
		spyOn(titanium_client, "open"); 
		spyOn(titanium_client, "send");
		spyOn(titanium_client, 'setRequestHeader');
		http_client = LoopRecur.HttpClient(titanium_client, "encodedCredentials");
  });

	describe("POST", function(){
		beforeEach(function(){
			http_client.post("http://myurl.com", {test:"yup"}, function(){});
		});
		
		it("posts to the server", function() {	
			expect(titanium_client.open).toHaveBeenCalledWith("POST", "http://myurl.com");
			expect(titanium_client.send).toHaveBeenCalledWith({test:"yup"});
		});

		it("authenticates", function() {
			expect(titanium_client.setRequestHeader).toHaveBeenCalledWith('Authorization', 'encodedCredentials');
		});
	});
	
	describe("GET", function(){
		beforeEach(function(){
			http_client.get("http://myurl.com", {test:"yup", barf:"gross"}, function(){});
		});
		
		it("gets to the server", function() {
			expect(titanium_client.open).toHaveBeenCalledWith("GET", "http://myurl.com?test=yup&barf=gross&");
		});
		
	});
});
