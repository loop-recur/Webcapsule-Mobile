Views.stories.index = function(win, stories) {

	function createTableViewRow(item) {
		return Ti.UI.createTableViewRow({hasChild:true,title:item.story.name, id:item.story.id});
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
