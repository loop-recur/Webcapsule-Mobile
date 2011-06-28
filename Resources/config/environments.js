App.environments = {
	development: function() {
		App.isDevelopment = true;
		App.file_url = "http://www.webcapsule.com";
		App.base_url = "http://www.webcapsule.com/i_phone";
	},
	production: function() {
		App.file_url = "http://192.168.1.11:3000";
		App.base_url = "http://192.168.1.11:3000/i_phone";
	}
};
