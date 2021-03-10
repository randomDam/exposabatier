//import * as THREE from '/build/three.module.js';

parsePathNode = function (node) {

	var path = new THREE.ShapePath();

	var point = new THREE.Vector2();
	var control = new THREE.Vector2();

	var firstPoint = new THREE.Vector2();
	var isFirstPoint = true;
	var doSetFirstPoint = false;

	var d = node.getAttribute('d');

	// console.log( d );

	var commands = d.match(/[a-df-z][^a-df-z]*/ig);

	for (var i = 0, l = commands.length; i < l; i++) {

		var command = commands[i];

		var type = command.charAt(0);
		var data = command.substr(1).trim();

		if (isFirstPoint === true) {

			doSetFirstPoint = true;
			isFirstPoint = false;

		}

		switch (type) {

			case 'M':
				var numbers = parseFloats(data);
				for (var j = 0, jl = numbers.length; j < jl; j += 2) {

					point.x = numbers[j + 0];
					point.y = numbers[j + 1];
					control.x = point.x;
					control.y = point.y;

					if (j === 0) {

						path.moveTo(point.x, point.y);

					} else {

						path.lineTo(point.x, point.y);

					}

					if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);

				}

				break;

			case 'H':
				var numbers = parseFloats(data);

				for (var j = 0, jl = numbers.length; j < jl; j++) {

					point.x = numbers[j];
					control.x = point.x;
					control.y = point.y;
					path.lineTo(point.x, point.y);

					if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);

				}

				break;

			case 'V':
				var numbers = parseFloats(data);

				for (var j = 0, jl = numbers.length; j < jl; j++) {

					point.y = numbers[j];
					control.x = point.x;
					control.y = point.y;
					path.lineTo(point.x, point.y);

					if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);

				}

				break;

			case 'L':
				var numbers = parseFloats(data);

				for (var j = 0, jl = numbers.length; j < jl; j += 2) {

					point.x = numbers[j + 0];
					point.y = numbers[j + 1];
					control.x = point.x;
					control.y = point.y;
					path.lineTo(point.x, point.y);

					if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);

				}

				break;

			case 'C':
				var numbers = parseFloats(data);

				for (var j = 0, jl = numbers.length; j < jl; j += 6) {

					path.bezierCurveTo(
						numbers[j + 0],
						numbers[j + 1],
						numbers[j + 2],
						numbers[j + 3],
						numbers[j + 4],
						numbers[j + 5]
					);
					control.x = numbers[j + 2];
					control.y = numbers[j + 3];
					point.x = numbers[j + 4];
					point.y = numbers[j + 5];

					if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);

				}

				break;

			case 'S':
				var numbers = parseFloats(data);

				for (var j = 0, jl = numbers.length; j < jl; j += 4) {

					path.bezierCurveTo(
						getReflection(point.x, control.x),
						getReflection(point.y, control.y),
						numbers[j + 0],
						numbers[j + 1],
						numbers[j + 2],
						numbers[j + 3]
					);
					control.x = numbers[j + 0];
					control.y = numbers[j + 1];
					point.x = numbers[j + 2];
					point.y = numbers[j + 3];

					if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);

				}

				break;

			case 'Q':
				var numbers = parseFloats(data);

				for (var j = 0, jl = numbers.length; j < jl; j += 4) {

					path.quadraticCurveTo(
						numbers[j + 0],
						numbers[j + 1],
						numbers[j + 2],
						numbers[j + 3]
					);
					control.x = numbers[j + 0];
					control.y = numbers[j + 1];
					point.x = numbers[j + 2];
					point.y = numbers[j + 3];

					if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);

				}

				break;

			case 'T':
				var numbers = parseFloats(data);

				for (var j = 0, jl = numbers.length; j < jl; j += 2) {

					var rx = getReflection(point.x, control.x);
					var ry = getReflection(point.y, control.y);
					path.quadraticCurveTo(
						rx,
						ry,
						numbers[j + 0],
						numbers[j + 1]
					);
					control.x = rx;
					control.y = ry;
					point.x = numbers[j + 0];
					point.y = numbers[j + 1];

					if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);

				}

				break;

			case 'A':
				var numbers = parseFloats(data);

				for (var j = 0, jl = numbers.length; j < jl; j += 7) {

					// skip command if start point == end point
					if (numbers[j + 5] == point.x && numbers[j + 6] == point.y) continue;

					var start = point.clone();
					point.x = numbers[j + 5];
					point.y = numbers[j + 6];
					control.x = point.x;
					control.y = point.y;
					parseArcCommand(
						path, numbers[j], numbers[j + 1], numbers[j + 2], numbers[j + 3], numbers[j + 4], start, point
					);

					if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);

				}

				break;

			case 'm':
				var numbers = parseFloats(data);

				for (var j = 0, jl = numbers.length; j < jl; j += 2) {

					point.x += numbers[j + 0];
					point.y += numbers[j + 1];
					control.x = point.x;
					control.y = point.y;

					if (j === 0) {

						path.moveTo(point.x, point.y);

					} else {

						path.lineTo(point.x, point.y);

					}

					if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);

				}

				break;

			case 'h':
				var numbers = parseFloats(data);

				for (var j = 0, jl = numbers.length; j < jl; j++) {

					point.x += numbers[j];
					control.x = point.x;
					control.y = point.y;
					path.lineTo(point.x, point.y);

					if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);

				}

				break;

			case 'v':
				var numbers = parseFloats(data);

				for (var j = 0, jl = numbers.length; j < jl; j++) {

					point.y += numbers[j];
					control.x = point.x;
					control.y = point.y;
					path.lineTo(point.x, point.y);

					if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);

				}

				break;

			case 'l':
				var numbers = parseFloats(data);

				for (var j = 0, jl = numbers.length; j < jl; j += 2) {

					point.x += numbers[j + 0];
					point.y += numbers[j + 1];
					control.x = point.x;
					control.y = point.y;
					path.lineTo(point.x, point.y);

					if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);

				}

				break;

			case 'c':
				var numbers = parseFloats(data);

				for (var j = 0, jl = numbers.length; j < jl; j += 6) {

					path.bezierCurveTo(
						point.x + numbers[j + 0],
						point.y + numbers[j + 1],
						point.x + numbers[j + 2],
						point.y + numbers[j + 3],
						point.x + numbers[j + 4],
						point.y + numbers[j + 5]
					);
					control.x = point.x + numbers[j + 2];
					control.y = point.y + numbers[j + 3];
					point.x += numbers[j + 4];
					point.y += numbers[j + 5];

					if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);

				}

				break;

			case 's':
				var numbers = parseFloats(data);

				for (var j = 0, jl = numbers.length; j < jl; j += 4) {

					path.bezierCurveTo(
						getReflection(point.x, control.x),
						getReflection(point.y, control.y),
						point.x + numbers[j + 0],
						point.y + numbers[j + 1],
						point.x + numbers[j + 2],
						point.y + numbers[j + 3]
					);
					control.x = point.x + numbers[j + 0];
					control.y = point.y + numbers[j + 1];
					point.x += numbers[j + 2];
					point.y += numbers[j + 3];

					if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);

				}

				break;

			case 'q':
				var numbers = parseFloats(data);

				for (var j = 0, jl = numbers.length; j < jl; j += 4) {

					path.quadraticCurveTo(
						point.x + numbers[j + 0],
						point.y + numbers[j + 1],
						point.x + numbers[j + 2],
						point.y + numbers[j + 3]
					);
					control.x = point.x + numbers[j + 0];
					control.y = point.y + numbers[j + 1];
					point.x += numbers[j + 2];
					point.y += numbers[j + 3];

					if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);

				}

				break;

			case 't':
				var numbers = parseFloats(data);

				for (var j = 0, jl = numbers.length; j < jl; j += 2) {

					var rx = getReflection(point.x, control.x);
					var ry = getReflection(point.y, control.y);
					path.quadraticCurveTo(
						rx,
						ry,
						point.x + numbers[j + 0],
						point.y + numbers[j + 1]
					);
					control.x = rx;
					control.y = ry;
					point.x = point.x + numbers[j + 0];
					point.y = point.y + numbers[j + 1];

					if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);

				}

				break;

			case 'a':
				var numbers = parseFloats(data);

				for (var j = 0, jl = numbers.length; j < jl; j += 7) {

					// skip command if no displacement
					if (numbers[j + 5] == 0 && numbers[j + 6] == 0) continue;

					var start = point.clone();
					point.x += numbers[j + 5];
					point.y += numbers[j + 6];
					control.x = point.x;
					control.y = point.y;
					parseArcCommand(
						path, numbers[j], numbers[j + 1], numbers[j + 2], numbers[j + 3], numbers[j + 4], start, point
					);

					if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);

				}

				break;

			case 'Z':
			case 'z':
				path.currentPath.autoClose = true;

				if (path.currentPath.curves.length > 0) {

					// Reset point to beginning of Path
					point.copy(firstPoint);
					path.currentPath.currentPoint.copy(point);
					isFirstPoint = true;

				}

				break;

			default:
				console.warn(command);

		}

		// console.log( type, parseFloats( data ), parseFloats( data ).length  )

		doSetFirstPoint = false;

	}

	return path;

}


