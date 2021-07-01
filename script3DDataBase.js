
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
	$("#debug")[0].innerText += pieceId + "\n";
	//------------------------
	//console.log("pieceId "+pieceId);
	selectedExpo = findByPieceId(pieceId);
	selectedObject = getObjectByCollections(selectedExpo.collection);

	ungenAll();

	//a revoir > dispatch entre 3
	gen_superposition(selectedExpo, selectedObject);
}

//-------------------------------------------------------------
//UNGENERATE
//-------------------------------------------------------------
function ungenAll(){
	document.getElementById("part_right").innerHTML = "";
}
//-------------------------------------------------------------
//SUPERPOSITION 
//-------------------------------------------------------------
function gen_superposition(_selectedExpo,_selectedObject){
	for(var i=0;i<_selectedObject.length;i++){
		createSuperpositionElem(i,_selectedObject[i]);
	}
}

function createSuperpositionElem(index,element){
	
	var target = $("#part_right");

	var d = document.createElement('div');
	$(d).addClass("superpositionElement")
	.html("")
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
//EXPLORATION
//-------------------------------------------------------------
function gen_exploration(_selectedExpo,_selectedObject){


	
}
//-------------------------------------------------------------
//CLASSIQUE
//-------------------------------------------------------------
function gen_classique(_selectedExpo,_selectedObject){


	
}