//import * as THREE from '/lib/three.js';
//import THREE from '/lib/three.js';

import * as THREE from '/build/three.module.js';
import {
	OrbitControls
} from './lib/jsm/controls/OrbitControls.js';
import {
	SVGLoader
} from './lib/jsm/loaders/SVGLoader.js';


$(document).ready(function () {
	console.log("ready script 3D");
	initDataBase();
	init3D();
	loadPresentationTest();
});


function loadPresentationTest() {
	console.log("load presentation test");
	$("#part_right").load("presentationExpo.html");
}


//-------------------------------------------------------------
//INIT 3D 
//-------------------------------------------------------------
export var container, renderer, stats, scene, camera, gui, guiData;

var fontLoader;
var fontFaune;

function init3D() {
	container = document.getElementById('part_left');

	renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(container.offsetWidth, container.offsetHeight);
	container.appendChild(renderer.domElement);

	//-------------------------------------------------------------
	//CAMERA
	//-------------------------------------------------------------
	camera = new THREE.PerspectiveCamera(50, container.offsetWidth / container.offsetHeight, 1, 1000);
	camera.position.set(100, 100, 100);
	camera.lookAt(0, 0, 0);

	//-------------------------------------------------------------
	//MODULE ORBIT CONTROL
	//-------------------------------------------------------------
	const controls = new OrbitControls(camera, renderer.domElement);
	controls.screenSpacePanning = true;

	//-------------------------------------------------------------
	//SCENE
	//-------------------------------------------------------------
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x222222);

	//-------------------------------------------------------------
	//GEOMETRIE TEST (point zero)
	//-------------------------------------------------------------
	/*
	const geometry = new THREE.BoxGeometry(1, 1, 1);
	const material = new THREE.MeshBasicMaterial({
		color: 0x00ff00
	});
	const cube = new THREE.Mesh(geometry, material);
	scene.add(cube);
	*/
	
	//-------------------------------------------------------------
	//SVG
	//-------------------------------------------------------------
	fontLoader = new THREE.FontLoader();
	fontLoader.load('fonts/FauneText_Regular.json', function (font) {
		fontFaune = font;
		
		parseMySVG("expoModele2.svg");
		//-------------------------------------------------------------
		//request for animation and refresh
		//-------------------------------------------------------------
		document.ArrayWall = ArrayWall;
		animate();

		window.addEventListener('resize', onWindowResize, false);
	});

	//-------------------------------------------------------------
	//AD DEVENT LISCTENR CLICK
	//-------------------------------------------------------------
	//window.addEventListener('click', onMouseclick, false);
	$("#part_left").click(onMouseclick);

	/*
	{
		"x": -69.9571585577772,
		"y": 80.2343278756212,
		"z": 
	}
	
	{
    "_x": ,
    "_y": -0.380563000401648,
    "_z": -0.18308687942172827,
    "_order": "XYZ"
	}
	*/
	camera.position.set( -69.9571585577772, 80.2343278756212, 124.65866758551947 );
	camera.rotation.set( -0.4624381922089351, -0.380563000401648, -0.18308687942172827 );
}

//-------------------------------------------------------------
//ANIMATE
//-------------------------------------------------------------
function animate() {
	requestAnimationFrame(animate);
	render();
	//stats.update();
}

//-------------------------------------------------------------
//RENDER
//-------------------------------------------------------------
var time = 0;
function render() {
	if (time > 30) runRayCaster();
	time++;
	renderer.render(scene, camera);
}

//-------------------------------------------------------------
//RESIZE for 3D object
//-------------------------------------------------------------
function onWindowResize(){
    container = document.getElementById('part_left');
	camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(container.offsetWidth, container.offsetHeight);

	console.log(camera);
}

var help = "lll";
//-------------------------------------------------------------
//PARSE THE SVG
//-------------------------------------------------------------
function parseMySVG(url) {
	var scope = {};

	var loader = new THREE.FileLoader(scope.manager);
	loader.setPath(scope.path);
	loader.setRequestHeader(scope.requestHeader);
	loader.setWithCredentials(scope.withCredentials);
	loader.load(url, function (text) {

		var altitudeTab = [
			60,
			40,
			20,
			0,
			-20,
			-40,
			-60
		];

		const parser = new DOMParser();
		const dom = parser.parseFromString(text, "application/xml");
		help = dom;

		//console.log(help);
		
		var tabOfExpo = ["Expo1","Expo2","Expo3","Expo4","Expo5","Expo6"];
		//var tabOfExpo = ["Expo1","Expo2","Expo3"];

		for (var i = 0;i<tabOfExpo.length;i++){
			var paths = parsePathNode(help.getElementById(tabOfExpo[i]));
			var salleName = help.getElementById("Expo"+(i+1)).getAttribute("salle");
			traceWall(scene, paths, altitudeTab[i], salleName, tabOfExpo[i]);

			var tabCircle = dom.getElementById("layer"+(i+1)).getElementsByTagName("circle");
			traceCicle(scene, tabCircle, altitudeTab[i], salleName);
		}

		//lignes entre les points
		ArrayCylinderCopy = [...ArrayCylinder];
		while (ArrayCylinderCopy.length > 0) interCylindre(scene);
	});
}


