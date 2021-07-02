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
});


//-------------------------------------------------------------
//INIT 
//-------------------------------------------------------------
var container, renderer, stats, scene, camera, gui, guiData;

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
	scene.background = new THREE.Color(0x444444);

	//-------------------------------------------------------------
	//GEOMETRIE TEST
	//-------------------------------------------------------------
	const geometry = new THREE.BoxGeometry(1, 1, 1);
	const material = new THREE.MeshBasicMaterial({
		color: 0x00ff00
	});
	const cube = new THREE.Mesh(geometry, material);
	scene.add(cube);

	//-------------------------------------------------------------
	//SVG
	//-------------------------------------------------------------
	/*
	loader = new SVGLoader();
	console.log("loader");
	console.log(loader);

	loader.load("expoModele.svg", function ( data ) {
		console.log(data);
	});
	*/

	


	fontLoader = new THREE.FontLoader();
	fontLoader.load('fonts/FauneText_Regular.json', function (font) {
		fontFaune = font;
		
		parseMySVG("expoModele.svg");
		//-------------------------------------------------------------
		//request for animation and refresh
		//-------------------------------------------------------------
		document.ArrayWall = ArrayWall;
		animate();
	});

	//-------------------------------------------------------------
	//AD DEVENT LISCTENR CLICK
	//-------------------------------------------------------------
	
	//window.addEventListener('click', onMouseclick, false);
	$("#part_left").click(onMouseclick);

}


//-------------------------------------------------------------
//ANIMATE
//-------------------------------------------------------------
function animate() {
	requestAnimationFrame(animate);
	render();
	//stats.update();
}

var time = 0;

function render() {

	if (time > 60) runRayCaster();
	time++;

	renderer.render(scene, camera);
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
			-30,
			0,
			30
		];

		const parser = new DOMParser();
		const dom = parser.parseFromString(text, "application/xml");
		help = dom;

		console.log(help);

		//array > type : ShapePath
		var paths = parsePathNode(help.childNodes[0].childNodes[5].childNodes[1]);

		console.log("paths");
		//console.log(help.getElementById("wall2"));
		var paths2 = parsePathNode(help.getElementById("wall2"));
		var paths3 = parsePathNode(help.getElementById("wall3"));

		var salleName1 = help.getElementById("wall1").getAttribute("salle");
		traceWall(scene, paths, altitudeTab[0], salleName1);

		var salleName2 = help.getElementById("wall2").getAttribute("salle");
		traceWall(scene, paths2, altitudeTab[1], salleName2);

		var salleName3 = help.getElementById("wall3").getAttribute("salle");
		traceWall(scene, paths3, altitudeTab[2], salleName3);

		console.log("--------------------------------------------");
		console.log(help.getElementById("layer1").getElementsByTagName("circle"));

		//-------------------------------------------------------------
		//PARSE CIRCLE
		//-------------------------------------------------------------
		var tabCircle1 = dom.getElementById("layer1").getElementsByTagName("circle");
		var tabCircle2 = dom.getElementById("layer2").getElementsByTagName("circle");
		var tabCircle3 = dom.getElementById("layer3").getElementsByTagName("circle");
		traceCicle(scene, tabCircle1, altitudeTab[0], salleName1);
		traceCicle(scene, tabCircle2, altitudeTab[1], salleName2);
		traceCicle(scene, tabCircle3, altitudeTab[2], salleName3);

		ArrayCylinderCopy = [...ArrayCylinder];

		while (ArrayCylinderCopy.length > 0) interCylindre(scene);

		/*
		const material = new THREE.MeshBasicMaterial( {
			color: new THREE.Color().setStyle( 0xffffff ),
			opacity: 1,
			side: THREE.DoubleSide,
			depthWrite: false,
			wireframe: true
		} );

		const group = new THREE.Group();
		group.scale.multiplyScalar( 0.2 );
		
		//group.rotation.x += 3.14;
		//group.scale.y *= - 1;

		console.log("paths.leng : "+paths);
		console.log(paths);
		
		const shapes = paths.toShapes( true );

		for ( let j = 0; j < shapes.length; j ++ ) {
			const shape = shapes[ j ];
			console.log(shape);
			const geometry = new THREE.ShapeGeometry( shape );
			const mesh = new THREE.Mesh( geometry, material );
			//group.add( mesh );
		}
		

		const shapesA = paths.toShapes( true );

		console.log("shapesA");
		console.log(shapesA);

		var c1 = shapesA[0].curves[0];
		var c2 = shapesA[0].curves[shapesA.length-1];

		var c_res = new THREE.LineCurve(new THREE.Vector2(c1.v1.x,c1.v1.y),new THREE.Vector2(c2.v2.x,c2.v2.y));
		shapesA[0].curves.push(c_res);

		for (var i = 0; i < shapesA.length; i++){
			let shape3d = new THREE.BufferGeometry().setFromPoints(shapesA[i].getPoints());
			let line = new THREE.Line(shape3d, new THREE.LineBasicMaterial());
			group.add(line);
		}
		
		/* ---
		for ( let i = 0; i < paths.length; i ++ ) {
			const shapes = path.toShapes( true );

			for ( let j = 0; j < shapes.length; j ++ ) {
				const shape = shapes[ j ];
				console.log(shape);
				const geometry = new THREE.ShapeGeometry( shape );
				const mesh = new THREE.Mesh( geometry, material );
				group.add( mesh );
			}
		}
		--- */

		/*
		group.position.x = -50;
		group.position.z = -25;
		group.position.y = 0;

		group.rotation.z += 3.14*2;
		group.rotation.x += 3.14/2;
		scene.add( group );
		*/

	});
}


