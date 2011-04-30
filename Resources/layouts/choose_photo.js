var win = Titanium.UI.currentWindow;

// var imageView = Titanium.UI.createImageView({
// 	height:200,
// 	width:200,
// 	top:20,
// 	left:10,
// 	backgroundColor:'#999'
// });
// 
// win.add(imageView);
// 
// var popoverView;
// var arrowDirection;
// 
// Titanium.Media.openPhotoGallery({
// 
// 	success:function(event)
// 	{
// 		var cropRect = event.cropRect;
// 		var image = event.media;
// 
// 		// set image view
// 		Ti.API.debug('Our type was: '+event.mediaType);
// 		if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
// 		{
// 			imageView.image = image;
// 		}
// 		else
// 		{
// 
// 		}
// 
// 		Titanium.API.info('PHOTO GALLERY SUCCESS cropRect.x ' + cropRect.x + ' cropRect.y ' + cropRect.y  + ' cropRect.height ' + cropRect.height + ' cropRect.width ' + cropRect.width);
// 		win.close();
// 	},
// 	cancel:function()
// 	{
// 		win.close();
// 	},
// 	error:function(error)
// 	{
// 		win.close();
// 	},
// 	allowEditing:true,
// 	popoverView:popoverView,
// 	arrowDirection:arrowDirection,
// 	mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
// });