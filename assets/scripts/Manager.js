SceneGame.Manager = function (game) {
    this.game;
    this.add;
    this.camera;
    this.cache;
    this.input;
    this.load;
    this.sound;
    this.stage;
    this.time;
    this.tweens;
    this.state;
    this.world;
    this.rnd;

};

SceneGame.Manager.prototype = {

    create: function () {
        var manager = this;
        manager.scenesJSON = manager.cache.getJSON("scenes");
        manager.muffled = manager.add.audio("muffled.mp3");
        manager.muffled.play();
        manager.currentSound = manager.muffled;
        manager.muffled.loopFull();
        manager.CreateKeys();
        manager.CreateVariables();
        for (var i = 0; i < manager.scenesJSON.Scenes.length; i++) {
            if (manager.scenesJSON.Scenes[i].time == "morning") {
                manager.preloadedSets.push(manager.scenesJSON.Scenes[i].name);
            } else if (manager.scenesJSON.Scenes[i].time == "start") {
                manager.currentScene = manager.scenesJSON.Scenes[i];
                manager.FindKeys();
            } else {
                manager.unloadedSets.push(manager.scenesJSON.Scenes[i].name);
            }
        }
        manager.CreatePausedStuff();
        manager.InitCreateHands();

    },

    CreatePausedStuff: function () {
        var manager = this;
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
    },

    CreateVariables: function () {
        var manager = this;
        manager.preloadedSets = [];
        manager.unloadedSets = [];
        manager.currentSet = [];
        manager.keySprites;
        manager.keySpriteFrame = 0;
        manager.letterSpriteFrame = 1;
        manager.yellowSprites = [];
        manager.buttonPressFrame = [];
        manager.yellowSpriteFrame = 12;
        manager.buttonPressFrameSets = [];
        manager.pressSprites = [];
        manager.handimation = [];
        manager.letter = [];
        manager.letterFrame = [];
        manager.hasLetters = false;
    },

    CreateKeySprite: function () {
        var manager = this;
        if (manager.currentScene.keySet[0] == "manager.cue") {
            manager.letterKeys = [];
            manager.hasLetters = true;
            manager.keySprites.visible = false;
            for (var i = 0; i < manager.keySet.length; i++) {
                manager.letterKeys[i] = manager.add.sprite(480 + (100 * i), 550, "qw", "qwkey0");
                manager.LetterYellowBG(manager.currentScene.keySet[i], i);
            }
            manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.LetterRotateOutline, this);
        } else if (manager.currentScene.keySet[0] == "manager.em") {
            manager.letterKeys = [];
            manager.hasLetters = true;
            manager.keySprites.visible = false;
            for (var i = 0; i < manager.keySet.length; i++) {
                manager.letterKeys[i] = manager.add.sprite(440 + (50 * i), 510 + (100 * i), "qw", "qwkey0");
                manager.LetterYellowBG(manager.currentScene.keySet[i], i);
            }
            manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.LetterRotateOutline, this);
        } else if (manager.currentScene.keySet[0] == "manager.keyOne") {
            manager.letterKeys = [];
            manager.letterKeys[0] = manager.add.sprite(580, 550, "qw", "qwkey0");
            manager.EndYellowBG(manager.currentScene.keySet[0], 0);
            manager.keySprites.visible = false;
            manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.LetterRotateOutline, this);

        } else if (manager.currentScene.name == "wakephone") {
            manager.keySprites = manager.add.sprite(500, 550, "keyz", "keys-0");
            manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.RotateOutline, this);
            for (var i = 0; i < manager.currentScene.keySet.length; i++) {
                manager.CreateYellowBG(manager.currentScene.keySet[i], i);
            }
        } else {
            manager.keySprites.visible = true;
            manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.RotateOutline, this);
            for (var i = 0; i < manager.currentScene.keySet.length; i++) {
                manager.CreateYellowBG(manager.currentScene.keySet[i], i);
            }
        }
        for (var i = 0; i < manager.hands.length; i++) {
            manager.world.bringToTop(manager.hands[i]);
        }
    },

    CreateKeys: function () {
        var manager = this;
        manager.cursors = manager.input.keyboard.createCursorKeys();
        manager.cue = manager.input.keyboard.addKey(Phaser.Keyboard.Q);
        manager.doubleEwe = manager.input.keyboard.addKey(Phaser.Keyboard.W);
        manager.em = manager.input.keyboard.addKey(Phaser.Keyboard.M);
        manager.jay = manager.input.keyboard.addKey(Phaser.Keyboard.J);
        manager.ewe = manager.input.keyboard.addKey(Phaser.Keyboard.U);
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
    },

    EndYellowBG: function (keyName, num) {
        var manager = this;
        switch (num) {
            case 0:
                manager.PlaceHands(num, 820, 715, 45);
                for (var i = 1; i < manager.hands.length; i++) {
                    manager.hands[i].visible = false;
                }
                manager.CreateLetterYellowBG(num, 620, 580, 720, 580);
                break;
            case 1:
                manager.CreateLetterYellowBG(num, 540, 580, 640, 580);
                break;
        }
    },

    CreateLetterYellowBG: function (num, yellX, yellY, pressX, pressY) {
        var manager = this;
        manager.yellowSprites[num] = manager.add.sprite(yellX, yellY, "qw", "qwYellow1");
        manager.pressSprites[num] = manager.add.sprite(pressX, pressY, "keys", "keypress-0");
        manager.SetSpriteData(num);
    },

    LetterYellowBG: function (keyName, num) {
        var manager = this;
        switch (keyName) {
            case "manager.cue":
                manager.arrows.visible = false;
                manager.letter[num] = manager.add.sprite(500 + (100 * num), 560, "qw", "qwQ1");
                manager.PlaceHands(num, 340, 700, 150);
                for (var i = 1; i < manager.hands.length; i++) {
                    manager.hands[i].visible = false;
                }
                manager.CreateLetterYellowBG(num, 520 + (100 * num), 580, 520 + (100 * num), 580);

                break;
            case "manager.doubleEwe":
                manager.arrows.visible = false;
                manager.letter[num] = manager.add.sprite(500 + (100 * num), 560, "qw", "qwW1");
                manager.PlaceHands(num, 900, 595, 0);
                for (var i = 1; i < manager.hands.length; i++) {
                    manager.hands[i].visible = false;
                }
                manager.CreateLetterYellowBG(num, 520 + (100 * num), 580, 520 + (100 * num), 580);

                break;
            case "manager.em":
                manager.arrows.visible = false;
                manager.letter[num] = manager.add.sprite(460 + (50 * 2), 530 + (100 * 2), "mju", "M3");
                manager.PlaceHands(num, 800, 725, 0);
                for (var i = 1; i < manager.hands.length; i++) {
                    manager.hands[i].visible = false;
                }
                manager.CreateLetterYellowBG(num, 480 + (50 * num), 550 + (100 * num), 480 + (50 * num), 550 + (100 * i));

                break;
            case "manager.jay":
                manager.arrows.visible = false;
                manager.letter[num] = manager.add.sprite(465 + (50 * num), 530 + (100 * num), "mju", "J3");
                manager.PlaceHands(num, 900, 595, 0);
                for (var i = 1; i < manager.hands.length; i++) {
                    manager.hands[i].visible = false;
                }
                manager.CreateLetterYellowBG(num, 480 + (50 * num), 550 + (100 * num), 480 + (50 * num), 550 + (100 * i));
                break;
            case "manager.ewe":
                manager.arrows.visible = false;
                manager.letter[num] = manager.add.sprite(470 + (50 * 0), 530 + (100 * 0), "mju", "U3");
                manager.PlaceHands(num, 900, 595, 0);
                for (var i = 1; i < manager.hands.length; i++) {
                    manager.hands[i].visible = false;
                }
                manager.CreateLetterYellowBG(num, 480 + (50 * num), 550 + (100 * num), 480 + (50 * num), 550 + (100 * i));
                break;
        }
    },

    CreateYellowBG: function (keyName, num) {
        var manager = this;
        manager.arrows.visible = true;
        manager.time.events.loop(Phaser.Timer.SECOND / 7, function () {
            manager.RotateSpriteOutline(manager.arrows, 3, 0);
        }, this);


        switch (keyName) {
            case "manager.cursors.up":
                console.log("up");
                manager.CreateAllSpritesETC(num, 625, 590, 850, 660, 20);
                break;
            case "manager.cursors.down":
                console.log("down");
                manager.CreateAllSpritesETC(num, 625, 670, 700, 880, 60);
                if (manager.hands[num] != null) {
                    manager.hands[num].scale.y = -1;
                }
                break;
            case "manager.cursors.right":
                manager.CreateAllSpritesETC(num, 700, 670, 900, 720, 0);
                break;
            case "manager.cursors.left":
                manager.CreateAllSpritesETC(num, 540, 670, 340, 720, 150);
                if (manager.hands[num] != null) {
                    manager.hands[num].scale.y = -1;
                }
                break;
        }
        manager.SetSpriteData(num);
    },

    InitCreateHands: function () {
        var manager = this;
        manager.hands = [];
        manager.arrows = manager.add.sprite(520, 570, 'arrows');
        for (var i = 0; i < 4; i++) {
            manager.hands.push(manager.add.sprite(-100, -100, "singleHand", "hand0"));
            manager.hands[i].anchor.setTo(0.5, 0.5);
            manager.handimation.push(manager.hands[i].animations.add("twitch"));
            manager.hands[i].visible = false;
            manager.yellowSprites[i] = manager.add.sprite(-100, -100, "qw", "qwYellow1");
            manager.yellowSprites[i].visible = false;
            manager.pressSprites[i] = manager.add.sprite(-100, -100, "keys", "keypress-0");
            manager.pressSprites[i].visible = false;
        }
        manager.PhotoLoader();
    },

    SetSpriteData: function (num) {
        var manager = this;
        manager.yellowSprites[num].anchor.setTo(0.5, 0.5);
        manager.pressSprites[num].anchor.setTo(0.5, 0.5);
        manager.pressSprites[num].visible = false;
        manager.world.sendToBack(manager.yellowSprites[num]);
    },

    CreateAllSpritesETC: function (num, posX, posY, handX, handY, handRot) {
        var manager = this;
        manager.yellowSprites[num].position.x = posX;
        manager.yellowSprites[num].position.y = posY;
        manager.yellowSprites[num].visible = true;
        manager.pressSprites[num].position.x = posX;
        manager.pressSprites[num].position.y = posY;
        manager.pressSprites[num].visible = false;
        manager.PlaceHands(num, handX, handY, handRot);
        if (manager.currentScene.hands == 1) {
            for (var i = 1; i < manager.hands.length; i++) {
                manager.hands[i].visible = false;
            }
        }
    },

    RotateOutline: function () {
        var manager = this;
        manager.keySprites.frame = manager.keySpriteFrame;
        manager.keySpriteFrame += 1;
        if (manager.keySpriteFrame == 3) {
            manager.keySpriteFrame = 0;
        }
        manager.YellowSpriteRotate();
    },

    YellowSpriteRotate: function () {
        var manager = this;
        for (var i = 0; i < manager.yellowSprites.length; i++) {
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
        manager.time.events.loop(Phaser.Timer.SECOND / 7, function () {
            manager.RotateSpriteOutline(manager.letterSpriteFrame, 3, 0);
        }, this);

        manager.YellowSpriteRotate();
    },

    PlaceHands: function (num, posX, posY, rot) {
        var manager = this;
        manager.hands[num].visible = true;
        manager.hands[num].position.x = posX;
        manager.hands[num].position.y = posY;
        manager.handimation[num].play(10, true);
        manager.hands[num].angle = rot;
    },

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

    RotateSpriteOutline: function (frameNumber, endFrame, startFrame) {
        var manager = this;
        if (frameNumber.frame == endFrame) {
            frameNumber.frame = startFrame;
        } else {
            frameNumber.frame += 1;
        }
    },

    RotateGuess: function () {
        var manager = this;
        if (manager.guess.frame == 2) {
            manager.guess.frame = 0;
        } else {
            manager.guess.frame += 1;
        }
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

    PhotoCreate: function () {
        var manager = this;
        manager.currentSet.push(manager.add.sprite(0, 0, manager.currentScene.name + "-" + "0", manager.currentScene.name + "00"));
        manager.keysPressed = [];
        for (var i = 0; i < manager.keySet.length; i++) {
            manager.keysPressed[i] = false;
        }
        manager.upInt = 0;
        manager.sheetNum = 0;
        manager.spriteNum = 0;
        manager.allKeys = false;
        manager.gameReady = true;
        manager.CreateKeySprite();
        manager.KeyCheckSwitch(manager.currentScene.pattern);
        if (manager.currentScene.name != "sleep") {
            manager.time.events.add(Phaser.Timer.SECOND * 10, manager.NextScene, this);
        }
        if (manager.currentScene.name == "wakephone") {
            manager.MorningScenes();
        }
        if (manager.currentScene.startframe != null) {
            manager.startFrame = manager.add.sprite(0, 0, manager.currentScene.startframe);
            for (var i = 0; i < manager.hands.length; i++) {
                manager.world.bringToTop(manager.hands[i]);
            }
        }
    },

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

        }
    },

    RemoveEverything: function () {
        var manager = this;
        manager.cue.reset();
        manager.doubleEwe.reset();
        manager.em.reset();
        manager.jay.reset();
        manager.ewe.reset();
        manager.cursors.up.reset();
        manager.cursors.down.reset();
        manager.cursors.left.reset();
        manager.cursors.right.reset();
        manager.tweens.removeAll();
        manager.keysPressed = [];
        if (manager.currentSound != null) {
            manager.currentSound.stop();
        }
        for (var i = 0; i < manager.currentSet.length; i++) {
            manager.currentSet[i].kill();
        }
        for (var i = 0; i < manager.hands.length; i++) {
            manager.hands[i].visible = false;
        }
        for (var i = 0; i < manager.yellowSprites.length; i++) {
            manager.yellowSprites[i].visible = false;
            manager.pressSprites[i].visible = false;
        }
        if (manager.hasLetters) {
            for (var i = 0; i < manager.letterKeys.length; i++) {
                manager.letterKeys[i].visible = false;
                manager.letter[i].visible = false;
            }
        }
        manager.bLid.kill();
        manager.tLid.kill();
        manager.black.kill();
        manager.hasLetters = false;
        manager.time.events.removeAll();
    },

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
                manager.AlphaTweens(manager.mLid, 0, 1000);
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
                manager.world.bringToTop(manager.arrows);
                manager.world.bringToTop(manager.keySprites);
                for (var i = 0; i < manager.hands.length; i++) {
                    manager.world.bringToTop(manager.hands[i]);
                }
                manager.tLid.position.y--;
                manager.bLid.position.y++;
            }
            manager.EyelidTweens();
        }
        if (manager.currentScene.pattern == 2) {
            if (manager.upInt >= 0) {
                manager.upInt--;
            }
        }
        if (manager.currentScene.pattern == 3) {
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
                manager.endTween = manager.AlphaTweens(manager.logo, 1, 1000);
                manager.time.events.add(Phaser.Timer.SECOND * 10, function () {
                    // manager.state.start("Dreams");
                }, this);
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

    MorningCreate: function () {
        var manager = this;
        manager.LidCreate(-100, 0, 501);
        manager.mLid = manager.add.sprite(0, 0, "midlid");
        for (var i = 0; i < manager.yellowSprites.length; i++) {
            manager.world.bringToTop(manager.yellowSprites[i]);
        }
        manager.world.bringToTop(manager.keySprites);
        manager.world.bringToTop(manager.arrows);
        for (var i = 0; i < manager.hands.length; i++) {
            manager.world.bringToTop(manager.hands[i]);
        }
    },

    LidCreate: function (tY, bY, blY) {
        var manager = this;
        manager.tLid = manager.add.sprite(0, tY, "toplid");
        manager.bLid = manager.add.sprite(0, bY, "lowerlid");
        manager.black = manager.add.sprite(0, blY, "black");
    },

    MorningTweens: function () {
        var manager = this;
        manager.YTweens(manager.tLid, manager.tLid.position.y - 20, 3000);
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
    },

    MorningScenes: function () {
        var manager = this;
        manager.MorningCreate();
        manager.MorningTweens();
        manager.cursors.up.onDown.add(function () {
            manager.topLidDown = true;
        });
        manager.cursors.up.onUp.add(function () {
            manager.topLidDown = false;
        });
        manager.cursors.down.onDown.add(function () {
            manager.bottomLidDown = true;
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
                manager.EndCreate();
            case 7:
                manager.Swipe();
        }
    },

    EndCreate: function () {
        var manager = this;
        manager.number = 0;
        manager.LidCreate(-450, 300, 501);
        manager.endNumber = manager.add.sprite(610, 560, 'numbers', 'numbers' + (manager.number + 1) + '0');
        manager.world.bringToTop(manager.hands[0]);
        manager.EndBringToTop();
        manager.EndGame(0);
    },

    EndBringToTop: function () {
        var manager = this;
        manager.world.bringToTop(manager.tLid);
        manager.world.bringToTop(manager.bLid);
        manager.world.bringToTop(manager.black);
        manager.world.bringToTop(manager.yellowSprites[0]);
        manager.world.bringToTop(manager.letterKeys[0]);
        manager.world.bringToTop(manager.endNumber);
        manager.world.bringToTop(manager.hands[0]);
    },

    EndGame: function (number) {
        var manager = this;
        manager.keySet[number].onDown.add(function () {
            manager.IncreaseInt();
            manager.EndBringToTop();
            manager.AlphaTweens(manager.endNumber, 0, 200);
            manager.AlphaTweens(manager.yellowSprites[0], 0, 200);
            if (manager.number > 7) {
                manager.AlphaTweens(manager.tLid, 0, 1000);
                manager.AlphaTweens(manager.bLid, 0, 1000);
            } else {
                manager.YTweens(manager.tLid, '+50', 1000);
                manager.YTweens(manager.bLid, '-50', 1000);
            }
            manager.time.events.add(Phaser.Timer.SECOND / 10, manager.EndIncreaseInt, this);
        }, this);
    },

    AlphaTweens: function (sprite, alphaNum, time) {
        var manager = this;
        manager.add.tween(sprite).to({
            alpha: alphaNum
        }, time, Phaser.Easing.Linear.None, true);
    },

    YTweens: function (sprite, yNum, time) {
        var manager = this;
        manager.endTopTween = manager.add.tween(sprite).to({
            y: yNum
        }, time, Phaser.Easing.Linear.None, true);
    },

    EndIncreaseInt: function () {
        var manager = this;
        manager.IncreaseInt();
        manager.EndBringToTop();
        manager.keySet[manager.number].reset();
        manager.number += 1;
        manager.AlphaTweens(manager.endNumber, 1, 200);
        manager.AlphaTweens(manager.yellowSprites[0], 1, 200);
        if (manager.number < 9) {
            manager.YTweens(manager.hands[0], 1500, 30000)
            manager.EndGame(manager.number);
            manager.endNumber.frame += 3;
        } else {
            manager.endNumber.frame += 3;
            manager.FinalLetterCreate();
            manager.keyOne.onDown.add(function () {
                manager.CreateLogo();
                manager.AlphaTweens(manager.letterKeys[1], 0, 1000);
                manager.AlphaTweens(manager.yellowSprites[1], 0, 1000);
                manager.onePress = true;
            }, this);
            manager.keyZero.onDown.add(function () {
                manager.AlphaTweens(manager.letterKeys[0], 0, 1000);
                manager.AlphaTweens(manager.yellowSprites[0], 0, 1000);
                manager.zeroPress = true;
            }, this);
        }
    },

    CreateLogo: function () {
        var manager = this;
        manager.logo = manager.add.sprite(860, 560, 'logo', 'logo_0000_Layer-3.png');
        var cropRect = new Phaser.Rectangle(0, 0, -550, manager.logo.height);
        manager.logo.alpha = 0;
        manager.logo.scale.x = .5;
        manager.logo.scale.y = .5;
        manager.logo.crop(cropRect);
    },

    FinalLetterCreate: function () {
        var manager = this;
        manager.finalOne = manager.add.sprite(540, 560, 'numbers', 'numbers10');
        manager.letterKeys[1] = manager.add.sprite(500, 550, "qw", "qwkey0");
        manager.EndYellowBG(manager.currentScene.keySet[0], 1);
        manager.world.bringToTop(manager.yellowSprites[1]);
        manager.world.bringToTop(manager.finalOne);
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
        manager.time.events.add(Phaser.Timer.SECOND / 5, manager.YellowKeyFlashTwo, this);
    },

    YellowKeyFlashTwo: function () {
        var manager = this;
        if (manager.yellowSprites[0].visible) {
            manager.yellowSprites[0].visible = false;
        }
        manager.buttonPressFrame[0] = 0;
        manager.time.events.add(Phaser.Timer.SECOND / 5, manager.YellowKeyFlashOne, this);
    },

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

    AreTrue: function (element, index, array) {
        return element == true;
    },

    SequentialKeys: function () {
        var manager = this;
        for (var i = 1; i < manager.keySet.length; i++) {
            manager.yellowSprites[i].visible = false;
        }
        manager.keySet[0].onDown.add(function () {
            if (!manager.keysPressed[0]) {
                manager.SequentialKeyPress(0);
                manager.YellowKeyUp(1);
                manager.MoveHand(1);
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
                    manager.SequentialKeyFinish(0);
                } else {
                    manager.YellowKeyUp(2);
                    manager.MoveHand(2);
                }
            }
        });
        if (manager.keySet.length >= 3) {
            manager.keySet[2].onDown.add(function () {
                if (manager.keysPressed[1]) {
                    if (!manager.keysPressed[2]) {
                        manager.SequentialKeyPress(2);
                    }
                    if (manager.keySet.length == 3) {
                        manager.SequentialKeyFinish(0);
                    } else {
                        manager.YellowKeyUp(3);
                        manager.MoveHand(3);
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
                    manager.SequentialKeyFinish(0);
                }
            });
        }
    },

    SequentialKeyFinish: function (num) {
        var manager = this;
        manager.MoveHand(num);
        manager.YellowKeyUp(num);
        manager.SetKeysPressedFalse();
    },

    Swipe: function () {
        var manager = this;
        manager.swipeTween = manager.add.tween(manager.hands[0]).to({
            x: 700,
            y: 520
        }, 1000, Phaser.Easing.Linear.None, true);
        manager.gameReady = false;
        manager.swipeTween.repeat(12, 1000);
        manager.currentlyPressed = [];
        for (var i = 0; i < manager.keySet.length; i++) {
            manager.currentlyPressed[i] = false;
        }
        manager.keySet[0].onDown.add(function () {
            console.log("M");

            manager.currentlyPressed[0] = true;
            manager.keysPressed[0] = true;
            manager.time.events.add(Phaser.Timer.SECOND * 3, function () {
                manager.keysPressed[0] = false;
            }, this);

        }, this);
        manager.keySet[0].onUp.add(function () {
            manager.currentlyPressed[0] = false;
        }, this);
        manager.keySet[1].onDown.add(function () {
            console.log("J");

            manager.currentlyPressed[1] = true;
            if (manager.keysPressed[0] && !manager.currentlyPressed[0]) {
                manager.keysPressed[1] = true;
                manager.IncreaseInt();
                manager.time.events.add(Phaser.Timer.SECOND * 3, function () {
                    manager.keysPressed[1] = false;
                }, this);
            }
        }, this);
        manager.keySet[1].onUp.add(function () {
            manager.currentlyPressed[1] = false;
        }, this);
        manager.keySet[2].onDown.add(function () {
            console.log("U");

            manager.currentlyPressed[2] = true;
            if (manager.keysPressed[1]) {
                manager.IncreaseInt();
            }
        }, this);
        manager.keySet[2].onUp.add(function () {
            manager.currentlyPressed[2] = false;
        }, this);
    },

    MoveHand: function (key) {
        var manager = this;
        switch (manager.keySet[key]) {
            case manager.cursors.left:
                manager.NewHandPos(340, 780, 150);
                break;
            case manager.cursors.right:
                manager.NewHandPos(900, 685, 0);
                break;
            case manager.cursors.up:
                manager.NewHandPos(850, 660, 20);
                break;
            case manager.cursors.down:
                manager.NewHandPos(700, 880, 60);
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
                        manager.currentSet.push(manager.add.sprite(0, 0, manager.currentScene.name + "-" + manager.sheetNum, manager.currentScene.name + manager.sheetNum + manager.spriteNum));
                    }
                } else {
                    if (manager.sheetNum <= manager.currentScene.sheets) {
                        manager.spriteNum += 1;
                        manager.currentSet.push(manager.add.sprite(0, 0, manager.currentScene.name + "-" + manager.sheetNum, manager.currentScene.name + manager.sheetNum + manager.spriteNum));
                    }
                }
                for (var i = 0; i < manager.hands.length; i++) {
                    manager.world.bringToTop(manager.hands[i]);
                }
            }
        }
    },

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
                        manager.currentSet.push(manager.add.sprite(0, 0, manager.currentScene.name + "-" + manager.sheetNum, manager.currentScene.name + manager.sheetNum + manager.spriteNum));
                    }
                } else {
                    if (manager.sheetNum <= manager.currentScene.sheets) {
                        manager.spriteNum += 1;
                        manager.currentSet.push(manager.add.sprite(0, 0, manager.currentScene.name + "-" + manager.sheetNum, manager.currentScene.name + manager.sheetNum + manager.spriteNum));
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
                    manager.currentSet.push(manager.add.sprite(0, 0, manager.currentScene.name + "-" + manager.sheetNum, manager.currentScene.name + manager.sheetNum + manager.spriteNum));
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
                        manager.currentSet.push(manager.add.sprite(0, 0, manager.currentScene.name + "-" + manager.sheetNum, manager.currentScene.name + manager.sheetNum + manager.spriteNum));
                    }
                } else {
                    if (manager.sheetNum <= manager.currentScene.sheets) {
                        manager.spriteNum += 1;
                        manager.currentSet.push(manager.add.sprite(0, 0, manager.currentScene.name + "-" + manager.sheetNum, manager.currentScene.name + manager.sheetNum + manager.spriteNum));
                    }
                }
                for (var i = 0; i < manager.hands.length; i++) {
                    manager.world.bringToTop(manager.hands[i]);
                }

            }
        }

    }


};
