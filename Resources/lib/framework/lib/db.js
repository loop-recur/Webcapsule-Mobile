Db = function(name) {
	pub_obj = {};
	
	function all(callbacks, params, options) {
	
		var oldSuccess = callbacks.success || callbacks;
		var oldError = callbacks.error || function(){};
				
		callbacks.error = function(r) {
			oldSuccess(Cache[name]);
			if(r) oldError(r.responseText);
		};
		
		callbacks.success = function(r) {
			var json = JSON.parse(r.responseText);
			Cache[name] = json;
			oldSuccess(json);
		};
		
		callApi("get", getPath(), callbacks, params, options);
	};
	
	function find(id, callbacks, options) {
		var oldSuccess = callbacks.success || callbacks;
				
		callbacks.error = function(r) {
			var old_record = Functional.select("id == x.id".lambda().partial(id), Cache[name])[0];
			oldSuccess(old_record);
		};
		
		callbacks.success = function(r) {
			var json = JSON.parse(r.responseText);
			var old_record = Functional.select("id == x.id".lambda().partial(id), Cache[name])[0];
			old_record ? Helpers.array_funs.replace(Cache[name], old_record, json) : Cache[name].unshift(json);
			oldSuccess(json);
		};
		
		callApi("get", getPath(id), callbacks, {}, options);
	};
	
	function save(obj, callbacks, options) {
		var id = obj.id;
		var oldSuccess = callbacks.success || callbacks;
		var oldError = callbacks.error || function(){};
				
		callbacks.error = function(r) {
			if(r) {
				oldError(r.responseText);
			} else {
				if(Cache[name]) {
					var old_record = Functional.select("id == x.id".lambda().partial(id), Cache[name])[0];
					old_record ? Helpers.array_funs.replace(Cache[name], old_record, obj) : Cache[name].unshift(obj);
				}
				oldSuccess(old_record);
			}
		};
		
		callbacks.success = function(r) {
			var json = JSON.parse(r.responseText);
			if(Cache[name]) {
				var old_record = Functional.select("id == x.id".lambda().partial(id), Cache[name])[0];
				old_record ? Helpers.array_funs.replace(Cache[name], old_record, json) : Cache[name].unshift(json);
			}
			oldSuccess(json);
		};
		
		callApi("post", getPath(obj.id), callbacks, obj, options);
	};
	
	function destroy(obj, callbacks, options) {
		var id = obj.id;
		var oldSuccess = callbacks.success || callbacks;
		var oldError = callbacks.error || function(){};
				
		callbacks.error = function(r) {
			if(r) {
				oldError(r.responseText);
			} else {
				if(Cache[name]) {
					var old_record = Functional.select("id == x.id".lambda().partial(id), Cache[name])[0];
					if(old_record){ Helpers.array_funs.remove(Cache[name], old_record); };
				}
				oldSuccess(old_record);
			}
		};
		
		callbacks.success = function(r) {
			var json = JSON.parse(r.responseText);
			if(Cache[name]) {
				var old_record = Functional.select("id == x.id".lambda().partial(id), Cache[name])[0];
				if(old_record){ Helpers.array_funs.remove(Cache[name], old_record); };
			}
			oldSuccess(json);
		};
		
		callApi("destroy", getPath(obj.id), callbacks, obj, options);
	};

	
// private

	function getPath(id) {
		var base_path = "/"+name;
		if(id && !TempId.isTemp(id)) base_path = base_path +"/"+id;
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
		save: save,
		destroy: destroy
	};
	
	return pub_obj;
};
