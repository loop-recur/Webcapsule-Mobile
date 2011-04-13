Views.proof = function() {
	var win = Titanium.UI.createWindow({  
	    title:'Proof',
	    backgroundColor:'#fff'
	}); 

	var basicSwitch = Titanium.UI.createSwitch({
		value:false,
		top:10,
		backgroundImage:'images/sharestory/handle.png',
		icon:'images/sharestory/handle.png',
		image:'images/sharestory/handle.png'
	});

	var shareButton = Titanium.UI.createButton({
		value:false,
		top:50,
		height:44,
		width:131,
		backgroundImage:'images/sharestory/share_btn.png'
	});

	// BUTTON GROUP ON RECORD PAGE 

	var uploadButton = Titanium.UI.createButton({
		value:false,
		top:100,
		left:20,
		height:110,
		width:128,
		backgroundImage:'images/record/upload_btn.png'
	});

	var recordButton = Titanium.UI.createButton({
		value:false,
		top:100,
		right:20,
		height:110,
		width:128,
		backgroundImage:'images/record/record_btn.png'
	});

	var tagFriendsButton = Titanium.UI.createButton({
		value:false,
		top:250,
		left: 20,
		height:56,
		width:55,
		backgroundImage:'images/record/tag_normal.png',
		backgroundSelectedImage:'images/record/tag_pressed.png'
	});

	var locationButton = Titanium.UI.createButton({
		value:false,
		top:250,
		left: 94,
		height:56,
		width:55,
		backgroundImage:'images/record/location_normal.png',
		backgroundSelectedImage:'images/record/location_pressed.png'
	});

	var addPhotosButton = Titanium.UI.createButton({
		value:false,
		top:250,
		right: 94,
		height:56,
		width:55,
		backgroundImage:'images/record/addphotos_normal.png',
		backgroundSelectedImage:'images/record/addphotos_pressed.png'
	});

	var addDateButton = Titanium.UI.createButton({
		value:false,
		top:250,
		right: 20,
		height:56,
		width:55,
		backgroundImage:'images/record/date_normal.png',
		backgroundSelectedImage:'images/record/date_pressed.png'
	});
	

	addDateButton.addEventListener('click', function()
	{
		var insideWindow = Ti.UI.createWindow({
	    backgroundColor:'black',
	    borderWidth:2,
	    borderColor:'#999',
	    height:400,
	    width:300,
	    borderRadius:10,
	    opacity:0.92,
			right:-320,
	    // transform:t
	  });

		var closeButton = Titanium.UI.createButton({
			title:'close',
			top:10,
			right: 10,
			height:45,
			width:105,
		});

		closeButton.addEventListener("click", function(){
			insideWindow.close();
		});
		
		var minDate = new Date();
		minDate.setFullYear(2009);
		minDate.setMonth(0);
		minDate.setDate(1);

		var maxDate = new Date();
		maxDate.setFullYear(2009);
		maxDate.setMonth(11);
		maxDate.setDate(31);

		var value = new Date();
		value.setFullYear(2009);
		value.setMonth(0);
		value.setDate(1);

		var picker = Ti.UI.createPicker({
			type:Ti.UI.PICKER_TYPE_DATE,
			minDate:minDate,
			maxDate:maxDate,
			value:value
		});

		// turn on the selection indicator (off by default)
		// picker.selectionIndicator = true;
		// 
		// 		var label = Ti.UI.createLabel({
		// 			text:'Choose a date',
		// 			top:6,
		// 			width:'auto',
		// 			height:'auto',
		// 			textAlign:'center',
		// 			color:'white'
		// 		});
		// 
		// 		picker.addEventListener('change',function(e)
		// 		{
		// 			label.text = e.value;
		// 		});
		// 
		// 		var locale = false;
		// 		var localebutton = Ti.UI.createButton({
		// 			title:'Change locale',
		// 			bottom:20,
		// 			width:200,
		// 			height:40
		// 		});
		// 		localebutton.addEventListener('click', function() {
		// 			if (!locale) {
		// 				picker.setLocale('ru');
		// 				locale = true;
		// 			}
		// 			else {
		// 				locale = false;
		// 				picker.setLocale(Titanium.Platform.locale);
		// 			}
		// 		});
		
		
		// insideWindow.add(label);
		// insideWindow.add(localebutton);
		insideWindow.add(picker);
		insideWindow.add(closeButton);
	  insideWindow.open();
		
		// use inline style
		insideWindow.animate({right:-320, duration:300}, function()
		{
			insideWindow.animate({right:0, left:-320, duration:500}, function()
			{
				insideWindow.animate({right:0, left:0, duration:500});
			});
		});
	});
	
	

	// BUTTON GROUP ON RECORD PAGE 

	win.add(basicSwitch);
	win.add(shareButton);

	win.add(recordButton);
	win.add(uploadButton);

	win.add(tagFriendsButton);
	win.add(locationButton);
	win.add(addPhotosButton);
	win.add(addDateButton);
	win.open();
}
