//---------------------------------------------------------------------------------------------
//RECT TO RECT (FIT)
//---------------------------------------------------------------------------------------------
function rectFitToRectFit(rxFrame, ryFrame, rwFrame, rhFrame, rw, rh) {
	var ratioFrame = rwFrame / rhFrame;
	var ratioRect = rw / rh;

	var x = 0;
	var y = 0;
	var w = 0;
	var h = 0;

	if (ratioFrame == ratioRect) {
		x = rxFrame;
		y = ryFrame;
		w = rwFrame;
		h = rhFrame;
	} else if (ratioFrame > ratioRect) {
		h = rhFrame;
		w = h * ratioRect;

		x = ((rwFrame / 2) - (w / 2)) + rxFrame;
		y = ryFrame;

	} else if (ratioFrame < ratioRect) {
		w = rwFrame;
		h = w / ratioRect;

		y = ((rhFrame / 2) - (h / 2)) + ryFrame;
		x = rxFrame;
	}

	return [x, y, w, h];
}

function rectFitToRectZoom(rxFrame, ryFrame, rwFrame, rhFrame, rw, rh) {
	var ratioFrame = rwFrame / rhFrame;
	var ratioRect = rw / rh;

	var x = 0;
	var y = 0;
	var w = 0;
	var h = 0;

	if (ratioFrame == ratioRect) {
		x = rxFrame;
		y = ryFrame;
		w = rwFrame;
		h = rhFrame;
	} else if (ratioFrame < ratioRect) {
		h = rhFrame;
		w = h * ratioRect;

		x = ((rwFrame / 2) - (w / 2)) + rxFrame;
		y = ryFrame;

	} else if (ratioFrame > ratioRect) {
		w = rwFrame;
		h = w / ratioRect;

		y = ((rhFrame / 2) - (h / 2)) + ryFrame;
		x = rxFrame;
	}

	return [x, y, w, h];
}