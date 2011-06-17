App.environments = {
	development: function() {
		App.isDevelopment = true;
		App.file_url = "http://10.172.30.58:3000";
		App.base_url = "http://10.172.30.58:3000/i_phone";
	},
	production: function() {
		App.file_url = "http://10.172.30.58:3000";
		App.base_url = "http://10.172.30.58:3000/i_phone";
	}
};
