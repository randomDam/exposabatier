var tableCopy;

//------------------------------------------------------------------
//LEVEL OF DEBUG LOGS (all js scripts)
//----------------------------------------------	--------------------
var debugLog_script =false;

//------------------------------------------------------------------
//HTML Chargé
//------------------------------------------------------------------
var mainHTML = "Tout7.html";


// alternative à load
document.onreadystatechange = function () {
	if (document.readyState == "complete") {

		if($("#introCadre").length>0){	
			$("#introCadre").click(function(){
				$("#intro").animate({opacity: "0"},1,function(){
					$("#intro").css({visibility: "hidden"});
				});
				
				$("#introCadre").addClass("introCadre_Hide");
			});
		}else{
			console.log("intro not found");
		}
		
	}
}


//------------------------------------------------------------------
// SETUP [ une fois que la page prête ]
//------------------------------------------------------------------
$(document).ready(function () {
	console.log("ready!");

	//chargement un html dans le html
	//$("#frameThese").load( "exportHTML_v2.html", function() {
	$("#frameThese").load(mainHTML, function () {
		if(debugLog_script)console.log("Load thesis finnish!");

		//----------------------------------------------
		table = $("#Tabledesmatires1")[0];
		tableCopy = $("#Tabledesmatires1")[0];
		table.remove();
		//console.log(tab.length);

		$("#sommaire").html(tableCopy);
		//------------------------------------------------
		//suppression des classes sonctent 4
		//contents3
		/*
		var tabC4 = $("#sommaire .Contents4")
		for (var i=0;i<tabC4.length;i++){
		  tabC4[i].remove();
		  var c3 = tabC4[i].getElementsByClassName("Contents3");

		  console.log(tabC4[i]);
		  console.log(c3.length);
		}
		*/
		/*
		var tabC3 = $("#sommaire .Contents3")
		for (var i=0;i<tabC3.length;i++){
		  tabC3[i].remove();
		}
		*/
		var allElem = $("#sommaire li");
		if(debugLog_script)console.log(allElem);
		var lastC4;
		var store = [];

		for (var i = 0; i < allElem.length; i++) {
			var cl = allElem[i].getElementsByTagName("p");
			var name = cl[0].getAttribute("class");

			if (name == "Contents3") {
				if(debugLog_script)console.log("BEGIN PROCESS");
				var index = i + 1;
				var continueParse = true;

				while (continueParse) {
					//console.log("----------------------");

					var currentEl = allElem[index].getElementsByTagName("p");
					var nameStore = currentEl[0].getAttribute("class");
					if(debugLog_script)console.log(nameStore);

					if (nameStore == "Contents4") {
						allElem[index].style.color = "red";
						store.push(allElem[index]);
					} else {

						if (store.length > 0) {

							//wrap(allElem[i].children[0],"ul");
							var wrapper = document.createElement("ul");
							wrapper.classList.add("lvl3");

							allElem[i].parentNode.insertBefore(wrapper, allElem[i]);
							wrapper.appendChild(allElem[i].children[0]);
							allElem[i].remove();

							for (var j = 0; j < store.length; j++) {
								wrapper.appendChild(store[j]);
							}

						}
						if(debugLog_script)console.log(store);

						store = [];
						//i = index + 1;
						continueParse = false;
					}

					index++;
					if (index > allElem.length) continueParse = false;
					//continueParse=false;
				}
				if(debugLog_script)console.log("END PROCESS");
			}


		}
		//----------------------------------------------------
		//class de repère des images
		//Internet20link
		//

	});

	if(debugLog_script)console.log("END init");


	//----------------------------------------------------
	//Routine des images
	//----------------------------------------------------
	//construct

	//intervalle / draw
	setTimeout(function () {
		initFig();
		initGalerie();
	}, 1000);

	//intervalle / draw
	setInterval(function () {
		refreshFig();
	}, 500);

	

	//-------------------------------------------------------------
	//IMAGE TEST GALERIE
	//-------------------------------------------------------------
	/*
	setTimeout(function () {
		showGalerie();
		fillGalerie("http://www.fabricesabatier.com/Fig/BD/Chapitre1/graunt1.png");
	}, 1100);
	*/
	//-------------------------------------------------------------
	//SWITH ACTION
	//-------------------------------------------------------------
	


});


//-------------------------------------------------------
//GESTION DES FIGURES [ CONSTRUTOR ]
//-------------------------------------------------------
//-------------------------------------------------------
function initFig() {
	var allFigures = $(".Internet20link");

	if(debugLog_script)console.log(allFigures);

	allFigures.click(
		function (e) {
			//e.preventDefault();
			showGalerie();
			fillGalerie(this.ref);
			//console.log(this.ref);
		});

	for (var i = 0; i < allFigures.length; i++) {
		
		allFigures[i].href=allFigures[i].href.replace("http://www.fabricesabatier.com","");
		//console.log(allFigures[i].href);

		allFigures[i].ref = allFigures[i].href;
		allFigures[i].setAttribute("ref", allFigures[i].href);
		allFigures[i].href = "javascript: void(0)";

	}

}
//-------------------------------------------------------
//GESTION DES FIGURES [ PROCESS GENERAL ]
//-------------------------------------------------------
//-------------------------------------------------------
function refreshFig() {

	findAllFigureOnText();
	findAllFigureOnScreen();

	compareFig();
	//createMissingFig();

	//findAllFigure();
	//figuresIsOnScreen();
}
//-------------------------------------------------------
//GESTION DES FIGURES
//-------------------------------------------------------
var figuresOnText = [];

