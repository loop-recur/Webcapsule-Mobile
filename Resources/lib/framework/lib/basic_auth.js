LoopRecur.BasicAuth = function(http_client) {
	
	function login() {
		http_client.get("http://webcapsule.local/i_phone/accounts.json", {}, function(e){
			
			if(error) {
				alert("You can't login");
			} else {
				return this.responseText;
			}
		});
	}
	
	var priv_obj = {login: login};
	return priv_obj;
};
