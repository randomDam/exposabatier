//------------------------------------------------------------------
// SETUP [ une fois que la page prête ]
//------------------------------------------------------------------



//-------------------------------------------------------------
//MODE LVL
//-------------------------------------------------------------
//these or expo
//var mode="these";
var mode="expo";

$(document).ready(function () {
	console.log("ready gestion Tab");

	



	changeMode(mode);
});

function changeMode(_mode){
	mode=_mode;
	if(mode=="expo"){
		document.getElementById('expo').classList.remove("expo_hide");
		document.getElementById('expo').classList.add("expo_show");
	}

	if(mode=="these"){
		document.getElementById('expo').classList.remove("expo_show");
		document.getElementById('expo').classList.add("expo_hide");
	}

}