var margeHaute = -1000;
var margeBasse = 1000;

function findAllFigureOnText() {
	var allFigures = $(".Internet20link");
	var hScreen = window.innerHeight;
	var lastRef = "";
	figuresOnText = [];

	for (var i = 0; i < allFigures.length; i++) {
		var f = allFigures[i];
		var y = f.getBoundingClientRect().y;

		if (y > margeHaute && y < hScreen + margeBasse) {
			//create img box
			//f.href;
			if (lastRef != f.ref) {
				//createDivImage(f.href,y);
				f.y = y;
				figuresOnText.push(f);
				lastRef = f.ref;
			}
		}
	}
}

//-------------------------------------------------------
//GESTION DES FIGURES
//-------------------------------------------------------
var allFigOnScreen = [];

function findAllFigureOnScreen() {
	allFigOnScreen = $(".divFig");
}
//-------------------------------------------------------
//Compare
//-------------------------------------------------------
function compareFig() {

	//mise a jour des coordonnées
	//ou creation d'un div image
	for (var i = 0; i < figuresOnText.length; i++) {
		var exist = -1;

		for (var j = 0; j < allFigOnScreen.length; j++) {
			//console.log(figuresOnText[i].href+"  ==   "+allFigOnScreen[j].firstElementChild.src);
			if (figuresOnText[i].ref == allFigOnScreen[j].firstElementChild.src) {
				exist = j;
			}
		}

		if (exist >= 0) {
			allFigOnScreen[exist].style.top = figuresOnText[i].y + "px";
		} else {
			createDivImage(figuresOnText[i].ref, figuresOnText[i].y);
		}
	}


	//suppression de div image
	for (var j = 0; j < allFigOnScreen.length; j++) {
		var exist = -1;

		for (var i = 0; i < figuresOnText.length; i++) {
			//console.log(figuresOnText[i].href+"  ==   "+allFigOnScreen[j].firstElementChild.src);
			if (figuresOnText[i].ref == allFigOnScreen[j].firstElementChild.src) {
				exist = i;
			}
		}

		if (exist >= 0) {} else {
			allFigOnScreen[j].remove();
		}
	}


}
//-------------------------------------------------------
//GESTION DES FIGURES
//-------------------------------------------------------
function createMissingFig() {
	for (var i = 0; i < figuresOnText.length; i++) {
		createDivImage(figuresOnText[i].ref, figuresOnText[i].y);
	}
}

//-------------------------------------------------------
//TEST DES FIGURES A L'ECRAN
//-------------------------------------------------------
function figuresIsOnScreen() {
	//hauteur de fenetre
	var hScreen = window.innerHeight;
	var lastRef = "";

	for (var i = 0; i < figures.length; i++) {
		var f = figures[i];
		var y = f.getBoundingClientRect().y;

		if (y > 0 && y < hScreen) {
			//create img box
			//f.href;
			if (lastRef != f.ref) {
				createDivImage(f.ref, y);
				lastRef = f.ref;
			}
		}
	}
}

function removeAllfig() {
	$(".divFig").remove();
}



//-------------------------------------------------------
// http://www.fabricesabatier.com/Fig/BD/Chapitre1/tablette2.jpg
//-------------------------------------------------------

//-------------------------------------------------------
//CREATE IMAGE
//-------------------------------------------------------
var displayedElement = [];

var help;
var lastIndex = 0;

function createDivImage(_src, posY) {
	var newDiv = document.createElement("div");
	newDiv.classList.add("divFig");
	newDiv.style.top = posY.toString() + "px";


	var maxWidth = $('#expoImage')[0].getBoundingClientRect().width;
	newDiv.style.marginLeft = getRandom(5, maxWidth - 400 - 5) + "px";

	//newDiv.style.width = "400px";

	newDiv.addEventListener('mouseover', function (e) {
		//console.log(this);

		this.style.zIndex = lastIndex;
		lastIndex++;
		if(lastIndex >1000)lastIndex = 0;
	});



	var path = _src;
	newDiv.addEventListener('click', function (e) {
		//console.log("click"+path);
		showGalerie();
		fillGalerie(path);
	});

	newDiv.addEventListener('mouseover', function (e) {
		var t = $(newDiv).find(".legendeDiv")[0];
		if(debugLog_script)console.log(t);
		t.classList.add("legendeShow");
		
	});
	newDiv.addEventListener('mouseout', function (e) {
		var t = $(newDiv).find(".legendeDiv")[0];
		if(debugLog_script)console.log(t);
		t.classList.remove("legendeShow");
		
	});

	//help = newDiv;

	//console.log(posY);
	//console.log(newDiv);

	var img = document.createElement('img');
	img.src = _src;
	img.classList.add("imgFig");

	newDiv.appendChild(img);
	// ajoute le nouvel élément créé et son contenu dans le DOM
	var currentDiv = document.getElementById('expoImage');
	currentDiv.appendChild(newDiv);
	displayedElement.push(newDiv);
	//document.body.insertBefore(newDiv, currentDiv);

	fillLegendeWithDiv(newDiv,path);
}



function getRandom(min, max) {
	return (Math.random() * (max - min)) + min;
}

//-----------------------------------------------------END