//-------------------------------------------------------------
//Fonction d'un tracé de plateau
//-------------------------------------------------------------
var ArrayLineWall = [];
var ArrayWall = [];
var ArrayTitre = [];

function traceWall(sceneRef, paths, hauteur, salleName, idName) {
	const matLine = new THREE.LineDashedMaterial({
		color: defaultColor_linewall,
		linewidth: 0.2,
		scale: 1,
		opacity: 0.1,
		dashSize: 10,
		gapSize: 4,
		depthTest: true
	});

	const mat = new THREE.MeshBasicMaterial({
		color: 0x00ff00
	});


	const group = new THREE.Group();
	group.scale.multiplyScalar(0.2);

	var shapesA = paths.toShapes(true);

	var c1 = shapesA[0].curves[0];
	var c2 = shapesA[0].curves[shapesA.length - 1];

	var c_res = new THREE.LineCurve(new THREE.Vector2(c1.v1.x, c1.v1.y), new THREE.Vector2(c2.v2.x, c2.v2.y));
	shapesA[0].curves.push(c_res);

	for (var i = 0; i < shapesA.length; i++) {
		let shape3d = new THREE.BufferGeometry().setFromPoints(shapesA[i].getPoints());
		let line = new THREE.Line(shape3d, matLine);

		line.computeLineDistances();

		line.salleName = salleName;
		//line.type = "line";
		group.add(line);
		ArrayLineWall.push(line);
	}
	
	
	group.position.x = -50;
	group.position.z = -25;
	group.position.y = hauteur;
	
	group.rotation.z += 3.14 * 2;
	group.rotation.x += 3.14 / 2;
	
	
	//-------------------------------------------------------------
	// géométrie construction
	// j'en suis la (faire des meshs)
	//console.log("Shape construct");
	//console.log(shapesA[0].getPoints());
	
	var tabOfPoints = shapesA[0].getPoints();
	
	var forme = new THREE.Shape();
	forme.moveTo(tabOfPoints[0].x, tabOfPoints[0].y)
	
	for (var i = 1; i < tabOfPoints.length; i++) {
		//console.log("POINT > " + tabOfPoints[i].x);
		forme.lineTo(tabOfPoints[i].x, tabOfPoints[i].y);
	}

	let geometry = new THREE.ShapeGeometry(forme);
	let mesh = new THREE.Mesh(geometry,
		new THREE.MeshToonMaterial({
			transparent: true,
			opacity: 0.2,
			emissive: 0x777777,
			//alphaToCoverage: 1.0,
			color: 0x888888,
			side: THREE.DoubleSide,
			depthTest: true
		})
	);
	group.add(mesh);
	ArrayWall.push(mesh);

	group.type = "wall";
	group.salleName = salleName;
	group.idName = idName;

	// géométrie construction
	//-------------------------------------------------------------

	// géométrie du titre
	//-------------------------------------------------------------
	
	var titre = new THREE.TextGeometry(salleName, {
		font: fontFaune,
		size: 3,
		height: 0,
		curveSegments: 12,
		bevelEnabled: false
	});
	//geometry.center();

	var matText = new THREE.MeshBasicMaterial({
		color: defaultColor_titre, 
		side: THREE.DoubleSide
	});
	var meshText = new THREE.Mesh(titre, matText);
	meshText.name = salleName;

	ArrayTitre.push(meshText);

	//var pos = refObject.getWorldPosition(pos);
	//console.log(pos);
	//meshText.rotation.x += 3.14 / 2;
	
	meshText.position.y = hauteur+5;
	meshText.position.z = -10;
	meshText.position.x = -50;
	
	//meshText.rotation.x = -45;

	//meshText.moveTo(10,0);
	//meshText.position.y = ;
	//meshText.position.z = -25;
	sceneRef.add(meshText);
	

	sceneRef.add(group);
}

//-------------------------------------------------------------
//Fonction d'un tracé de cercle
//-------------------------------------------------------------