//-------------------------------------------------------------
//Fonction d'un tracé de plateau
//-------------------------------------------------------------
var ArrayLineWall = [];
var ArrayWall = [];

function traceWall(sceneRef, paths, hauteur, salleName) {
	const matLine = new THREE.LineDashedMaterial({
		color: 0xffffff,
		linewidth: 1,
		scale: 1,
		dashSize: 10,
		gapSize: 5,
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
	console.log("Shape construct");
	console.log(shapesA[0].getPoints());

	var tabOfPoints = shapesA[0].getPoints();

	var forme = new THREE.Shape();
	forme.moveTo(80, 20)

	for (var i = 1; i < tabOfPoints.length; i++) {
		console.log("POINT > " + tabOfPoints[i].x);
		forme.lineTo(tabOfPoints[i].x, tabOfPoints[i].y);
	}

	let geometry = new THREE.ShapeGeometry(forme);
	let mesh = new THREE.Mesh(geometry,
		new THREE.MeshToonMaterial({
			transparent: true,
			opacity: 0.8,
			emissive: 0x777777,
			alphaToCoverage: 1.0,
			color: 0x888888,
			side: THREE.DoubleSide,
			depthTest: true
		})
	);
	group.add(mesh);
	ArrayWall.push(mesh);

	group.type = "wall";
	group.salleName = salleName;

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
		color: 0xffffff, 
		side: THREE.DoubleSide
	});
	var meshText = new THREE.Mesh(titre, matText);
	meshText.name = salleName;

	//var pos = refObject.getWorldPosition(pos);
	//console.log(pos);
	//meshText.rotation.x += 3.14 / 2;
	
	meshText.position.y = hauteur;
	meshText.position.z = -30;
	meshText.position.x = -30;
	
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
		const geometry = new THREE.CylinderGeometry(10, 10, 3, 16);
		//const geometry = new THREE.BoxGeometry( 10,10,10 );
		const material = new THREE.MeshBasicMaterial({
			color: 0xffffff
		});
		const cylinder = new THREE.Mesh(geometry, material);

		console.log("cx" + paths[i].getAttribute("cx"));

		cylinder.position.x = paths[i].getAttribute("cx");
		cylinder.position.z = paths[i].getAttribute("cy");
		cylinder.expoName = paths[i].getAttribute("nom");
		cylinder.pieceId = paths[i].getAttribute("pieceId")
		cylinder.type = "expo";
		cylinder.salleName = salleName;

		ArrayCylinder.push(cylinder);

		console.log(ArrayCylinder)

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
		linewidth: 2,
		scale: 1,
		//dashSize: 10,
		//gapSize: 10,
		opacity: 0.3,
		//transparent :true,
		depthTest: true
	});

	var pos0 = ArrayCylinderCopy[0].getWorldPosition();
	const points = [];

	points.push(new THREE.Vector3(pos0.x, pos0.y, pos0.z));

	for (var i = 0; i < ArrayCylinder.length; i++) {
		//console.log(ArrayCylinderCopy[i].expoName);
		//console.log(ArrayCylinder[i].getWorldPosition());
		if (ArrayCylinderCopy[0] != undefined && ArrayCylinderCopy[i] != undefined) {
			if (ArrayCylinderCopy[0].expoName == ArrayCylinderCopy[i].expoName) {
				console.log("fond!");
				points.push(new THREE.Vector3(
					ArrayCylinderCopy[i].getWorldPosition().x,
					ArrayCylinderCopy[i].getWorldPosition().y,
					ArrayCylinderCopy[i].getWorldPosition().z,
					//ArrayCylinderCopy[i].position.y,
					//ArrayCylinderCopy[i].position.z
				));
				//ArrayCylinderCopy.splice(i, 1);
			}
		}
	}

	const geometry = new THREE.BufferGeometry().setFromPoints(points);
	const line = new THREE.Line(geometry, matLine2);
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
	mouseRay.x = ((event.clientX - 30) / renderer.domElement.width) * 2 - 1;
	mouseRay.y = -((event.clientY - 10) / renderer.domElement.height) * 2 + 1;
}
//-------------------------------------------------------------
//click global
//-------------------------------------------------------------
//window.addEventListener('click', onMouseclick, false);

