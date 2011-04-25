Views.followings.index = function(win, followings) {
	
	function createTableViewRow(following) {
		
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
			text:following.full_name
		});
		
		row.id = following.id;
				
		row.add(title);
		row.add(photo);
		return row;
	}

	var data = Functional.map(createTableViewRow, followings);
	var tableview = Titanium.UI.createTableView({ 
		backgroundColor:'gray',
		data:data
	 });

	tableview.addEventListener('click', function(e)
	{
		var win = Titanium.UI.createWindow({ title:'Story', backgroundColor:'#fff' });
		
		win.addEventListener('open', function() {
			App.action(win, "followings#show", e.rowData.id);
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

	win.add(tableview);
};