var ArrayCylinder = [];
var ArrayCylinderCopy = [];

function traceCicle(sceneRef, paths, hauteur, salleName) {
	const group = new THREE.Group();
	group.scale.multiplyScalar(0.2);

	for (var i = 0; i < paths.length; i++) {
		const geometry = new THREE.CylinderGeometry(8, 8, 3, 16);
		//const geometry = new THREE.BoxGeometry( 10,10,10 );
		const material = new THREE.MeshBasicMaterial({
			color: defaultColor_point
		});
		const cylinder = new THREE.Mesh(geometry, material);

		//console.log("cx" + paths[i].getAttribute("cx"));

		cylinder.position.x = paths[i].getAttribute("cx");
		cylinder.position.z = paths[i].getAttribute("cy");
		cylinder.expoName = paths[i].getAttribute("nom");
		cylinder.pieceId = paths[i].getAttribute("pieceId")
		cylinder.type = "expo";
		cylinder.salleName = salleName;

		ArrayCylinder.push(cylinder);

		//console.log(ArrayCylinder)

		group.add(cylinder);
	}

	group.position.x = -50;
	group.position.z = -25;
	group.position.y = hauteur;

	group.rotation.z += 3.14 * 2;
	//group.rotation.x += 3.14/2;

	sceneRef.add(group);
}

//-------------------------------------------------------------
//Intercylindre
//-------------------------------------------------------------

function interCylindre(sceneRef) {

	const matLine2 = new THREE.LineDashedMaterial({
		color: 0x00ddaa,
		linewidth: 0.5,
		scale: 2,
		dashSize: 1,
		gapSize: 1,
		opacity: 0.3,
		transparent :true,
		depthTest: false
	});

	var cameraPos = new THREE.Vector3();
	var pos0 = ArrayCylinderCopy[0].getWorldPosition(cameraPos);
	const points = [];

	points.push(new THREE.Vector3(pos0.x, pos0.y, pos0.z));

	for (var i = 0; i < ArrayCylinder.length; i++) {
		//console.log(ArrayCylinderCopy[i].expoName);
		//console.log(ArrayCylinder[i].getWorldPosition());
		if (ArrayCylinderCopy[0] != undefined && ArrayCylinderCopy[i] != undefined) {
			if (ArrayCylinderCopy[0].expoName == ArrayCylinderCopy[i].expoName) {
				//console.log("fond!");
				var cameraPos = new THREE.Vector3();

				points.push(new THREE.Vector3(
					ArrayCylinderCopy[i].getWorldPosition(cameraPos).x,
					ArrayCylinderCopy[i].getWorldPosition(cameraPos).y,
					ArrayCylinderCopy[i].getWorldPosition(cameraPos).z,
					//ArrayCylinderCopy[i].position.y,
					//ArrayCylinderCopy[i].position.z
				));
				//ArrayCylinderCopy.splice(i, 1);
			}
		}
	}

	const geometry = new THREE.BufferGeometry().setFromPoints(points);
	
	const line = new THREE.Line(geometry, matLine2);
	line.computeLineDistances();
	
	sceneRef.add(line);
	ArrayCylinderCopy.splice(0, 1);

	/*
	console.log("Objet text ! --------------------------");
	console.log(ArrayCylinder[0]);
	*/
}
//-------------------------------------------------------------
//RAYCASTER
//-------------------------------------------------------------
const raycaster = new THREE.Raycaster();
const mouseRay = new THREE.Vector2();

let INTERSECTED;
//-------------------------------------------------------------
//MOUSE EVENT MOVE
//-------------------------------------------------------------
window.addEventListener('mousemove', onMouseMove, false);

function onMouseMove(event) {
	//mouseRay.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	//mouseRay.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	/*
		position en pixel de la scene de rendu
	*/
	var canvasTarget = $("#part_left canvas")[0].getBoundingClientRect();
	
	var pixelDens = window.devicePixelRatio;
	
	mouseRay.x = ((event.clientX*pixelDens - canvasTarget.x*pixelDens) / (renderer.domElement.width)) * 2 - 1;
	mouseRay.y = -((event.clientY*pixelDens - canvasTarget.y*pixelDens) / (renderer.domElement.height)) * 2 + 1;
}
//-------------------------------------------------------------
//click global
//-------------------------------------------------------------
//window.addEventListener('click', onMouseclick, false);

