//create table view data object
win = Titanium.UI.currentWindow;
var data = [
	{title:'Events Propagation', hasChild:true, test:'table2.js'},
	{title:'Events Interaction', hasChild:true, test:'../examples/view_event_interaction.js'},
	{title:'Image Views', hasChild:true, test:'../examples/image_views.js'},
	{title:'Scroll Views', hasChild:true, test:'../examples/scroll_views.js'},
	{title:'Table Views', hasChild:true, test:'../examples/table_views.js'},
	{title:'Web Views', hasChild:true, test:'../examples/web_views.js'},
	{title:'Alert Dialog', hasChild:true, test:'../examples/alert.js'},
	{title:'Options Dialog', hasChild:true, test:'../examples/options_dialog.js'},
	{title:'Remove Views', hasChild:true, test:'../examples/remove_views.js'},
	{title:'zIndex', hasChild:true, test:'../examples/views_zindex.js'},
    {title:'Email Dialog', hasChild:true, test:'../examples/email_dialog.js'},
	{title:'Map View', hasChild:true, test:'../examples/map_view.js'},
	{title:'View w/ Size', hasChild:true, test:'../examples/view_with_size.js'},

];

// create table view
var tableview = Titanium.UI.createTableView({
	data:data
});

// create table view event listener
tableview.addEventListener('click', function(e)
{
	if (e.rowData.test)
	{
		var win = Titanium.UI.createWindow({
			url:e.rowData.test,
			title:e.rowData.wintitle || e.rowData.title
		});
		win.open();
	}
});

// add table view to the window
win.add(tableview);