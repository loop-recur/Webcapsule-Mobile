Layouts.choose_photo = function(win, photo, story) {
	Titanium.Media.openPhotoGallery({
		success:function(event)
		{
			Views.photos.init.lockDone(true);
			var image = Helpers.images.resize(event.media,375,638);
			photo.upload = image;
			App.action(win, "photos#create", {photo : photo, story: story});
		},
		cancel:function()
		{
		},
		error:function(error)
		{
		},
		allowEditing:false,
		mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
	});
};
