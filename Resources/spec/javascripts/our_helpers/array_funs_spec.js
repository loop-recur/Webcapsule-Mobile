describe("Helpers.array_funs", function() {
	var array;
	
	beforeEach(function() {
		array = [{id : '15', name : "Bob"}, {id : '4', name : "Joe"}];
	});
	
	it("finds the object and removes it", function() {
		expect(Helpers.array_funs.removeById(4, array)).toEqual([{id : '15', name : "Bob"}]);
	});
	
	it("returns a string without the original id", function() {
		var str = "1,3,6";
		expect(Helpers.array_funs.removeInString(3, str)).toEqual("1,6");
	});
	
	it("returns a string without the original id even if the string is null", function() {
		var str = null;
		expect(Helpers.array_funs.removeInString(3, str)).toEqual(null);
	});
	
	it("returns a string with the passed in id", function() {
		var str = "1,6";
		expect(Helpers.array_funs.addInString(3, str)).toEqual("1,6,3");
	});
});
