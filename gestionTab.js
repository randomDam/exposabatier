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

	//-------------------------------------------------------------
	//Switch to expo and these
	//-------------------------------------------------------------
	$("#switch").click(function () {
		console.log("click switch!");
		if(mode=="these"){
			changeMode("expo");
		}else{
			changeMode("these");
		}
	});
	
	changeMode(mode);

	//-------------------------------------------------------------
	//Correction des décalage des liens hash #
	//-------------------------------------------------------------
	window.addEventListener("hashchange", function () {
		console.log("hash!");
		$("#main").scrollTop(0);
		//window.scrollTo(window.scrollX, window.scrollY - 100);
	});

	//-------------------------------------------------------------
	//deboger gestion
	//-------------------------------------------------------------
	document.addEventListener('keydown', switchDebug);
	
	//-------------------------------------------------------------
	//about over
	//-------------------------------------------------------------
	$("#about").click(function () {
		
		$("#introCadre").removeClass("introCadre_Hide");
		
		$("#intro").animate({opacity: "1"},1,function(){
			$("#intro").css({visibility: "visible"});
		});

	});

});


//-------------------------------------------------------------
//EXPO OR THESE / FUNCTION
//-------------------------------------------------------------
function changeMode(_mode){
	mode=_mode;
	if(mode=="expo"){
		$("#switch").removeClass("switchRight");
		
		document.getElementById('expo').classList.remove("expo_hide");
		document.getElementById('expo').classList.add("expo_show");
		document.getElementById('tabExpo').classList.remove("tabExpo_hide");
		//tabExpo_hide
		
		$("#switch #titreSwitch p").text("Vers la thèse ↑");

		$("#about").removeClass("aboutRight");
		$("#about").addClass("aboutLeft");
	}
	
	if(mode=="these"){
		$("#switch").addClass("switchRight");
		
		document.getElementById('expo').classList.remove("expo_show");
		document.getElementById('expo').classList.add("expo_hide");
		
		document.getElementById('tabExpo').classList.add("tabExpo_hide");
		
		$("#switch #titreSwitch p").text("Vers les Expositions ↓");
		
		$("#about").removeClass("aboutLeft");
		$("#about").addClass("aboutRight");
	}
}

//-------------------------------------------------------------
//DEBOGER FONCTION
//-------------------------------------------------------------
function switchDebug(e){
	if(e.key=="d"){
		console.log("switch debug");
		if($("#debug").css("visibility")=="hidden"){
			$("#debug").css("visibility","visible");
		}else{
			$("#debug").css("visibility","hidden");
		}
	}
}

function addToDebug(text,place){
	$("#deb"+place).html(text);
}

