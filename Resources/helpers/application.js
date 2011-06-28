Helpers.application = {};

Helpers.application.isBlank = function(item) {
	return !item || item == "" || item == [];
}

Helpers.application.densityIsMedium = function() {
	return density == "medium";
}