function onMouseclick(event) {	
	salleSelected = salleOver;
	expoSelected = expoOver;

	console.log(salleSelected);
	console.log(expoSelected);

	//$("#debug")[0].innerText = "debug\n";
	if(expoSelected.length>0){
		//$("#debug")[0].innerText += expoSelected[0].pieceId + "\n";
		drawDataBase(expoSelected[0].pieceId);
	}

	if(expoSelected.length==0 && salleSelected.length>0){
		console.log("salle : "+salleSelected[0].idName);
		fillSalleTexte(salleSelected[0].idName);
		unFillCartel();
	}

	if(expoSelected.length==0 && salleSelected.length==0){
		$("#part_right").load("presentationExpo.html");
		unFillCartel();
	}

	console.log(ArrayTitre);
}

var salleSelected = [];
var expoSelected = [];

//-------------------------------------------------------------
//RAYCSTER EVENT
//-------------------------------------------------------------
var expoSelected_name = "none";
var salleSelected_name = "none";

var salleOver = [];
var expoOver = [];

function runRayCaster() {
	raycaster.setFromCamera(mouseRay, camera);
	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects(scene.children, true);

	//if( intersects.length>0 )console.log(intersects.parent.type);
	salleOver = [];
	expoOver = [];

	if (intersects.length > 0) {
		//console.log(intersects);
		//une salle
		for (let i = 0; i < intersects.length; i++) {
			//intersects[0].object.material.color.set(0xffff00);
			if (intersects[i].object != undefined &&
				intersects[i].object.parent != undefined &&
				intersects[i].object.parent.type != undefined &&
				intersects[i].object.parent.type == "wall") {
				//console.log("is a wall");
				//console.log(intersects[i].object.parent.salleName);
				salleOver.push(intersects[i].object.parent);
			}

			if (intersects[i].object != undefined &&
				intersects[i].object.type != undefined &&
				intersects[i].object.type == "expo") {
				//console.log("is a expo");
				expoOver.push(intersects[i].object);
			}
		}



	}

	//if(salleOver.length>0)console.log(salleOver);
	//-------------------------------------------------------------
	//debug mode in debug view
	//-------------------------------------------------------------
	refreshGraphic();
}

//-------------------------------------------------------------
//REFRESH GRAPHICS
//-------------------------------------------------------------
var colorHover = 0xffff00;
var colorSelected = 0x00ffff;

var defaultColor_point = 0x777777;
var defaultColor_wall = 0x888888;
var defaultColor_linewall = 0x888888;

var defaultColor_titre = 0xffffff

function refreshGraphic() {
	//--------------------------------------------------------
	//reboot color
	//--------------------------------------------------------

	//reboot cylinder
	for (let j = 0; j < ArrayCylinder.length; j++) {
		ArrayCylinder[j].material.color.set(defaultColor_point);
	}
	
	//reboot line wall
	for (let j = 0; j < ArrayLineWall.length; j++) {
		ArrayLineWall[j].material.color.set(defaultColor_linewall);
	}

	//array wall
	for (let j = 0; j < ArrayWall.length; j++) {
		ArrayWall[j].material.color.set(0x777777);
		ArrayWall[j].material.opacity = 0.1;
	}

	//array titre
	for (let j = 0; j < ArrayTitre.length; j++) {
		ArrayTitre[j].material.color.set(defaultColor_titre);
	}

	drawOff();

	//--------------------------------------------------------
	//over
	//--------------------------------------------------------
	if (salleOver.length > 0 && expoOver.length == 0) {
		//document.help = salleOver[0];
		salleOver[0].children[0].material.color.set(colorHover);
		salleOver[0].children[1].material.color.set(0x999999);
		
		salleOver[0].children[1].material.opacity = 0.5;

		$(".textExpo").remove();

		//nom de la salle
		//console.log(salleOver[0].salleName);
		lightTitre(salleOver[0].salleName);

		lightExpo(salleOver[0].salleName);
	}

	else if (salleOver.length > 0 && expoOver.length > 0) {
		document.help = expoOver[0];

		expoOver[0].material.color.set(colorHover);
		salleOver[0].children[1].material.opacity = 0.5;
		
		//drawOver(expoOver[0]);
		drawOver2D(expoOver[0]);

		for (var i = 0; i < salleOver.length; i++) {
			if (expoOver[0].salleName == salleOver[i].salleName) {
				salleOver[i].children[0].material.color.set(colorHover);
				salleOver[i].children[1].material.color.set(0x999999);
			}
		}
		//salleOver[0].children[1].material.color.set(0x999999);
		lightTitre(salleOver[0].salleName);
		
	} else{

		$(".textExpo").remove();

	}

	//--------------------------------------------------------
	//selectionné
	//--------------------------------------------------------
	if (salleSelected.length > 0 && expoSelected.length == 0) {
		//document.help = salleOver[0];
		salleSelected[0].children[0].material.color.set(colorSelected);
		salleSelected[0].children[1].material.color.set(colorSelected);

		lightTitre(salleSelected[0].salleName);
	}

	if (salleSelected.length > 0 && expoSelected.length > 0) {
		document.help = expoSelected[0];

		expoSelected[0].material.color.set(0x00ffff);
		for (var i = 0; i < salleSelected.length; i++) {
			if (expoSelected[0].salleName == salleSelected[i].salleName) {
				salleSelected[i].children[0].material.color.set(colorSelected);
				salleSelected[i].children[1].material.color.set(colorSelected);
			}
		}
		//salleOver[0].children[1].material.color.set(0x999999);
		lightTitre(salleSelected[0].salleName);
	}
}

