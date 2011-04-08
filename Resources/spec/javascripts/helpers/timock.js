HttpClient = {
	setTimeout:function(){},
	setRequestHeader:function(){},
	open: function(){},
	send: function(){}
};

FakeFile = { write:function(){} };

Titanium = {
	include: function(){},
	Network: {createHTTPClient:function(){ return HttpClient; }},
	Utils: {base64encode:function(){}},
	Filesystem: {applicationDataDirectory: "", getFile: function(){ return FakeFile; }}
};
