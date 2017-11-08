SceneGame.Preloader = function (game) {

    this.background = null;
    this.preloadBar = null;

    this.ready = false;

};

SceneGame.Preloader.prototype = {

    preload: function () {

        this.stage.backgroundColor = "000000";

        this.scenesJSON = this.cache.getJSON('scenes');
        this.loadingLogo = this.add.sprite(this.world.centerX, 360, 'logo', 0);
        this.loadingLogo.anchor.setTo(0.5, 0.5);
        this.loadingLogo.scale.x = .5;
        this.loadingLogo.scale.y = .5;
        this.logoAnim = this.loadingLogo.animations.add('twitch');
        this.logoAnim.play(10, true);
        this.loadingBar = this.add.sprite(410, 360, 'outline', 0);
        this.world.sendToBack(this.loadingBar);
        this.loadingBar.anchor.setTo(0, 0.5);
        this.outlineAnim = this.loadingBar.animations.add('wiggle');
        this.outlineAnim.play(10, true);
        //this.loadingBar.scale.x = .5;
        //this.loadingBar.scale.y = .5;
        this.game.load.setPreloadSprite(this.loadingBar);
        console.log(this.game.load.preloadSprite);
        this.game.load.preloadSprite.sprite.scale.x = 0.5;
        this.game.load.preloadSprite.sprite.scale.y = 0.5;
        this.filesCompleted = 0;
        this.load.onFileComplete.add(this.fileComplete, this);

        this.game.load.onFileComplete.add(this.fileComplete, this);
        this.load.onLoadComplete.add(this.loadComplete, this);

        for (var i = 0; i < this.scenesJSON.Scenes.length; i++) {
            if (this.scenesJSON.Scenes[i].time == 'start') {
                var sheetNum = this.scenesJSON.Scenes[i].sheets;
                for (var j = 0; j < sheetNum; j++) {
                    this.load.atlasJSONArray(this.scenesJSON.Scenes[i].name + '-' + j, 'assets/textures/' + this.scenesJSON.Scenes[i].name + '-' + j + '.png', 'assets/textures/Universal.json');
                }
                for (var k = 0; k < this.scenesJSON.Scenes[i].sound.length; k++) {
                    this.load.audio(this.scenesJSON.Scenes[i].sound[k], 'assets/sound/' + this.scenesJSON.Scenes[i].sound[k] + ".mp3", 'assets/sound/' + this.scenesJSON.Scenes[i].sound[k] + ".ogg");
                }
            }
            if (this.scenesJSON.Scenes[i].time == 'morning') {

                var sheetNum = this.scenesJSON.Scenes[i].sheets;
                for (var j = 0; j < sheetNum; j++) {
                    this.load.atlasJSONArray(this.scenesJSON.Scenes[i].name + '-' + j, 'assets/textures/' + this.scenesJSON.Scenes[i].name + '-' + j + '.png', 'assets/textures/Universal.json');
                    if (this.scenesJSON.Scenes[i].name1 != null) {
                        this.load.atlasJSONArray(this.scenesJSON.Scenes[i].name1 + '-' + j, 'assets/textures/' + this.scenesJSON.Scenes[i].name1 + '-' + j + '.png', 'assets/textures/' + this.scenesJSON.Scenes[i].name1 + '-' + j + '.json');
                        this.load.atlasJSONArray(this.scenesJSON.Scenes[i].name2 + '-' + j, 'assets/textures/' + this.scenesJSON.Scenes[i].name2 + '-' + j + '.png', 'assets/textures/' + this.scenesJSON.Scenes[i].name2 + '-' + j + '.json');
                    }
                }
                for (var k = 0; k < this.scenesJSON.Scenes[i].sound.length; k++) {
                    this.load.audio(this.scenesJSON.Scenes[i].sound[k], 'assets/sound/' + this.scenesJSON.Scenes[i].sound[k] + ".mp3", 'assets/sound/' + this.scenesJSON.Scenes[i].sound[k] + ".ogg");
                }
            }
        }

        this.load.atlasJSONArray('wait', 'assets/textures/wait.png', 'assets/textures/wait.json');
        this.load.atlasJSONArray('guess', 'assets/textures/guess.png', 'assets/textures/guess.json');
        this.load.atlasJSONArray('paused', 'assets/textures/paused.png', 'assets/textures/paused.json');
        this.load.atlasJSONArray('compmaterials', 'assets/textures/compmaterials.png', 'assets/textures/compmaterials.json');
        this.load.atlasJSONArray('socialmedia-0', 'assets/textures/socialmedia-0.png', 'assets/textures/socialmedia-0.json');
        this.load.atlasJSONArray('morekeys', 'assets/textures/morekeys.png', 'assets/textures/morekeys.json');
        this.load.atlasJSONArray('midkeys', 'assets/textures/midkey.png', 'assets/textures/midkey.json');
        this.load.atlasJSONArray('down', 'assets/textures/down.png', 'assets/textures/down.json');
        this.load.atlasJSONArray('space', 'assets/textures/space.png', 'assets/textures/space.json');
        this.load.atlasJSONArray('newkeys', 'assets/textures/newkeys.png', 'assets/textures/newkeys.json');
        this.load.atlasJSONArray('sleep', 'assets/textures/sleep.png', 'assets/textures/sleep.json');

        this.load.atlasJSONArray('blanketover-0', 'assets/textures/blanketover-0.png', 'assets/textures/blanketover-0.json');
        this.load.atlasJSONArray('blanketover-1', 'assets/textures/blanketover-1.png', 'assets/textures/blanketover-1.json');
        this.load.atlasJSONArray('computerframeplain-0', 'assets/textures/computerframeplain-0.png', 'assets/textures/computerframeplain-0.json');

        this.load.atlasJSONArray('keys', 'assets/textures/keys.png', 'assets/textures/keys.json');
        this.load.atlasJSONArray('keyz', 'assets/textures/keyz.png', 'assets/textures/keyz.json');
        this.load.atlasJSONArray('qw', 'assets/textures/qw.png', 'assets/textures/qw.json');
        this.load.atlasJSONArray('tyghbn', 'assets/textures/tyghbn.png', 'assets/textures/tyghbn.json');
        this.load.atlasJSONArray('arrows', 'assets/textures/arrows.png', 'assets/textures/arrows.json');
        this.load.atlasJSONArray('numbers', 'assets/textures/num.png', 'assets/textures/num.json');
        this.load.atlasJSONArray('mju', 'assets/textures/mju.png', 'assets/textures/mju.json');
        this.load.atlasJSONArray('oh', 'assets/textures/oh.png', 'assets/textures/oh.json');

        this.load.atlasJSONArray('allkeys', 'assets/textures/allkeys.png', 'assets/textures/allkeys.json');
        this.load.atlasJSONArray('line', 'assets/textures/line.png', 'assets/textures/line.json');
        this.load.atlasJSONArray('singleHand', 'assets/textures/hand.png', 'assets/textures/hand.json');

        this.load.image('toplid', 'assets/image/toplid2.png');
        this.load.image('lowerlid', 'assets/image/lowerlid2.png');
        this.load.image('plainScreen', 'assets/image/plainscreen.png');
        this.load.image('bluescreen', 'assets/textures/bluescreen.png');

        this.load.image('greyscale', 'assets/image/greyscale.png');

        this.load.image('stillsubway', 'assets/image/stillsubway.png');
        this.load.image('greyscale', 'assets/image/greyscale.png');

        this.load.audio('music', 'assets/sound/adultmom4.mp3', 'assets/sound/adultmom4.ogg');
        this.load.audio('sink', 'assets/sound/sink.mp3', 'assets/sound/sink.ogg');
        this.load.audio('phonevibrate', 'assets/sound/phonevibrate.mp3', 'assets/sound/phonevibrate.ogg');
        this.load.audio('roomtone', 'assets/sound/roomTone1.mp3', 'assets/sound/roomTone1.ogg');
        this.load.audio('closedfridge', 'assets/sound/closedfridge.mp3', 'assets/sound/closedfridge.ogg');
        this.load.audio('steps', 'assets/sound/steps.mp3', 'assets/sound/steps.ogg');
        this.load.audio('office', 'assets/sound/office.mp3', 'assets/sound/office.ogg');
        this.load.audio('street', 'assets/sound/street.mp3', 'assets/sound/street.ogg');
        this.load.audio('sleep', 'assets/sound/sleep.mp3', 'assets/sound/sleep.ogg');
        this.load.audio('oneClick', 'assets/sound/click2.mp3', 'assets/sound/click2.ogg');
        this.load.audio('twoClick', 'assets/sound/click3.mp3', 'assets/sound/click3.ogg');
        this.load.audio('threeClick', 'assets/sound/click1.mp3', 'assets/sound/click1.ogg');
        this.load.audio('shortCall', 'assets/sound/shortcall.mp3', 'assets/sound/shortcall.ogg');
        this.hadHit = false;
    },

    fileComplete: function () {
        this.loadNum += 1;


    },

    loadComplete: function () {

        this.titleTween = this.add.tween(this.loadingLogo).to({
            alpha: 0
        }, 1000, Phaser.Easing.Linear.None, true);
        this.barTween = this.add.tween(this.loadingBar).to({
            alpha: 0
        }, 1000, Phaser.Easing.Linear.None, true);

        this.barTween.onComplete.add(this.startGame, this);
    },


    fileComplete: function () {
        this.filesCompleted++;
        if (this.filesCompleted == 15) {
            this.audio = this.game.add.audio('muffled');
            this.audio.play();
            if (!this.game.device.firefox) {
                this.audio.loopFull();
            }
        }
    },

    RotateSpriteOutline: function (frameNumber, endFrame, startFrame) {
        if (frameNumber.frame == endFrame) {
            frameNumber.frame = startFrame;
        } else {
            frameNumber.frame += 1;
        }
        this.keySprites.frame = this.keySpriteFrame;
        this.keySpriteFrame += 1;
        if (this.keySpriteFrame == 3) {
            this.keySpriteFrame = 0;
        }
        this.YellowSpriteRotate();
    },

    YellowSpriteRotate: function () {
        for (var i = 0; i < this.yellowSprites.length; i++) {
            this.yellowSprites[i].frame = this.yellowSpriteFrame;
        }
        this.yellowSpriteFrame += 1;
        if (this.yellowSpriteFrame == 15) {
            this.yellowSpriteFrame = 12;
        }
    },

    startGame: function () {
        this.load.onFileComplete.remove(this.fileComplete, this);
        this.load.onLoadComplete.remove(this.loadComplete, this);
        this.audio.stop();
        this.ready = true;
        this.game.load.preloadSprite = null;
        this.state.start('Manager');

    },

    create: function () {

    }

};
