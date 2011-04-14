LoopRecur.HttpClient = function(client) {
		
	function post(url, params_or_call_backs, call_backs) {
		var fixed_args = fixArgs(params_or_call_backs, call_backs);
		call_backs = fixed_args[0];
		params = fixed_args[1];
		prepare("POST", url, call_backs).send(params);
	}
	
	function get(url, params_or_call_backs, call_backs) {
		var fixed_args = fixArgs(params_or_call_backs, call_backs);
		call_backs = fixed_args[0];
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
		var progress_bar = call_backs.progress_bar;
		client.options.onsendstream = progress_bar ? function(e){ progress_bar.value = e.progress } : null;
		client.options.onload = call_backs.success;
		client.options.onerror = call_backs.error;
		client.open(method, url);
		setHeaders();
		return client;
	}

	function queryString(params) {
		var keys = [];
		for (var key in params) { keys.push([key, params[key]]); };
		var qstring = Functional.reduce("y += x[0] + '=' + x[1] + '&'".lambda(), "", keys);
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
