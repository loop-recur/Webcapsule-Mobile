App = {};
Views = {};

App.bootstrap = function() {
	App.http_client = LoopRecur.HttpClient(Titanium.Network.createHTTPClient());
};

