Helpers.images = {};

Helpers.images.escape = function(url) {
	if(!url) return;
	if(url.match(/^http/)){ return url; };
	return App.file_url+escape(url.split("?")[0]);
};


Helpers.images.resize = function(image, width, height) {
	var imageView = Titanium.UI.createImageView({
           image:image,
           width:width,
           height:height
       });

  return imageView.toImage();
}