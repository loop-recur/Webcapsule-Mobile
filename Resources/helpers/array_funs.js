Helpers.array_funs = {};

Helpers.array_funs.removeInString = function(id, str) {
	return Helpers.array_funs.withIdString(str, function(array) {
		Helpers.array_funs.remove(array, id.toString());
		return array;
	});
}

Helpers.array_funs.addInString = function(id, str) {
	return Helpers.array_funs.withIdString(str, function(array) {
		array.push(id.toString());
		return array;
	});
}

Helpers.array_funs.removeById = function(id, array) {
	var sameId = "id == x.id".lambda().partial(id);
	var item = Functional.select(sameId, array)[0];
	Helpers.array_funs.remove(array, item);
	return array;
}

Helpers.array_funs.remove = function(array, item) {
	Ti.API.info(array);
	Ti.API.info(item);
	Ti.API.info(array.indexOf(item));
	array.splice(array.indexOf(item), 1);
}

Helpers.array_funs.replace = function(array, replaceTo, replaceWith) {
	for(var i=0; i<array.length;i++ ) {
		if(array[i]==replaceTo) array.splice(i,1,replaceWith);
	};
}

Helpers.array_funs.withIdString = function(str, fun) {
	if(!str) return null;
	var array, newArray, newStr;
	array = str.split(",");
	newArray = fun(array);
	newStr = newArray.join(",");
	return newStr;
}

Helpers.array_funs.take = function(n, array) {
	var newArray = [];
	
	for(var i=0;i<array.length;i++ ) {
		if(array[i] != null) newArray.push(array[i]);
		if(newArray.length>=n) break;
	};
	return newArray;
}
