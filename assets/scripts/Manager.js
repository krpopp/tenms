SceneGame.Manager = function (game) {
    this.game;
    this.add;
    this.camera;
    this.cache;
    this.input;
    this.load;
    this.math;
    this.sound;
    this.stage;
    this.time;
    this.tweens;
    this.state;
    this.world;
    this.particles;
    this.physics;
    this.rnd;

};

SceneGame.Manager.prototype = {


    create: function () {
        var manager = this;
        //set up variables

        manager.muffled = manager.add.audio("muffled.mp3");
        manager.muffled.play();
        manager.currentSound = manager.muffled;
        manager.muffled.loopFull();

        manager.cursors = manager.input.keyboard.createCursorKeys();
        manager.cue = manager.input.keyboard.addKey(Phaser.Keyboard.Q);
        manager.doubleEwe = manager.input.keyboard.addKey(Phaser.Keyboard.W);
        manager.keyOne = manager.input.keyboard.addKey(Phaser.Keyboard.ONE);
        manager.keyTwo = manager.input.keyboard.addKey(Phaser.Keyboard.TWO);
        manager.keyThree = manager.input.keyboard.addKey(Phaser.Keyboard.THREE);
        manager.keyFour = manager.input.keyboard.addKey(Phaser.Keyboard.FOUR);
        manager.keyFive = manager.input.keyboard.addKey(Phaser.Keyboard.FIVE);
        manager.keySix = manager.input.keyboard.addKey(Phaser.Keyboard.SIX);
        manager.keySeven = manager.input.keyboard.addKey(Phaser.Keyboard.SEVEN);
        manager.keyEight = manager.input.keyboard.addKey(Phaser.Keyboard.EIGHT);
        manager.keyNine = manager.input.keyboard.addKey(Phaser.Keyboard.NINE);
        manager.keyZero = manager.input.keyboard.addKey(Phaser.Keyboard.ZERO);
        manager.scenesJSON = manager.cache.getJSON("scenes");
        manager.preloadedSets = [];
        manager.unloadedSets = [];
        manager.keySprites;
        manager.keySpriteFrame = 9;
        manager.letterSpriteFrame = 1;
        manager.yellowSprites = [];
        manager.buttonPressFrame = [];
        manager.yellowSpriteFrame = 12;
        manager.buttonPressFrameSets = [];
        manager.pressSprites = [];
        manager.hands = [];
        manager.handimation = [];
        manager.letter = [];
        manager.letterFrame = [];

        manager.correct = manager.add.audio("correct");

        //seperate init loaded scenes from unloaded ones
        for (var i = 0; i < manager.scenesJSON.Scenes.length; i++) {
            if (manager.scenesJSON.Scenes[i].time == "morning") {
                manager.preloadedSets.push(manager.scenesJSON.Scenes[i].name);
            } else if (manager.scenesJSON.Scenes[i].time == "start") {
                manager.currentScene = manager.scenesJSON.Scenes[i];
                var getKeys = [];
                for (var j = 0; j < manager.scenesJSON.Scenes[i].keySet.length; j++) {
                    var tempVar = eval(manager.scenesJSON.Scenes[i].keySet[j]);
                    getKeys.push(tempVar);
                }
            } else {
                manager.unloadedSets.push(manager.scenesJSON.Scenes[i].name);
            }
        }


        //also, set the keys for the initial scene
        //for some reason, this one can't be set by the function
        manager.keySet = getKeys;

        if (manager.cursors.up.isDown) {
            manager.topLidDown = true;
        } else {
            manager.topLidDown = false;
        }
        if (manager.cursors.down.isDown) {
            manager.bottomLidDown = true;
        } else {
            manager.bottomLidDown = false;
        }

        manager.paused = manager.add.sprite(manager.world.centerX, 200, "paused", "paused00");
        manager.paused.anchor.setTo(0.5, 0.5);
        manager.paused.visible = false;

        manager.game.onBlur.add(function () {
            manager.paused.visible = true;
            manager.world.bringToTop(manager.paused);
        }, this);

        manager.game.onFocus.add(function () {
            manager.paused.visible = false;
        }, this);

        //load photos, set up the next scene
        manager.PhotoLoader();
    },

    CreateKeySprite: function () {
        var manager = this;
        if (manager.currentScene.keySet[0] == "manager.cue") {
            manager.letterKeys = [];
            for (var i = 0; i < manager.keySet.length; i++) {
                manager.letterKeys[i] = manager.add.sprite(480 + (100 * i), 550, "qw", "qwkey0");
                manager.LetterYellowBG(manager.currentScene.keySet[i], i);
            }
            manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.LetterRotateOutline, this);
        } else if (manager.currentScene.keySet[0] == "manager.keyOne") {
            manager.letterKeys = [];
            manager.letterKeys[0] = manager.add.sprite(580, 550, "qw", "qwkey0");
            manager.EndYellowBG(manager.currentScene.keySet[0], 0);
            manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.LetterRotateOutline, this);

        } else {
            manager.keySprites = manager.add.sprite(500, 550, "keys", "keys-0");
            manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.RotateOutline, this);
            for (var i = 0; i < manager.currentScene.keySet.length; i++) {
                manager.CreateYellowBG(manager.currentScene.keySet[i], i);
            }
        }
    },

    EndYellowBG: function (keyName, num) {
        var manager = this;
        switch (num) {
            case 0:
                manager.PlaceHands(num, 820, 715, 45);

                manager.yellowSprites[num] = manager.add.sprite(620, 580, "qw", "qwYellow1");
                manager.pressSprites[num] = manager.add.sprite(720, 580, "keys", "keypress-0");
                manager.yellowSprites[num].anchor.setTo(0.5, 0.5);
                manager.pressSprites[num].anchor.setTo(0.5, 0.5);
                manager.pressSprites[num].visible = false;
                manager.world.sendToBack(manager.yellowSprites[num]);
                break;
            case 1:
                manager.yellowSprites[num] = manager.add.sprite(540, 580, "qw", "qwYellow1");
                manager.pressSprites[num] = manager.add.sprite(640, 580, "keys", "keypress-0");
                manager.yellowSprites[num].anchor.setTo(0.5, 0.5);
                manager.pressSprites[num].anchor.setTo(0.5, 0.5);
                manager.pressSprites[num].visible = false;
                manager.world.sendToBack(manager.yellowSprites[num]);
                break;
        }


    },

    LetterYellowBG: function (keyName, num) {
        var manager = this;
        switch (keyName) {
            case "manager.cue":
                manager.letter[num] = manager.add.sprite(500 + (100 * num), 560, "qw", "qwQ1");
                manager.PlaceHands(num, 340, 700, 150);
                break;
            case "manager.doubleEwe":
                manager.letter[num] = manager.add.sprite(500 + (100 * num), 560, "qw", "qwW1");
                manager.PlaceHands(num, 900, 595, 0);
                break;
        }
        manager.yellowSprites[num] = manager.add.sprite(520 + (100 * num), 580, "qw", "qwYellow1");
        manager.pressSprites[num] = manager.add.sprite(520 + (100 * num), 580, "keys", "keypress-0");
        manager.yellowSprites[num].anchor.setTo(0.5, 0.5);
        manager.pressSprites[num].anchor.setTo(0.5, 0.5);
        manager.pressSprites[num].visible = false;
        manager.world.sendToBack(manager.yellowSprites[num]);
    },

    //    LetterRotate: function (num, startFrame, lastFrame) {
    //        var manager = this;
    //        manager.letter[num].frame = manager.letterFrame[num];
    //        manager.letterFrame[num] += 1;
    //        if (manager.letterFrame[num] == lastFrame) {
    //            manager.letterFrame[num] = startFrame;
    //        }
    //    },
    //many of these time events are running on top of one another
    //i need to make this stop - possibly reload the manager script?

    CreateYellowBG: function (keyName, num) {
        var manager = this;
        switch (keyName) {
            case "manager.cursors.up":
                manager.yellowSprites[num] = manager.add.sprite(620, 570, "keys", "yellowkeys-" + num);
                manager.pressSprites[num] = manager.add.sprite(620, 570, "keys", "keypress-0");
                manager.PlaceHands(num, 850, 620, 20);
                break;
            case "manager.cursors.down":
                manager.yellowSprites[num] = manager.add.sprite(620, 610, "keys", "yellowkeys-" + num);
                manager.pressSprites[num] = manager.add.sprite(620, 610, "keys", "keypress-0");
                manager.PlaceHands(num, 700, 820, 60);
                if (manager.hands[num] != null) {
                    manager.hands[num].scale.y = -1;
                }
                break;
            case "manager.cursors.right":
                manager.yellowSprites[num] = manager.add.sprite(700, 610, "keys", "yellowkeys-" + num);
                manager.pressSprites[num] = manager.add.sprite(700, 610, "keys", "keypress-0");
                manager.PlaceHands(num, 900, 595, 0);
                break;
            case "manager.cursors.left":
                manager.yellowSprites[num] = manager.add.sprite(540, 610, "keys", "yellowkeys-" + num);
                manager.pressSprites[num] = manager.add.sprite(540, 610, "keys", "keypress-0");
                manager.PlaceHands(num, 340, 700, 150);
                if (manager.hands[num] != null) {
                    manager.hands[num].scale.y = -1;
                }
                break;
        }
        manager.yellowSprites[num].anchor.setTo(0.5, 0.5);
        manager.pressSprites[num].anchor.setTo(0.5, 0.5);
        manager.pressSprites[num].visible = false;
        manager.world.sendToBack(manager.yellowSprites[num]);
    },

    RotateOutline: function () {
        var manager = this;
        manager.keySprites.frame = manager.keySpriteFrame;
        manager.keySpriteFrame += 1;
        if (manager.keySpriteFrame == 12) {
            manager.keySpriteFrame = 8;
        }
        for (var i = 0; i < manager.currentScene.keySet.length; i++) {
            manager.yellowSprites[i].frame = manager.yellowSpriteFrame;
        }

        manager.yellowSpriteFrame += 1;
        if (manager.yellowSpriteFrame == 15) {
            manager.yellowSpriteFrame = 12;
        }
    },

    LetterRotateOutline: function () {
        var manager = this;
        for (var i = 0; i < manager.letterKeys.length; i++) {
            manager.letterKeys[i].frame = manager.letterSpriteFrame;
        }
        manager.letterSpriteFrame += 1;
        if (manager.letterSpriteFrame == 3) {
            manager.letterSpriteFrame = 0;
        }
        for (var i = 0; i < manager.yellowSprites.length; i++) {
            manager.yellowSprites[i].frame = manager.yellowSpriteFrame;
        }
        manager.yellowSpriteFrame += 1;
        if (manager.yellowSpriteFrame == 15) {
            manager.yellowSpriteFrame = 12;
        }

    },


    PlaceHands: function (num, posX, posY, rot) {
        var manager = this;
        if (manager.currentScene.hands > 1) {
            manager.CreateHands(num, posX, posY, rot);
        } else {
            if (num == 0) {
                manager.CreateHands(num, posX, posY, rot);
            }

        }
    },

    CreateHands: function (num, posX, posY, rot) {
        var manager = this;
        manager.hands[num] = manager.add.sprite(posX, posY, "singleHand", "hand0");
        manager.hands[num].anchor.setTo(0.5, 0.5);
        manager.handimation[num] = manager.hands[num].animations.add("twitch");
        manager.handimation[num].play(10, true);
        manager.hands[num].angle += rot;
    },

    //this grabs and binds the keys for each level
    FindKeys: function () {
        var manager = this;
        var getKeys = [];

        for (var i = 0; i < manager.currentScene.keySet.length; i++) {
            var tempVar = eval(manager.currentScene.keySet[i]);
            getKeys.push(tempVar);
        }

        manager.keySet = getKeys;
    },

    WaitPlease: function () {
        var manager = this;
        manager.wait = manager.add.sprite(500, 550, "wait", "wait0");
        manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.RotateWait, this);
    },

    RotateWait: function () {
        var manager = this;
        if (manager.wait.frame == 2) {
            manager.wait.frame = 0;
        } else {
            manager.wait.frame += 1;
        }
    },

    GuessPlease: function () {
        var manager = this;
        manager.guess = manager.add.sprite(500, 550, "guess", "guess0");
        manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.RotateGuess, this);
    },

    RotateGuess: function () {
        var manager = this;
        if (manager.guess.frame == 2) {
            manager.guess.frame = 0;
        } else {
            manager.guess.frame += 1;
        }
    },

    //sets some parameters for the scene
    //preloads a scene five units away
    PhotoLoader: function () {
        var manager = this;
        manager.sceneSpeed = manager.currentScene.speed;
        if (manager.unloadedSets.length != 0) {
            var nextSet = manager.unloadedSets.pop();
            manager.preloadedSets.push(nextSet);
            for (var i = 0; i < manager.scenesJSON.Scenes.length; i++) {
                if (manager.scenesJSON.Scenes[i].name == nextSet) {
                    var sheetNum = manager.scenesJSON.Scenes[i].sheets;
                    for (var j = 0; j < sheetNum; j++) {
                        this.load.atlasJSONArray(manager.scenesJSON.Scenes[i].name + "-" + j, "assets/textures/" + manager.scenesJSON.Scenes[i].name + "-" + j + ".png", "assets/textures/" + manager.scenesJSON.Scenes[i].name + "-" + j + ".json");
                        for (var k = 0; k < this.scenesJSON.Scenes[i].sound.length; k++) {
                            this.load.audio(this.scenesJSON.Scenes[i].sound[k], "assets/sound/" + this.scenesJSON.Scenes[i].sound[k]);
                        }
                    }
                }
            }
            manager.load.start();

        }
        manager.PhotoCreate();


    },

    //creates the actual sprites for the level
    //should perhaps run these in reverse, so that the levels are loading while play is happening
    PhotoCreate: function () {
        var manager = this;

        manager.photo = manager.add.sprite(0, 0, manager.currentScene.name + "-" + "0", manager.currentScene.name + "00");
        manager.keysPressed = [];
        for (var i = 0; i < manager.keySet.length; i++) {
            manager.keysPressed[i] = false;
        }
        manager.upInt = 0;
        manager.sheetNum = 0;
        manager.spriteNum = 0;
        manager.allKeys = false;
        manager.CreateKeySprite();
        manager.gameReady = true;
        manager.KeyCheckSwitch(manager.currentScene.pattern);
        if (manager.currentScene.name != "sleep") {
            manager.time.events.add(Phaser.Timer.SECOND * 10, manager.NextScene, this);
        }
        if (manager.currentScene.name == "wakephone") {
            manager.MorningScenes();
        }
        if (manager.currentScene.startframe != null) {
            manager.startFrame = manager.add.sprite(0, 0, manager.currentScene.startframe);
        }

    },

    //picks the next scene from the array of already loaded scenes
    NextScene: function () {
        var manager = this;
        manager.RemoveEverything();
        if (manager.preloadedSets.length != 0) {
            var nextSet = manager.preloadedSets.shift();
            for (var i = 0; i < this.scenesJSON.Scenes.length; i++) {
                if (this.scenesJSON.Scenes[i].name == nextSet) {
                    manager.currentScene = manager.scenesJSON.Scenes[i];
                    manager.switchSound = null;
                    manager.currentSound = null;
                    manager.TempSoundManager();
                    manager.FindKeys();
                    manager.PhotoLoader();
                    if (manager.currentScene.name == "coffee") {
                        manager.music = manager.add.audio('music');
                        manager.music.volume = .3;
                        manager.music.play();
                    }
                    if (manager.currentScene.name == "subway") {
                        manager.music.stop();
                    }
                    break;
                }
            }

        } else {
            manager.state.start("Manager");
        }
    },

    RemoveEverything: function () {
        var manager = this;
        manager.cue.reset();
        manager.doubleEwe.reset();
        manager.cursors.up.reset();
        manager.cursors.down.reset();
        manager.cursors.left.reset();
        manager.cursors.right.reset();
        manager.keysPressed = [];

        if (manager.currentSound != null) {
            manager.currentSound.stop();
        }
        manager.world.removeAll();
        manager.time.events.removeAll();
    },

    //here is where i'm running the code to detect input
    update: function () {

        var manager = this;
        if (manager.gameReady) {
            if (manager.keysPressed.every(manager.AreTrue)) {
                manager.allKeys = true;
            } else {
                manager.allKeys = false;
            }
            if (manager.allKeys) {
                manager.IncreaseInt();
            }

        }

        if (manager.currentScene.name == "wakephone") {
            if (manager.topLidDown) {
                manager.startTween = true;
                manager.mLidTween = manager.add.tween(manager.mLid).to({
                    alpha: 0
                }, 1000, Phaser.Easing.Linear.None, true);
                manager.tLidTween.pause();
                manager.bLidTween.pause();
                manager.world.bringToTop(manager.tLid);
                manager.world.bringToTop(manager.bLid);
                manager.world.bringToTop(manager.black);
                for (var i = 0; i < manager.yellowSprites.length; i++) {
                    manager.world.bringToTop(manager.yellowSprites[i]);
                }
                for (var i = 0; i < manager.pressSprites.length; i++) {
                    manager.world.bringToTop(manager.pressSprites[i]);
                }
                manager.world.bringToTop(manager.keySprites);
                for (var i = 0; i < manager.hands.length; i++) {
                    manager.world.bringToTop(manager.hands[i]);
                }
                manager.tLid.position.y--;
                manager.bLid.position.y++;
                manager.morningInt++;
            }
            manager.EyelidTweens();
        }
        if (manager.currentScene.pattern == 2) {
            if (manager.upInt >= 0) {
                manager.upInt--;
            }
        }
        if (manager.currentScene.pattern == 3) {
            console.log(manager.upInt);
            console.log(manager.goDown);
            if (!manager.goDown && manager.upInt >= manager.currentScene.switchInt) {
                manager.goDown = true;
                manager.SequentialKeyPress(0);
                manager.MoveHand(1);
                manager.YellowKeyUp(1);
            }
            if (manager.goDown && manager.upInt <= 0) {
                manager.goDown = false;
                manager.SequentialKeyPress(1);
                manager.MoveHand(0);
                manager.YellowKeyUp(0);
            }
            if (manager.keysPressed[0]) {
                if (!manager.goDown) {
                    manager.IncreaseInt();
                }
            }
            if (manager.keysPressed[1]) {
                if (manager.goDown) {
                    manager.DecreaseInt();
                }
            }
        }
        if (manager.currentScene.decrease) {
            console.log(manager.upInt);
            if (manager.upInt > 0) {
                if (!manager.keysPressed.every(manager.AreTrue)) {
                    manager.DecreaseInt();
                }
            }
        }
        if (manager.currentScene.pattern == 5) {
            manager.NoInput();
        }
        if (manager.eventSoundTime) {
            if (manager.upInt == manager.currentScene.soundFrame) {
                manager.eventSound.play();
                manager.eventSoundTime = false;
            }
        }
        if (manager.currentScene.name == "sleep") {
            if (manager.onePress && manager.zeroPress) {
                manager.moveNum = manager.add.tween(manager.endNumber).to({
                    x: 565
                }, 1000, Phaser.Easing.Linear.None, true);
                manager.logoTween = manager.add.tween(manager.logo).to({
                    alpha: 1
                }, 1000, Phaser.Easing.Linear.None, true);
                manager.onePress = false;
            }
        }
    },

    TempSoundManager: function () {
        var manager = this;
        manager.eventSoundTime = false;
        switch (manager.currentScene.soundType) {
            case 0:
                manager.baseSound = manager.add.audio(manager.currentScene.sound[0]);
                manager.baseSound.play();
                manager.currentSound = manager.baseSound;
                break;
            case 1:
                manager.eventSound = manager.add.audio(manager.currentScene.sound[0]);
                manager.eventSoundTime = true;
                manager.currentSound = manager.eventSound;
                break;
            case 2:
                manager.baseSound = manager.add.audio(manager.currentScene.sound[0]);
                manager.baseSound.play();
                manager.switchSound = manager.add.audio(manager.currentScene.sound[1]);
                manager.currentSound = manager.baseSound;
                break;
            case 3:
                break;
        }
        if (manager.currentScene.loop) {
            manager.baseSound.loopFull();
        }
    },

    SubwaySound: function () {
        var manager = this;
        manager.baseSound = manager.add.audio("subwayambiant");
    },

    MidSoundManager: function () {
        var manager = this;
        if (manager.switchSound != null) {
            manager.currentSound.pause();
            manager.switchSound.play();
            manager.currentSound = manager.switchSound;
            manager.switchSound = null;
        }
    },

    MorningScenes: function () {
        var manager = this;
        manager.morningInt = 0;

        manager.tLid = manager.add.sprite(0, -100, "toplid");
        manager.bLid = manager.add.sprite(0, 0, "lowerlid");
        manager.mLid = manager.add.sprite(0, 0, "midlid");
        manager.black = manager.add.sprite(0, 501, "black");
        for (var i = 0; i < manager.yellowSprites.length; i++) {
            manager.world.bringToTop(manager.yellowSprites[i]);
        }
        manager.world.bringToTop(manager.keySprites);
        for (var i = 0; i < manager.hands.length; i++) {
            manager.world.bringToTop(manager.hands[i]);
        }
        manager.tLidTween = manager.add.tween(manager.tLid).to({
            y: manager.tLid.position.y - 20
        }, 3000, Phaser.Easing.Back.Out, true);
        manager.tLidTween.repeat(1000, 1000);
        manager.bLidTween = manager.add.tween(manager.bLid).to({
            y: manager.bLid.position.y + 20
        }, 3000, Phaser.Easing.Back.Out, true);
        manager.bLidTween.repeat(1000, 1000);
        manager.tLidTween.yoyo(true, 1000);
        manager.bLidTween.yoyo(true, 1000);
        manager.cursors.up.onDown.add(function () {
            manager.topLidDown = true;
        });
        manager.cursors.up.onUp.add(function () {
            manager.topLidDown = false;
        });
        manager.cursors.down.onDown.add(function () {
            manager.bottomLidDown = true;
            if (manager.morningInt == 100) {
                manager.muffled.stop();
                manager.transtionAlarm = manager.add.audio("transition.mp3");
                manager.transtionAlarm.play();
                manager.currentSound = manager.transtionAlarm;
                manager.transtionAlarm.onStop.add(function () {
                    manager.morning = manager.add.audio("morning.wav");
                    manager.morning.play();
                    manager.currentSound = manager.morning;
                });
                manager.gameReady = true;
            }
        });
        manager.cursors.down.onUp.add(function () {
            manager.bottomLidDown = false;
        });
    },

    EyelidTweens: function () {
        var manager = this;
        if (!manager.topLidDown) {
            if (manager.tLid.position.y < -120 && manager.startTween) {
                if (manager.tLid.position.y > -180) {
                    manager.tLidReTween = manager.add.tween(manager.tLid).to({
                        y: -100
                    }, 500, Phaser.Easing.Back.Out, true);
                    manager.bLidReTween = manager.add.tween(manager.bLid).to({
                        y: 0
                    }, 500, Phaser.Easing.Back.Out, true);
                    manager.tLidReTween.onComplete.add(function () {
                        manager.tLidTween.resume();
                        manager.bLidTween.resume();
                        manager.startTween = false;
                    });
                } else {
                    manager.tLidTween.stop();
                    manager.bLidTween.stop();
                    manager.tLidTween = manager.add.tween(manager.tLid).to({
                        y: manager.tLid.position.y - 20
                    }, 3000, Phaser.Easing.Back.Out, true);
                    manager.tLidTween.repeat(1000, 1000);
                    manager.bLidTween = manager.add.tween(manager.bLid).to({
                        y: manager.bLid.position.y + 20
                    }, 3000, Phaser.Easing.Back.Out, true);
                    manager.startTween = false;
                }
            }
        }
    },

    //case statment to find out which function to run
    //for different kinds of input patterns
    KeyCheckSwitch: function (pattern) {
        var manager = this;
        switch (pattern) {
            case 0:
                manager.HoldKeys();
                break;
            case 1:
                manager.SequentialKeys();
                break;
            case 2:
                manager.TapKeys();
                break;
            case 3:
                manager.SwitchKeys();
                break;
            case 4:
                manager.keySprites.visible = false;
                manager.GuessPlease();
                manager.AnyKey();
                break;
            case 5:
                manager.keySprites.visible = false;
                manager.WaitPlease();
                break;
            case 6:
                manager.number = 0;
                manager.tLid = manager.add.sprite(0, -450, "toplid");
                manager.bLid = manager.add.sprite(0, 300, "lowerlid");
                manager.black = manager.add.sprite(0, 501, "black");
                manager.world.bringToTop(manager.yellowSprites[0]);
                manager.world.bringToTop(manager.letterKeys[0]);
                manager.endNumber = manager.add.sprite(610, 560, 'numbers', 'numbers' + (manager.number + 1) + '0');
                manager.world.bringToTop(manager.hands[0]);

                manager.EndGame(0);
        }
    },

    EndGame: function (number) {
        var manager = this;
        console.log("hmmm")

        manager.keySet[number].onDown.add(function () {
            console.log("hello");
            manager.IncreaseInt();

            manager.world.bringToTop(manager.tLid);
            manager.world.bringToTop(manager.bLid);
            manager.world.bringToTop(manager.black);
            manager.world.bringToTop(manager.yellowSprites[0]);
            manager.world.bringToTop(manager.letterKeys[0]);
            manager.world.bringToTop(manager.endNumber);
            manager.world.bringToTop(manager.hands[0]);
            manager.numAlpha = manager.add.tween(manager.endNumber).to({
                alpha: 0
            }, 200, Phaser.Easing.Linear.None, true);

            manager.midYellowTween = manager.add.tween(manager.yellowSprites[0]).to({
                alpha: 0
            }, 200, Phaser.Easing.Linear.None, true);
            if (manager.number > 7) {
                manager.endTopTween = manager.add.tween(manager.tLid).to({
                    alpha: 0
                }, 1000, Phaser.Easing.Linear.None, true);
                manager.endBottomTween = manager.add.tween(manager.bLid).to({
                    alpha: 0
                }, 1000, Phaser.Easing.Linear.None, true);
            } else {
                manager.endTopTween = manager.add.tween(manager.tLid).to({
                    y: '+50'
                }, 1000, Phaser.Easing.Linear.None, true);
                manager.endBottomTween = manager.add.tween(manager.bLid).to({
                    y: '-50'
                }, 1000, Phaser.Easing.Linear.None, true);
            }

            manager.time.events.add(Phaser.Timer.SECOND / 10, manager.EndIncreaseInt, this);

        }, this);
    },

    EndIncreaseInt: function () {
        var manager = this;
        manager.IncreaseInt();
        manager.world.bringToTop(manager.tLid);
        manager.world.bringToTop(manager.bLid);
        manager.world.bringToTop(manager.black);
        manager.world.bringToTop(manager.yellowSprites[0]);
        manager.world.bringToTop(manager.letterKeys[0]);
        manager.world.bringToTop(manager.endNumber);
        manager.world.bringToTop(manager.hands[0]);
        manager.keySet[manager.number].reset();
        manager.number += 1;
        manager.numAlpha = manager.add.tween(manager.endNumber).to({
            alpha: 1
        }, 200, Phaser.Easing.Linear.None, true);
        manager.midYellowUnTween = manager.add.tween(manager.yellowSprites[0]).to({
            alpha: 1
        }, 200, Phaser.Easing.Linear.None, true);
        if (manager.number < 9) {

            manager.handEndTween = manager.add.tween(manager.hands[0]).to({
                y: 1500
            }, 30000, Phaser.Easing.Linear.None, true);

            manager.EndGame(manager.number);
            manager.endNumber.frame += 3;


        } else {
            manager.endNumber.frame += 3;
            manager.finalOne = manager.add.sprite(540, 560, 'numbers', 'numbers10');
            manager.letterKeys[1] = manager.add.sprite(500, 550, "qw", "qwkey0");
            manager.EndYellowBG(manager.currentScene.keySet[0], 1);
            manager.world.bringToTop(manager.yellowSprites[1]);
            manager.world.bringToTop(manager.finalOne);
            manager.keyOne.onDown.add(function () {
                manager.logo = manager.add.sprite(860, 560, 'logo', 'logo_0000_Layer-3.png');
                var cropRect = new Phaser.Rectangle(0, 0, -550, manager.logo.height);
                manager.logo.alpha = 0;
                manager.logo.scale.x = .5;
                manager.logo.scale.y = .5;
                manager.logo.crop(cropRect);
                manager.oneAlpha = manager.add.tween(manager.letterKeys[1]).to({
                    alpha: 0
                }, 1000, Phaser.Easing.Linear.None, true);

                manager.yellow1Tween = manager.add.tween(manager.yellowSprites[1]).to({
                    alpha: 0
                }, 1000, Phaser.Easing.Linear.None, true);
                manager.onePress = true;
            }, this);

            manager.keyZero.onDown.add(function () {
                manager.zeroAlpha = manager.add.tween(manager.letterKeys[0]).to({
                    alpha: 0
                }, 1000, Phaser.Easing.Linear.None, true);
                manager.yello0Tween = manager.add.tween(manager.yellowSprites[0]).to({
                    alpha: 0
                }, 1000, Phaser.Easing.Linear.None, true);
                manager.zeroPress = true;
            }, this);

        }

    },

    YellowKeyInput: function (num) {
        var manager = this;
        manager.yellowSprites[num].visible = false;
        manager.pressSprites[num].visible = true;
        manager.pressSprites[num].alpha = 1;
        manager.buttonPressFrame[0] = 0;
        manager.time.events.repeat(Phaser.Timer.SECOND / 15, 8, function () {
            manager.pressSprites[num].frame = manager.buttonPressFrame[num];
            manager.buttonPressFrame[num] += 1;
            manager.pressSprites[num].alpha -= 0.15;
            if (manager.buttonPressFrame[num] >= 7) {
                manager.buttonPressFrame[num] = 0;
                manager.pressSprites[num].frame = manager.buttonPressFrame[num];
                manager.pressSprites[num].visible = false;
            }
        }, this);
    },

    YellowKeyUp: function (num) {
        var manager = this;
        if (!manager.yellowSprites[num].visible) {
            manager.yellowSprites[num].visible = true;
        }
        manager.buttonPressFrame[num] = 0;
        manager.yellowSprites[num].frame = 12;
    },

    YellowKeyFlashOne: function () {
        var manager = this;
        if (!manager.yellowSprites[0].visible && !manager.keysPressed[0]) {
            manager.yellowSprites[0].visible = true;
        }
        manager.buttonPressFrame[0] = 0;
        //manager.yellowSprites[0].frame = 12;
        manager.time.events.add(Phaser.Timer.SECOND / 5, manager.YellowKeyFlashTwo, this);
    },

    YellowKeyFlashTwo: function () {
        var manager = this;
        if (manager.yellowSprites[0].visible) {
            manager.yellowSprites[0].visible = false;
        }
        manager.buttonPressFrame[0] = 0;
        // manager.yellowSprites[0].frame = 12;
        manager.time.events.add(Phaser.Timer.SECOND / 5, manager.YellowKeyFlashOne, this);
    },

    //for holding down one+ keys
    HoldKeys: function () {
        var manager = this;
        manager.keySet[0].onDown.add(function () {
            manager.HoldKeyPress(0);
        });
        manager.keySet[0].onUp.add(function () {
            manager.HoldKeyUp(0);
        });
        if (manager.keySet[1] != null) {
            manager.keySet[1].onDown.add(function () {
                manager.HoldKeyPress(1);
            });
            manager.keySet[1].onUp.add(function () {
                manager.HoldKeyUp(1);
            });
        }
        if (manager.keySet[2] != null) {
            manager.keySet[2].onDown.add(function () {
                manager.correct.HoldKeyPress(2);
            });
            manager.keySet[2].onUp.add(function () {
                manager.HoldKeyUp(2);
            });
        }
        if (manager.keySet[3] != null) {
            manager.keySet[3].onDown.add(function () {
                manager.HoldKeyPress(3);
            });
            manager.keySet[3].onUp.add(function () {
                manager.HoldKeyUp(3);
            });
        }
    },

    HoldKeyPress: function (num) {
        var manager = this;
        manager.keysPressed[num] = true;
        manager.YellowKeyInput(num);
    },

    HoldKeyUp: function (num) {
        var manager = this;
        manager.YellowKeyUp(num);
        manager.keysPressed[num] = false;
    },

    //checks if every bool in an array is true
    AreTrue: function (element, index, array) {
        return element == true;
    },

    //for when keys must be pressed in a certain order
    SequentialKeys: function () {
        var manager = this;
        for (var i = 1; i < manager.keySet.length; i++) {
            manager.yellowSprites[i].visible = false;
        }
        manager.keySet[0].onDown.add(function () {
            if (!manager.keysPressed[0]) {
                manager.SequentialKeyPress(0);
                manager.MoveHand(1);
                manager.YellowKeyUp(1);
            }
            manager.keysPressed[0] = true;
        });
        manager.keySet[1].onDown.add(function () {
            if (manager.keysPressed[0]) {
                if (!manager.keysPressed[1]) {
                    manager.SequentialKeyPress(1);
                }
                manager.keysPressed[1] = true;
                if (manager.keySet.length == 2) {
                    manager.SetKeysPressedFalse();
                    manager.MoveHand(0);
                    manager.YellowKeyUp(0);
                } else {
                    manager.YellowKeyUp(2);
                    manager.MoveHand(2);

                }
                for (var i = 0; i < manager.hands.length; i++) {
                    manager.world.bringToTop(manager.hands[i]);
                }
            }
        });

        if (manager.keySet.length >= 3) {
            manager.keySet[2].onDown.add(function () {
                if (manager.keysPressed[1]) {
                    if (!manager.keysPressed[2]) {
                        manager.SequentialKeyPress(2);
                        manager.MoveHand(3);
                    }
                    if (manager.keySet.length == 3) {
                        manager.MoveHand(0);
                        manager.YellowKeyUp(0);
                        manager.SetKeysPressedFalse();
                    } else {
                        manager.YellowKeyUp(3);
                    }
                }
            });

        }
        if (manager.keySet.length >= 4) {
            manager.keySet[3].onDown.add(function () {
                if (manager.keysPressed[2]) {
                    if (!manager.keysPressed[3]) {
                        manager.SequentialKeyPress(3);
                    }
                    manager.keysPressed[3] = true;
                }
                if (manager.keysPressed[3]) {
                    manager.MoveHand(0);
                    manager.YellowKeyUp(0);
                    manager.SetKeysPressedFalse();
                }
            });

        }
    },

    MoveHand: function (key) {
        var manager = this;

        switch (manager.keySet[key]) {
            case manager.cursors.left:
                manager.NewHandPos(620, 810, 60);
                break;
            case manager.cursors.right:
                manager.NewHandPos(690, 830, 90);
                break;
            case manager.cursors.up:
                manager.NewHandPos(560, 780, 100);
                break;
            case manager.cursors.down:
                manager.NewHandPos(610, 830, 90);
                break;
            case manager.cue:
                manager.NewHandPos(620, 810, 60);
                break;
            case manager.doubleEwe:
                manager.NewHandPos(690, 830, 90);
                break;
        }
    },

    NewHandPos: function (posX, posY, rot) {
        var manager = this;
        manager.hands[0].position.x = posX;
        manager.hands[0].position.y = posY;
        manager.hands[0].angle = rot;
    },

    SequentialKeyPress: function (num) {
        var manager = this;
        manager.YellowKeyInput(num);
    },

    SetKeysPressedFalse: function () {
        var manager = this;
        manager.IncreaseInt();
        for (var i = 0; i < manager.keysPressed.length; i++) {
            manager.keysPressed[i] = false;
        }
    },


    SwitchKeys: function () {
        var manager = this;
        for (var i = 1; i < manager.keySet.length; i++) {
            manager.yellowSprites[i].visible = false;
        }
        manager.keySet[0].onDown.add(function () {
            manager.keysPressed[0] = true;
        });
        manager.keySet[0].onUp.add(function () {

            manager.keysPressed[0] = false;
        });
        manager.keySet[1].onDown.add(function () {
            manager.keysPressed[1] = true;
        });
        manager.keySet[1].onUp.add(function () {

            manager.keysPressed[1] = false;
        });
    },

    RestartCheck: function () {
        var manager = this;
        if (manager.currentScene.restart) {
            manager.sheetNum = 0;
            manager.spriteNum = 0;
            manager.gameReady = true;
        }
    },

    //for repeatedly tapping a single key
    TapKeys: function () {
        var manager = this;
        manager.gameReady = false;
        manager.YellowKeyFlashOne();
        manager.keySet[0].onDown.add(function () {
            manager.keysPressed[0] = true;
            manager.YellowKeyInput(0);
            manager.TapIncrease();
        });
        manager.keySet[0].onUp.add(function () {
            manager.keysPressed[0] = false;
            manager.YellowKeyUp(0);
        });
    },

    TapIncrease: function () {
        var manager = this;
        manager.upInt += 10;
        if (manager.upInt != 0) {
            if (manager.upInt % manager.sceneSpeed == 0) {
                if (manager.spriteNum >= 3) {
                    manager.sheetNum += 1;
                    manager.spriteNum = 0;
                    if (manager.sheetNum >= manager.currentScene.sheets) {
                        manager.gameReady = false;
                        manager.RestartCheck();
                    } else {
                        var tempSprite = manager.add.sprite(0, 0, manager.currentScene.name + "-" + manager.sheetNum, manager.currentScene.name + manager.sheetNum + manager.spriteNum);
                    }
                } else {
                    if (manager.sheetNum <= manager.currentScene.sheets) {
                        manager.spriteNum += 1;
                        var tempSprite = manager.add.sprite(0, 0, manager.currentScene.name + "-" + manager.sheetNum, manager.currentScene.name + manager.sheetNum + manager.spriteNum);
                    }
                }
                for (var i = 0; i < manager.hands.length; i++) {
                    manager.world.bringToTop(manager.hands[i]);
                }
            }
        }
    },

    //for when you can press any key :p 
    AnyKey: function () {
        var manager = this;
        manager.gameReady = false;
        manager.clicks = [];
        manager.clicks[0] = manager.add.audio("click2.wav");
        manager.clicks[1] = manager.add.audio("click3.wav");
        manager.clicks[2] = manager.add.audio("click4.wav");
        manager.clicks[3] = manager.add.audio("click1.wav");
        manager.input.keyboard.onDownCallback = function () {
            if (manager.currentScene.name == "computer") {
                manager.clicks[manager.rnd.integerInRange(0, 3)].play();
                manager.IncreaseInt();
            }

        };
    },

    NoInput: function () {
        var manager = this;
        manager.upInt += 1;
        if (manager.upInt != 0) {
            if (manager.upInt % manager.sceneSpeed == 0) {
                if (manager.spriteNum >= 3) {
                    manager.sheetNum += 1;
                    manager.spriteNum = 0;
                    if (manager.sheetNum >= manager.currentScene.sheets) {
                        manager.gameReady = false;
                        manager.RestartCheck();
                    } else {
                        var tempSprite = manager.add.sprite(0, 0, manager.currentScene.name + "-" + manager.sheetNum, manager.currentScene.name + manager.sheetNum + manager.spriteNum);
                    }
                } else {
                    if (manager.sheetNum <= manager.currentScene.sheets) {
                        manager.spriteNum += 1;
                        var tempSprite = manager.add.sprite(0, 0, manager.currentScene.name + "-" + manager.sheetNum, manager.currentScene.name + manager.sheetNum + manager.spriteNum);
                    }
                }
                for (var i = 0; i < manager.hands.length; i++) {
                    manager.world.bringToTop(manager.hands[i]);
                }
            }
        }

    },

    SpecificSheetRestart: function () {
        var manager = this;
        manager.spriteNum = 0;
        manager.sheetNum = manager.currentScene.restartSheet;
        manager.gameReady = true;

    },

    DecreaseInt: function () {
        var manager = this;
        manager.upInt -= 1;
        if (manager.upInt >= 1) {
            if (manager.upInt % manager.sceneSpeed == 0) {
                manager.spriteNum -= 1;
                if (manager.spriteNum <= -1) {
                    manager.spriteNum = 3;
                    manager.sheetNum -= 1;
                }
                if (manager.sheetNum <= -1) {
                    manager.RestartCheck();
                } else {
                    var tempSprite = manager.add.sprite(0, 0, manager.currentScene.name + "-" + manager.sheetNum, manager.currentScene.name + manager.sheetNum + manager.spriteNum);
                }
                for (var i = 0; i < manager.hands.length; i++) {
                    manager.world.bringToTop(manager.hands[i]);
                }
            }
        }
        if (manager.currentScene.soundType == 1) {
            if (manager.upInt < manager.currentScene.soundFrame) {
                manager.eventSoundTime = true;

            }
        }
        if (manager.upInt == 0) {
            manager.gameReady = true;
        }
    },



    //Int that increases based on input in order to move the photos forward
    IncreaseInt: function () {
        var manager = this;
        manager.upInt += 1;
        if (manager.currentScene.soundType == 2) {
            if (manager.upInt == manager.currentScene.soundFrame) {
                manager.MidSoundManager();
            }
        }
        if (manager.upInt != 0) {
            if (manager.upInt % manager.sceneSpeed == 0) {
                if (manager.spriteNum >= 3) {
                    manager.sheetNum += 1;
                    manager.spriteNum = 0;
                    if (manager.sheetNum >= manager.currentScene.sheets) {
                        manager.gameReady = false;
                        manager.RestartCheck();
                        if (manager.currentScene.restartSheet != null) {
                            manager.SpecificSheetRestart();
                        }
                    } else {
                        var tempSprite = manager.add.sprite(0, 0, manager.currentScene.name + "-" + manager.sheetNum, manager.currentScene.name + manager.sheetNum + manager.spriteNum);
                    }
                } else {
                    if (manager.sheetNum <= manager.currentScene.sheets) {
                        manager.spriteNum += 1;
                        var tempSprite = manager.add.sprite(0, 0, manager.currentScene.name + "-" + manager.sheetNum, manager.currentScene.name + manager.sheetNum + manager.spriteNum);
                    }
                }
                for (var i = 0; i < manager.hands.length; i++) {
                    manager.world.bringToTop(manager.hands[i]);
                }

            }
        }

    }


};
