Views.stories.index = Views.extend();

Views.stories.index.template = function() {
	var self = this;

	function createTableViewRow(story) {
		
		if (Helpers.application.densityIsMedium())
		  {
			var row_height = 120;
		  var photo_left = 5;
			var date_top = 5;
			var date_left = 101;
			var title_left = 100;
			var title_top = 17;
			var duration_icon_left = 10;
			var duration_icon_bottom = 11;
			var duration_left = 21;
			var duration_bottom = 10;
			var user_icon_left = 100;
			var user_icon_bottom = 24;
			var user_left = 111;
			var user_bottom = 24;
			var videos_icon_left = 100;
			var videos_icon_bottom = 10;
			var videos_left = 112;
			var videos_bottom = 10;
		  }
		else
		  {
			var row_height = 120;
		  var photo_left = 5;
			var date_top = 5;
			var date_left = 101;
			var title_left = 100;
			var title_top = 17;
			var duration_icon_left = 10;
			var duration_icon_bottom = 11;
			var duration_left = 21;
			var duration_bottom = 10;
			var user_icon_left = 100;
			var user_icon_bottom = 24;
			var user_left = 111;
			var user_bottom = 24;
			var videos_icon_left = 100;
			var videos_icon_bottom = 10;
			var videos_left = 112;
			var videos_bottom = 10;
		  }
		
		var row = Ti.UI.createTableViewRow({
			backgroundImage:'images/feed/item_bg.png',
			height:row_height,
			hasChild:true
		});
		
		var image = App.file_url+story.screenshot;
		
		var photo = Titanium.UI.createImageView({
			image:image,
			left:photo_left,
			width:"90dp",
			height:"64dp",
			borderRadius:10
		});
		
		var date = Ti.UI.createLabel({
			color:'#6b6b6b',
			font:{
				fontFamily:'Helvetica Neue',
				fontSize:9,
				fontWeight:'regular'
			},
			left:date_left,
			top:date_top,
			height:"15dp",
			width:"70dp",
			text: story.when
		});
		
		var title = Ti.UI.createLabel({
			color:'#6b6b6b',
			font:{
				fontFamily:'Helvetica Neue',
				fontSize:14,
				fontWeight:'bold'
			},
			left:title_left,
			top:title_top,
			height:"20dp",
			width:"190dp",
			text:story.name
		});
		
		var duration_icon = Titanium.UI.createImageView({
			backgroundImage:'images/feed/time_ico.png',
			left:duration_icon_left,
			bottom:duration_icon_bottom,
			width:"10dp",
			height:"10dp",
			zIndex:40
		});
		
		var duration = Ti.UI.createLabel({
			color:'white',
			font:{
				fontFamily:'Helvetica Neue',
				fontSize:10,
				fontWeight:'bold'
			},			
			left:duration_left,
			bottom:duration_bottom,
			height:"10dp",
			width:"30dp",
			text:story.duration,
			zIndex:40
		});
		
		var user_icon = Titanium.UI.createImageView({
			backgroundImage:'images/feed/user_ico.png',
			left:user_icon_left,
			bottom:user_icon_bottom,
			width:"10dp",
			height:"10dp"
		});
		
		var user = Ti.UI.createLabel({
			color:'#525252',
			font:{fontSize:11,fontWeight:'regular', fontFamily:'Helvetica Neue'},
			left:user_left,
			bottom:user_bottom,
			height:"10dp",
			width:"160dp",
			text:story.user.full_name
		});
		
		var videos_icon = Titanium.UI.createImageView({
			backgroundImage:'images/feed/bubble_ico.png',
			left:videos_icon_left,
			bottom:videos_icon_bottom,
			width:"10dp",
			height:"10dp"
		});
		
		var videos = Ti.UI.createLabel({
			color:'#525252',
			font:{fontSize:11,fontWeight:'regular', fontFamily:'Helvetica Neue'},
			left:videos_left,
			bottom:videos_bottom,
			height:"10dp",
			width:"140dp",
			text:story.views + " views"
		});

		row.id = story.id;

		row.add(duration);
		row.add(user);		
		row.add(videos);
		row.add(duration_icon);
		row.add(user_icon);
		row.add(videos_icon);
		
		row.add(date);
		row.add(title);
		row.add(photo);
		return row;
	}

	var data = Functional.map(createTableViewRow, self.source);
	var tableview = Titanium.UI.createTableView({ 
		data:data
	 });

	tableview.addEventListener('click', function(e) {
		Layouts.story(e.rowData.id);
	});
	
	self.win.add(tableview);
};
