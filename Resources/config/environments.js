App.environments = {
	development: function() {
		App.isDevelopment = true;
		App.file_url = "http://10.0.2.2:3000";
		App.base_url = "http://10.0.2.2:3000/i_phone";
	},
	production: function() {
		App.file_url = "http://webcapsule.com";
		App.base_url = "http://webcapsule.com/i_phone";
	}
};
