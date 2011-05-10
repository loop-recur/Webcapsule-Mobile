App.environments = {
	development: function() {
		App.isDevelopment = true;
		App.file_url = "http://localhost:3000";
		App.base_url = "http://localhost:3000/i_phone";
	},
	production: function() {
		App.file_url = "http://webcapsule.com";
		App.base_url = "http://webcapsule.com/i_phone";
	}
};
