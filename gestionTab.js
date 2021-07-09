//------------------------------------------------------------------
// SETUP [ une fois que la page prête ]
//------------------------------------------------------------------



//-------------------------------------------------------------
//MODE LVL
//-------------------------------------------------------------
//these or expo
var mode="these";
//var mode="expo";

$(document).ready(function () {
	console.log("ready gestion Tab");

	//----------------------------------------------------
	$("#switch").click(function () {
		console.log("click switch!");
		if(mode=="these"){
			changeMode("expo");
		}else{
			changeMode("these");
		}
	});
	
	changeMode(mode);

	window.addEventListener("hashchange", function () {
		console.log("hash!");
		$("#main").scrollTop(0);
		//window.scrollTo(window.scrollX, window.scrollY - 100);
	});
});

function changeMode(_mode){
	mode=_mode;
	if(mode=="expo"){
		$("#switch").removeClass("switchRight");
		
		document.getElementById('expo').classList.remove("expo_hide");
		document.getElementById('expo').classList.add("expo_show");
		document.getElementById('tabExpo').classList.remove("tabExpo_hide");
		//tabExpo_hide
		
		$("#switch #titreSwitch p").text("Vers la thèse ↑");
	}
	
	if(mode=="these"){
		$("#switch").addClass("switchRight");
		
		document.getElementById('expo').classList.remove("expo_show");
		document.getElementById('expo').classList.add("expo_hide");

		document.getElementById('tabExpo').classList.add("tabExpo_hide");
		
		$("#switch #titreSwitch p").text("Vers les Expositions ↓");
	}

}
