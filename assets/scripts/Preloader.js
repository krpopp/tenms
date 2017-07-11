SceneGame.Preloader = function (game) {

    this.background = null;
    this.preloadBar = null;

    this.ready = false;

};

SceneGame.Preloader.prototype = {

    preload: function () {

        this.stage.backgroundColor = "000000";

        this.scenesJSON = this.cache.getJSON('scenes');
        this.loadingLogo = this.add.sprite(this.world.centerX, 660, 'logo', 0);
        this.loadingLogo.anchor.setTo(0.5, 0.5);
        this.logoAnim = this.loadingLogo.animations.add('twitch');
        this.logoAnim.play(10, true);
        this.loadingBar = this.add.sprite(220, 660, 'outline', 0);
        this.world.sendToBack(this.loadingBar);
        this.loadingBar.anchor.setTo(0, 0.5);
        this.outlineAnim = this.loadingBar.animations.add('wiggle');
        this.outlineAnim.play(10, true);
        this.game.load.setPreloadSprite(this.loadingBar);

        this.sky = this.add.sprite(0, 0, 'sky-0', 0);
        this.skyNum = 0;
        this.sheetNum = 0;
        this.loadNum = 0;
        this.game.load.onFileComplete.add(this.fileComplete, this);
        this.load.onLoadComplete.add(this.loadComplete, this);

        for (var i = 0; i < this.scenesJSON.Scenes.length; i++) {
            if (this.scenesJSON.Scenes[i].time == 'start') {
                var sheetNum = this.scenesJSON.Scenes[i].sheets;
                for (var j = 0; j < sheetNum; j++) {

                    this.load.atlasJSONArray(this.scenesJSON.Scenes[i].name + '-' + j, 'assets/textures/' + this.scenesJSON.Scenes[i].name + '-' + j + '.png', 'assets/textures/' + this.scenesJSON.Scenes[i].name + '-' + j + '.json');
                    for (var k = 0; k < this.scenesJSON.Scenes[i].sound.length; k++) {
                        this.load.audio(this.scenesJSON.Scenes[i].sound[k], 'assets/sound/' + this.scenesJSON.Scenes[i].sound[k]);
                    }
                }
            }
            if (this.scenesJSON.Scenes[i].time == 'morning') {
                var sheetNum = this.scenesJSON.Scenes[i].sheets;
                for (var j = 0; j < sheetNum; j++) {
                    this.load.atlasJSONArray(this.scenesJSON.Scenes[i].name + '-' + j, 'assets/textures/' + this.scenesJSON.Scenes[i].name + '-' + j + '.png', 'assets/textures/' + this.scenesJSON.Scenes[i].name + '-' + j + '.json');
                    for (var k = 0; k < this.scenesJSON.Scenes[i].sound.length; k++) {
                        this.load.audio(this.scenesJSON.Scenes[i].sound[k], 'assets/sound/' + this.scenesJSON.Scenes[i].sound[k]);
                    }
                }
            }
        }

        this.load.atlasJSONArray('wait', 'assets/textures/wait.png', 'assets/textures/wait.json');
        this.load.atlasJSONArray('guess', 'assets/textures/guess.png', 'assets/textures/guess.json');
        this.load.atlasJSONArray('paused', 'assets/textures/paused.png', 'assets/textures/paused.json');

        this.load.atlasJSONArray('keys', 'assets/textures/keys.png', 'assets/textures/keys.json');
        this.load.atlasJSONArray('singleHand', 'assets/textures/hand.png', 'assets/textures/hand.json');

        this.load.image('toplid', 'assets/image/toplid2.png');
        this.load.image('lowerlid', 'assets/image/lowerlid2.png');
        this.load.image('midlid', 'assets/image/midlid2.png');
        this.load.image('black', 'assets/image/black.png');

        this.load.image('stillsubway', 'assets/image/stillsubway.png');

        this.load.audio('correct', 'assets/sound/correct.wav');
        this.load.audio('incorrect', 'assets/sound/incorrect.mp3');
        this.load.audio('incorrect2', 'assets/sound/incorrect2.wav');

        this.load.audio('tone1', 'assets/sound/roomTone1.mp3');
        this.load.audio('tone3', 'assets/sound/roomTone3.wav');
    },

    fileComplete: function () {
        this.loadNum += 1;
        if (this.loadNum % 15 == 0) {
            this.skyNum += 1;
            this.sky.frame = this.skyNum;
            if (this.skyNum >= 3) {
                this.skyNum == 0;
                this.sheetNum += 1;
                this.sky.destroy();
                this.sky = this.add.sprite(0, 0, 'sky-' + this.sheetNum, 0);
            }
        }

    },

    loadComplete: function () {
        this.skyTween = this.add.tween(this.sky).to({
            alpha: 0
        }, 1000, Phaser.Easing.Linear.None, true);
        this.titleTween = this.add.tween(this.loadingLogo).to({
            alpha: 0
        }, 1000, Phaser.Easing.Linear.None, true);
        this.barTween = this.add.tween(this.loadingBar).to({
            alpha: 0
        }, 1000, Phaser.Easing.Linear.None, true);
        this.barTween.onComplete.add(this.startGame, this);
    },

    startGame: function () {
        this.load.onFileComplete.remove(this.fileComplete, this);
        this.load.onLoadComplete.remove(this.loadComplete, this);
        this.ready = true;
        this.game.load.preloadSprite = null;
        this.state.start('Manager');

    },

    create: function () {

    }

};
