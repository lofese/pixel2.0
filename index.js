var screen = [];
screen['size'] = [];
screen['size']['width'];
screen['size']['height'];
screen['paint'] = function (picture, x, y) {
	document.getElementById('canvas').getContext('2d').drawImage(picture, x, y);
}
screen['update'] = [];
screen['update']['timer'] = function () {
	screen['update']['canvas']();
	screen['update']['width']();
	screen['update']['height']();
}
screen['update']['canvas'] = function () {
	document.getElementById('canvas').fillStyle = "#E5CCCC";
	document.getElementById('canvas').getContext('2d').fillRect(0, 0, document.body.clientWidth, document.body.clientHeight);
	
	document.getElementById('canvas').width = document.body.clientWidth;
	document.getElementById('canvas').height = document.body.clientHeight;
}
screen['update']['width'] = function () {
	screen['width'] = document.body.clientWidth;
}
screen['update']['height'] = function () {
	screen['height'] = document.body.clientHeight;
}

var map = [];
map['picture'] = [];
map['picture']['cycle'];
map['picture']['x'];
map['picture']['y'];
for (var i = 0; i <= 1; i++) {
	map['picture'][i] = new Image();
	map['picture'][i].src = 'map/' + i + '.png';
}
map['picture']['width'] = 200;
map['picture']['height'] = 400;
map['geolocation'] = [];
map['geolocation']['x'];
map['geolocation']['y'];
map['update'] = [];
map['update']['timer'] = function () {
	map['update']['cycle']();
	for (var i = - map['picture']['cycle']; i <= map['picture']['cycle']; i++) {
		for (var j = - map['picture']['cycle']; j <= map['picture']['cycle']; j++) {
			map['update']['picture']['x'](j,i);
			map['update']['picture']['y'](j,i);
			//map['update']['optimization']();
			if (map['picture']['x'] <= - 200) {
				continue;
			} else if (map['picture']['x'] >= screen['width']) {
				continue;
			} else if (map['picture']['y'] <= - 200 - 58) {
				continue;
			} else if (map['picture']['y'] >= screen['height'] - 200 + 58) {
				continue;
			}
			map['update']['geolocation']['x'](j,i);
			map['update']['geolocation']['y'](j,i);
			map['update']['map']();
			map['update']['animation']();
		}
	}
}
map['update']['cycle'] = function () {
	if (screen['width'] >= screen['height']) {
		map['picture']['cycle'] = Math.ceil((screen['width'] / 2) / 100);
	} else if (screen['width'] <= screen['height']) {
		map['picture']['cycle'] = Math.ceil((screen['height'] / 2) / 58);
	}
}
map['update']['picture'] = [];
map['update']['picture']['x'] = function (j,i) {
	map['picture']['x'] = (screen['width'] / 2) + (j * 100) + (i * 100) - (player['geolocation']['x'] - Math.trunc(player['geolocation']['x'] / 100) * 100) - (player['geolocation']['y'] - Math.trunc(player['geolocation']['y'] / 100) * 100);		
}
map['update']['picture']['y'] = function (j,i) {
	map['picture']['y'] = (screen['height'] / 2) - 200 + (j * 58) - (i * 58) - ((player['geolocation']['x'] - Math.trunc(player['geolocation']['x'] / 100) * 100) * 0.58) + ((player['geolocation']['y'] - Math.trunc(player['geolocation']['y'] / 100) * 100) * 0.58);
}
map['update']['optimization'] = function () {
	if (map['picture']['x'] <= - 200) {
		continue;
	} else if (map['picture']['x'] >= screen['width']) {
		continue;
	} else if (map['picture']['y'] <= - 200 - 58) {
		continue;
	} else if (map['picture']['y'] >= screen['height'] - 200 + 58) {
		continue;
	}
}
map['update']['geolocation'] = []
map['update']['geolocation']['x'] = function (j,i) {
	map['geolocation']['x'] = (Math.trunc(player['x'] / 100) * 100) + (j * 100);
}
map['update']['geolocation']['y'] = function (j,i) {
	map['geolocation']['y'] = (Math.trunc(player['y'] / 100) * 100) + (i * 100);
}
map['update']['map'] = function () {
	if (!map[map['geolocation']['x']]) {
		map[map['geolocation']['x']] = [];
	}
	if (!map[map['geolocation']['x']][map['geolocation']['y']]) {
		map[map['geolocation']['x']][map['geolocation']['y']] = [];
		map[map['geolocation']['x']][map['geolocation']['y']]['x'] = map['picture']['x'];
		map[map['geolocation']['x']][map['geolocation']['y']]['y'] = map['picture']['y'];
		map[map['geolocation']['x']][map['geolocation']['y']]['score'] = 0;
	}
}
map['update']['animation'] = function () {2
	if (map[map['geolocation']['x']][map['geolocation']['y']]['score'] == 0) {
		screen['paint'](map['picture'][0], map['picture']['x'], map['picture']['y']);
	} else if (map[map['geolocation']['x']][map['geolocation']['y']]['score'] == 1) {
		screen['paint'](map['picture'][1], map['picture']['x'], map['picture']['y']);
	}
}

