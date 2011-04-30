App.environments = {
	development: function() {
		App.isDevelopment = true;
		App.base_url = "http://localhost:3000/i_phone";
	},
	production: function() {
		App.base_url = "http://webcapsule.com/i_phone";
	}
}
