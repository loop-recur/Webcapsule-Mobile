Views = {};

Views.extend = function() {
	return {
		render : function(source, params) {
			this.source = source;
			this.params = params;
			this.template();
		}
	};
};
