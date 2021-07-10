
//-------------------------------------------------------------
//init 3D data base
//-------------------------------------------------------------

var PieceExpo="";
var ObjectExpo="";


//-------------------------------------------------------------
//INIT DATA BASE
//-------------------------------------------------------------
function initDataBase(){
	console.log('init data base');
	
	//-------------------------------------------------------------
	//LOAD PIECE EXPO
	//-------------------------------------------------------------
	$.getJSON("/Base/PieceExpo.json", function(json) {
		console.log(json)
		PieceExpo = json.pieceExpo;
	});
	//-------------------------------------------------------------
	//LOAD PIECE EXPO
	//-------------------------------------------------------------
	$.getJSON("/Base/Objects.json", function(json) {
		console.log(json)
		ObjectExpo = json.datas;
	});
	console.log("------------------------------------------")
	console.log("LAOD FINISH")
	console.log("------------------------------------------")
}


//-------------------------------------------------------------
//FINDER
//-------------------------------------------------------------
function findByPieceId(pieceId) {
	var res=null;
	for (var i = 0; i<PieceExpo.length;i++){
		if(PieceExpo[i].pieceId==pieceId){
			res=PieceExpo[i];
		}
	}
	return res;
}
//-------------------------------------------------------------
//FIND OBJECT IN COLLECTION
//-------------------------------------------------------------
function getObjectByCollections(tab){
	var res = [];
	for(var i=0;i<tab.length;i++){
		for(var j=0;j<ObjectExpo.length;j++){
			if(tab[i]==ObjectExpo[j].id){
				res.push(ObjectExpo[j]);
			}
		}
	}
	return res;
}

//-------------------------------------------------------------
//DRAW DATA BASE
//-------------------------------------------------------------
var selectedExpo;
var selectedObject;

function drawDataBase(pieceId){
	console.log(pieceId);
	addToDebug("pieceId : "+pieceId,1);
	//$("#debug")[0].innerText += pieceId + "\n";
	//------------------------
	//console.log("pieceId "+pieceId);
	selectedExpo = findByPieceId(pieceId);
	selectedObject = null;

	try {
		selectedObject = getObjectByCollections(selectedExpo.collection);
	}catch(e) {
		selectedObject=null;
	}

	if(selectedObject == null) {
		addToDebug("",2);	
		addToDebug("",3);	
	}else{
		addToDebug("salle : "+selectedExpo.salle,2);
		//-------------------
		var allId = "";
		for (var i = 0; i <selectedObject.length; i++) {
			allId += selectedObject[i].id+"<br>";
		}
		addToDebug("all ids : <br>"+allId,3);
	}
	//------------------

	ungenAll();
	//-------------------------------------------------------------
	//DISPATCH ENTRE 3 PIECES
	//-------------------------------------------------------------
	if(selectedExpo.mode=="superposition"){
		gen_superposition(selectedExpo, selectedObject);
	}else if(selectedExpo.mode=="classique"){
		gen_classique(selectedExpo, selectedObject);
	}else if(selectedExpo.mode=="exploration"){
		gen_exploration(selectedExpo, selectedObject);
	}

	fillCartel();
}

//-------------------------------------------------------------
//UNGENERATE
//-------------------------------------------------------------
function ungenAll(){
	//document.getElementById("part_right").innerHTML = "";
	$("#part_right").empty();
}

//-------------------------------------------------------------
//-------------------------------------------------------------
//SUPERPOSITION / image / son / video 
//-------------------------------------------------------------
//-------------------------------------------------------------
function gen_superposition(_selectedExpo,_selectedObject){
	var target = $("#part_right");
	target.css({overflow:"auto"});

	var w = target.width();
	var h = target.height();

	var x = randomRange(30,60);
	var y = 500;
	var marginY=300;

	for(var i=0;i<_selectedObject.length;i++){
		//createSuperpositionElem(i,_selectedObject[i],x,y);

		if(_selectedObject[i].type=="image")createSuperpositionElem_image(i,_selectedObject[i],x,y);
		if(_selectedObject[i].type=="video")createSuperpositionElem_video(i,_selectedObject[i],x,y);
		
		if(randomRange(0,10)<4){
			x+=randomRange(100,100);
		}else{
			x+=randomRange(300,500);
		}

		if(x>w-400){
			x=randomRange(30,200);
			y+=marginY;
		}
	}
}

