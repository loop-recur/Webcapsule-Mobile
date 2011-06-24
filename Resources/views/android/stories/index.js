Views.stories.index = Views.extend();

Views.stories.index.template = function() {
	var self = this;

	function createTableViewRow(story) {
		
		var row = Ti.UI.createTableViewRow({
			backgroundImage:'images/feed/item_bg.png',
			height:120,
			hasChild:true
		});
		
		var image = App.file_url+story.screenshot;
		
		var photo = Titanium.UI.createImageView({
			image:image,
			left:5,
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
			left:101,
			top:5,
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
			left:100,
			top:17,
			height:"20dp",
			width:"190dp",
			text:story.name
		});
		
		var duration_icon = Titanium.UI.createImageView({
			backgroundImage:'images/feed/time_ico.png',
			left:10,
			bottom:11,
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
			left:21,
			bottom:10,
			height:"10dp",
			width:"30dp",
			text:story.duration,
			zIndex:40
		});
		
		var user_icon = Titanium.UI.createImageView({
			backgroundImage:'images/feed/user_ico.png',
			left:100,
			bottom:24,
			width:"10dp",
			height:"10dp"
		});
		
		var user = Ti.UI.createLabel({
			color:'#525252',
			font:{fontSize:11,fontWeight:'regular', fontFamily:'Helvetica Neue'},
			left:111,
			bottom:24,
			height:"10dp",
			width:"160dp",
			text:story.user.full_name
		});
		
		var videos_icon = Titanium.UI.createImageView({
			backgroundImage:'images/feed/bubble_ico.png',
			left:100,
			bottom:10,
			width:"10dp",
			height:"10dp"
		});
		
		var videos = Ti.UI.createLabel({
			color:'#525252',
			font:{fontSize:11,fontWeight:'regular', fontFamily:'Helvetica Neue'},
			left:112,
			bottom:10,
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