function onMouseclick(event) {
	console.log(expoSelected);

	salleSelected = salleOver;
	expoSelected = expoOver;

	//$("#debug")[0].innerText = "debug\n";
	if(expoSelected.length>0){
		//$("#debug")[0].innerText += expoSelected[0].pieceId + "\n";
		drawDataBase(expoSelected[0].pieceId);
	}
}

var salleSelected = [];
var expoSelected = [];

//-------------------------------------------------------------
//RAYCSTER EVENT
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
	/*
	if( intersects.length>0 ){
		//-----------------------------------------------------
		for ( let i = 0; i < intersects.length; i ++ ) {
			//intersects[0].object.material.color.set(0xffff00);
		}
		
		console.log(intersects[0]);	
		
		if(intersects[0].object.expoName!=null && intersects[0].object.expoName!=undefined){
			intersects[0].object.material.color.set(0xff0000);
			expoSelected = intersects[0].object.expoName;
		}

		if(intersects[0].object.salleName!=null && intersects[0].object.salleName!=undefined){
			intersects[0].object.material.color.set(0xffff00);
			salleSelected = intersects[0].object.salleName;
		}
	}else{
		for ( let j = 0; j < ArrayCylinder.length; j ++ ){
			ArrayCylinder[j].material.color.set( 0xffffff );
		}
		for ( let j = 0; j < ArrayLineWall.length; j ++ ){
			ArrayLineWall[j].material.color.set( 0xffffff );
		}

		expoSelected="none";
		salleSelected="none";
	}
	*/
}

//-------------------------------------------------------------
//REFRESH GRAPHICS
//-------------------------------------------------------------
var colorHover = 0xffff00;
var colorSelected = 0x00ffff;

function refreshGraphic() {
	//rebootColor
	for (let j = 0; j < ArrayCylinder.length; j++) {
		ArrayCylinder[j].material.color.set(0xffffff);
	}
	for (let j = 0; j < ArrayLineWall.length; j++) {
		ArrayLineWall[j].material.color.set(0xffffff);
	}
	for (let j = 0; j < ArrayLineWall.length; j++) {
		ArrayWall[j].material.color.set(0x777777);
	}

	//--------------------------------------------------------
	//over
	//--------------------------------------------------------
	if (salleOver.length > 0 && expoOver.length == 0) {
		//document.help = salleOver[0];
		salleOver[0].children[0].material.color.set(colorHover);
		salleOver[0].children[1].material.color.set(0x999999);
	}

	if (salleOver.length > 0 && expoOver.length > 0) {
		document.help = expoOver[0];

		expoOver[0].material.color.set(colorHover);
		drawOver(expoOver[0]);

		for (var i = 0; i < salleOver.length; i++) {
			if (expoOver[0].salleName == salleOver[i].salleName) {
				salleOver[i].children[0].material.color.set(colorHover);
				salleOver[i].children[1].material.color.set(0x999999);
			}
		}
		//salleOver[0].children[1].material.color.set(0x999999);
	}

	//--------------------------------------------------------
	//selectionné
	//--------------------------------------------------------
	if (salleSelected.length > 0 && expoSelected.length == 0) {
		//document.help = salleOver[0];
		salleSelected[0].children[0].material.color.set(colorSelected);
		salleSelected[0].children[1].material.color.set(colorSelected);
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

function drawOver(refObject) {
	//console.log(refObject);

	if(refObject.expoName!=""){
		delete3DOBJ('titre');
	}
	//scene.remove(meshText);

	const geometry = new THREE.TextGeometry(refObject.expoName, {
		font: fontFaune,
		size: 6,
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