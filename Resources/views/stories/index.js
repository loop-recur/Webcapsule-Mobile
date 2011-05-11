Views.stories.index = Views.extend();

Views.stories.index.template = function() {
	var self = this;

	function createTableViewRow(story) {
		var story_row_info_from_bottom = 21;
		
		var row = Ti.UI.createTableViewRow({
			backgroundImage:'images/feed/item_bg.png',
			height:80,
			width:320,
			hasChild:true
		});
		
		var image = App.file_url+story.screenshot;
		
		var photo = Titanium.UI.createImageView({
			image:image,
			left:5,
			width:70,
			height:45
		});
		
		var title = Ti.UI.createLabel({
			color:'#3D3D3D',
			font:{fontSize:14,fontWeight:'bold', fontFamily:'Helvetica Neue'},
			left:80,
			top:12,
			height:30,
			width:200,
			text:story.name
		});
		
		var duration_icon = Titanium.UI.createImageView({
			backgroundImage:'images/feed/time_ico.png',
			left:79,
			bottom:story_row_info_from_bottom,
			width:10,
			height:10
		});
		
		var duration = Ti.UI.createLabel({
			color:'#525252',
			font:{fontSize:11,fontWeight:'regular', fontFamily:'Helvetica Neue'},
			left:90,
			bottom:story_row_info_from_bottom,
			height:10,
			width:30,
			text:story.duration
		});
		
		var user_icon = Titanium.UI.createImageView({
			backgroundImage:'images/feed/user_ico.png',
			left:121,
			bottom:story_row_info_from_bottom,
			width:10,
			height:10
		});
		
		var user = Ti.UI.createLabel({
			color:'#525252',
			font:{fontSize:11,fontWeight:'regular', fontFamily:'Helvetica Neue'},
			left:131,
			bottom:story_row_info_from_bottom,
			height:10,
			width:65,
			text:story.user.full_name
		});
		
		var videos_icon = Titanium.UI.createImageView({
			backgroundImage:'images/feed/bubble_ico.png',
			left:198,
			bottom:story_row_info_from_bottom,
			width:10,
			height:10
		});
		
		var videos = Ti.UI.createLabel({
			color:'#525252',
			font:{fontSize:11,fontWeight:'regular', fontFamily:'Helvetica Neue'},
			left:210,
			bottom:story_row_info_from_bottom,
			height:10,
			width:80,
			text:story.views + " views"
		});
		
		row.id = story.id;

		row.add(duration);
		row.add(user);		
		row.add(videos);
		row.add(duration_icon);
		row.add(user_icon);
		row.add(videos_icon);
				
		row.add(title);
		row.add(photo);
		return row;
	}

	var data = Functional.map(createTableViewRow, self.source);
	var tableview = Titanium.UI.createTableView({ 
		backgroundColor:'gray',
		data:data,
		top:40
	 });

	tableview.addEventListener('click', function(e) {
		Layouts.story(e.rowData.id);
	});
	
	self.win.add(tableview);
};
