LoopRecur.HttpClient = function(client, credentials) {
	client.onerror = function(e) { alert(e.error); };
	client.setTimeout(20000);
	
	function post(url, params, callBack) {
		setHeaders();
		client.open("POST", url);
		callBack.onload = callBack;
		client.send(params);
	}
	
	function get(url, params, callBack) {
		client.open("GET", url+queryString(params));
		setHeaders();
		callBack.onload = callBack;
		client.send();
	}
	
// private

	function queryString(params) {
		qstring = "";
		for (var key in params) {
			qstring += key + '=' + params[key] + '&';
		}
		return '?'+ qstring;
	}
	
	function setHeaders() {
	  client.setRequestHeader('Authorization', credentials);
		client.setRequestHeader("content-type", "application/json");
	}
	
	var priv_obj = {post: post, get: get};
	return priv_obj;
};
