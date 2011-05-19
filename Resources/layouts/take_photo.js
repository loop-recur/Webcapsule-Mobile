Layouts.take_photo = function(win, photo) {
	
	Titanium.Media.showCamera({	
		success:function(event)
		{
			Views.photos.init.lockDone(true);
			photo.upload = event.media;
			App.action(win, "photos#create", {photo : photo});
		},
		cancel:function(){
		},
		error:function(error)
		{
			alert('Camera does not appear to be working: ' + error.code);
		},
		saveToPhotoGallery:true,
		allowEditing:false,
		mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
	});	
};
