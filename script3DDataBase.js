
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
	//$("#debug")[0].innerText += pieceId + "\n";
	//------------------------
	//console.log("pieceId "+pieceId);
	selectedExpo = findByPieceId(pieceId);
	selectedObject = getObjectByCollections(selectedExpo.collection);

	ungenAll();

	//a revoir > dispatch entre 3
	if(selectedExpo.mode=="superposition"){
		gen_superposition(selectedExpo, selectedObject);
	}else if(selectedExpo.mode=="classique"){
		gen_classique(selectedExpo, selectedObject);
	}else if(selectedExpo.mode=="exploration"){
		gen_exploration(selectedExpo, selectedObject);
	}
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
//SUPERPOSITION 
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
		createSuperpositionElem(i,_selectedObject[i],x,y);
		
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

function createSuperpositionElem(index,element,x,y){
	
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
//-------------------------------------------------------------
//-------------------------------------------------------------
//CLASSIQUE
//-------------------------------------------------------------
//-------------------------------------------------------------
function gen_classique(_selectedExpo,_selectedObject){


	
}



//-------------------------------------------------------------
//-------------------------------------------------------------
//EXPLORATION
//-------------------------------------------------------------
//-------------------------------------------------------------
function gen_exploration(_selectedExpo,_selectedObject){
	var target = $("#part_right");
	target.css({overflow:"auto"});

	var w = target.width();
	var h = target.height();
	
	
	for(var i=0;i<_selectedObject.length;i++){
		createSuperpositionElem(i,_selectedObject[i],0,0);
	}
}


function createExplorationElem(index,element,x,y){
	var d = document.createElement('div');
		$(d).addClass("explorationElement")
		.html("")
		//.css({top:y,left:x,position:'absolute'})
		.appendTo(target)
		
		
		console.log(d);
		var img = document.createElement('img');
		img.src = element.path;
		
		d.appendChild(img);
}



//-------------------------------------------------------------
//fonction utils
//-------------------------------------------------------------
function randomRange(min, max) {
	return Math.random() * (max - min) + min;
}









