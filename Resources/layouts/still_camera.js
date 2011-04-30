var win = Titanium.UI.currentWindow;

// Titanium.Media.showCamera({
// 
// 	success:function(event)
// 	{
// 		var cropRect = event.cropRect;
// 		var image = event.media;
// 
// 		Ti.API.debug('Our type was: '+event.mediaType);
// 		if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
// 		{
// 			var imageView = Ti.UI.createImageView({
// 				width:win.width,
// 				height:win.height,
// 				image:event.media
// 			});
// 			win.add(imageView);
// 		}
// 		else
// 		{
// 			alert("got the wrong type back ="+event.mediaType);
// 			win.close();
// 		}
// 	},
// 	cancel:function()
// 	{
// 	},
// 	error:function(error)
// 	{
// 		if (error.code == Titanium.Media.NO_CAMERA)
// 		{
// 			alert("No camera on device");
// 			win.close();
// 		}
// 		else
// 		{
// 			alert('Camera does not appear to be working: ' + error.code);
// 			win.close();
// 		}
// 	},
// 	saveToPhotoGallery:true,
// 	allowEditing:true,
// 	mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
// });