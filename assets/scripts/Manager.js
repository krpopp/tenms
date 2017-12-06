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
        manager.gameRound = 0;
        manager.sceneTime = 10;
        manager.scenesJSON = manager.cache.getJSON('scenes');
        manager.givenScore = 0;
        manager.CreateKeys();
        manager.CreateVariables();
        for (var i = 0; i < manager.scenesJSON.Scenes.length; i++) {
            if (manager.scenesJSON.Scenes[i].time == 'morning') {
                manager.preloadedSets.push(manager.scenesJSON.Scenes[i].name);
            } else if (manager.scenesJSON.Scenes[i].time == 'start') {
                manager.currentScene = manager.scenesJSON.Scenes[i];
                manager.FindKeys();
            } else {
                manager.unloadedSets.push(manager.scenesJSON.Scenes[i].name);
            }
        }
        manager.TempSoundManager();
        if (!this.game.device.firefox) {
            manager.baseSound.loopFull();
        }
        manager.greyscale = manager.add.sprite(0, 0, 'greyscale');
        manager.greyscale.blendMode = 14;
        manager.FirstCreateKeys();
        manager.CreatePausedStuff();
        manager.InitCreateHands();
    },

    CreatePausedStuff: function () {
        var manager = this;
        manager.paused = manager.add.sprite(manager.world.centerX, 200, 'paused', 'paused00');
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
        manager.CantSleepRnd = [];
        manager.currentSetTracking = [];
        manager.buttonPressFrame = [];
        manager.buttonPressFrameSets = [];
        manager.handimation = [];
        manager.letter = [];
        manager.letterFrame = [];
        manager.deleteTime = 0;
        manager.hasLetters = false;
        manager.pressedSpace = false;
        manager.createdNext = false;
        manager.rndSprite = [];
        manager.rndSheet = [];
        manager.ChangeEachHandsX = [410, 440, 550, 590, 550, 500];
        manager.ChangeEachHandsY = [870, 785, 785, 860, 900, 870];
    },

    CreateHoldAndSwitch: function () {
        var manager = this;
        manager.CreateAllSpritesETC(0, 630, 665, 800, 820, 45);
        manager.HoldAndSwitch();
    },

    CreateChangeEach: function () {
        var manager = this;
        manager.baseSound = manager.add.audio('phonevibrate');
        manager.baseSound.play();
        manager.PlaceHands(0, 430, 910, 120);
        manager.ChangeEach();
    },

    CreateDelete: function () {
        var manager = this;
        manager.blueScreen = manager.add.sprite(0, 0, 'bluescreen');
        manager.Delete();

    },

    CreateExcel: function () {
        var manager = this;

        manager.Excel();

    },

    CreateCantSleep: function () {
        var manager = this;
        manager.sleepRotations = [];
        manager.sleepRotations = [true, true, true, true, true];
        manager.PlaceHands(0, 780, 800, 45);
        manager.sleepArray = ['s1', 'l1', 'e1', 'e1', 'p1'];
        manager.thinkArray = ['t2', 'ach1', 'aye1', 'en1', 'kay1'];
        manager.cantSleepArray = [0, 1, 2, 3, 4];
        Phaser.ArrayUtils.shuffle(manager.cantSleepArray);
        manager.CantSleep();
    },

    ChangeCantSleepLetters: function () {
        //        var manager = this;
        //        var num = manager.cantSleepArray.pop();
        //        manager.sleepRotations[num] = false;
        //        manager.letter[num].destroy();
        //        manager.yellowSprites[num].visible = false;
        //        switch (num) {
        //            case 0:
        //                manager.letter[num] = manager.add.sprite(570 + (100 * num), 620, 'sleep', manager.thinkArray[num]);
        //                break;
        //            case 1:
        //                manager.letter[num] = manager.add.sprite(570 + (100 * num), 620, 'tyghbn', manager.thinkArray[num]);
        //                break;
        //            case 2:
        //                manager.letter[num] = manager.add.sprite(570 + (100 * num), 620, 'morekeys', manager.thinkArray[num]);
        //                break;
        //            case 3:
        //                manager.letter[num] = manager.add.sprite(570 + (100 * num), 620, 'tyghbn', manager.thinkArray[num]);
        //                break;
        //            case 4:
        //                manager.letter[num] = manager.add.sprite(570 + (100 * num), 620, 'morekeys', manager.thinkArray[num]);
        //                break;
        //        }
        //        manager.world.bringToTop(manager.hands[0]);
    },

    CreateJog: function () {
        var manager = this;

    },

    CreatePill: function () {
        var manager = this;
        if (!this.game.device.windows) {
            manager.PlaceHands(0, 830, 750, 45);
            manager.PlaceHands(1, 380, 800, 120);
            manager.hands[1].scale.y = -1;
        } else {
            // manager.PlaceHands(0, 830, 750, 45);
            manager.keySet.shift();
        }

    },

    CreateSleep: function () {
        var manager = this;
    },

    CreateButton: function () {
        var manager = this;
        manager.nextY = 0;
        manager.nextX = 0;
        //        for (var i = 0; i < manager.keySet.length; i++) {
        //            if (i % 2 == 0) {
        //                manager.nextY += 1;
        //                manager.nextX = 0;
        //            } else {
        //                manager.nextX = 1;
        //            }
        //            manager.letterKeys[i] = manager.add.sprite(440 + (200 * manager.nextX), 440 + (80 * manager.nextY), 'qw', 'qwkey0');
        //            manager.LetterYellowBG(manager.currentScene.keySet[i], i);
        //        }
    },

    CreateBigO: function () {
        var manager = this;
        manager.PlaceHands(0, 460, 840, 120);
    },

    CreateSpace: function () {
        var manager = this;
        manager.SpaceOut();
    },

    ResetKeyboard: function () {
        var manager = this;
        manager.cue.reset();
        manager.doubleEwe.reset();
        manager.em.reset();
        manager.jay.reset();
        manager.ewe.reset();
        manager.tee.reset();
        manager.why.reset();
        manager.gee.reset();
        manager.ach.reset();
        manager.bee.reset();
        manager.en.reset();
        manager.em.reset();
        manager.aye.reset();
        manager.kay.reset();
        manager.cee.reset();
        manager.vee.reset();
        manager.oh.reset();
        manager.pee.reset();
        manager.control.reset();
        manager.space.reset();
        manager.efNine.reset();
        manager.keyOne.reset();
        manager.keyTwo.reset();
        manager.keyThree.reset();
        manager.keyFour.reset();
        manager.keyFive.reset();
        manager.keySix.reset();
        manager.keySeven.reset();
        manager.keyEight.reset();
        manager.keyNine.reset();
        manager.keyZero.reset();
        manager.shift.reset();
        manager.tab.reset();
        manager.enterKey.reset();
        manager.deleteKey.reset();
        manager.cursors.up.reset();
        manager.cursors.down.reset();
        manager.cursors.left.reset();
        manager.cursors.right.reset();
    },

    RemoveEverything: function () {
        var manager = this;
        manager.ResetKeyboard();
        manager.tweens.removeAll();
        manager.keysPressed = [];
        manager.DisappearAllKeys();
        if (manager.currentSound != null) {
            manager.currentSound.stop();
        }
        if (manager.endNumber != null) {
            manager.endNumber.destroy();
        }
        if (manager.currentScene.name == "shave") {
            manager.singing.destroy();
        }
        if (manager.pausekey != null) {
            manager.pausekey.destroy();
        }
        if (manager.secondRoomTone != null) {
            manager.secondRoomTone.stop();
            manager.secondRoomTone.destroy();
            manager.secondRoomTone = null;
        }
        if (manager.openSound != null) {
            manager.openSound.destroy();
            manager.openSound = null;
        }
        if (manager.closeSound != null) {
            manager.closeSound.destroy();
            manager.closeSound = null;
        }
        if (manager.stophands != null) {
            manager.stophands.destroy();
        }
        if (manager.pauseButt != null) {
            manager.pauseButt.destroy();
        }
        if (manager.lilblack != null) {
            manager.lilblack.destroy();
        }
        if (manager.finalOne != null) {
            manager.finalOne.destroy();
        }
        for (var i = 0; i < manager.currentSet.length; i++) {
            manager.currentSet[i].destroy();
        }
        for (var i = 0; i < manager.hands.length; i++) {
            manager.hands[i].visible = false;
        }
        if (manager.blueScreen != null) {
            manager.blueScreen.destroy();
        }
        if (manager.breathing != null) {
            manager.breathing.destroy();
        }
        if (manager.CantSleepRnd[0] != null) {
            for (var i = 0; i < manager.CantSleepRnd.length; i++) {
                manager.CantSleepRnd[i].destroy();
            }
        }
        if (!manager.playMusic) {
            manager.sound.stopAll();
        }
        if (manager.baseSound != null) {
            manager.baseSound.destroy();
        }
        if (manager.roomTone != null) {
            manager.roomTone.destroy;
        }
        if (manager.eventSound != null) {
            manager.eventSound.destroy();
        }

        if (manager.wait != null) {
            manager.wait.destroy();
        }
        if (manager.guess != null) {
            manager.guess.destroy();
        }

        if (manager.downSprite != null) {
            manager.downSprite.destroy();
        }
        if (manager.underPic != null) {
            manager.underPic.destroy();
        }
        if (manager.insidePic != null) {
            manager.insidePic.destroy();
            manager.insidePic = null;
        }
        if (manager.cursor != null) {
            manager.cursor.destroy();
        }
        if (manager.screen != null) {
            manager.screen.destroy();
        }
        if (manager.text0 != null) {
            manager.text0.destroy();
        }
        if (manager.text1 != null) {
            manager.text1.destroy();
        }
        if (manager.text2 != null) {
            manager.text2.destroy();
        }
        if (manager.upperPic != null) {
            manager.upperPic.destroy();
        }

        if (manager.oneClick != null) {
            manager.oneClick.destroy();
            manager.twoClick.destroy();
            manager.threeClick.destroy();
        }

        if (manager.roomTone != null) {
            manager.roomTone.stop();
            manager.roomTone.destroy();
        }

        if (manager.excelText != null) {
            for (var i = 0; i < manager.excelText.length; i++) {
                manager.excelText[i].destroy();
            }
        }

        manager.bLid.destroy();
        manager.tLid.destroy();
        manager.hasLetters = false;

        manager.greyscale.scale.x = 1;
        manager.greyscale.scale.y = 1;
        manager.time.events.removeAll();
    },

    CreateKeys: function () {
        var manager = this;
        manager.cursors = manager.input.keyboard.createCursorKeys();
        manager.cue = manager.input.keyboard.addKey(Phaser.Keyboard.Q);
        manager.doubleEwe = manager.input.keyboard.addKey(Phaser.Keyboard.W);
        manager.em = manager.input.keyboard.addKey(Phaser.Keyboard.M);
        manager.jay = manager.input.keyboard.addKey(Phaser.Keyboard.J);
        manager.ewe = manager.input.keyboard.addKey(Phaser.Keyboard.U);
        manager.tee = manager.input.keyboard.addKey(Phaser.Keyboard.T);
        manager.why = manager.input.keyboard.addKey(Phaser.Keyboard.Y);
        manager.gee = manager.input.keyboard.addKey(Phaser.Keyboard.G);
        manager.ach = manager.input.keyboard.addKey(Phaser.Keyboard.H);
        manager.bee = manager.input.keyboard.addKey(Phaser.Keyboard.B);
        manager.en = manager.input.keyboard.addKey(Phaser.Keyboard.N);
        manager.em = manager.input.keyboard.addKey(Phaser.Keyboard.M);
        manager.aye = manager.input.keyboard.addKey(Phaser.Keyboard.I);
        manager.kay = manager.input.keyboard.addKey(Phaser.Keyboard.K);
        manager.cee = manager.input.keyboard.addKey(Phaser.Keyboard.C);
        manager.vee = manager.input.keyboard.addKey(Phaser.Keyboard.V);
        manager.oh = manager.input.keyboard.addKey(Phaser.Keyboard.O);
        manager.pee = manager.input.keyboard.addKey(Phaser.Keyboard.P);
        manager.control = manager.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
        manager.efNine = manager.input.keyboard.addKey(Phaser.Keyboard.F9);
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
        manager.shift = manager.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
        manager.tab = manager.input.keyboard.addKey(Phaser.Keyboard.TAB);
        manager.enterKey = manager.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        if (!this.game.device.windows) {
            manager.deleteKey = manager.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
        } else {
            manager.deleteKey = manager.input.keyboard.addKey(Phaser.Keyboard.DELETE);
        }
        manager.space = manager.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

    MidKeyCreate: function (yellowPosX, yellowPosY, posX, posY) {
        var manager = this;

    },

    TabKeyCreate: function () {
        var manager = this;

    },

    ControlKeyCreate: function () {
        var manager = this;

    },

    FirstCreateKeys: function () {
        var manager = this;
        manager.smallKeyBackgrounds = [];
        manager.smallKeyPressed = [];
        manager.smallKeyUnPressed = [];
        manager.arrows = [];
        for (var i = 0; i <= 8; i++) {
            manager.smallKeyBackgrounds.push(manager.add.sprite(-100, -100, 'allkeys', 'keybackground'));
            manager.smallKeyBackgrounds[i].scale.x = 0.8;
            manager.smallKeyBackgrounds[i].scale.y = 0.8;
            manager.smallKeyBackgrounds[i].anchor.setTo(0.5, 0.5);
            manager.smallKeyUnPressed.push(manager.add.sprite(-100, -100, 'allkeys', 'keyunpressed'));
            manager.smallKeyUnPressed[i].scale.x = 0.8;
            manager.smallKeyUnPressed[i].scale.y = 0.8;
            manager.smallKeyUnPressed[i].anchor.setTo(0.5, 0.5);
        }
        for (var i = 0; i < 4; i++) {
            manager.arrows.push(manager.add.sprite(-100, -100, 'allkeys', i));
            manager.arrows[i].anchor.setTo(0.5, 0.5);
        }
        manager.longKeyBackground = manager.add.sprite(-100, -100, 'allkeys', 'longkeybg');
        manager.longKeyUnpressed = manager.add.sprite(-100, -100, 'allkeys', 'longkeyunpressed');
    },

    CreateSmallKeyFeedback: function () {
        var manager = this;

    },

    DisappearAllKeys: function () {
        var manager = this;
        for (var i = 0; i <= 8; i++) {
            manager.smallKeyBackgrounds[i].visible = false;
            manager.smallKeyUnPressed[i].visible = false;
        }
        for (var i = 0; i < 4; i++) {
            manager.arrows[i].visible = false;
        }
        manager.longKeyBackground.visible = false;
        manager.longKeyUnpressed.visible = false;
    },

    CreateKeyBGS: function () {
        var manager = this;
        if (!manager.currentScene.specialSet) {
            manager.arrowsPosX = [650, 530, 650, 770];
            manager.arrowsPosY = [580, 700, 700, 700];
            for (var i = 0; i < 4; i++) {
                manager.smallKeyBackgrounds[i].visible = true;
                manager.smallKeyBackgrounds[i].position.x = manager.arrowsPosX[i];
                manager.smallKeyBackgrounds[i].position.y = manager.arrowsPosY[i];
                manager.smallKeyUnPressed[i].visible = true;
                manager.smallKeyUnPressed[i].position.x = manager.arrowsPosX[i];
                manager.smallKeyUnPressed[i].position.y = manager.arrowsPosY[i];
                manager.arrows[i].visible = true;
                manager.arrows[i].position.x = manager.arrowsPosX[i];
                manager.arrows[i].position.y = manager.arrowsPosY[i];
            }
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
        }
    },

    InitCreateHands: function () {
        var manager = this;
        manager.hands = [];
        manager.black = manager.add.sprite(0, 500, 'black');
        manager.world.sendToBack(manager.black);
        for (var i = 0; i < 4; i++) {
            manager.hands.push(manager.add.sprite(-100, -100, "singleHand", "hand0"));
            manager.hands[i].anchor.setTo(0.5, 0.5);
            manager.handimation.push(manager.hands[i].animations.add("twitch"));
            manager.hands[i].visible = false;
        }
        manager.PhotoLoader();
    },

    SetSpriteData: function (num) {
        var manager = this;
        manager.world.sendToBack(manager.black);
    },

    CreateAllSpritesETC: function (num, posX, posY, handX, handY, handRot) {
        var manager = this;
        manager.PlaceHands(num, handX, handY, handRot);
        if (manager.currentScene.hands == 1) {
            for (var i = 1; i < manager.hands.length; i++) {
                manager.hands[i].visible = false;
            }
        }
    },

    IncreaseFrame: function (thisFrame) {
        var newFrame = thisFrame + 1;
        return (newFrame);
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
        if (manager.song != null) {
            manager.song.destroy();
            manager.playMusic = false;
            manager.song = null;
        }
    },


    GuessPlease: function () {
        var manager = this;
        manager.guess = manager.add.sprite(500, 550, "guess", "guess0");
    },

    PhotoLoader: function () {
        var manager = this;
        manager.sceneSpeed = manager.currentScene.speed;
        if (manager.unloadedSets.length != 0) {
            var nextSet = manager.unloadedSets.pop();
            manager.preloadedSets.push(nextSet);
            if (manager.gameRound == 0) {

                for (var i = 0; i < manager.scenesJSON.Scenes.length; i++) {
                    if (manager.scenesJSON.Scenes[i].name == nextSet) {
                        var sheetNum = manager.scenesJSON.Scenes[i].sheets;
                        for (var j = 0; j < sheetNum; j++) {
                            if (manager.scenesJSON.Scenes[i].name.includes("computerframe")) {
                                this.load.atlasJSONArray(manager.scenesJSON.Scenes[i].name + "-" + j, "assets/textures/" + manager.scenesJSON.Scenes[i].name + "-" + j + ".png", "assets/textures/" + manager.scenesJSON.Scenes[i].name + "-" + j + ".json");
                            } else {
                                this.load.atlasJSONArray(manager.scenesJSON.Scenes[i].name + "-" + j, "assets/textures/" + manager.scenesJSON.Scenes[i].name + "-" + j + ".png", 'assets/textures/Universal.json');
                            }
                            for (var k = 0; k < this.scenesJSON.Scenes[i].sound.length; k++) {
                                this.load.audio(this.scenesJSON.Scenes[i].sound[k], "assets/sound/" + this.scenesJSON.Scenes[i].sound[k] + ".mp3", "assets/sound/" + this.scenesJSON.Scenes[i].sound[k] + ".ogg");
                            }
                        }
                    }
                }
                manager.load.start();
            }
        }
        manager.PhotoCreate();
    },

    RoomToneStart: function () {
        var manager = this;
        if (manager.currentScene.tone != null) {
            manager.roomTone = manager.add.audio(manager.currentScene.tone);
            manager.roomTone.volume = .1;
            manager.roomTone.play();
            manager.roomTone.loopFull();
        }
    },

    PhotoCreate: function () {
        var manager = this;
        manager.givenScore = false;
        var newSheet = manager.currentScene.name + "-" + "0";
        var spriteNumber = 0;
        if (manager.cache.getImage(newSheet).height < 1950) {
            spriteNumber += 1;
        }
        if (manager.cache.getImage(newSheet).height < 1450) {
            spriteNumber += 1;
        }
        if (manager.cache.getImage(newSheet).height < 950) {
            spriteNumber += 1;
        }
        manager.currentSet.push(manager.add.sprite(0, 0, manager.currentScene.name + "-" + "0", spriteNumber));
        manager.currentSetTracking.push(manager.currentScene.name + "-" + "0" + spriteNumber);
        manager.keysPressed = [];
        for (var i = 0; i < manager.keySet.length; i++) {
            manager.keysPressed[i] = false;
        }
        manager.upInt = 0;
        manager.sheetNum = 0;
        manager.spriteNum = 0;
        manager.allKeys = false;
        manager.gameReady = true;
        manager.KeyCheckSwitch(manager.currentScene.pattern);
        if (manager.currentScene.name != "sleep" && manager.currentScene.name != "wakephone") {
            manager.time.events.add(Phaser.Timer.SECOND * manager.sceneTime, manager.NextScene, this);
        }
        if (manager.currentScene.name == "wakephone") {
            manager.MorningScenes();
        }
        if (manager.currentScene.name == "shave") {
            manager.singing.volume = .1;
        }
    },

    IncreaseBlend: function () {
        var manager = this;
        manager.pressingButt = true;
        var greyAlpha = manager.greyscale.alpha;
        var greySpeed = manager.currentScene.greySpeed;
        var newAlpha = greyAlpha -= greySpeed;
        if (newAlpha >= 0) {
            manager.greyscale.alpha = newAlpha;
        } else {
            manager.greyscale.alpha = 0.001;

        }
    },

    DecreaseBlend: function () {
        var manager = this;
        var greyAlpha = manager.greyscale.alpha;
        var greyDown = 0.01;
        var newAlpha = greyAlpha += greyDown;
        if (newAlpha <= 1) {
            manager.greyscale.alpha = newAlpha;
        } else {
            manager.greyscale.alpha = 1;
        }
    },

    NextScene: function () {
        var manager = this;
        manager.pressingButt = false;
        manager.RemoveEverything();
        manager.breathing = manager.game.add.audio('breathing');
        manager.breathing.play();
        manager.breathing.volume = .3;
        manager.breathing.loopFull();
        manager.breathing._sound.playbackRate.value = 1;
        manager.currentSetTracking.length = 0;
        manager.currentSetTracking = [];
        manager.currentSet.length = 0;
        manager.currentSet = [];
        if (manager.preloadedSets.length > 0) {
            var nextSet = manager.preloadedSets.shift();
            for (var i = 0; i < this.scenesJSON.Scenes.length; i++) {
                if (this.scenesJSON.Scenes[i].name == nextSet) {
                    manager.currentScene = manager.scenesJSON.Scenes[i];
                    manager.switchSound = null;
                    manager.currentSound = null;
                    manager.RoomToneStart();
                    manager.TempSoundManager();
                    manager.FindKeys();
                    manager.PhotoLoader();
                    if (manager.currentScene.name == "subway") {
                        manager.music.stop();
                        manager.music.destroy();
                    }
                    break;
                }
            }
        } else {
            var manager = this;
            manager.tweens.removeAll();
            manager.black.destroy();
            manager.sceneTime -= 1;
            manager.topLidDown = false;
            manager.bottomLidDown = false;
            manager.scenesJSON = manager.cache.getJSON('scenes');
            manager.CreateKeys();
            manager.CreateVariables();
            manager.gameRound = 1;
            for (var i = 0; i < manager.scenesJSON.Scenes.length; i++) {
                if (manager.scenesJSON.Scenes[i].time == 'morning') {
                    manager.preloadedSets.push(manager.scenesJSON.Scenes[i].name);
                } else if (manager.scenesJSON.Scenes[i].time == 'start') {
                    manager.currentScene = manager.scenesJSON.Scenes[i];
                    manager.FindKeys();
                } else {
                    manager.unloadedSets.push(manager.scenesJSON.Scenes[i].name);
                }
            }
            manager.TempSoundManager();
            if (!this.game.device.firefox) {
                manager.baseSound.loopFull();
            }
            manager.greyscale = manager.add.sprite(0, 0, 'greyscale');
            manager.greyscale.blendMode = 14;
            manager.CreatePausedStuff();
            manager.InitCreateHands();
        }
        manager.greyscale.alpha = 1;
    },

    TopLidDownThings: function () {
        var manager = this;
        manager.startTween = true;
        manager.tLidTween.pause();
        manager.bLidTween.pause();

        manager.world.bringToTop(manager.tLid);
        manager.world.bringToTop(manager.bLid);


        for (var i = 0; i < manager.hands.length; i++) {
            manager.world.bringToTop(manager.hands[i]);
        }
        manager.tLid.position.y -= 1;
        if (manager.tLid.position.y <= -800) {
            manager.NextScene();
            manager.gameReady = false;
        }
        manager.bLid.position.y += 1;
    },

    PatternThreeThings: function () {
        var manager = this;
        manager.playOpen = false;
        manager.playClose = false;
        if (!manager.goDown && manager.upInt >= manager.currentScene.switchInt) {
            manager.goDown = true;
            manager.SequentialKeyPress(0);
            manager.MoveHand(1);
        }
        if (manager.goDown && manager.upInt <= 0) {
            manager.goDown = false;
            manager.SequentialKeyPress(1);
            manager.MoveHand(0);
        }
        if (manager.keysPressed[0]) {
            //if (!manager.goDown) {
            if (manager.upInt <= manager.currentScene.switchInt) {
                manager.IncreaseInt();
                manager.IncreaseBlend();
            }
            if (manager.upInt == 30) {
                if (manager.currentScene.soundType == 11) {
                    manager.openSound.play();
                    manager.roomTone.pause();
                    manager.secondRoomTone.play();
                    manager.secondRoomTone.loopFull();
                }
            }
            // }
        } else {
            manager.pressingButt = false;
        }
        if (manager.keysPressed[1]) {
            //if (manager.goDown) {
            if (manager.upInt >= 0) {
                manager.DecreaseInt();
            }
            if (manager.upInt == 30) {
                if (manager.currentScene.soundType == 11) {
                    manager.closeSound.play();
                    manager.secondRoomTone.pause();
                    manager.roomTone.play();
                }
            }
            if (manager.currentScene.soundType == 12) {
                if (manager.upInt == manager.currentScene.soundFrame) {
                    manager.eventSound.play();
                }
            }
            //}
        }
    },

    PatternThirteenThings: function () {
        var manager = this;
        if (manager.upInt >= manager.tempSwitchPoints[0]) {
            for (var i = 0; i < manager.keysPressed.length; i++) {
                manager.keysPressed[i] = false;
            }
            manager.IncreaseInt();
            manager.hands[0].position.x = 780;
            //manager.shiftLetter.visible = true;
            //manager.shiftLetterYellow.visible = true;
            //manager.shiftLetterKey.visible = true;
            //manager.world.bringToTop(manager.shiftLetter);
            //manager.keySprites.visible = false;
            //manager.arrows.visible = false;
            //manager.yellowSprites[0].visible = false;
            manager.tempSwitchPoints.shift();
            manager.letPress = false;
            manager.shiftPress = true;
        }
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
                if (manager.currentScene.name != "wakephone") {
                    if (manager.currentScene.soundType == 3) {
                        if (manager.upInt == manager.currentScene.soundFrame) {
                            manager.eventSound.play();
                        }
                    }
                    manager.IncreaseInt();
                } else {
                    if (manager.tLid.position.y <= -200) {
                        manager.IncreaseInt();
                        manager.IncreaseBlend();
                    }
                }
                if (manager.currentScene.pattern != 5 && manager.currentScene.name != "wakephone") {
                    manager.IncreaseBlend();
                }
            } else {
                manager.pressingButt = false;
            }
        }
        if (manager.currentScene.updateCheck) {
            manager.UpdateCheck();
        }
        if (manager.eventSoundTime) {
            if (manager.upInt == manager.currentScene.soundFrame) {
                manager.eventSound.play();
                manager.eventSoundTime = false;
            }
        }
        if (manager.gameReady || manager.currentScene.name == "treez") {
            manager.DecreaseBlend();
        }

        manager.world.bringToTop(manager.greyscale);
        console.log(manager.hands[0].position.x);
    },

    UpdateCheck: function () {
        var manager = this;
        if (manager.currentScene.name == "wakephone") {
            if (manager.topLidDown && manager.bottomLidDown) {
                manager.TopLidDownThings();
            }
            manager.EyelidTweens();
        }
        if (manager.currentScene.pattern == 2) {
            if (manager.upInt >= 0) {
                manager.upInt--;
            }
        }
        if (manager.currentScene.pattern == 3) {
            manager.PatternThreeThings();
        }
        if (manager.currentScene.decrease) {
            if (manager.upInt > 0) {
                if (!manager.keysPressed.every(manager.AreTrue)) {
                    manager.DecreaseInt();
                }
            }
        }
        if (manager.currentScene.pattern == 5 || manager.currentScene.pattern == 22) {
            manager.gameReady = true;
            manager.NoInput();
        }
        if (manager.currentScene.pattern == 23) {
            manager.PatternThirteenThings();
        }
        if (manager.currentScene.name == "sleep") {
            manager.SleepThings();
        }
        if (manager.currentScene.pattern == 20) {
            if (manager.pressedSpace) {
                manager.IncreaseInt();
                manager.IncreaseBlend();
                manager.upperPic.scale.x += .001;
                manager.upperPic.scale.y += .001;
                manager.greyscale.scale.x += .001;
                manager.greyscale.scale.y += .001;
                if (manager.insidePic.alpha > 0) {
                    manager.insidePic.alpha -= .01;
                } else if (manager.insidePic.alpha <= 0) {
                    manager.insidePic.alpha = 0;
                }
                if (manager.spaceKey.alpha >= 0.01) {
                    manager.spaceKey.alpha -= .01;
                }

                manager.world.bringToTop(manager.insidePic);
                manager.world.bringToTop(manager.upperPic);
            } else {
                manager.pressingButt = false;
            }
        }

    },

    SleepThings: function () {
        var manager = this;
        if (manager.onePress && manager.zeroPress) {
            manager.moveNum = manager.add.tween(manager.endNumber).to({
                x: 565
            }, 1000, Phaser.Easing.Linear.None, true);
            manager.onePress = false;
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
                manager.eventSound = manager.add.audio(manager.currentScene.sound[0]);
                break;
            case 4:
                break;
            case 5:
                break;
            case 6:
                manager.baseSound = manager.add.audio(manager.currentScene.sound[0]);
                manager.baseSound.play();
                manager.inputSound = manager.add.audio(manager.currentScene.sound[1]);
                break;
            case 7:
                manager.eventSound = manager.add.audio(manager.currentScene.sound[0]);
                manager.eventSoundTime = true;
                manager.currentSound = manager.eventSound;
                manager.inputSound = manager.add.audio(manager.currentScene.sound[1]);
                break;
            case 8:
                //manager.baseSound = manager.add.audio(manager.currentScene.sound[0]);
                //manager.baseSound.play();
                //manager.currentSound = manager.baseSound;
                manager.inputSound = [];
                manager.postInputSound = [];
                for (var i = 0; i < 4; i++) {
                    manager.inputSound[i] = manager.add.audio(manager.currentScene.sound[i]);
                    //manager.inputSound[i].volume = .5;
                }
                for (var i = 4; i < 9; i++) {
                    manager.postInputSound[i] = manager.add.audio(manager.currentScene.sound[i]);
                    manager.postInputSound[i].volume = .5;
                }
                break;
            case 9:
                manager.inputSound = [];
                for (var i = 0; i <= manager.currentScene.sound.length; i++) {
                    manager.inputSound[i] = manager.add.audio(manager.currentScene.sound[i]);
                    //  manager.inputSound[i].volume = .5;
                }
                break;
            case 10:
                manager.eventSound = manager.add.audio(manager.currentScene.sound[0]);
                manager.preSound = manager.add.audio(manager.currentScene.sound[1]);
                break;
            case 11:
                manager.secondRoomTone = manager.add.audio(manager.currentScene.sound[0]);
                manager.openSound = manager.add.audio(manager.currentScene.sound[1]);
                manager.closeSound = manager.add.audio(manager.currentScene.sound[2]);
                break;
            case 12:
                manager.inputSound = [];
                for (var i = 0; i < manager.currentScene.sound.length - 1; i++) {
                    manager.inputSound[i] = manager.add.audio(manager.currentScene.sound[i]);
                }
                manager.eventSound = manager.add.audio(manager.currentScene.sound[3]);
                break;
            case 13:
                manager.inputSound = manager.add.audio(manager.currentScene.sound[0]);
                break;
        }
        if (manager.currentScene.loop) {
            if (!this.game.device.firefox) {
                manager.baseSound.loopFull();
            }
        }
    },

    MorningCreate: function () {
        var manager = this;
        manager.LidCreate(-150, 50, 501);
        for (var i = 0; i < manager.hands.length; i++) {
            manager.world.bringToTop(manager.hands[i]);
        }
    },

    LidCreate: function (tY, bY, blY) {
        var manager = this;
        manager.tLid = manager.add.sprite(0, tY, "toplid");
        manager.bLid = manager.add.sprite(0, bY, "lowerlid");
    },

    MorningTweens: function () {
        var manager = this;
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
                    //manager.tLidTween.stop();
                    //manager.bLidTween.stop();
                    manager.tLidTween = manager.add.tween(manager.tLid).to({
                        y: manager.tLid.position.y - 20
                    }, 1000, Phaser.Easing.Back.Out, true);
                    //manager.tLidTween.repeat(1000, 1000);
                    manager.bLidTween = manager.add.tween(manager.bLid).to({
                        y: manager.bLid.position.y + 20
                    }, 1000, Phaser.Easing.Back.Out, true);
                    manager.startTween = false;
                }
            }
        }
    },

    KeyCheckSwitch: function (pattern) {
        var manager = this;
        var allDone = false;
        manager.SetSpriteData();
        manager.CreateKeyBGS();
        switch (pattern) {
            case 14:
                manager.nextInt = 0;
                manager.CreateChangeEach();
                allDone = true;
                break;
            case 15:
                manager.CreateDelete();
                allDone = true;
                break;
            case 16:
                manager.CreateExcel();
                allDone = true;
                break;
            case 17:
                manager.SocMeds();
                break;
            case 19:
                manager.CreateCantSleep();
                allDone = true;
                break;
            case 20:
                manager.CreateSpace();
                allDone = true;
                break;
            case 23:
                manager.tempSwitchPoints = [];
                for (var i = 0; i < manager.currentScene.switchPoints.length; i++) {
                    manager.tempSwitchPoints[i] = manager.currentScene.switchPoints[i];
                }
                manager.HoldAndSwitch();
                allDone = true;
                break;
        }
        if (!allDone) {
            switch (manager.currentScene.keySet[0]) {
                case 'manager.cue':
                    manager.CreateJog();
                    break;
                case 'manager.efNine':
                    manager.CreatePill();
                    break;
                case 'manager.keyOne':
                    manager.CreateSleep();
                    break;
                case 'manager.keyFive':
                    manager.CreateButton();
                    break;
                case 'manager.oh':
                    manager.CreateBigO();
                    break;
                default:
                    break;
            }
        }
        for (var i = 0; i < manager.hands.length; i++) {
            manager.world.bringToTop(manager.hands[i]);
        }
        switch (manager.currentScene.pattern) {
            case 0:
                if (manager.currentScene.name == "wakephone") {
                    manager.FromAlphaTweens(manager.hands[0], 0, manager.rnd.integerInRange(1000, 2000));
                    manager.FromAlphaTweens(manager.hands[1], 0, manager.rnd.integerInRange(1000, 2000));
                }
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
                manager.GuessPlease();
                manager.AnyKey();
                break;
            case 5:
                manager.WaitPlease();
                break;
            case 6:
                manager.EndCreate();
                break;
            case 8:
                manager.TapDifferent();
                break;
            case 9:
                manager.ManyKeyInt = 0;
                manager.ManyKeySequence();
                break;
            case 22:
                manager.song = manager.add.audio('fullsong');
                manager.singing = manager.add.audio('singing');
                manager.TapKeys();
                break;
            case 24:
                manager.DoubleSequence();
                break;
        }
        manager.greyscale.alpha = 1;
        manager.world.sendToBack(manager.black);
    },

    EndCreate: function () {
        var manager = this;
        manager.number = 0;
        manager.endRounds = 1;
        manager.LidCreate(-550, 400, 501);
        manager.endNumber = manager.add.sprite(610, 560, 'numbers', 'numbers' + (manager.number + 1) + '0');
        manager.world.bringToTop(manager.hands[0]);
        if (manager.givenScore == manager.scenesJSON.length) {
            console.log("yeah");
        } else {
            var setEndKeys = [];
            var scoreDifference = manager.scenesJSON.length - manager.score;
            manager.finalScore = 10 + scoreDifference;
            for (var i = 0; i < manager.finalScore; i++) {
                //have to figure out how to do this ok?
            }
        }

        manager.EndBringToTop();
        manager.score = 14;
        manager.EndGame(0);

    },

    EndBringToTop: function () {
        var manager = this;
        //manager.world.bringToTop(manager.black);
        manager.world.bringToTop(manager.tLid);
        manager.world.bringToTop(manager.bLid);

        manager.world.bringToTop(manager.endNumber);
        if (manager.endRounds > 9) {

            manager.world.bringToTop(manager.finalOne);
        }
        manager.world.bringToTop(manager.hands[0]);
    },

    EndGame: function (number) {
        var manager = this;
        console.log("but how");
        manager.firstPressed = false;
        manager.keySet[number].onDown.add(function () {
            if (manager.endRounds > 9) {
                if (manager.nextPressed) {
                    manager.time.events.add(Phaser.Timer.SECOND / 10, manager.EndIncreaseInt, this);
                    manager.time.events.add(Phaser.Timer.SECOND / 10, manager.FadeTenthBackIn, this);
                }
                manager.firstPressed = true;
            } else {
                manager.IncreaseInt();
                manager.IncreaseBlend();

                manager.EndBringToTop();
                manager.AlphaTweens(manager.endNumber, 0, 200);
                if (manager.tLid.position.y < 150 && manager.endRounds < 10) {
                    manager.YTweens(manager.tLid, '+100', 1000);
                }
                if (manager.bLid.position.y > 150) {
                    manager.YTweens(manager.bLid, '-100', 1000);
                }
                manager.time.events.add(Phaser.Timer.SECOND / 10, manager.EndIncreaseInt, this);

            }
        }, this);
    },

    AlphaTweens: function (sprite, alphaNum, time) {
        var manager = this;
        manager.add.tween(sprite).to({
            alpha: alphaNum
        }, time, Phaser.Easing.Linear.None, true);
    },

    FromAlphaTweens: function (sprite, alphaNum, time) {
        var manager = this;
        manager.add.tween(sprite).from({
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
        manager.IncreaseBlend();

        manager.EndBringToTop();
        manager.keySet[manager.number].reset();

        manager.number += 1;
        manager.endRounds += 1;
        manager.AlphaTweens(manager.endNumber, 1, 200);
        if (manager.endRounds < manager.score) {
            manager.YTweens(manager.hands[0], 1500, 30000);
            if (manager.endRounds == 10) {
                manager.endNumber.frame += 3;
                if (manager.tLid.position.y != -150) {
                    manager.tweens.removeAll();
                    manager.YTweens(manager.tLid, -150, 200)
                }
                if (manager.bLid.position.y != 0) {
                    manager.YTweens(manager.bLid, 50, 200)
                }
                manager.FinalLetterCreate();
                manager.SetNextTenth();
                manager.EndGame(manager.number);
            } else if (manager.endRounds == 11) {
                manager.number = 0;
                manager.endNumber.frame == 0;
                manager.SetNextTenth();
                manager.EndGame(manager.number);
            } else if (manager.endRounds > 11 && manager.endRounds < 20) {
                manager.endNumber.frame += 3;
                manager.SetNextTenth();
                manager.EndGame(manager.number);
            } else if (manager.endRounds == 20) {
                manager.finalOne.frame += 3;
                manager.endNumber.frame += 3;
                manager.SetNextTenth();
                manager.EndGame(manager.number);
            } else if (manager.endRounds == 21) {
                manager.number = 0;
                manager.endNumber.frame == 0;
                manager.SetNextTenth();
                manager.EndGame(manager.number);
            } else if (manager.endRounds > 21) {
                manager.endNumber.frame += 3;
                manager.SetNextTenth();
                manager.EndGame(manager.number);
            } else {
                manager.endNumber.frame += 3;
                manager.EndGame(manager.number);
            }
        } else if (manager.endRounds >= manager.score) {
            console.log(manager.createdNext);
            if (!manager.createdNext) {
                console.log("but y");
                manager.FinalLetterCreate();
            }

            if (manager.number == 10) {
                manager.number = 0;
                manager.keySet[manager.number].reset();
            }
            if (manager.endRounds > 9 && manager.endRounds < 20) {
                manager.keyOne.reset();
                manager.keyOne.onDown.add(function () {
                    manager.EndBringToTop();
                    manager.onePress = true;
                }, this);
            } else {
                manager.keyTwo.reset();
                manager.keyTwo.onDown.add(function () {
                    manager.EndBringToTop();

                    manager.onePress = true;
                }, this);
            }

            manager.keySet[manager.number].onDown.add(function () {
                if (manager.onePress) {
                    manager.AlphaTweens(manager.endNumber, 0, 2000);
                    manager.AlphaTweens(manager.finalOne, 0, 2500);
                    manager.AlphaTweens(manager.hands[0], 0, 1000);
                    manager.time.events.add(Phaser.Timer.SECOND * 3, manager.NextScene, this);
                    manager.gameReady = false;
                }
            }, this);
        }
    },

    FadeTenthBackIn: function () {
        var manager = this;
        manager.AlphaTweens(manager.finalOne, 1, 200);
    },

    SetNextTenth: function () {
        var manager = this;
        manager.nextPressed = false;
        if (manager.endRounds >= 10 && manager.endRounds < 20) {
            manager.keyOne.reset();
            manager.keyOne.onDown.add(function () {
                // manager.EndBringToTop();
                manager.world.bringToTop(manager.finalOne);
                manager.AlphaTweens(manager.finalOne, 0, 200);
                if (manager.firstPressed) {
                    manager.time.events.add(Phaser.Timer.SECOND / 10, manager.EndIncreaseInt, this);
                    manager.time.events.add(Phaser.Timer.SECOND / 10, manager.FadeTenthBackIn, this);
                }
                manager.nextPressed = true;
            }, this);
        } else {
            manager.keyTwo.onDown.add(function () {
                //manager.EndBringToTop();
                manager.world.bringToTop(manager.finalOne);
                manager.AlphaTweens(manager.finalOne, 0, 200);
                if (manager.firstPressed) {
                    manager.time.events.add(Phaser.Timer.SECOND / 10, manager.EndIncreaseInt, this);
                    manager.time.events.add(Phaser.Timer.SECOND / 10, manager.FadeTenthBackIn, this);
                }
                manager.nextPressed = true;
            }, this);
        }
        manager.time.events.add(Phaser.Timer.SECOND / 10, manager.FadeTenthBackIn, this);
    },

    FinalLetterCreate: function () {
        var manager = this;
        manager.createdNext = true;
        manager.finalOne = manager.add.sprite(540, 560, 'numbers', 'numbers10');
        manager.letterKeys[1] = manager.add.sprite(500, 550, "qw", "qwkey0");
        manager.world.bringToTop(manager.finalOne);
    },

    SetPressedFalse: function () {
        var manager = this;
        if (!manager.notPressed) {
            manager.notPressed = true;
        }
    },

    DoubleSequence: function () {
        var manager = this;
        if (manager.currentScene.soundType == 8) {
            manager.breathing.volume = 2.2;
        }
        manager.keySet[0].onDown.add(function () {
            if (!manager.keysPressed[0] && manager.gameReady) {
                manager.IncreaseInt();
                manager.IncreaseBlend();
                manager.SequentialKeyPress(0);
                manager.MoveHand(1);
            }
            if (manager.currentScene.soundType == 8) {
                if (manager.breathing._sound.playbackRate.value < 3) {
                    manager.breathing._sound.playbackRate.value += 0.02
                }
                var theSound = manager.rnd.integerInRange(0, 3)
                manager.inputSound[theSound].play();
            }
            if (manager.currentScene.soundType == 3) {
                if (manager.upInt == manager.currentScene.soundFrame) {
                    manager.eventSound.fadeIn(200);
                }
            }
            manager.keysPressed[0] = true;
        });
        manager.keySet[0].onUp.add(function () {
            if (manager.currentScene.soundType == 3) {
                manager.eventSound.pause();
            }
            if (manager.currentScene.soundType == 8) {
                if (manager.breathing._sound.playbackRate.value > 1) {
                    manager.breathing._sound.playbackRate.value -= 0.1;
                }
            }
        })
        manager.keySet[1].onDown.add(function () {
            if (manager.keysPressed[0] && manager.gameReady) {
                manager.IncreaseInt();
                manager.IncreaseBlend();
                manager.SequentialKeyPress(1);

                if (manager.currentScene.soundType == 8) {
                    if (manager.breathing._sound.playbackRate.value < 3) {
                        manager.breathing._sound.playbackRate.value += 0.02
                    }
                    var theSound = manager.rnd.integerInRange(0, 3)
                    manager.inputSound[theSound].play();
                }
                manager.keysPressed[1] = true;
                manager.StillSequentialKeyFinish(0);
            }
        });
        manager.keySet[1].onUp.add(function () {
            if (manager.currentScene.soundType == 3) {
                manager.eventSound.pause();
            }
            if (manager.currentScene.soundType == 8) {
                if (manager.breathing._sound.playbackRate.value > 1) {
                    manager.breathing._sound.playbackRate.value -= 0.1;
                }
            }
        })



        manager.keySet[2].onDown.add(function () {
            if (!manager.keysPressed[2] && manager.gameReady) {
                manager.IncreaseInt();
                manager.IncreaseBlend();
                manager.SequentialKeyPress(2);
                manager.MoveHand(2);
            }
            if (manager.currentScene.soundType == 8) {
                if (manager.breathing._sound.playbackRate.value < 3) {
                    manager.breathing._sound.playbackRate.value += 0.02
                }
                var theSound = manager.rnd.integerInRange(0, 3)
                manager.inputSound[theSound].play();
            }
            manager.keysPressed[2] = true;
        });
        manager.keySet[2].onUp.add(function () {
            if (manager.currentScene.soundType == 8) {
                if (manager.breathing._sound.playbackRate.value > 1) {
                    manager.breathing._sound.playbackRate.value -= 0.1;
                }
            }
        })


        manager.keySet[3].onDown.add(function () {
            if (manager.keysPressed[2] && manager.gameReady) {
                manager.IncreaseInt();
                manager.IncreaseBlend();
                manager.SequentialKeyPress(3);
                manager.MoveHand(3);


                if (manager.currentScene.soundType == 8) {
                    if (manager.breathing._sound.playbackRate.value < 3) {
                        manager.breathing._sound.playbackRate.value += 0.02
                    }
                    var theSound = manager.rnd.integerInRange(0, 3)
                    manager.inputSound[theSound].play();
                    //
                    //                    manager.inputSound[theSound].onStop.addOnce(function () {
                    //                        manager.postInputSound[manager.rnd.integerInRange(4, 8)].play();
                    //                    }, this);
                }
                manager.AlsoSequentialKeyFinish(2);

            }
        });
        manager.keySet[3].onUp.add(function () {

            if (manager.currentScene.soundType == 8) {
                if (manager.breathing._sound.playbackRate.value > 1) {
                    manager.breathing._sound.playbackRate.value -= 0.1;
                }
            }
        })
    },

    HandBackForth: function () {
        var manager = this;
        if (manager.hands[0].position.x < 500) {
            manager.currentKey = 1;
            manager.hands[0].position.x = 500;
        } else {
            manager.currentKey = 0;
            manager.hands[0].position.x = 300;
        }
    },

    SocMeds: function () {
        var manager = this;
        manager.PlaceHands(0, 780, 850, 45);
        manager.screen = manager.add.sprite(150, 0, "socialmedia-0", 0);
        manager.world.sendToBack(manager.screen);

        var upPos = 780;
        var downPos = 880;
        manager.oneClick = manager.add.audio('oneClick');
        manager.twoClick = manager.add.audio('twoClick');
        manager.threeClick = manager.add.audio('threeClick');
        manager.keySet[0].onDown.add(function () {
            manager.oneClick.play();
            if (manager.screen.frame < 8 && manager.screen.frame >= 0) {
                manager.IncreaseBlend();
                manager.screen.frame += 1;
            } else if (manager.screen.frame == 8) {
                manager.hands[0].position.y = upPos;
            }
        });
        manager.keySet[1].onDown.add(function () {
            manager.oneClick.play();
            if (manager.screen.frame <= 8 && manager.screen.frame > 0) {
                manager.IncreaseBlend();
                manager.screen.frame -= 1;
            } else if (manager.screen.frame == 0) {
                manager.hands[0].position.y = downPos;
            }
        });
        manager.world.bringToTop(manager.screen);
        manager.world.bringToTop(manager.currentSet[0]);
        manager.world.bringToTop(manager.greyscale);
    },

    SpaceOut: function () {
        var manager = this;
        manager.gameReady = false;
        manager.insidePic = manager.add.sprite(manager.world.centerX, 0, manager.currentScene.insidePicSheet, manager.currentScene.insidePicSprite);
        manager.upperPic = manager.add.sprite(manager.world.centerX, 0, 'computerframeplain-0', 0);
        manager.upperPic.anchor.setTo(0.5, 0.5);
        manager.upperPic.position.x = manager.world.centerX;
        manager.upperPic.position.y = manager.upperPic.height / 2;
        manager.insidePic.position.y = manager.insidePic.height / 2;
        manager.insidePic.anchor.setTo(0.5, 0.5);
        manager.insidePic.alpha = 1;
        manager.hasPasted = false;
        manager.world.sendToBack(manager.insidePic);
        for (var i = 0; i < manager.currentSet.length; i++) {
            manager.world.sendToBack(manager.currentSet[i]);
        }
        manager.currentSound = manager.add.audio(manager.currentScene.sound);
        manager.keySet[0].onDown.add(function () {
            manager.pressedSpace = true;
            manager.IncreaseBlend();
            manager.currentSound.play();
        });
        manager.keySet[0].onUp.add(function () {
            manager.pressedSpace = false;
            manager.currentSound.stop();
        })
        manager.world.bringToTop(manager.currentSet[0]);
        manager.world.bringToTop(manager.insidePic);
        manager.world.bringToTop(manager.upperPic);
        manager.world.bringToTop(manager.greyscale);
    },

    Excel: function () {
        var manager = this;
        manager.gameReady = false;
        manager.insidePic = manager.add.sprite(150, 0, manager.currentScene.insidePicSheet, manager.currentScene.insidePicSprite);
        manager.insidePic.alpha = 1;
        manager.insidePic.visible = true;
        manager.hasPasted = false;
        manager.cursor = manager.add.sprite(280, 80, "compmaterials", "excelcursor");
        manager.excelText = [];
        manager.PlaceHands(0, 830, 800, 45);
        manager.PlaceHands(1, 380, 830, 120);
        manager.oneClick = manager.add.audio('oneClick');
        manager.twoClick = manager.add.audio('twoClick');
        manager.threeClick = manager.add.audio('threeClick');
        var cell = 0;

        manager.control.onDown.add(function () {
            manager.keysPressed[0] = true;
            manager.oneClick.play();
        });
        manager.control.onUp.add(function () {
            manager.keysPressed[0] = false;
        });
        manager.vee.onDown.add(function () {
            manager.twoClick.play();
            if (manager.keysPressed[0] && !manager.hasPasted) {
                manager.IncreaseBlend();
                manager.hands[0].visible = false;
                manager.excelText[cell] = manager.add.text(manager.cursor.position.x + 10, manager.cursor.position.y + 5, "100", {
                    font: "10px Arial",
                    fill: '#000000',
                });

                manager.keysPressed[1] = true;
                manager.hasPasted = true;
            }
        });
        manager.tab.onDown.add(function () {
            if (manager.keysPressed[1]) {
                manager.IncreaseBlend();
                manager.threeClick.play();
                manager.hands[0].visible = true;
                manager.keysPressed[1] = false;

                manager.cursor.position.x += 70;
                cell += 1;
                if (cell % 10 == 0) {
                    manager.cursor.position.y += 18;
                    manager.cursor.position.x = 280;
                }
                manager.hasPasted = false;
            }
        });


        manager.world.bringToTop(manager.insidePic);
        manager.world.bringToTop(manager.excelText);
        manager.world.bringToTop(manager.cursor);
        manager.world.bringToTop(manager.currentSet[0]);
        manager.world.bringToTop(manager.greyscale);
    },

    HoldAndSwitch: function () {
        var manager = this;
        manager.thisSceneSound = [];
        for (var i = 0; i < manager.currentScene.sound.length; i++) {
            manager.thisSceneSound[i] = manager.currentScene.sound[i];
        }
        manager.letPress = true;
        manager.shiftPress = false;
        manager.playEventSOund = false;
        manager.keySet[0].onDown.add(function () {
            if (manager.letPress) {

                if (!manager.playEventSOund) {
                    manager.inputSound.play();
                    manager.playEventSOund = true;
                } else {
                    manager.inputSound.resume();
                }
                manager.HoldKeysFeedback(0);
                for (var i = 0; i < manager.keysPressed.length; i++) {
                    manager.keysPressed[i] = true;
                }
            }
        });
        manager.keySet[0].onUp.add(function () {
            for (var i = 0; i < manager.keysPressed.length; i++) {

                manager.inputSound.pause();
                manager.keysPressed[i] = false;
            }
            manager.pressingButt = false;
        });
        manager.keySet[1].onDown.add(function () {
            if (manager.shiftPress) {
                manager.playEventSOund = false;
                manager.thisSceneSound.shift();
                manager.IncreaseInt();
                manager.IncreaseBlend();

                manager.keySet.shift();
                manager.hands[0].position.x = 700;
                //manager.keySet.shift();
                //manager.shiftLetter.visible = false;
                //manager.shiftLetterYellow.visible = false;
                //manager.shiftLetterKey.visible = false;
                //manager.keySprites.visible = true;
                //manager.arrows.visible = true;
                //manager.yellowSprites[0].visible = true;
                manager.letPress = true;
                manager.shiftPress = false;
            }
        });
    },

    ChangeEach: function () {
        var manager = this;
        manager.gameReady = false;

        if (manager.nextInt >= 6) {
            manager.keySet[manager.nextInt].onDown.add(function () {
                manager.HoldKeysFeedback(1);
                manager.keysPressed[manager.nextInt] = true;
                manager.gameReady = true;
            })

        } else {
            manager.keySet[manager.nextInt].onDown.add(function () {
                manager.ResetKeyboard();
                manager.IncreaseInt();
                manager.IncreaseBlend();
                manager.keysPressed[manager.nextInt] = true;
                manager.PlaceHands(0, manager.ChangeEachHandsX[manager.nextInt], manager.ChangeEachHandsY[manager.nextInt], 120);
                manager.nextInt += 1;
                if (manager.nextInt >= 6) {
                    manager.CreateAllSpritesETC(1, 630, 665, 800, 820, 45);
                }

                manager.ChangeEach();
            });
        }

    },

    CantSleep: function () {
        var manager = this;
        manager.gameReady = false;
        manager.blanketNum = 0;
        manager.blanketSheet = 0;
        manager.blanket = [];
        manager.input.keyboard.onDownCallback = function () {
            if (manager.currentScene.name == "cantsleep") {
                manager.hands[0].position.x += 100;
                if (manager.hands[0].position.x >= 1200) {
                    manager.hands[0].position.x = 780;
                }
                if (manager.upInt >= 10) {
                    if (manager.upInt > 20) {
                        manager.BlanketOver();
                    } else if (manager.upInt == 19) {
                        manager.BlanketOver();
                        manager.time.events.add(Phaser.Timer.SECOND * 3, manager.NextScene, this);

                    } else if (manager.upInt < 19) {
                        manager.IncreaseInt();
                        manager.IncreaseBlend();

                    }
                    if (manager.upInt % 2 == 0) {
                        if (manager.sleepArray[0] != null) {
                            manager.ChangeCantSleepLetters();
                        }
                    }
                } else {
                    manager.IncreaseInt();
                    manager.IncreaseBlend();

                }
            }
        }
    },

    BlanketOver: function () {
        var manager = this;
        if (manager.blanketNum < 4) {
            manager.blanket.push(manager.add.sprite(0, 0, 'blanketover-' + manager.blanketSheet, 'blanketover' + manager.blanketSheet + manager.blanketNum));
            manager.blanketNum += 1;
            if (manager.blanketNum == 4 && manager.blanketSheet == 0) {
                manager.blanketNum = 0;
                manager.blanketSheet = 1;
            }
        }
    },

    ManyKeySequence: function () {
        var manager = this;
        manager.keysPressed[0] = false;
        manager.keySet[manager.ManyKeyInt].reset();
        manager.keySet[manager.ManyKeyInt + 1].reset();
        manager.keySet[manager.ManyKeyInt].onDown.add(function () {
            manager.IncreaseInt();
            manager.IncreaseBlend();
            var theSound = manager.rnd.integerInRange(0, 2)
            manager.inputSound[theSound].play();
            manager.keysPressed[0] = true;

            manager.hands[0].position.x += 500;
            manager.hands[0].scale.y = 1;
            manager.hands[0].rotation = 45;
            manager.keySet[manager.ManyKeyInt].reset();
        });
        var nextKey = manager.ManyKeyInt + 1;
        manager.keySet[nextKey].onDown.add(function () {
            if (manager.keysPressed[0]) {
                manager.hands[0].position.x -= 500;
                manager.hands[0].position.y += 60;
                manager.hands[0].scale.y = -1;
                manager.hands[0].rotation = 40;

                // manager.ButtonMoveKeys(manager.ManyKeyInt, nextKey);
                manager.IncreaseInt();
                manager.IncreaseBlend();

                manager.keySet[manager.ManyKeyInt].reset();
                manager.keySet[manager.ManyKeyInt + 1].reset();
                manager.ManyKeyInt += 2;
                if (manager.ManyKeyInt >= manager.keySet.length) {
                    manager.IncreaseInt();
                    manager.IncreaseBlend();
                    manager.time.events.removeAll();
                    manager.NextScene();
                    manager.gameReady = false;
                } else {
                    manager.ManyKeySequence();
                }
            }
        });
    },

    ButtonMoveKeys: function (key1, key2) {
        var manager = this;
        //        manager.add.tween(manager.letterKeys[key1]).to({
        //            x: 520,
        //        }, 1000, Phaser.Easing.Linear.None, true);
        //        manager.add.tween(manager.letter[key1]).to({
        //            x: 550,
        //        }, 1000, Phaser.Easing.Linear.None, true);
        //        manager.add.tween(manager.letterKeys[key2]).to({
        //            x: 600,
        //        }, 1000, Phaser.Easing.Linear.None, true);
        //        manager.add.tween(manager.letter[key2]).to({
        //            x: 630,
        //        }, 1000, Phaser.Easing.Linear.None, true);
    },

    HoldKeys: function () {
        var manager = this;
        manager.inputHasPlayed = false;
        manager.keySet[0].onDown.add(function () {
            if (manager.currentScene.name == "pill") {
                if (!this.game.device.windows) {
                    manager.keysPressed[0] = true;
                    manager.keysPressed[1] = true;
                } else {
                    manager.keysPressed[0] = true;
                    manager.keysPressed[1] = true;
                }
            } else {

            }
            if (manager.currentScene.soundType == 6) {
                if (!manager.inputHasPlayed) {
                    manager.inputSound.play();
                    manager.inputHasPlayed = true;
                } else {
                    manager.inputSound.resume();
                }
            }
            if (manager.currentScene.soundType == 8) {
                var theSound = manager.rnd.integerInRange(0, 3)
                manager.inputSound[theSound].play();
            }

            if (manager.currentScene.soundType == 13) {
                manager.inputSound.play();
            }
        });
        manager.keySet[0].onUp.add(function () {
            if (manager.currentScene.name == "pill") {
                if (!this.game.device.windows) {

                } else {
                    manager.keysPressed[0] = false;
                    manager.keysPressed[1] = false;
                }
            }

        });



    },


    Delete: function () {
        var manager = this;
        manager.PlaceHands(0, 780, 800, 45);
        manager.gameReady = false;
        manager.oneClick = manager.add.audio('oneClick');
        manager.twoClick = manager.add.audio('twoClick');
        manager.threeClick = manager.add.audio('threeClick');
        manager.underPic = manager.add.sprite(150, 0, "plainScreen");
        manager.insidePic = manager.add.sprite(150, 0, manager.currentScene.insidePicSheet, manager.currentScene.insidePicSprite);
        manager.world.sendToBack(manager.insidePic);
        manager.world.sendToBack(manager.underPic);
        manager.world.sendToBack(manager.blueScreen);
        manager.deleteKey.onDown.add(function () {
            manager.deleteTime += 1;
            if (manager.deleteTime >= 15) {
                manager.world.sendToBack(manager.insidePic);
                manager.world.sendToBack(manager.underPic);
            }
            manager.threeClick.play();
            manager.world.sendToBack(manager.insidePic);
            manager.IncreaseBlend();
        });
        manager.world.bringToTop(manager.blueScreen);
        manager.world.bringToTop(manager.underPic);
        manager.world.bringToTop(manager.insidePic);
        manager.world.bringToTop(manager.currentSet[0]);
        manager.world.bringToTop(manager.greyscale);
    },

    AreTrue: function (element, index, array) {
        return element == true;
    },

    SequentialKeys: function () {
        var manager = this;
        if (manager.currentScene.soundType == 8) {
            manager.breathing.volume = 2.2;
        }
        manager.keySet[0].onDown.add(function () {
            if (!manager.keysPressed[0]) {
                manager.IncreaseInt();
                manager.SequentialKeyPress(0);
                manager.MoveHand(1);
            }
            if (manager.currentScene.soundType == 8) {
                manager.breathing._sound.playbackRate.value = 1.5;
                var theSound = manager.rnd.integerInRange(1, 3)
                manager.inputSound[theSound].play();
                //                            manager.inputSound[theSound].onStop.addOnce(function () {
                //                                manager.postInputSound[manager.rnd.integerInRange(4, 8)].play();
                //                            }, this);
            }
            if (manager.currentScene.soundType == 3) {
                if (manager.upInt == manager.currentScene.soundFrame) {
                    manager.eventSound.fadeIn(200);
                }
            }
            manager.keysPressed[0] = true;
        });
        manager.keySet[0].onUp.add(function () {
            if (manager.currentScene.soundType == 3) {
                manager.eventSound.pause();
            }
            if (manager.currentScene.soundType == 8) {
                manager.breathing._sound.playbackRate.value = 1.0;
            }
        })
        manager.keySet[1].onDown.add(function () {
            if (manager.keysPressed[0]) {
                if (!manager.keysPressed[1]) {
                    manager.IncreaseInt();
                    manager.SequentialKeyPress(1);
                }
                if (manager.currentScene.soundType == 8) {
                    manager.breathing._sound.playbackRate.value = 1.5;
                    var theSound = manager.rnd.integerInRange(1, 3)
                    manager.inputSound[theSound].play();
                    //
                    //                    manager.inputSound[theSound].onStop.addOnce(function () {
                    //                        manager.postInputSound[manager.rnd.integerInRange(4, 8)].play();
                    //                    }, this);
                }
                if (manager.currentScene.soundType == 3) {
                    manager.eventSound.resume();

                }
                manager.keysPressed[1] = true;
                if (manager.keySet.length == 2) {
                    manager.SequentialKeyFinish(0);
                } else {
                    manager.MoveHand(2);
                }
            }
        });
        manager.keySet[1].onUp.add(function () {
            if (manager.currentScene.soundType == 3) {
                manager.eventSound.pause();
            }
            if (manager.currentScene.soundType == 8) {
                manager.breathing._sound.playbackRate.value = 1.0;
            }
        })
        if (manager.keySet.length >= 3) {
            manager.keySet[2].onDown.add(function () {
                if (manager.keysPressed[1]) {
                    if (!manager.keysPressed[2]) {
                        manager.IncreaseInt();
                        manager.SequentialKeyPress(2);
                        manager.keysPressed[2] = true;
                    }
                    if (manager.keySet.length == 3) {
                        manager.SequentialKeyFinish(0);
                    } else {
                        manager.MoveHand(3);
                    }
                }
                if (manager.currentScene.soundType == 3) {
                    manager.eventSound.resume();

                }
            });
            manager.keySet[2].onUp.add(function () {
                if (manager.currentScene.soundType == 3) {
                    manager.eventSound.pause();

                }
            })
        }
        if (manager.keySet.length >= 4) {
            manager.keySet[3].onDown.add(function () {
                if (manager.keysPressed[2]) {
                    if (!manager.keysPressed[3]) {
                        manager.IncreaseInt();
                        manager.SequentialKeyPress(3);
                        manager.SequentialKeyFinish(0);
                        manager.keysPressed[2] = false;
                    }
                }
                if (manager.currentScene.soundType == 3) {
                    manager.eventSound.resume();

                }
            });
            manager.keySet[3].onUp.add(function () {
                //                if (manager.currentScene.soundType == 3) {
                //                    if (manager.upInt == manager.currentScene.soundFrame) {
                //                        manager.eventSound.pause();
                //                    }
                //                }
            })
        }
    },

    SequentialKeyFinish: function (num) {
        var manager = this;
        manager.MoveHand(num);
        manager.SetKeysPressedFalse();
    },

    StillSequentialKeyFinish: function (num) {
        var manager = this;
        manager.MoveHand(num);
        manager.keysPressed[0] = false;
        manager.keysPressed[1] = false;
    },

    AlsoSequentialKeyFinish: function (num) {
        var manager = this;
        manager.MoveHand(num + 1);
        manager.keysPressed[2] = false
        manager.keysPressed[3] = false
    },

    MoveHand: function (key) {
        var manager = this;
        switch (manager.keySet[key]) {
            case manager.cursors.left:
                manager.NewHandPos(340, 780, 150);
                break;
            case manager.cursors.right:
                manager.NewHandPos(820, 900, 60);
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
                manager.NewHandPos(590, 830, 90);
                break;
            case manager.oh:
                manager.AlsoNewHandPos(880, 810, 90);
                break;
            case manager.pee:
                manager.AlsoNewHandPos(860, 810, 60);
                break;
        }
    },

    NewHandPos: function (posX, posY, rot) {
        var manager = this;
        manager.hands[0].position.x = posX;
        manager.hands[0].position.y = posY;
        manager.hands[0].angle = rot;
    },

    AlsoNewHandPos: function (posX, posY, rot) {
        var manager = this;
        manager.hands[2].position.x = posX;
        manager.hands[2].position.y = posY;
        manager.hands[2].angle = rot;
    },

    SequentialKeyPress: function (num) {
        var manager = this;
    },

    SetKeysPressedFalse: function () {
        var manager = this;
        manager.IncreaseInt();
        manager.IncreaseBlend();

        for (var i = 0; i < manager.keysPressed.length; i++) {
            manager.keysPressed[i] = false;
        }
    },

    SwitchKeys: function () {
        var manager = this;
        if (manager.currentScene.name == "iron") {
            manager.eventSound.play();
        }
        manager.randoSound = 0;
        manager.keySet[0].onDown.add(function () {
            manager.HoldKeysFeedback(0);
            if (manager.currentScene.soundType == 12) {
                manager.randoSound = manager.rnd.integerInRange(0, 2)
                manager.inputSound[manager.randoSound].play();
            }
            manager.keysPressed[0] = true;
        });
        manager.keySet[0].onUp.add(function () {
            if (manager.currentScene.soundType == 12) {
                manager.inputSound[manager.randoSound].pause();
            }
            manager.keysPressed[0] = false;
        });
        manager.keySet[1].onDown.add(function () {
            manager.HoldKeysFeedback(1);
            if (manager.currentScene.soundType == 12) {
                manager.randoSound = manager.rnd.integerInRange(0, 2)
                manager.inputSound[manager.randoSound].play();
            }
            manager.keysPressed[1] = true;
        });
        manager.keySet[1].onUp.add(function () {

            if (manager.currentScene.soundType == 12) {
                manager.inputSound[manager.randoSound].pause();
            }
            manager.keysPressed[1] = false;
        });
    },

    RestartCheck: function () {
        var manager = this;
        if (!manager.givenScore && manager.currentScene.name != "sleep") {
            manager.score += 1;
        }
        manager.givenScore = true;
        if (manager.currentScene.restart) {
            if (manager.currentScene.name == "jogging") {
                manager.ResetKeyboard();
                manager.time.events.removeAll();
                manager.time.events.add(Phaser.Timer.SECOND * 3, manager.NextScene, this);
                manager.hands[0].visible = false;
                manager.hands[2].visible = false;
                manager.hands[3].visible = false;
                manager.hands[1].visible = false;

            } else {
                manager.sheetNum = 0;
                manager.spriteNum = 0;
            }
        } else {
            if (!manager.currentScene.decrease && manager.currentScene.name != "sleep") {
                manager.time.events.removeAll();
                manager.time.events.add(Phaser.Timer.SECOND / 5, manager.NextScene, this);
                manager.gameReady = false;
                manager.tweens.removeAll();
                manager.ResetKeyboard();

            }
        }
    },

    TapKeys: function () {
        var manager = this;
        manager.world.sendToBack(manager.black);

        manager.gameReady = false;
        manager.playMusic = false;
        manager.musicHasPlayed = false;
        manager.pausekey = manager.add.sprite(700, 650, 'pausekey', 0);
        manager.pauseButt = manager.add.sprite(0, 0, 'pause-0', 0);
        manager.pauseButt.visible = false;
        manager.lilblack = manager.add.sprite(650, 600, 'lilblack');

        if (manager.currentScene.name == "bigO") {
            manager.breathing.volume = 1.8;
        }
        manager.lilblack.visible = false;
        manager.pausekey.visible = false;
        manager.keySet[0].onDown.add(function () {
            if (manager.currentScene.name == "bigO") {

                if (manager.breathing._sound.playbackRate.value < 3) {
                    manager.breathing._sound.playbackRate.value += 0.02
                }
            }
            if (manager.currentScene.name == "playlist") {
                manager.preSound.play();
                if (!manager.playMusic) {
                    manager.pausekey.visible = true;
                    manager.lilblack.visible = true;
                    manager.world.bringToTop(manager.pausekey);
                    manager.world.sendToBack(manager.lilblack);
                    manager.world.sendToBack(manager.black);
                    if (!manager.musicHasPlayed) {
                        manager.preSound.onStop.addOnce(function () {
                            manager.song.play();
                            manager.singing.play();
                            manager.singing.volume = 0;
                            manager.song.volume = .02;
                            //manager.eventSound._sound.playbackRate.value = 0.8;
                            manager.currentSound = manager.eventSound;
                            manager.musicHasPlayed = true;
                        }, this);
                    } else {
                        manager.preSound.onStop.addOnce(function () {
                            manager.song.resume();
                            manager.singing.resume();
                        }, this);
                    }
                    manager.playMusic = true;
                } else {
                    manager.pausekey.visible = false;
                    manager.pauseButt.visible = false;
                    manager.song.pause();
                    manager.singing.pause();
                    manager.playMusic = false;
                }
            }
            manager.keysPressed[0] = true;
            manager.IncreaseInt();
            manager.IncreaseBlend();
        });
        manager.keySet[0].onUp.add(function () {
            manager.keysPressed[0] = false;
        });
    },

    Shave: function () {
        var manager = this;

    },

    AnyKey: function () {
        var manager = this;
        manager.gameReady = false;
        manager.underPic = manager.add.sprite(150, 0, 'plainScreen');
        manager.insidePic = manager.add.sprite(150, 0, manager.currentScene.insidePicSheet, manager.currentScene.emailscreen);
        manager.address = 'Sam11221.geemail.com';
        manager.subject = 'dinner?';
        manager.emailText = "Hey Sam,\nHope all's well with you. It's been a while since we've hung\nout, so I was wondering if you'd like to go out for dinner\nsometime. Totally understand if you can't, though!\nHope to hear from you.";
        manager.text0 = manager.add.text(310, 85, manager.address, {
            font: "10px Arial",
            fill: '#000000',
        });
        manager.text1 = manager.add.text(310, 105, manager.subject, {
            font: "10px Arial",
            fill: '#000000',
        });
        manager.text2 = manager.add.text(310, 150, "", {
            font: "12px Arial",
            fill: '#000000',
        });
        manager.email = [];
        manager.emailDisplay = "";
        manager.email = manager.emailText.split("");
        manager.world.sendToBack(manager.text0);
        manager.world.sendToBack(manager.text1);
        manager.world.sendToBack(manager.text2);
        manager.world.sendToBack(manager.insidePic);
        manager.world.sendToBack(manager.underPic);
        manager.clicks = [];
        manager.clicks[0] = manager.add.audio("click2");
        manager.clicks[1] = manager.add.audio("click3");
        manager.clicks[2] = manager.add.audio("click4");
        manager.clicks[3] = manager.add.audio("click1");
        manager.input.keyboard.onDownCallback = function () {
            if (manager.currentScene.name == "computerframeplain") {
                manager.IncreaseBlend();
                manager.clicks[manager.rnd.integerInRange(0, 3)].play();
                var nextChar = manager.email.shift();
                manager.emailDisplay += nextChar;
                if (nextChar != null) {
                    manager.text2.text = manager.emailDisplay;
                } else {
                    manager.enterKey.onDown.add(function () {
                        manager.text0.text = "";
                        manager.text1.text = "";
                        manager.text2.text = "";
                        manager.insidePic.visible = false;

                    });
                }
            }
        };
        manager.world.bringToTop(manager.underPic);
        manager.world.bringToTop(manager.insidePic);
        manager.world.bringToTop(manager.text0);
        manager.world.bringToTop(manager.text1);
        manager.world.bringToTop(manager.text2);
        manager.world.bringToTop(manager.upperPic);
        manager.world.bringToTop(manager.currentSet[0]);
        manager.world.bringToTop(manager.greyscale);
    },

    NoInput: function () {
        var manager = this;
        manager.upInt += 1;
        manager.decreasing = false;
        if (manager.gameReady) {
            if (manager.upInt != 0) {
                if (manager.upInt % manager.sceneSpeed == 0) {
                    if (manager.spriteNum >= 3) {
                        manager.sheetNum += 1;
                        manager.spriteNum = 0;
                        if (manager.sheetNum >= manager.currentScene.sheets) {
                            manager.gameReady = false;
                            if (manager.currentScene.restart) {
                                manager.RestartCheck();
                            } else {
                                manager.time.events.add(Phaser.Timer.SECOND / 5, manager.NextScene, this);
                                manager.gameReady = false;
                            }
                        } else {
                            manager.CreateOrReFindPic(manager.currentScene.name);
                            if (manager.currentScene.name == "playlist") {
                                if (manager.playMusic) {
                                    manager.pauseButt.destroy();
                                    manager.pauseButt = manager.add.sprite(0, 0, 'pause-' + manager.sheetNum, manager.spriteNum);
                                } else {
                                    manager.pauseButt.visible = false;
                                }
                                manager.world.bringToTop(manager.pauseButt);
                            }
                        }
                    } else {
                        if (manager.sheetNum <= manager.currentScene.sheets) {
                            manager.spriteNum += 1;
                            manager.CreateOrReFindPic(manager.currentScene.name);
                            if (manager.currentScene.name == "playlist") {
                                if (manager.playMusic) {
                                    manager.pauseButt.destroy();
                                    manager.pauseButt = manager.add.sprite(0, 0, 'pause-' + manager.sheetNum, manager.spriteNum);
                                } else {
                                    manager.pauseButt.visible = false;
                                }
                                manager.world.bringToTop(manager.pauseButt);
                            }
                        }
                    }
                    for (var i = 0; i < manager.hands.length; i++) {
                        manager.world.bringToTop(manager.hands[i]);
                    }
                }
            }
        }

    },


    CreateOrReFindPic: function (sheetName) {
        var manager = this;
        var newSheet = sheetName + "-" + manager.sheetNum;
        if (manager.sheetNum != manager.currentScene.sheets) {
            //            if (manager.cache.getImage(newSheet).height < 1950) {
            //                if (!manager.decreasing) {
            //                    if (manager.spriteNum == 0) {
            //                        manager.spriteNum = 1;
            //                    }
            //                }
            //            }
            //            if (manager.cache.getImage(newSheet).height < 1450) {
            //                if (!manager.decreasing) {
            //                    if (manager.spriteNum == 1) {
            //                        manager.spriteNum = 2;
            //                    }
            //                }
            //            }
            //            if (manager.cache.getImage(newSheet).height < 950) {
            //                if (!manager.decreasing) {
            //                    if (manager.spriteNum == 2) {
            //                        manager.spriteNum = 3;
            //                    }
            //                }
            //            }
            if (manager.currentSetTracking.includes(sheetName + manager.sheetNum + manager.spriteNum)) {
                manager.world.bringToTop(manager.currentSet[manager.currentSetTracking.indexOf(sheetName + manager.sheetNum + manager.spriteNum)]);
            } else {
                manager.currentSet.push(manager.add.sprite(0, 0, sheetName + "-" + manager.sheetNum, manager.spriteNum));
                manager.currentSetTracking.push(sheetName + manager.sheetNum + manager.spriteNum);
                manager.rndSheet.push(sheetName + "-" + manager.sheetNum);
            }
        } else {
            manager.RestartCheck();
        }
        manager.world.bringToTop(manager.greyscale);
    },

    DecreaseInt: function () {
        var manager = this;
        manager.decreasing = true;
        if (manager.upInt > 0) {
            manager.upInt -= 1;
        }
        if (manager.upInt >= 1) {
            if (manager.upInt % manager.currentScene.speed == 0) {
                manager.spriteNum -= 1;

                if (manager.spriteNum <= -1) {
                    manager.spriteNum = 3;
                    manager.sheetNum -= 1;
                }
                if (manager.sheetNum <= -1) {
                    manager.RestartCheck();
                } else {
                    manager.CreateOrReFindPic(manager.currentScene.name);
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
        manager.decreasing = false;
        if (manager.currentScene.pattern == 2) {
            manager.upInt += 10;
        } else {
            manager.upInt += 1;
        }
        if (manager.currentScene.pattern == 19) {
            var beRand = manager.rnd.integerInRange(0, 1);
            if (beRand == 1) {
                var nextSet = manager.rnd.integerInRange(0, manager.rndSheet.length);
                manager.CantSleepRnd.push(manager.add.sprite(0, 0, manager.rndSheet[nextSet], 0));
                return;
            }
        }
        if (manager.currentScene.name != "computerframe") {
            if (manager.upInt != 0) {
                if (manager.upInt % manager.sceneSpeed == 0) {
                    if (manager.spriteNum >= 3) {
                        manager.sheetNum += 1;
                        manager.spriteNum = 0;
                        if (manager.sheetNum >= manager.currentScene.sheets) {
                            manager.gameReady = false;
                            manager.RestartCheck();
                        } else {
                            manager.CreateOrReFindPic(manager.currentScene.name);
                        }
                    } else {
                        if (manager.sheetNum <= manager.currentScene.sheets) {
                            manager.spriteNum += 1;
                            manager.CreateOrReFindPic(manager.currentScene.name);
                        }
                    }
                    for (var i = 0; i < manager.hands.length; i++) {
                        manager.world.bringToTop(manager.hands[i]);
                    }

                }
            }
        }
        if (manager.currentScene.name == "treez") {
            manager.world.bringToTop(manager.greyscale);
            manager.world.bringToTop(manager.black);

        }

    },


};
