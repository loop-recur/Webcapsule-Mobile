Helpers.images = {};

Helpers.images.escape = function(url) {
	if(url.match(/^http/)){ return url; };
	return App.file_url+escape(url.split("?")[0]);
};
