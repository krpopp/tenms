SceneGame.Preloader = function (game) {

    this.background = null;
    this.preloadBar = null;

    this.ready = false;

};

SceneGame.Preloader.prototype = {

    preload: function () {

        this.stage.backgroundColor = "000000";

        this.scenesJSON = this.cache.getJSON('scenes');
        this.loading = this.add.sprite(500, 250, 'loading');
        this.loadPlay = this.loading.animations.add('loadPlay');
        this.loading.animations.play('loadPlay', 5, true);

        var open = 'start';

        for (var i = 0; i < this.scenesJSON.Scenes.length; i++) {
            if (this.scenesJSON.Scenes[i].time == 'start') {
                var sheetNum = this.scenesJSON.Scenes[i].sheets;
                for (var j = 0; j < sheetNum; j++) {
                    this.load.atlasJSONArray(this.scenesJSON.Scenes[i].name + '-' + j, 'assets/textures/' + this.scenesJSON.Scenes[i].name + '-' + j + '.png', 'assets/textures/' + this.scenesJSON.Scenes[i].name + '-' + j + '.json');
                }
            }
            if (this.scenesJSON.Scenes[i].time == 'morning') {
                var sheetNum = this.scenesJSON.Scenes[i].sheets;
                for (var j = 0; j < sheetNum; j++) {
                    this.load.atlasJSONArray(this.scenesJSON.Scenes[i].name + '-' + j, 'assets/textures/' + this.scenesJSON.Scenes[i].name + '-' + j + '.png', 'assets/textures/' + this.scenesJSON.Scenes[i].name + '-' + j + '.json');
                }
            }
        }

        this.load.image('lid1', 'assets/image/lid1.png');
        this.load.image('lid2', 'assets/image/lid2.png');

        this.load.audio('purr', 'assets/sound/Purr.wav');
        this.load.audio('faucet', 'assets/sound/wFaucet.mp3');
        this.load.audio('writing', 'assets/sound/writing.wav');
        this.load.audio('morning', 'assets/sound/morning.wav');
        this.load.audio('faucetClick', 'assets/sound/FaucetClick.wav');
        this.load.audio('wFountain', 'assets/sound/wFountain.wav');
        this.load.audio('water', 'assets/sound/water.wav');
        this.load.audio('slurp', 'assets/sound/slurp.wav');
        this.load.audio('page', 'assets/sound/page.wav');
        this.load.audio('dog', 'assets/sound/dogWalk.wav');
        this.load.audio('eggFry', 'assets/sound/eggFry.wav');
        this.load.audio('juiceShake', 'assets/sound/juiceShake.wav');
        this.load.audio('fridgeHum', 'assets/sound/fridge.wav');

        this.load.audio('click1', 'assets/sound/click1.wav');
        this.load.audio('click2', 'assets/sound/click2.wav');
        this.load.audio('click3', 'assets/sound/click3.wav');
        this.load.audio('click4', 'assets/sound/click4.wav');
        this.load.audio('click5', 'assets/sound/click5.wav');

        this.load.audio('tone1', 'assets/sound/roomTone1.mp3');
        this.load.audio('tone3', 'assets/sound/roomTone3.wav');


    },

    create: function () {
        this.ready = true;
        this.state.start('Manager');
    }

};
