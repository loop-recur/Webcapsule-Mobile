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
	
	it("gets the first 5 elements", function() {
		var array = [0,1,2,3,4,5,6];
		expect(Helpers.array_funs.take(5, array)).toEqual([0,1,2,3,4]);
	});
	
	it("doesn't take nulls", function() {
		var array = [0,1,null,3,4,5,6];
		expect(Helpers.array_funs.take(5, array)).toEqual([0,1,3,4,5]);
	});
	
	it("stops before 5", function() {
		var array = [0,1,3];
		expect(Helpers.array_funs.take(5, array)).toEqual([0,1,3]);
	});
});
