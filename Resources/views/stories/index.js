Views.stories.index = function(win, stories) {

	function createTableViewRow(story) {
		
		var row = Ti.UI.createTableViewRow({
			backgroundImage:'images/feed/item_bg.png',
			// selectedBackgroundColor:'#385292',
			height:80,
			width:320,
			hasChild:true
		});		
		
		var logo = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'images/logo.png');
		var photo = Titanium.UI.createImageView({
			image:logo,
			left:5,
			width:70,
			height:45
		});
		
		var title = Ti.UI.createLabel({
			color:'#3D3D3D',
			font:{fontSize:14,fontWeight:'bold', fontFamily:'Helvetica Neue'},
			left:80,
			top:0,
			height:30,
			width:200,
			text:story.name
		});
		
		var description = Ti.UI.createLabel({
			color:'#6B6B6B',
			font:{fontSize:10,fontWeight:'regular', fontFamily:'Helvetica Neue'},
			left:80,
			top:24,
			height:35,
			width:215,
			text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore'
		});	
		
		var duration_icon = Titanium.UI.createImageView({
			backgroundImage:'images/feed/time_ico.png',
			left:79,
			bottom:6,
			width:10,
			height:10
		});
		
		var duration = Ti.UI.createLabel({
			color:'#525252',
			font:{fontSize:11,fontWeight:'regular', fontFamily:'Helvetica Neue'},
			left:90,
			bottom:6,
			height:10,
			width:30,
			text:'1:30'
		});
		
		var user_icon = Titanium.UI.createImageView({
			backgroundImage:'images/feed/user_ico.png',
			left:121,
			bottom:6,
			width:10,
			height:10
		});
		
		var user = Ti.UI.createLabel({
			color:'#525252',
			font:{fontSize:11,fontWeight:'regular', fontFamily:'Helvetica Neue'},
			left:131,
			bottom:6,
			height:10,
			width:65,
			text:'instanttaylor'
		});
		
		var videos_icon = Titanium.UI.createImageView({
			backgroundImage:'images/feed/bubble_ico.png',
			left:198,
			bottom:6,
			width:10,
			height:10
		});
		
		var videos = Ti.UI.createLabel({
			color:'#525252',
			font:{fontSize:11,fontWeight:'regular', fontFamily:'Helvetica Neue'},
			left:210,
			bottom:6,
			height:10,
			width:80,
			text:'23 videos'
		});
		
		row.id = story.id;

		row.add(duration);
		row.add(user);		
		row.add(videos);
		row.add(duration_icon);
		row.add(user_icon);
		row.add(videos_icon);
				
		row.add(description);
		row.add(title);
		row.add(photo);
		return row;
	}

	var data = Functional.map(createTableViewRow, stories);
	var tableview = Titanium.UI.createTableView({ 
		data:data,
		top:40
	 });

	tableview.addEventListener('click', function(e)
	{
		var win = Titanium.UI.createWindow({ title:'Story', backgroundColor:'#fff' });
		
		win.addEventListener('open', function() {
			App.action(win, "stories#show", e.rowData.id);
		});
		
		var b = Titanium.UI.createButton({
			title:'Close',
			height:30,
			width:150,
			top:0,
			right:0
		});
		
		b.addEventListener('click', function() { win.close(); });

		win.add(b);
		win.open();
	});

	var buttonObjects = [
		{title:'My Stories', width:110, enabled:true},
		{title:'Friends\' Stories', width:140}
	];
	
	var tabbed_bar = Titanium.UI.createTabbedBar({
		labels:buttonObjects,
		top:0,
		style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
		height:40,
		index:1
	});
	
	win.add(tabbed_bar);
	win.add(tableview);
};
