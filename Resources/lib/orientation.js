var Orientation = function() {
	function current(o)
	{
		switch (parseInt(o))
		{
			case Titanium.UI.PORTRAIT:
			{
				return 'portrait';
			}
			case Titanium.UI.UPSIDE_PORTRAIT:
			{
				return 'upside portrait';
			}
			case Titanium.UI.LANDSCAPE_LEFT:
			{
				return 'landscape left';
			}
			case Titanium.UI.LANDSCAPE_RIGHT:
			{
				return 'landscape right';
			}
			case Titanium.UI.FACE_UP:
			{
				return 'face up';
			}
			case Titanium.UI.FACE_DOWN:
			{
				return 'face down';
			}
			case Titanium.UI.UNKNOWN:
			{
				return 'unknown';
			}
		}
	}
	
	return {current : current}
}();
