
//import * as THREE from '/lib/three.js';
//import THREE from '/lib/three.js';

import * as THREE from '/build/three.module.js';
import { OrbitControls } from './lib/jsm/controls/OrbitControls.js';
import { SVGLoader } from './lib/jsm/loaders/SVGLoader.js';


$(document).ready(function () {
	console.log("ready script 3D");
	init3D();
});


//-------------------------------------------------------------
//INIT 
//-------------------------------------------------------------
var container,renderer, stats, scene, camera, gui, guiData;
var loader;

function init3D(){
	container = document.getElementById('part_left');

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( container.offsetWidth, container.offsetHeight );
	container.appendChild( renderer.domElement );

	//-------------------------------------------------------------
	//CAMERA
	//-------------------------------------------------------------
	camera = new THREE.PerspectiveCamera( 50, container.offsetWidth / container.offsetHeight, 1, 1000 );
	camera.position.set( 100, 100, 100 );
	camera.lookAt(0,0,0);

	//-------------------------------------------------------------
	//MODULE ORBIT CONTROL
	//-------------------------------------------------------------
	const controls = new OrbitControls( camera, renderer.domElement );
	controls.screenSpacePanning = true;

	//-------------------------------------------------------------
	//SCENE
	//-------------------------------------------------------------
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x444444 );

	//-------------------------------------------------------------
	//GEOMETRIE TEST
	//-------------------------------------------------------------
	const geometry = new THREE.BoxGeometry( 1, 1, 1 );
	const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
	const cube = new THREE.Mesh( geometry, material );
	scene.add( cube );
	
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

	parseMySVG("expoModele.svg");
	
	//-------------------------------------------------------------
	//request for animation and refresh
	//-------------------------------------------------------------
	animate();
}




//-------------------------------------------------------------
//ANIMATE
//-------------------------------------------------------------
function animate() {
	requestAnimationFrame( animate );

	render();
	//stats.update();
}

function render() {
	renderer.render( scene, camera );
}

var help="lll";

function parseMySVG(url){	
	var scope = {};

	var loader = new THREE.FileLoader( scope.manager );
	loader.setPath( scope.path );
	loader.setRequestHeader( scope.requestHeader );
	loader.setWithCredentials( scope.withCredentials );
	loader.load( url, function ( text ) {


		const matLine = new THREE.LineDashedMaterial( {
			color: 0xffffff,
			linewidth: 1,
			scale: 1,
			dashSize: 10,
			gapSize: 4
		} );


		const parser = new DOMParser();
		const dom = parser.parseFromString(text, "application/xml");
		help = dom;

		console.log(help);

		//array > type : ShapePath
		var paths = parsePathNode(help.childNodes[0].childNodes[5].childNodes[1]);
		
		console.log("paths");
		console.log(help.getElementById("wall2"));

		var paths2 = parsePathNode(help.getElementById("wall2"));
		

		traceWall(scene,paths,30,matLine);

		traceWall(scene,paths2,-30,matLine);

		traceWall(scene,paths,0,matLine);

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


function traceWall(sceneRef,paths,hauteur,mat){


	

	const group = new THREE.Group();
	group.scale.multiplyScalar( 0.2 );

	const shapesA = paths.toShapes( true );

	var c1 = shapesA[0].curves[0];
	var c2 = shapesA[0].curves[shapesA.length-1];

	var c_res = new THREE.LineCurve(new THREE.Vector2(c1.v1.x,c1.v1.y),new THREE.Vector2(c2.v2.x,c2.v2.y));
	shapesA[0].curves.push(c_res);

	for (var i = 0; i < shapesA.length; i++){
		let shape3d = new THREE.BufferGeometry().setFromPoints(shapesA[i].getPoints());
		let line = new THREE.Line(shape3d, mat);
		line.computeLineDistances();
		group.add(line);
	}

	group.position.x = -50;
	group.position.z = -25;
	group.position.y = hauteur;

	group.rotation.z += 3.14*2;
	group.rotation.x += 3.14/2;
	sceneRef.add( group );
}