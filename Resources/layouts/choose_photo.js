Layouts.choose_photo = function(win, photo) {	
	var popoverView;
	var arrowDirection;
	
	Titanium.Media.openPhotoGallery({
		success:function(event)
		{
			Views.photos.init.lockDone(true);
			photo.upload = event.media;
			App.action(win, "photos#create", {photo : photo});
		},
		cancel:function()
		{
		},
		error:function(error)
		{
		},
		allowEditing:false,
		popoverView:popoverView,
		arrowDirection:arrowDirection,
		mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
	});
};
