App.environments = {
	development: function() {
		App.isDevelopment = true;
		App.file_url = "http://webcapsule.local";
		App.base_url = "http://webcapsule.local/i_phone";
	},
	production: function() {
		App.file_url = "http://www.webcapsule.com";
		App.base_url = "http://www.webcapsule.com/i_phone";
	}
};
