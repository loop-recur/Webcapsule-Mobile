Mocks = {};

Mocks.FakeHttpClient = {
	setTimeout:function(){},
	setRequestHeader:function(){},
	open: function(){},
	send: function(){},
	options: {}
};

function stubHttp(method, response, failure) {
	callback = failure ? "error" : "success";
	App.http_client[method] = jasmine.createSpy().andCallFake(function(url, params, callbacks) {
		callbacks[callback]({responseText:response});
	});
}