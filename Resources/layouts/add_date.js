var win = Titanium.UI.currentWindow;

var value = new Date();

var picker = Ti.UI.createPicker({
	type:Ti.UI.PICKER_TYPE_DATE,
	maxDate:value,
	value:value
});

picker.selectionIndicator = true;

win.add(picker);
