HttpClient = {
	setTimeout:function(){},
	setRequestHeader:function(){},
	open: function(){},
	send: function(){}
};

FakeView = {
	render : jasmine.createSpy("render")
};

FakeFile = { write:function(){}, deleteFile:function(){} };
FakeGroup = { addTab:function(){}, addEventListener:function(){}, setActiveTab:function(){}, open:function(){} };
FakeiPhone = {AnimationStyle:function(){} };

Titanium = {
	include: function(){},
	Network: {createHTTPClient:function(){ return HttpClient; }},
	Utils: {base64encode:function(){}},
	Filesystem: {applicationDataDirectory: "", getFile: function(){ return FakeFile; }},
	UI: {createTabGroup:function(){return FakeGroup; },createWindow:function(){},createTab:function(){},iPhone:FakeiPhone}
};

Ti = {
	API: {info: function() {}},
	Utils: {md5HexDigest:function(){ return "123"; }},
};

