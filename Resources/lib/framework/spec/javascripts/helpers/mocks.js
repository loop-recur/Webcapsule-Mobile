Mocks = {};

Mocks.FakeHttpClient = {
	setTimeout:function(){},
	setRequestHeader:function(){},
	open: function(){},
	send: function(){},
	options: {}
};

function stubHttp(method, response, status) {
	status = status || 200;
	callback = (status == 200) ? "success" : "error";
	App.http_client[method] = jasmine.createSpy().andCallFake(function(url, params, callbacks) {
		response_obj = (status == 500) ? null : {responseText:response, status:status};
		callbacks[callback](response_obj);
	});
};