function lightTitre(titre){
	for(var i=0; i<ArrayTitre.length; i++){
		ArrayTitre[i].material.color.set(0x444444);
	}


	for(var i=0; i<ArrayTitre.length; i++){
		if(ArrayTitre[i].name == titre){
			ArrayTitre[i].material.color.set(0xFFFFFF);
		}
	}

}

function lightExpo(expo){
	//console.log(ArrayCylinder);
	
	for(var i=0; i<ArrayCylinder.length; i++){
		if(ArrayCylinder[i].salleName == expo){
			ArrayCylinder[i].material.color.set(0xdddddd);
		}
	}
	
}

//-------------------------------------------------------------
/*
	var expoSelected_name = "none";
	var salleSelected_name = "none";
	var salleOver = [];
	var expoOver = [];
*/
//-------------------------------------------------------------
var meshText;

function drawOff(){
	delete3DOBJ('titre');
}


function drawOver(refObject) {
	//console.log(refObject);

	if(refObject.expoName!=""){
		delete3DOBJ('titre');
	}
	//scene.remove(meshText);

	const geometry = new THREE.TextGeometry(refObject.expoName, {
		font: fontFaune,
		size: 5,
		height: 0,
		curveSegments: 12,
		bevelEnabled: false
	});
	//geometry.center();

	const material = new THREE.MeshBasicMaterial({
		color: 0xffffff
	});
	var meshText = new THREE.Mesh(geometry, material);
	meshText.name = "titre";

	var cameraPostion = new THREE.Vector3();
	var pos = refObject.getWorldPosition(cameraPostion);
	//console.log(pos);

	meshText.position.x = pos.x;
	meshText.position.y = pos.y + 4;
	meshText.position.z = pos.z;

	scene.add(meshText);
}

function delete3DOBJ(objName) {
	var selectedObject = scene.getObjectByName(objName);
	scene.remove(selectedObject);
}

//-------------------------------------------------------------
//drawOver2D(expoOver[0]);
//-------------------------------------------------------------
var lastRefObject=null;

function drawOver2D(refObject){
	//console.log(refObject);
	
	if(refObject!=null){
		$(".textExpo").remove();

		var cameraPostion = new THREE.Vector3();
		var pos = refObject.getWorldPosition(cameraPostion);
		var pos2D = toScreenXY(pos,
			camera,
			$("#part_left canvas")[0]
		);

		//console.log(pos)

		var text2 = document.createElement('div');
		
		text2.innerHTML = refObject.expoName;
		text2.setAttribute("class", "textExpo");
		text2.style.top = (pos2D.y/window.devicePixelRatio)+20 + "px";
		text2.style.left = (pos2D.x/window.devicePixelRatio) + 'px';
		document.body.appendChild(text2);

		lastRefObject=refObject;
	}
}

function toScreenXY( position, camera, div ) {
	var pos = position.clone();
	var projScreenMat = new THREE.Matrix4();
	projScreenMat.multiply( camera.projectionMatrix, camera.matrixWorldInverse );
	projScreenMat.multiplyVector3( pos );

	var offset = findOffset(div);

	return { x: ( pos.x + 1 ) * div.width / 2 + offset.left,
		 y: ( - pos.y + 1) * div.height / 2 + offset.top };

}
function findOffset(element) { 
  var pos = new Object();
  pos.left = pos.top = 0;        
  if (element.offsetParent)  
  { 
	do  
	{ 
	  pos.left += element.offsetLeft; 
	  pos.top += element.offsetTop; 
	} while (element = element.offsetParent); 
  } 
  return pos;
} 

function fillSalleTexte(salle){
	$('#part_right').load("salle_"+salle+".html");
}