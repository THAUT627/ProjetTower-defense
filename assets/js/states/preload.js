var tinydefence = tinydefence || {};

tinydefence.preload = function (game) { };

tinydefence.preload.prototype = {

	preload: function () {
		this.game.load.image('logo', 'assets/images/logo.png');
		this.game.load.spritesheet('selection', 'assets/images/selection.png', 16, 16);
		this.game.load.spritesheet('enemy', 'assets/images/enemy.png', 16, 16);
		this.game.load.spritesheet('crab', 'assets/images/enemyCrab.png', 16, 16);

		this.game.load.image('buildmenu', 'assets/images/ui/menuElements.png');
		this.game.load.spritesheet('buildmenuButtons', 'assets/images/ui/menuButtons.png', 16, 16);

		this.game.load.spritesheet('buttonCoverage', 'assets/images/ui/buttonCoverage.png', 32, 18);
		this.game.load.spritesheet('buttonLevel', 'assets/images/ui/buttonLevel.png', 225, 35);
		this.game.load.spritesheet('buttonMenuNav', 'assets/images/ui/buttonMenuNav.png', 20, 18);

		this.game.load.bitmapFont('font_white',
			'assets/fonts/font.png',
			'assets/fonts/font.fnt');
		this.game.load.bitmapFont('font_green',
			'assets/fonts/font_green.png',
			'assets/fonts/font_green.fnt');
		this.game.load.bitmapFont('font_red',
			'assets/fonts/font_red.png',
			'assets/fonts/font_red.fnt');

		const lavaMapOptions = [
			{ json: 'map1.json', png: 'map1.png', start: { x: 0, y: 3 }, end: { x: 25, y: 1 } },
			{ json: 'map2.json', png: 'map2.png', start: { x: 3, y: 0 }, end: { x: 27, y: 14 } },
			{ json: 'map3.json', png: 'map3.png', start: { x: 6, y: 12 }, end: { x: 29, y: 6 } },
		];

		const randomLava = Phaser.ArrayUtils.getRandomItem(lavaMapOptions);

		const lavaMap = tinydefence.maps.find(m => m.key === 'LavaDefense');

		lavaMap.data = 'assets/maps/LavaDefense/' + randomLava.json;
		lavaMap.sprite = 'assets/maps/LavaDefense/' + randomLava.png;

		lavaMap.start = randomLava.start;
		lavaMap.end = randomLava.end;



		// Load all defined maps in maps.js
		tinydefence.maps.forEach(map => {
			this.game.load.tilemap(map.key, map.data, null, Phaser.Tilemap.TILED_JSON);
			this.game.load.image(map.key + '_sprites', map.sprite);
		});

		// Load background music
		this.game.load.audio('bgm', 'assets/audio/bgm.mp3');

		// Load all tower assets
		tinydefence.towerManager.load();
	},

	create: function () {
		this.game.state.start("Menu");
	}
}