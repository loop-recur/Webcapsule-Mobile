Helpers.application = {};

Helpers.application.isBlank = function(item) {
	return !item || item == "" || item == [];
}

Helpers.application.densityIsMedium = function() {
	return density == "medium";
}

Helpers.application.addDp = function(one, two) {
	var ints = Functional.map(Helpers.application.extractInteger, [one, two]);
	var sum = Functional.reduce('x+y', 0, ints);
	return sum + "dp";
}

Helpers.application.extractInteger = function(str) {
	var str = new String(str);
	return parseInt(str.replace("dp", ""));
}