function parseFloats( input ) {

	if ( typeof input !== 'string' ) {

		throw new TypeError( 'Invalid input: ' + typeof input );

	}

	// Character groups
	var RE = {
		SEPARATOR: /[ \t\r\n\,.\-+]/,
		WHITESPACE: /[ \t\r\n]/,
		DIGIT: /[\d]/,
		SIGN: /[-+]/,
		POINT: /\./,
		COMMA: /,/,
		EXP: /e/i
	};

	// States
	var SEP = 0;
	var INT = 1;
	var FLOAT = 2;
	var EXP = 3;

	var state = SEP;
	var seenComma = true;
	var result = [], number = '', exponent = '';

	function throwSyntaxError( current, i, partial ) {

		var error = new SyntaxError( 'Unexpected character "' + current + '" at index ' + i + '.' );
		error.partial = partial;
		throw error;

	}

	function newNumber() {

		if ( number !== '' ) {

			if ( exponent === '' ) result.push( Number( number ) );
			else result.push( Number( number ) * Math.pow( 10, Number( exponent ) ) );

		}

		number = '';
		exponent = '';

	}

	var current, i = 0, length = input.length;
	for ( i = 0; i < length; i ++ ) {

		current = input[ i ];

		// parse until next number
		if ( state === SEP ) {

			// eat whitespace
			if ( RE.WHITESPACE.test( current ) ) {

				continue;

			}

			// start new number
			if ( RE.DIGIT.test( current ) || RE.SIGN.test( current ) ) {

				state = INT;
				number = current;
				continue;

			}

			if ( RE.POINT.test( current ) ) {

				state = FLOAT;
				number = current;
				continue;

			}

			// throw on double commas (e.g. "1, , 2")
			if ( RE.COMMA.test( current ) ) {

				if ( seenComma ) {

					throwSyntaxError( current, i, result );

				}

				seenComma = true;

			}

		}

		// parse integer part
		if ( state === INT ) {

			if ( RE.DIGIT.test( current ) ) {

				number += current;
				continue;

			}

			if ( RE.POINT.test( current ) ) {

				number += current;
				state = FLOAT;
				continue;

			}

			if ( RE.EXP.test( current ) ) {

				state = EXP;
				continue;

			}

			// throw on double signs ("-+1"), but not on sign as separator ("-1-2")
			if ( RE.SIGN.test( current )
					&& number.length === 1
					&& RE.SIGN.test( number[ 0 ] ) ) {

				throwSyntaxError( current, i, result );

			}

		}

		// parse decimal part
		if ( state === FLOAT ) {

			if ( RE.DIGIT.test( current ) ) {

				number += current;
				continue;

			}

			if ( RE.EXP.test( current ) ) {

				state = EXP;
				continue;

			}

			// throw on double decimal points (e.g. "1..2")
			if ( RE.POINT.test( current ) && number[ number.length - 1 ] === '.' ) {

				throwSyntaxError( current, i, result );

			}

		}

		// parse exponent part
		if ( state == EXP ) {

			if ( RE.DIGIT.test( current ) ) {

				exponent += current;
				continue;

			}

			if ( RE.SIGN.test( current ) ) {

				if ( exponent === '' ) {

					exponent += current;
					continue;

				}

				if ( exponent.length === 1 && RE.SIGN.test( exponent ) ) {

					throwSyntaxError( current, i, result );

				}

			}

		}


		// end of number
		if ( RE.WHITESPACE.test( current ) ) {

			newNumber();
			state = SEP;
			seenComma = false;

		} else if ( RE.COMMA.test( current ) ) {

			newNumber();
			state = SEP;
			seenComma = true;

		} else if ( RE.SIGN.test( current ) ) {

			newNumber();
			state = INT;
			number = current;

		} else if ( RE.POINT.test( current ) ) {

			newNumber();
			state = FLOAT;
			number = current;

		} else {

			throwSyntaxError( current, i, result );

		}

	}

	// add the last number found (if any)
	newNumber();

	return result;

}