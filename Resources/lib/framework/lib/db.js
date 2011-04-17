Db = function(name) {
	pub_obj = {};
	
	function all(callbacks) {
		var oldSuccess = callbacks.success || callbacks;
		var oldError = callbacks.error || function(){};
				
		callbacks.error = function(r) {
			oldSuccess(Cache[name]);
			oldError(r.responseText);
		};
		
		callbacks.success = function(r) {
			var json = JSON.parse(r.responseText);
			Cache[name] = json;
			oldSuccess(json);
		};
				
		callApi("get", getPath(), callbacks);
	};
	
	function find(id, callbacks) {
		var oldSuccess = callbacks.success || callbacks;
		var oldError = callbacks.error || function(){};
				
		callbacks.error = function(r) {
			var old_record = Functional.select("id == x.id".lambda().partial(id), Cache[name])[0];
			oldSuccess(old_record);
			oldError(r.responseText);
		};
		
		callbacks.success = function(r) {
			var json = JSON.parse(r.responseText);
			var old_record = Functional.select("id == x.id".lambda().partial(id), Cache[name])[0];
			old_record ? replace(Cache[name], old_record, json) : Cache[name].push(json);
			oldSuccess(json);
		};
		
		callApi("get", getPath(id), callbacks);
	};
	
	function save(obj, callbacks, options) {
		var id = obj.id;
		var oldSuccess = callbacks.success || callbacks;
		var oldError = callbacks.error || function(){};
				
		callbacks.error = function(r) {
			var old_record = Functional.select("id == x.id".lambda().partial(id), Cache[name])[0];
			old_record ? replace(Cache[name], old_record, obj) : Cache[name].push(obj);
			oldSuccess(old_record);
			oldError(r.responseText);
		};
		
		callbacks.success = function(r) {
			var json = JSON.parse(r.responseText);
			var old_record = Functional.select("id == x.id".lambda().partial(id), Cache[name])[0];
			old_record ? replace(Cache[name], old_record, json) : Cache[name].push(json);
			oldSuccess(json);
		};
		
		callApi("post", getPath(obj.id), callbacks, obj, options);
	};

	
// private

	function replace(arrayName, replaceTo, replaceWith) {
	  for(var i=0; i<arrayName.length;i++ ) { if(arrayName[i]==replaceTo) arrayName.splice(i,1,replaceWith); };
	};

	function getPath(id) {
		var base_path = "/"+name;
		if(id) base_path = base_path +"/"+id;
		return base_path+".json";
	};
	
	function callApi(method, path, callbacks, params, options) {
		params = params || {};
		options = options || {};
		options.success = function(r) { callbacks.success(r); };
		options.error = function(r) { callbacks.error(r); };
		
		App.http_client[method](path, params, options);
	};
			
	pub_obj = {
		all: all,
		find: find,
		save: save
	};
	
	return pub_obj;
};