function createSuperpositionElem_image(index,element,x,y){
	
	//zone de remplissage
	var target = $("#part_right");
	var w = target.width();
	var h = target.height();
	
	//{top: 200, left: 200, position:'absolute'}

	var d = document.createElement('div');
		$(d).addClass("superpositionElement")
		.html("")
		.css({top:y,left:x,position:'absolute'})
		.appendTo(target)
		
		
		console.log(d);
		var img = document.createElement('img');
		img.src = element.path;
		
		d.appendChild(img);
	//.click(function () {
	//    $(this).remove();
	//})
}

function createSuperpositionElem_video(index,element,x,y){
	
	//zone de remplissage
	var target = $("#part_right");
	var w = target.width();
	var h = target.height();
	
	//{top: 200, left: 200, position:'absolute'}

	var d = document.createElement('div');
		$(d).addClass("superpositionElement")
		.html("")
		.css({top:y,left:x,position:'absolute'})
		.appendTo(target)
		
		
		console.log(d);
		var img = document.createElement('video');
		img.src = element.path;
		img.autoplay = true;
		img.controls = true;
		
		d.appendChild(img);
	//.click(function () {
	//    $(this).remove();
	//})
}
//-------------------------------------------------------------
//-------------------------------------------------------------
//CLASSIQUE / image / son / video
//-------------------------------------------------------------
//-------------------------------------------------------------
function gen_classique(_selectedExpo,_selectedObject){
	var target = $("#part_right");
	target.css({overflow:"auto"});
	
	var w = target.width();
	var h = target.height();
	
	for(var i=0;i<_selectedObject.length;i++){
		if(_selectedObject[i].type=="image")createClassiqueElem_image(i,_selectedObject[i],0,0,h);
		if(_selectedObject[i].type=="video")createClassiqueElem_video(i,_selectedObject[i],0,0,h);
	}
}

function createClassiqueElem_image(index,element,x,y,maxH){
	var target = $("#part_right");
	
	var d = document.createElement('div');
	$(d).addClass("classiqueElement")
	.html("")
	//.css({top:y,left:x,position:'absolute'})
	.appendTo(target)
	
	
		//console.log(d);
		var img = document.createElement('img');
		img.src = element.path;
		
		d.appendChild(img);
		
		var prop=(maxH-20)+"px";
		img.style.maxHeight=prop;
	}
	
function createClassiqueElem_video(index,element,x,y,maxH){
	var target = $("#part_right");
	
	var d = document.createElement('div');
	$(d).addClass("classiqueElement")
		.html("")
		//.css({top:y,left:x,position:'absolute'})
		.appendTo(target)
		
		//console.log(d);
		var vid = document.createElement('video');
		vid.src = element.path;
		vid.controls = false;
		vid.autoplay=true;
		vid.onclick = function(){
			console.log("video in");
			//openInVideoWindows();
		};

		d.appendChild(vid);

		var prop=(maxH-20)+"px";
		vid.style.maxHeight=prop;
}

//-------------------------------------------------------------
//-------------------------------------------------------------
//EXPLORATION / que image
//-------------------------------------------------------------
//-------------------------------------------------------------
function gen_exploration(_selectedExpo,_selectedObject){
	var target = $("#part_right");
	target.css({overflow:"auto"});

	var w = target.width();
	var h = target.height();
	
	
	for(var i=0;i<_selectedObject.length;i++){
		createExplorationElem(i,_selectedObject[i],0,0);
	}
}


function createExplorationElem(index,element,x,y){
	var target = $("#part_right");
	
	var d = document.createElement('div');
		$(d).addClass("explorationElement")
		.html("")
		//.css({top:y,left:x,position:'absolute'})
		.appendTo(target)
		
		
		console.log(d);
		var img = document.createElement('img');
		img.src = element.path;
		
		d.appendChild(img);

	panzoom(img);
}


//-------------------------------------------------------------
//FILL CARTEL
//-------------------------------------------------------------
function fillCartel() {
	var target = $("#textExpo");
	target.html("");


	//titre
	var el1 = document.createElement('div');
		$(el1).addClass("cartelTitre")
		.html(selectedExpo.titre)
		.appendTo(target)

	//date
	var el2 = document.createElement('div');
		$(el2).addClass("cartelDate")
		.html(selectedExpo.date)
		.appendTo(target)

	//texte
	var el3 = document.createElement('div');
		$(el3).addClass("cartelTexte")
		.html(selectedExpo.texte)
		.appendTo(target)

	//credit
	var el4 = document.createElement('div');
		$(el4).addClass("cartelCredit")
		.html(selectedExpo.credit)
		.appendTo(target)

}
//-------------------------------------------------------------
//fonction utils
//-------------------------------------------------------------
function randomRange(min, max) {
	return Math.random() * (max - min) + min;
}









