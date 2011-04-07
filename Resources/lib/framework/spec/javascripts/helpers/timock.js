HttpClient = {
	setTimeout:function(){},
	setRequestHeader:function(){},
	open: function(){},
	send: function(){}
};

Titanium = {
	Network: {createHTTPClient:function(){ return HttpClient; }},
	Utils: {base64encode:function(){}}
};