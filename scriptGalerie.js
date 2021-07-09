//---------------------------------------------
//constructor la gallerie
//---------------------------------------------
var converter;

function initGalerie() {
	var g = $("#galerie")[0];
	//console.log(g);
	g.addEventListener("click", function () {
		hideGalerie();
	});

	converter = new showdown.Converter();
}
//---------------------------------------------
//masquer la gallerie
//---------------------------------------------
function hideGalerie() {
	var g = $("#galerie")[0];
	//console.log(g);
	g.style.visibility = "hidden";
}
//---------------------------------------------
//afficher la gallerie
//---------------------------------------------
function showGalerie() {
	var g = $("#galerie")[0];
	console.log(g);
	g.style.visibility = "visible";
}
//---------------------------------------------
//remplir la gallerie d'une image
//---------------------------------------------
function fillGalerie(path) {
	var originalPath = path;

	var g = $("#galerieIMG")[0];
	//console.log(g);

	console.log(path);
	path = path.replace('/BD/', '/Original/')
	console.log(path);

	g.src = path;
	//when loading is finnished
	g.addEventListener('load', (event) => {
		console.log('image loaded');
		console.log(g);
		var w = g.naturalWidth;
		var h = g.naturalHeight;

		var conteneur = $("#subGalerie")[0];
		//console.log(conteneur);
		var bouding = conteneur.getBoundingClientRect();

		var rxFrame = 0;
		var ryFrame = 0;
		var rwFrame = bouding.width;
		var rhFrame = bouding.height;
		//console.log(rxFrame+"   "+ryFrame+"   "+rwFrame+"   "+rhFrame);

		var result = rectFitToRectFit(rxFrame, ryFrame, rwFrame, rhFrame, w, h);
		//console.log(result);

		//g.style.left = result[0]+"px";
		g.style.left = 0 + "px";
		g.style.top = result[1] + "px";
		g.width = result[2];
		g.height = result[3];

	});

	fillLegende(originalPath);
}
//---------------------------------------------
//remplir la legende
//---------------------------------------------
function fillLegende(path) {
	var l = $("#legende")[0];

	console.log(path);

	//reconstruc the path for legende
	path = path.replace('/BD/', '/Legendes/')
	path = path.replace('http://www.fabricesabatier.com', '')
	path = path.substring(0, path.length - 4);
	path += ".md";

	console.log(path);
	//get the data

	console.log("----------------------------");
	$("#legende").load(path, null, function (response, status, xhr) {
		console.log("status " + status);
		console.log(response);
		$("#legende").html(converter.makeHtml(response));
	});


	//l.load(path);  
}
//-------------------------------------------------------------
//Get legende with a path
//-------------------------------------------------------------
function fillLegendeWithDiv(object,path) {
	
	var legende = document.createElement('div');
	legende.classList.add("legendeDiv");
	
	object.appendChild(legende);
	
	var l = $(legende)[0];

	//console.log(path);

	//reconstruc the path for legende
	path = path.replace('/BD/', '/Legendes/')
	path = path.replace('http://www.fabricesabatier.com', '')
	path = path.substring(0, path.length - 4);
	path += ".md";

	//console.log(path);
	//get the data

	//console.log("----------------------------");
	$(legende).load(path, null, function (response, status, xhr) {
		console.log("status " + status);
		console.log(response);
		$(legende).html(converter.makeHtml(response));
	});
	//l.load(path);
}