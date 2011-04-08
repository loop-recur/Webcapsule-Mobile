LoopRecur.HttpClient = function(client) {
	client.setTimeout(20000);
	
	function post(url, params_or_call_backs, call_backs) {
		var fixed_args = fixArgs(params_or_call_backs, call_backs);
		call_backs = fixed_args[0]
		params = fixed_args[1];
		prepare("POST", url, call_backs).send(params);
	}
	
	function get(url, params_or_call_backs, call_backs) {
		var fixed_args = fixArgs(params_or_call_backs, call_backs);
		call_backs = fixed_args[0]
		params = fixed_args[1];
		url = url+queryString(params);
		prepare("GET", url, call_backs).send();
	}
	
// private

	function fixArgs(params_or_call_backs, call_backs) {
		params = params_or_call_backs;
		if(params_or_call_backs.success) {
			call_backs = params_or_call_backs;
			params = {};
		}
		return [call_backs, params];
	}

	function prepare(method, url, call_backs) {
		client.open(method, url);
		setHeaders();
		client.onload = function() { call_backs.success(this); };
		client.onerror = function() { call_backs.error(this); };
		return client;
	}

	function queryString(params) {
		qstring = "";
		for (var key in params) {
			qstring += key + '=' + params[key] + '&';
		}
		if (qstring !== "") qstring = '?'+qstring;
		return qstring;
	}
	
	function setHeaders() {
		if(priv_obj.credentials) client.setRequestHeader('Authorization', priv_obj.credentials);
		client.setRequestHeader("content-type", "application/json");
	}
	
	var priv_obj = {post: post, get: get};
	return priv_obj;
};
