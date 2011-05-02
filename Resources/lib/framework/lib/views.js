Views = {};

Views.extend = function() {
	return {
		render : function(source, params) {
			if(source) this.source = source;
			this.params = params || {};
			this.template();
		}
	};
};
