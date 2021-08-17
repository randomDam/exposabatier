function initGalerieVideo() {
	var g = $("#galerieVideo")[0];
	//console.log(g);
	g.addEventListener("click", function () {
		hideGalerie();
	});
}
//---------------------------------------------
//masquer la gallerie
//---------------------------------------------
function hideGalerieVideo() {
	var g = $("#galerieVideo")[0];
	g.style.visibility = "hidden";
}
//---------------------------------------------
//afficher la gallerie
//---------------------------------------------
function showGalerieVideo() {
	var g = $("#galerieVideo")[0];
	g.style.visibility = "visible";
}

function fillGalerieVideo(path) {
	var originalPath = path;

	


}