var player = [];
player['picture'] = [];
player['picture']['x'];
player['picture']['y'];
for (var i = 0; i < 1; i++) {
	player['picture'][i] = new Image();
	player['picture'][i].src = 'player/' + i + '.png';
}
player['picture']['width'] = 200;
player['picture']['height'] = 400;
player['geolocation'] = [];
player['geolocation']['x'] = 500;
player['geolocation']['y'] = 500;
player['update']  = [];
player['update']['timer'] = function () {
	player['update']['picture']['x']();
	player['update']['picture']['y']();
	player['update']['animation']();
}
player['update']['picture'] = [];
player['update']['picture']['x'] = function () {
	player['picture']['x'] = screen['width'] / 2 - player['picture']['width'] / 2;
}
player['update']['picture']['y'] = function () {
	player['picture']['y'] = screen['height'] / 2 - player['picture']['height'] / 2;
}
player['update']['animation'] = function () {
	screen['paint'](player['picture'][0], player['picture']['x'], player['picture']['y']);
}

setInterval(function () {
	screen['update']['timer']();
	map['update']['timer']();
	player['update']['timer']();
}, 40);

document.body.onkeydown = function(event) {
	if (event.which == 37) {
		player['geolocation']['x'] -= 10;
	}
	if (event.which == 38) {
		player['geolocation']['y'] += 10;
	}
	if (event.which == 39) {
		player['geolocation']['x'] += 10;
	}
	if (event.which == 40) {
		player['geolocation']['y'] -= 10;
	}
	if (event.which == 32) {
		//map['map'][Math.trunc(player['x'] / 100) * 100][Math.trunc(player['y'] / 100) * 100]['score'] = 1;
		console.log(map.length);
	}
}

/*
navigator.geolocation.getCurrentPosition(position_geolocation, error_geolocation);
function position_geolocation (position) {
	player['geolocation']['x'] = position.coords.latitude.toFixed(7) * 10000000;
	player['geolocation']['y'] = position.coords.longitude.toFixed(7) * 10000000;
	console.log('ok');
}
function error_geolocation (error) {
	console.log('error geolocation');
}

var internet = new XMLHttpRequest();

document.body.onmousedown = function(event) {
	
	//internet.open('POST', true);
	//internet.send('ok');
	
	xmlhttprequest.open('GET','https://api.telegram.org/bot790716188:AAGKf4Ei8aUmEsC4zNY_8zlrfYTPudVK5js/sendMessage?chat_id=-354775351&text=' + 'x: ' + player.x + ' y: ' + player.y, true);
	xmlhttprequest.send();
	
}
*/
