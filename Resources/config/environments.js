App.environments = {
	development: function() {
		App.isDevelopment = true;
		App.file_url = "http://localhost:3000";
		App.base_url = "http://localhost:3000/i_phone";
	},
	production: function() {
		App.file_url = "http://http://192.168.1.11:3000";
		App.base_url = "http://192.168.1.11:3000/i_phone";
	}
};
