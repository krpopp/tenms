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
        manager.keySprites;
        manager.keySpriteFrame = 0;
        manager.letterSpriteFrame = 1;
        manager.yellowSprites = [];
        manager.buttonPressFrame = [];
        manager.yellowSpriteFrame = 12;
        manager.buttonPressFrameSets = [];
        manager.handimation = [];
        manager.letter = [];
        manager.letterFrame = [];
        manager.deleteTime = 0;
        manager.hasLetters = false;
        manager.pressedSpace = false;
        manager.tabYellowFrame = 0;
        manager.tabLetterFrame = 41;
        manager.tabLetterKeyFrame = 12;
        manager.ctrlYellowFrame = 0;
        manager.ctrlLetterFrame = 32;
        manager.ctrlLetterKeyFrame = 12;
        manager.deleteFrame = 17;
        manager.deleteKeyFrame = 4;
        manager.deleteYellowFrame = 0;
        manager.createdNext = false;
        manager.rndSprite = [];
        manager.rndSheet = [];
        manager.ChangeEachHandsX = [410, 440, 550, 590, 550, 500];
        manager.ChangeEachHandsY = [870, 785, 785, 860, 900, 870];
    },

    CreateHoldAndSwitch: function () {
        var manager = this;
        manager.LetterReset();
        manager.shiftLetter = manager.add.sprite(515, 610, 'morekeys', 'shift1');
        manager.shiftLetterYellow = manager.add.sprite(500, 600, 'midkeys', 'midKeyBG1');
        manager.shiftLetterKey = manager.add.sprite(500, 600, 'morekeys', 'midkey1');
        manager.shiftLetter.visible = false;
        manager.shiftLetterYellow.visible = false;
        manager.shiftLetterKey.visible = false;
        manager.keySprites.visible = true;
        manager.arrows.visible = true;
        manager.CreateAllSpritesETC(0, 630, 665, 800, 820, 45);
        manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.LetterRotateOutline, this);
        manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.RotateShift, this);
        manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.RotateOutline, this);
        manager.HoldAndSwitch();
    },

    RotateShift: function () {
        var manager = this;
        if (manager.shiftLetter.frame == 10) {
            manager.shiftLetter.frame = 8;
        } else {
            manager.shiftLetter.frame += 1;
        }
        if (manager.shiftLetterKey.frame == 14) {
            manager.shiftLetterKey.frame = 12;
        } else {
            manager.shiftLetterKey.frame += 1;
        }
        if (manager.shiftLetterYellow.frame == 3) {
            manager.shiftLetterYellow.frame = 0;
        } else {
            manager.shiftLetterYellow.frame += 1;
        }
    },

    CreateChangeEach: function () {
        var manager = this;
        manager.baseSound = manager.add.audio('phonevibrate');
        manager.baseSound.play();
        manager.LetterReset();
        manager.CreateLetterKeys(0, 550, 620);
        manager.BottleYellowBG(0);
        manager.letter[0].visible = false;
        manager.letterKeys[0].visible = false;
        manager.yellowSprites[0].visible = false;
        manager.bottleXPos = [520, 470, 520, 620, 670, 620];
        for (var i = 1; i < manager.keySet.length; i++) {
            manager.CreateLetterKeys(i, manager.bottleXPos[i - 1], manager.bottleYPos[i - 1]);
            manager.BottleYellowBG(i, i - 1);
        }
        manager.PlaceHands(0, 430, 910, 120);
        manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.LetterRotateOutline, this);
        manager.ChangeEach();
    },

    CreateDelete: function () {
        var manager = this;
        manager.LetterReset();
        manager.blueScreen = manager.add.sprite(0, 0, 'bluescreen');
        manager.bigyellowSprites = manager.add.sprite(550, 600, 'morekeys', 'bigYellBG1');
        manager.bigletter = manager.add.sprite(560, 610, 'morekeys', 'del1');
        manager.bigletterKeys = manager.add.sprite(550, 600, 'morekeys', 'bigkey1');
        manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.DeleteRotateOutline, this);
        manager.Delete();

    },

    CreateExcel: function () {
        var manager = this;
        manager.LetterReset();
        manager.TabKeyCreate();
        manager.ControlKeyCreate();
        manager.CreateLetterKeys(0, 620, 590);
        manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.LetterRotateOutline, this);
        manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.TabRotateOutline, this);
        manager.Excel();

    },

    CreateCantSleep: function () {
        var manager = this;
        manager.LetterReset();
        manager.sleepRotations = [];
        manager.sleepRotations = [true, true, true, true, true];
        manager.PlaceHands(0, 780, 800, 45);
        manager.sleepArray = ['s1', 'l1', 'e1', 'e1', 'p1'];
        manager.thinkArray = ['t2', 'ach1', 'aye1', 'en1', 'kay1'];
        manager.cantSleepArray = [0, 1, 2, 3, 4];
        Phaser.ArrayUtils.shuffle(manager.cantSleepArray);
        for (var i = 0; i < 5; i++) {
            manager.CreateLetterKeys(i, 550 + (100 * i), 600);
            manager.CreateLetterYellowBG(i, 580 + (100 * i), 640, 550 + (100 * i), 600);
            manager.letter[i] = manager.add.sprite(570 + (100 * i), 620, 'sleep', manager.sleepArray[i]);
            var num = i;
            manager.time.events.loop(Phaser.Timer.SECOND / 7, function () {
                manager.CantSleepLetterRotate();
            }, this);
        }
        manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.LetterRotateOutline, this);
        manager.CantSleep();
    },

    CantSleepLetterRotate: function () {
        var manager = this;
        if (manager.sleepRotations[0]) {
            manager.RotateSpriteOutline(manager.letter[0], 2, 0);
        } else {
            manager.RotateSpriteOutline(manager.letter[0], 13, 12);
        }
        if (manager.sleepRotations[1]) {
            manager.RotateSpriteOutline(manager.letter[1], 5, 3);
        } else {
            manager.RotateSpriteOutline(manager.letter[1], 11, 9);
        }
        if (manager.sleepRotations[2]) {
            manager.RotateSpriteOutline(manager.letter[2], 8, 6);
        } else {
            manager.RotateSpriteOutline(manager.letter[2], 31, 29);
        }
        if (manager.sleepRotations[3]) {
            manager.RotateSpriteOutline(manager.letter[3], 8, 6);
        } else {
            manager.RotateSpriteOutline(manager.letter[3], 17, 15);
        }
        if (manager.sleepRotations[4]) {
            manager.RotateSpriteOutline(manager.letter[4], 11, 9);
        } else {
            manager.RotateSpriteOutline(manager.letter[4], 28, 26);
        }
    },


    ChangeCantSleepLetters: function () {
        var manager = this;
        var num = manager.cantSleepArray.pop();
        manager.sleepRotations[num] = false;
        manager.letter[num].destroy();
        manager.yellowSprites[num].visible = false;
        switch (num) {
            case 0:
                manager.letter[num] = manager.add.sprite(570 + (100 * num), 620, 'sleep', manager.thinkArray[num]);
                break;
            case 1:
                manager.letter[num] = manager.add.sprite(570 + (100 * num), 620, 'tyghbn', manager.thinkArray[num]);
                break;
            case 2:
                manager.letter[num] = manager.add.sprite(570 + (100 * num), 620, 'morekeys', manager.thinkArray[num]);
                break;
            case 3:
                manager.letter[num] = manager.add.sprite(570 + (100 * num), 620, 'tyghbn', manager.thinkArray[num]);
                break;
            case 4:
                manager.letter[num] = manager.add.sprite(570 + (100 * num), 620, 'morekeys', manager.thinkArray[num]);
                break;
        }
        manager.world.bringToTop(manager.hands[0]);
    },

    CreateJog: function () {
        var manager = this;
        manager.LetterReset();
        for (var i = 0; i < manager.keySet.length; i++) {
            manager.CreateLetterKeys(i, 480 + (100 * i), 550);
            manager.LetterYellowBG(manager.currentScene.keySet[i], i);
        }
        manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.LetterRotateOutline, this);
    },

    CreatePill: function () {
        var manager = this;
        manager.LetterReset();
        if (!this.game.device.windows) {
            manager.CreateLetterKeys(0, 480, 550);
            manager.CreateLetterKeys(1, 600, 550);
            manager.PlaceHands(0, 830, 750, 45);
            manager.PlaceHands(1, 380, 800, 120);
            manager.hands[1].scale.y = -1;
            manager.LetterYellowBG('manager.function', 0);
            manager.LetterYellowBG(manager.currentScene.keySet[0], 1);
            manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.LetterRotateOutline, this);
            manager.arrows.visible = false;
            manager.keySprites.visible = false;
        } else {
            // manager.PlaceHands(0, 830, 750, 45);
            manager.keySet.shift();
            manager.ctrlYellow = manager.add.sprite(460, 600, 'midkeys', 'midKeyBG1');
            manager.ctrlLetter = manager.add.sprite(490, 610, 'morekeys', 'ctrl1');
            manager.ctrlLetterKeys = manager.add.sprite(460, 600, 'morekeys', 'midkey1');
            manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.CtrlRotateOutline, this);
        }

    },

    CreateSleep: function () {
        var manager = this;
        manager.LetterReset();
        manager.CreateLetterKeys(0, 580, 550);
        manager.EndYellowBG(manager.currentScene.keySet[0], 0);
        manager.keySprites.visible = false;
        manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.LetterRotateOutline, this);
    },

    CreateButton: function () {
        var manager = this;
        manager.LetterReset();
        manager.nextY = 0;
        manager.nextX = 0;
        manager.hasLetters = true;
        manager.keySprites.visible = false;
        for (var i = 0; i < manager.keySet.length; i++) {
            if (i % 2 == 0) {
                manager.nextY += 1;
                manager.nextX = 0;
            } else {
                manager.nextX = 1;
            }
            manager.letterKeys[i] = manager.add.sprite(440 + (200 * manager.nextX), 440 + (80 * manager.nextY), 'qw', 'qwkey0');
            manager.LetterYellowBG(manager.currentScene.keySet[i], i);
        }
        manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.LetterRotateOutline, this);
    },

    CreateBigO: function () {
        var manager = this;
        manager.LetterReset();
        manager.yellowSprites[0] = manager.add.sprite(550, 600, 'qw', 'qwYellow1');
        manager.letter[0] = manager.add.sprite(570, 620, 'oh', 'o1');
        manager.letterKeys[0] = manager.add.sprite(550, 600, 'qw', 'qwkey0');
        manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.LetterRotateOutline, this);
        manager.PlaceHands(0, 460, 840, 120);
    },

    CreateSpace: function () {
        var manager = this;
        manager.LetterReset();
        manager.spaceYellowNum = 6;
        manager.spaceKeyNum = 3;
        manager.spaceOutlineNum = 0;
        manager.spaceYellow = manager.add.sprite(640, 640, 'space', 'spaceY1');
        manager.spaceKey = manager.add.sprite(550, 610, 'space', 'spaceW1');
        manager.spaceYellow.anchor.setTo(0.5, 0.5);
        manager.ohLetter = manager.add.sprite(550, 610, 'oh', 'o1');
        manager.eweLetter = manager.add.sprite(590, 610, 'mju', 'U1');
        manager.teeLetter = manager.add.sprite(630, 610, 'tyghbn', 'tee3');
        manager.ohLetter.alpha = 0;
        manager.eweLetter.alpha = 0;
        manager.teeLetter.alpha = 0;
        manager.spaceOutline = manager.add.sprite(480, 600, 'space', 'spaceOL1');
        manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.SpaceRotate, this);
        manager.SpaceOut();
    },

    SpaceRotate: function () {
        var manager = this;
        manager.spaceOutline.frame = manager.spaceOutlineNum;
        manager.spaceKey.frame = manager.spaceKeyNum;
        manager.spaceYellow.frame = manager.spaceYellowNum;
        manager.spaceOutlineNum += 1;
        manager.spaceKeyNum += 1;
        manager.spaceYellowNum += 1;
        if (manager.spaceOutlineNum == 2) {
            manager.spaceYellowNum = 6;
            manager.spaceKeyNum = 3;
            manager.spaceOutlineNum = 0;
        }
    },

    PlainArrowCreate: function (posX, posY) {
        var manager = this;
        manager.arrows.visible = true;
        manager.keySprites = manager.add.sprite(posX, posY, 'keyz', 'keys-0');
        manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.RotateOutline, this);
        for (var i = 0; i < manager.currentScene.keySet.length; i++) {
            manager.CreateYellowBG(manager.currentScene.keySet[i], i);
        }
    },

    LetterReset: function () {
        var manager = this;
        manager.arrows.visible = false;
        manager.letterKeys = [];
        manager.hasLetters = true;
        manager.keySprites.visible = false;
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
        for (var i = 0; i < manager.yellowSprites.length; i++) {
            manager.yellowSprites[i].visible = false;
        }
        if (manager.blueScreen != null) {
            manager.blueScreen.destroy();
        }
        if (manager.breathing != null) {
            manager.breathing.destroy();
        }
        if (manager.hasLetters) {
            for (var i = 0; i < manager.letterKeys.length; i++) {
                if (manager.letterKeys[i] != null) {
                    manager.letterKeys[i].visible = false;
                }
                if (manager.letter[i] != null) {
                    manager.letter[i].visible = false;
                }
            }
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
        if (manager.ohLetter != null) {
            manager.ohLetter.destroy();
            manager.eweLetter.destroy();
            manager.teeLetter.destroy();
        }
        if (manager.wait != null) {
            manager.wait.destroy();
        }
        if (manager.guess != null) {
            manager.guess.destroy();
        }
        if (manager.swipeTween != null) {
            manager.tweens.remove(manager.swipeTween);
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
        if (manager.spaceOutline != null) {
            manager.spaceYellow.destroy();
            manager.spaceKey.destroy();
            manager.spaceOutline.destroy();
        }
        if (manager.oneClick != null) {
            manager.oneClick.destroy();
            manager.twoClick.destroy();
            manager.threeClick.destroy();
        }
        if (manager.shiftLetter != null) {
            manager.shiftLetter.destroy();
            manager.shiftLetterYellow.destroy();
            manager.shiftLetterKey.destroy();
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
        if (manager.tabYellow != null) {
            manager.tabYellow.destroy();
            manager.tabLetter.destroy();
            manager.tabLetterKeys.destroy();
        }
        if (manager.ctrlYellow != null) {
            manager.ctrlYellow.destroy();
            manager.ctrlLetter.destroy();
            manager.ctrlLetterKeys.destroy();
        }
        if (manager.bigletter != null) {
            manager.bigyellowSprites.destroy();
            manager.bigletterKeys.destroy();
            manager.bigletter.destroy();
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

    EndYellowBG: function (keyName, num) {
        var manager = this;
        switch (num) {
            case 0:
                manager.PlaceHands(num, 800, 715, 45);
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

    CreateLetterKeys: function (num, posX, posY) {
        var manager = this;
        if (manager.letterKeys[num] != null) {
            manager.letterKeys.position.x = posX;
            manager.letterKeys.position.y = posY;
            manager.letterKeys.visible = true;
        } else {
            manager.letterKeys[num] = manager.add.sprite(posX, posY, 'qw', 'qwkey0');
        }
    },

    MidKeyCreate: function (yellowPosX, yellowPosY, posX, posY) {
        var manager = this;
        manager.tabLetterKeys = manager.add.sprite(posX, posY, 'morekeys', 'midkey1');
        manager.tabYellow = manager.add.sprite(yellowPosX, yellowPosY, 'midkeys', 'midKeyBG1');
        manager.tabLetter = manager.add.sprite(530, 610, 'morekeys', 'tab1');
    },

    TabKeyCreate: function () {
        var manager = this;
        manager.MidKeyCreate(500, 600, 500, 600);
        manager.tabYellow.visible = false;
        manager.tabLetter.visible = false;
        manager.tabLetterKeys.visible = false;
    },

    ControlKeyCreate: function () {
        var manager = this;
        manager.ctrlYellow = manager.add.sprite(460, 600, 'midkeys', 'midKeyBG1');
        manager.CreateLetterYellowBG(0, 660, 630, 660, 630);
        manager.ctrlLetter = manager.add.sprite(490, 610, 'morekeys', 'ctrl1');
        manager.letter[0] = manager.add.sprite(650, 610, 'morekeys', 'v1');
        manager.ctrlLetterKeys = manager.add.sprite(460, 600, 'morekeys', 'midkey1');
    },

    CreateLetterYellowBG: function (num, yellX, yellY, pressX, pressY) {
        var manager = this;
        manager.yellowSprites[num] = manager.add.sprite(yellX, yellY, 'qw', 'qwYellow1');
        manager.SetSpriteData(num);
    },

    BottleYellowBG: function (num, set) {
        var manager = this;
        switch (num) {
            case 0:
                manager.letter[num] = manager.add.sprite(790, 640, 'down', 0);
                manager.CreateLetterYellowBG(0, 810, 660, 770, 620);
                break;
            case 1:
                manager.letter[num] = manager.add.sprite(manager.bottleXPos[set] + 25, manager.bottleYPos[set] + 15, 'tyghbn', 'en1');
                manager.CreateLetterYellowBG(1, manager.bottleXPos[0] + 35, manager.bottleYPos[0] + 30, 300, 500);
                break;
            case 2:
                manager.letter[num] = manager.add.sprite(manager.bottleXPos[set] + 25, manager.bottleYPos[set] + 15, 'tyghbn', 'ach1');
                break;
            case 3:
                manager.letter[num] = manager.add.sprite(manager.bottleXPos[set] + 25, manager.bottleYPos[set] + 15, 'mju', 'U1');
                break;
            case 4:
                manager.letter[num] = manager.add.sprite(manager.bottleXPos[set] + 25, manager.bottleYPos[set] + 15, 'morekeys', 'aye1');
                break;
            case 5:
                manager.letter[num] = manager.add.sprite(manager.bottleXPos[set] + 25, manager.bottleYPos[set] + 15, 'morekeys', 'kay1');
                break;
            case 6:
                manager.letter[num] = manager.add.sprite(manager.bottleXPos[set] + 25, manager.bottleYPos[set] + 15, 'morekeys', 'em1');
                break;
        }
    },

    FirstCreateKeys: function () {
        var manager = this;
        manager.smallKeyBackgrounds = [];
        manager.smallKeyPressed = [];
        manager.smallKeyUnPressed = [];
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
        manager.longKeyBackground = manager.add.sprite(-100, -100, 'allkeys', 'longkeybg');
        manager.longKeyUnpressed = manager.add.sprite(-100, -100, 'allkeys', 'longkeyunpressed');
    },

    DisappearAllKeys: function () {
        var manager = this;
        for (var i = 0; i <= 8; i++) {
            manager.smallKeyBackgrounds[i].visible = false;
            manager.smallKeyUnPressed[i].visible = false;
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
            }
        }
    },


    LetterYellowBG: function (keyName, num) {
        var manager = this;
        switch (keyName) {
            case "manager.cue":
                manager.letter[num] = manager.add.sprite(500 + (100 * num), 560, "qw", 8);
                manager.time.events.loop(Phaser.Timer.SECOND / 7, function () {
                    manager.RotateSpriteOutline(manager.letter[num], 11, 8);
                }, this);
                manager.hands[0].scale.y = -1;

                manager.PlaceHands(num, 340, 700, 150);
                for (var i = 2; i < manager.hands.length; i++) {
                    manager.hands[i].visible = false;
                }
                manager.CreateLetterYellowBG(num, 520 + (100 * num), 580, 520 + (100 * num), 580);
                break;
            case "manager.doubleEwe":
                manager.letter[num] = manager.add.sprite(500 + (100 * num), 560, "qw", 7);
                manager.time.events.loop(Phaser.Timer.SECOND / 7, function () {
                    manager.RotateSpriteOutline(manager.letter[num], 7, 4);
                }, this);
                //               manager.PlaceHands(num, 900, 595, 0);
                //                for (var i = 1; i < manager.hands.length; i++) {
                //                    manager.hands[i].visible = false;
                //                }
                manager.CreateLetterYellowBG(num, 520 + (100 * num), 580, 520 + (100 * num), 580);
                break;
            case "manager.oh":
                manager.letter[num] = manager.add.sprite(500 + (100 * num), 560, "oh", "o1");
                manager.time.events.loop(Phaser.Timer.SECOND / 7, function () {
                    manager.RotateSpriteOutline(manager.letter[num], 2, 0);
                }, this);
                manager.PlaceHands(num, 720, 795, 90);
                //                for (var i = 1; i < manager.hands.length; i++) {
                //                    manager.hands[i].visible = false;
                //                }
                manager.CreateLetterYellowBG(num, 520 + (100 * num), 580, 520 + (100 * num), 580);
                break;
            case "manager.pee":
                manager.letter[num] = manager.add.sprite(500 + (100 * num), 560, "sleep", "p1");
                manager.time.events.loop(Phaser.Timer.SECOND / 7, function () {
                    manager.RotateSpriteOutline(manager.letter[num], 11, 9);
                }, this);
                //manager.PlaceHands(num, 900, 595, 0);
                //                for (var i = 1; i < manager.hands.length; i++) {
                //                    manager.hands[i].visible = false;
                //                }
                manager.CreateLetterYellowBG(num, 520 + (100 * num), 580, 520 + (100 * num), 580);
                break;
            case "manager.em":
                manager.letter[num] = manager.add.sprite(460 + (50 * 2), 530 + (100 * 2), "mju", "M3");
                manager.time.events.loop(Phaser.Timer.SECOND / 7, function () {
                    manager.RotateSpriteOutline(manager.letter[num], 2, 0);
                }, this);
                manager.PlaceHands(num, 800, 725, 0);
                for (var i = 1; i < manager.hands.length; i++) {
                    manager.hands[i].visible = false;
                }
                manager.CreateLetterYellowBG(num, 480 + (50 * num), 550 + (100 * num), 480 + (50 * num), 550 + (100 * i));
                break;
            case "manager.jay":
                manager.letter[num] = manager.add.sprite(465 + (50 * num), 530 + (100 * num), "mju", "J3");
                manager.time.events.loop(Phaser.Timer.SECOND / 7, function () {
                    manager.RotateSpriteOutline(manager.letter[num], 5, 3);
                }, this);
                manager.PlaceHands(num, 900, 595, 0);
                for (var i = 1; i < manager.hands.length; i++) {
                    manager.hands[i].visible = false;
                }
                manager.CreateLetterYellowBG(num, 480 + (50 * num), 550 + (100 * num), 480 + (50 * num), 550 + (100 * i));
                break;
            case "manager.ewe":
                manager.letter[num] = manager.add.sprite(470 + (50 * 0), 530 + (100 * 0), "mju", "U3");
                manager.time.events.loop(Phaser.Timer.SECOND / 7, function () {
                    manager.RotateSpriteOutline(manager.letter[num], 8, 6);
                }, this);
                manager.PlaceHands(num, 900, 595, 0);
                for (var i = 1; i < manager.hands.length; i++) {
                    manager.hands[i].visible = false;
                }
                manager.CreateLetterYellowBG(num, 480 + (50 * num), 550 + (100 * num), 480 + (50 * num), 550 + (100 * i));
                break;
            case "manager.keyFive":
                manager.letter[num] = manager.add.sprite(470 + (200 * manager.nextX), 460 + (80 * manager.nextY), "numbers", "numbers50");
                manager.time.events.loop(Phaser.Timer.SECOND / 7, function () {
                    manager.RotateSpriteOutline(manager.letter[num], 17, 15);
                }, this);
                manager.PlaceHands(num, 330, 715, 120);
                manager.hands[0].scale.y = -1;
                for (var i = 1; i < manager.hands.length; i++) {
                    manager.hands[i].visible = false;
                }
                manager.CreateLetterYellowBG(num, 480 + (200 * manager.nextX), 470 + (80 * manager.nextY), 480 + (50 * num), 550 + (100 * i));
                break;
            case "manager.keySix":
                manager.letter[num] = manager.add.sprite(470 + (200 * manager.nextX), 460 + (80 * manager.nextY), "numbers", "numbers60");
                manager.time.events.loop(Phaser.Timer.SECOND / 7, function () {
                    manager.RotateSpriteOutline(manager.letter[num], 20, 18);
                }, this);
                for (var i = 1; i < manager.hands.length; i++) {
                    manager.hands[i].visible = false;
                }
                manager.CreateLetterYellowBG(num, 480 + (200 * manager.nextX), 470 + (80 * manager.nextY), 480 + (50 * num), 550 + (100 * i));
                break;
            case "manager.tee":
                manager.letter[num] = manager.add.sprite(470 + (200 * manager.nextX), 460 + (80 * manager.nextY), "tyghbn", "tee3");
                manager.time.events.loop(Phaser.Timer.SECOND / 7, function () {
                    manager.RotateSpriteOutline(manager.letter[num], 2, 0);
                }, this);
                for (var i = 1; i < manager.hands.length; i++) {
                    manager.hands[i].visible = false;
                }
                manager.CreateLetterYellowBG(num, 480 + (200 * manager.nextX), 470 + (80 * manager.nextY), 480 + (50 * num), 550 + (100 * i));
                break;
            case "manager.why":
                manager.letter[num] = manager.add.sprite(470 + (200 * manager.nextX), 460 + (80 * manager.nextY), "tyghbn", "why3");
                manager.time.events.loop(Phaser.Timer.SECOND / 7, function () {
                    manager.RotateSpriteOutline(manager.letter[num], 5, 3);
                }, this);
                for (var i = 1; i < manager.hands.length; i++) {
                    manager.hands[i].visible = false;
                }
                manager.CreateLetterYellowBG(num, 480 + (200 * manager.nextX), 470 + (80 * manager.nextY), 480 + (50 * num), 550 + (100 * i));
                break;
            case "manager.gee":
                manager.letter[num] = manager.add.sprite(470 + (200 * manager.nextX), 460 + (80 * manager.nextY), "tyghbn", "gee3");
                manager.time.events.loop(Phaser.Timer.SECOND / 7, function () {
                    manager.RotateSpriteOutline(manager.letter[num], 8, 6);
                }, this);
                for (var i = 1; i < manager.hands.length; i++) {
                    manager.hands[i].visible = false;
                }
                manager.CreateLetterYellowBG(num, 480 + (200 * manager.nextX), 470 + (80 * manager.nextY), 480 + (50 * num), 550 + (100 * i));
                break;
            case "manager.ach":
                manager.letter[num] = manager.add.sprite(470 + (200 * manager.nextX), 460 + (80 * manager.nextY), "tyghbn", "ach3");
                manager.time.events.loop(Phaser.Timer.SECOND / 7, function () {
                    manager.RotateSpriteOutline(manager.letter[num], 11, 9);
                }, this);
                for (var i = 1; i < manager.hands.length; i++) {
                    manager.hands[i].visible = false;
                }
                manager.CreateLetterYellowBG(num, 480 + (200 * manager.nextX), 470 + (80 * manager.nextY), 480 + (50 * num), 550 + (100 * i));
                break;
            case "manager.bee":
                manager.letter[num] = manager.add.sprite(470 + (200 * manager.nextX), 460 + (80 * manager.nextY), "tyghbn", "bee3");
                manager.time.events.loop(Phaser.Timer.SECOND / 7, function () {
                    manager.RotateSpriteOutline(manager.letter[num], 14, 12);
                }, this);
                for (var i = 1; i < manager.hands.length; i++) {
                    manager.hands[i].visible = false;
                }
                manager.CreateLetterYellowBG(num, 480 + (200 * manager.nextX), 470 + (80 * manager.nextY), 480 + (50 * num), 550 + (100 * i));
                break;
            case "manager.en":
                manager.letter[num] = manager.add.sprite(470 + (200 * manager.nextX), 460 + (80 * manager.nextY), "tyghbn", "en3");
                manager.time.events.loop(Phaser.Timer.SECOND / 7, function () {
                    manager.RotateSpriteOutline(manager.letter[num], 17, 15);
                }, this);
                for (var i = 1; i < manager.hands.length; i++) {
                    manager.hands[i].visible = false;
                }
                manager.CreateLetterYellowBG(num, 480 + (200 * manager.nextX), 470 + (80 * manager.nextY), 480 + (50 * num), 550 + (100 * i));
                break;
            case "manager.function":
                manager.letter[num] = manager.add.sprite(490, 570, "morekeys", "function");
                manager.time.events.loop(Phaser.Timer.SECOND / 7, function () {
                    manager.RotateSpriteOutline(manager.letter[num], 37, 35);
                }, this);
                manager.CreateLetterYellowBG(num, 520, 590, 530, 580);
                break;
            case "manager.efNine":
                manager.letter[num] = manager.add.sprite(620, 570, "morekeys", "efnine");
                manager.time.events.loop(Phaser.Timer.SECOND / 7, function () {
                    manager.RotateSpriteOutline(manager.letter[num], 13, 11);
                }, this);
                manager.CreateLetterYellowBG(num, 640, 590, 630, 580);
                break;
        }
    },

    CreateYellowBG: function (keyName, num) {
        var manager = this;
        manager.time.events.loop(Phaser.Timer.SECOND / 7, function () {
            manager.RotateSpriteOutline(manager.arrows, 3, 0);
        }, this);

        switch (keyName) {
            case "manager.cursors.up":
                manager.CreateAllSpritesETC(num, 625, 590, 850, 660, 20);
                break;
            case "manager.cursors.down":
                manager.CreateAllSpritesETC(num, 625, 670, 700, 880, 60);
                if (manager.hands[num] != null) {
                    manager.hands[num].scale.y = -1;
                }
                break;
            case "manager.cursors.right":
                manager.CreateAllSpritesETC(num, 700, 670, 820, 885, 60);
                break;
            case "manager.cursors.left":
                manager.CreateAllSpritesETC(num, 540, 670, 340, 750, 150);
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
        manager.black = manager.add.sprite(0, 500, 'black');
        manager.world.sendToBack(manager.black);
        manager.arrows = manager.add.sprite(520, 570, 'arrows');
        for (var i = 0; i < 4; i++) {
            manager.hands.push(manager.add.sprite(-100, -100, "singleHand", "hand0"));
            manager.hands[i].anchor.setTo(0.5, 0.5);
            manager.handimation.push(manager.hands[i].animations.add("twitch"));
            manager.hands[i].visible = false;
            manager.yellowSprites[i] = manager.add.sprite(-100, -100, "qw", "qwYellow1");
            manager.yellowSprites[i].visible = false;
        }
        manager.PhotoLoader();
    },

    SetSpriteData: function (num) {
        var manager = this;
        manager.yellowSprites[num].anchor.setTo(0.5, 0.5);
        manager.world.sendToBack(manager.black);
        manager.world.sendToBack(manager.yellowSprites[num]);
    },

    CreateAllSpritesETC: function (num, posX, posY, handX, handY, handRot) {
        var manager = this;
        manager.yellowSprites[num].position.x = posX;
        manager.yellowSprites[num].position.y = posY;
        manager.yellowSprites[num].visible = true;
        manager.yellowSprites[num].alpha = 1;
        manager.yellowSprites[num].scale.x = 1;
        manager.yellowSprites[num].scale.y = 1;
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

    IncreaseFrame: function (thisFrame) {
        var newFrame = thisFrame + 1;
        return (newFrame);
    },

    CtrlRotateOutline: function () {
        var manager = this;
        manager.RotateSpriteOutline(manager.ctrlYellow, 4, 0);
        manager.RotateSpriteOutline(manager.ctrlLetter, 34, 32);
        manager.RotateSpriteOutline(manager.ctrlLetterKeys, 16, 14);
    },

    TabRotateOutline: function () {
        var manager = this;
        manager.RotateSpriteOutline(manager.tabYellow, 4, 0);
        manager.RotateSpriteOutline(manager.tabLetter, 43, 41);
        manager.RotateSpriteOutline(manager.tabLetterKeys, 16, 14);
        manager.CtrlRotateOutline();
    },

    DeleteRotateOutline: function () {
        var manager = this;
        if (manager.deleteFrame == 19) {
            manager.deleteFrame = 17;
        } else {
            manager.deleteFrame += 1;
        }
        if (manager.deleteKeyFrame == 7) {
            manager.deleteKeyFrame = 4;
        } else {
            manager.deleteKeyFrame += 1;
        }
        if (manager.deleteYellowFrame == 4) {
            manager.deleteYellowFrame = 0
        } else {
            manager.deleteYellowFrame += 1;
        }
        manager.bigyellowSprites.frame = manager.deleteYellowFrame;
        manager.bigletterKeys.frame = manager.deleteKeyFrame;
        manager.bigletter.frame = manager.deleteFrame;
    },

    LetterRotateOutline: function () {
        var manager = this;
        for (var i = 0; i < manager.letterKeys.length; i++) {
            if (manager.letterKeys[i] != null) {
                manager.letterKeys[i].frame = manager.letterSpriteFrame;
            }
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
        manager.arrows.visible = false;
        manager.wait = manager.add.sprite(500, 550, "wait", "wait0");
        manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.RotateWait, this);
        if (manager.song != null) {
            manager.song.destroy();
            manager.playMusic = false;
            manager.song = null;
        }
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
        manager.arrows.visible = false;
        manager.guess = manager.add.sprite(500, 550, "guess", "guess0");
        manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.RotateGuess, this);
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

        for (var i = 0; i < manager.yellowSprites.length; i++) {
            manager.world.bringToTop(manager.yellowSprites[i]);
        }
        manager.world.bringToTop(manager.arrows);
        manager.world.bringToTop(manager.keySprites);
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
            manager.YellowKeyUp(1);
        }
        if (manager.goDown && manager.upInt <= 0) {
            manager.goDown = false;
            manager.SequentialKeyPress(1);
            manager.MoveHand(0);
            manager.YellowKeyUp(0);
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
            manager.yellowSprites[0].position.x = 710;
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
                if (manager.spaceKey.alpha <= .7) {
                    manager.ohLetter.alpha += .1;
                    manager.eweLetter.alpha += .1;
                    manager.teeLetter.alpha += .1;
                    if (manager.ohLetter.alpha >= 1) {
                        manager.ohLetter.alpha = 1;
                        manager.eweLetter.alpha = 1;
                        manager.teeLetter.alpha = 1;
                    }
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
                if (manager.keySprites != null) {
                    manager.arrows.visible = true;
                    manager.arrows.alpha = 1;
                    manager.keySprites.visible = true;
                    manager.keySprites.alpha = 1;
                    manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.RotateOutline, this);
                    manager.CreateYellowBG(manager.currentScene.keySet[0], 0);

                } else {
                    manager.PlainArrowCreate(500, 550);
                }
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
                    if (manager.keySprites != null) {
                        manager.arrows.visible = true;
                        manager.arrows.alpha = 1;
                        manager.keySprites.visible = true;
                        manager.keySprites.alpha = 1;
                        manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.RotateOutline, this);
                        for (var i = 0; i < manager.currentScene.keySet.length; i++) {
                            manager.CreateYellowBG(manager.currentScene.keySet[i], i);
                        }
                        manager.time.events.loop(Phaser.Timer.SECOND / 7, function () {
                            manager.RotateSpriteOutline(manager.arrows, 3, 0);
                        }, this);
                    } else {
                        manager.PlainArrowCreate(500, 550);
                    }
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
                    manager.FromAlphaTweens(manager.arrows, 0, manager.rnd.integerInRange(1000, 2000));
                    manager.FromAlphaTweens(manager.keySprites, 0, manager.rnd.integerInRange(1000, 2000));
                    manager.FromAlphaTweens(manager.yellowSprites[0], 0, manager.rnd.integerInRange(1000, 2000));
                    manager.FromAlphaTweens(manager.yellowSprites[1], 0, manager.rnd.integerInRange(1000, 2000));
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
                break;
            case 7:
                manager.Swipe();
                break;
            case 8:
                manager.TapDifferent();
                break;
            case 9:
                for (var i = 1; i < manager.keySet.length; i++) {
                    manager.yellowSprites[i].visible = false;
                }
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
        manager.time.events.loop(Phaser.Timer.SECOND / 7, function () {
            manager.EndNumberRotate(manager.number, manager.endNumber);
        }, this);
        manager.EndBringToTop();
        manager.score = 14;
        manager.EndGame(0);

    },

    EndNumberRotate: function (num, sprite) {
        var manager = this;
        switch (num) {
            case 0:
                manager.RotateSpriteOutline(sprite, 5, 3);
                break;
            case 1:
                manager.RotateSpriteOutline(sprite, 8, 6);
                break;
            case 2:
                manager.RotateSpriteOutline(sprite, 11, 9);
                break;
            case 3:
                manager.RotateSpriteOutline(sprite, 14, 12);
                break;
            case 4:
                manager.RotateSpriteOutline(sprite, 17, 15);
                break;
            case 5:
                manager.RotateSpriteOutline(sprite, 20, 18);
                break;
            case 6:
                manager.RotateSpriteOutline(sprite, 23, 21);
                break;
            case 7:
                manager.RotateSpriteOutline(sprite, 26, 24);
                break;
            case 8:
                manager.RotateSpriteOutline(sprite, 29, 27);
                break;
            case 9:
                manager.RotateSpriteOutline(sprite, 2, 0);
                //manager.RotateSpriteOutline(manager.finalOne, 5, 3);
                break;
        }
    },

    EndBringToTop: function () {
        var manager = this;
        //manager.world.bringToTop(manager.black);
        manager.world.bringToTop(manager.tLid);
        manager.world.bringToTop(manager.bLid);
        manager.world.bringToTop(manager.yellowSprites[0]);
        manager.world.bringToTop(manager.letterKeys[0]);
        manager.world.bringToTop(manager.endNumber);
        if (manager.endRounds > 9) {
            manager.world.bringToTop(manager.yellowSprites[1]);
            manager.world.bringToTop(manager.letterKeys[1]);
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
                manager.AlphaTweens(manager.yellowSprites[0], 0, 200);
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
        manager.AlphaTweens(manager.yellowSprites[0], 1, 200);
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
            //manager.yellowSprites[0].alpha = 1;

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
                    manager.AlphaTweens(manager.letterKeys[1], 0, 1000);
                    manager.AlphaTweens(manager.yellowSprites[1], 0, 1000);
                    manager.onePress = true;
                }, this);
            } else {
                manager.keyTwo.reset();
                manager.keyTwo.onDown.add(function () {
                    manager.EndBringToTop();
                    manager.AlphaTweens(manager.letterKeys[1], 0, 1000);
                    manager.AlphaTweens(manager.yellowSprites[1], 0, 1000);
                    manager.onePress = true;
                }, this);
            }

            manager.keySet[manager.number].onDown.add(function () {
                if (manager.onePress) {
                    manager.AlphaTweens(manager.letterKeys[0], 0, 1000);
                    manager.AlphaTweens(manager.yellowSprites[0], 0, 1000);
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
        manager.AlphaTweens(manager.yellowSprites[1], 1, 200);
    },

    SetNextTenth: function () {
        var manager = this;
        manager.nextPressed = false;
        if (manager.endRounds >= 10 && manager.endRounds < 20) {
            manager.keyOne.reset();
            manager.keyOne.onDown.add(function () {
                // manager.EndBringToTop();
                manager.world.bringToTop(manager.yellowSprites[1]);
                manager.world.bringToTop(manager.finalOne);
                manager.AlphaTweens(manager.finalOne, 0, 200);
                manager.AlphaTweens(manager.yellowSprites[1], 0, 200);
                if (manager.firstPressed) {
                    manager.time.events.add(Phaser.Timer.SECOND / 10, manager.EndIncreaseInt, this);
                    manager.time.events.add(Phaser.Timer.SECOND / 10, manager.FadeTenthBackIn, this);
                }
                manager.nextPressed = true;
            }, this);
        } else {
            manager.keyTwo.onDown.add(function () {
                //manager.EndBringToTop();
                manager.world.bringToTop(manager.yellowSprites[1]);
                manager.world.bringToTop(manager.finalOne);
                manager.AlphaTweens(manager.finalOne, 0, 200);
                manager.AlphaTweens(manager.yellowSprites[1], 0, 200);
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
        manager.EndYellowBG(manager.currentScene.keySet[0], 1);
        manager.world.bringToTop(manager.yellowSprites[1]);
        manager.world.bringToTop(manager.finalOne);
    },

    YellowKeyInput: function (num) {
        var manager = this;
        manager.yellowSprites[num].visible = false;
        manager.buttonPressFrame[0] = 0;
        manager.time.events.repeat(Phaser.Timer.SECOND / 15, 8, function () {
            manager.buttonPressFrame[num] += 1;
            if (manager.buttonPressFrame[num] >= 7) {
                manager.buttonPressFrame[num] = 0;
            }
        }, this);
    },

    YellowKeyUp: function (num) {
        var manager = this;
        if (!manager.yellowSprites[num].visible) {
            manager.yellowSprites[num].visible = true;
        }
        manager.yellowSprites[num].scale.x = 1;
        manager.yellowSprites[num].scale.y = 1;
        manager.buttonPressFrame[num] = 0;
        manager.yellowSprites[num].frame = 12;
    },

    YellowKeyFlashOne: function () {
        var manager = this;
        if (!manager.yellowSprites[0].visible && !manager.keysPressed[0]) {
            manager.yellowSprites[0].visible = true;
        }
        manager.yellowSprites[1].visible = false;
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

    SetPressedFalse: function () {
        var manager = this;
        if (!manager.notPressed) {
            manager.notPressed = true;
        }
    },

    FlashYellowBGOne: function () {
        var manager = this;
        if (manager.currentKey == 0) {
            if (manager.yellowSprites[0].visible) {
                manager.yellowSprites[0].visible = false;
            } else if (!manager.yellowSprites[0].visible) {
                manager.yellowSprites[0].visible = true;
            }
        } else {
            manager.yellowSprites[0].visible = false;
        }
        if (manager.notPressed) {
            //manager.IncreaseBlend();

            manager.IncreaseInt();
        }
    },

    FlashYellowBGTwo: function () {
        var manager = this;
        if (manager.currentKey == 1) {
            if (manager.yellowSprites[1].visible) {
                manager.yellowSprites[1].visible = false;
            } else if (!manager.yellowSprites[0].visible) {
                manager.yellowSprites[1].visible = true;
            }
        } else {
            manager.yellowSprites[1].visible = false;
        }
    },

    DoubleSequence: function () {
        var manager = this;
        if (manager.currentScene.soundType == 8) {
            manager.breathing.volume = 2.2;
        }
        for (var i = 1; i < manager.keySet.length; i++) {
            manager.yellowSprites[i].visible = false;
        }
        manager.yellowSprites[2].visible = true;

        manager.keySet[0].onDown.add(function () {
            if (!manager.keysPressed[0] && manager.gameReady) {
                manager.IncreaseInt();
                manager.IncreaseBlend();
                manager.SequentialKeyPress(0);
                manager.YellowKeyUp(1);
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
                manager.YellowKeyUp(3);
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
                manager.yellowSprites[0].position.y = upPos;
                manager.hands[0].position.y = upPos;
            }
        });
        manager.keySet[1].onDown.add(function () {
            manager.oneClick.play();
            if (manager.screen.frame <= 8 && manager.screen.frame > 0) {
                manager.IncreaseBlend();
                manager.screen.frame -= 1;
            } else if (manager.screen.frame == 0) {
                manager.yellowSprites[0].position.y = downPos;
                manager.hands[0].position.y = downPos;
            }
        });
        manager.world.bringToTop(manager.screen);
        manager.world.bringToTop(manager.currentSet[0]);
        manager.world.bringToTop(manager.greyscale);
        manager.YellowKeyFlashOne();
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
            manager.spaceYellow.alpha = .8;
            manager.spaceYellow.scale.x = .9;
            manager.spaceYellow.scale.y = .9;
        });
        manager.keySet[0].onUp.add(function () {
            manager.pressedSpace = false;
            manager.currentSound.stop();
            manager.spaceYellow.alpha = 1;
            manager.spaceYellow.scale.x = 1;
            manager.spaceYellow.scale.y = 1;
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
                manager.letter[0].visible = false;
                manager.letterKeys[0].visible = false;
                manager.yellowSprites[0].visible = false;

                manager.tabYellow.visible = true;
                manager.tabLetter.visible = true;
                manager.tabLetterKeys.visible = true;
                manager.ctrlYellow.visible = false;
                manager.ctrlLetter.visible = false;
                manager.ctrlLetterKeys.visible = false;
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
                manager.letter[0].visible = true;
                manager.letterKeys[0].visible = true;
                manager.yellowSprites[0].visible = true;
                manager.tabYellow.visible = false;
                manager.tabLetter.visible = false;
                manager.tabLetterKeys.visible = false;
                manager.ctrlYellow.visible = true;
                manager.ctrlLetter.visible = true;
                manager.ctrlLetterKeys.visible = true;
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
                manager.yellowSprites[0].alpha = .5;
                manager.yellowSprites[0].scale.x = .9;
                manager.yellowSprites[0].scale.y = .9;
                for (var i = 0; i < manager.keysPressed.length; i++) {
                    manager.keysPressed[i] = true;
                }
            }
        });
        manager.keySet[0].onUp.add(function () {
            for (var i = 0; i < manager.keysPressed.length; i++) {

                manager.inputSound.pause();
                manager.yellowSprites[0].alpha = 1;
                manager.yellowSprites[0].scale.x = 1;
                manager.yellowSprites[0].scale.y = 1;
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
                manager.yellowSprites[0].position.x = 620;
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
                manager.yellowSprites[1].alpha = .5;
                manager.yellowSprites[1].scale.x = .9;
                manager.yellowSprites[1].scale.y = .9;
                manager.keysPressed[manager.nextInt] = true;
                manager.gameReady = true;
            })
            manager.keySet[manager.nextInt].onUp.add(function () {
                manager.yellowSprites[1].alpha = 1;
                manager.yellowSprites[1].scale.x = 1;
                manager.yellowSprites[1].scale.y = 1;
            })

        } else {
            manager.keySet[manager.nextInt].onDown.add(function () {
                manager.ResetKeyboard();
                manager.IncreaseInt();
                manager.IncreaseBlend();
                manager.keysPressed[manager.nextInt] = true;
                manager.PlaceHands(0, manager.ChangeEachHandsX[manager.nextInt], manager.ChangeEachHandsY[manager.nextInt], 120);
                manager.yellowSprites[1].position.x = manager.bottleXPos[manager.nextInt + 1] + 35;
                manager.yellowSprites[1].position.y = manager.bottleYPos[manager.nextInt + 1] + 30;
                manager.nextInt += 1;
                if (manager.nextInt >= 6) {
                    for (var i = 1; i < manager.letterKeys.length; i++) {
                        manager.letter[i].visible = false;
                        manager.letterKeys[i].visible = false;
                    }
                    manager.letter[5].visible = false;
                    manager.keySprites.visible = true;
                    manager.arrows.visible = true;
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
            manager.yellowSprites[manager.ManyKeyInt].visible = false;
            manager.yellowSprites[manager.ManyKeyInt + 1].visible = true;
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
                for (var i = 0; i < manager.letterKeys.length; i++) {
                    manager.letterKeys[i].position.y -= 20;
                    manager.letter[i].position.y -= 20;
                    manager.yellowSprites[i].position.y -= 20;
                }
                manager.ButtonMoveKeys(manager.ManyKeyInt, nextKey);
                manager.IncreaseInt();
                manager.IncreaseBlend();

                manager.keySet[manager.ManyKeyInt].reset();
                manager.keySet[manager.ManyKeyInt + 1].reset();
                manager.yellowSprites[manager.ManyKeyInt + 1].visible = false;
                manager.ManyKeyInt += 2;
                if (manager.ManyKeyInt >= manager.keySet.length) {
                    manager.IncreaseInt();
                    manager.IncreaseBlend();
                    manager.time.events.removeAll();
                    manager.NextScene();
                    manager.gameReady = false;
                } else {
                    manager.yellowSprites[manager.ManyKeyInt].visible = true;
                    manager.ManyKeySequence();
                }
            }
        });
    },

    ButtonMoveKeys: function (key1, key2) {
        var manager = this;
        manager.add.tween(manager.letterKeys[key1]).to({
            x: 520,
        }, 1000, Phaser.Easing.Linear.None, true);
        manager.add.tween(manager.letter[key1]).to({
            x: 550,
        }, 1000, Phaser.Easing.Linear.None, true);
        manager.add.tween(manager.letterKeys[key2]).to({
            x: 600,
        }, 1000, Phaser.Easing.Linear.None, true);
        manager.add.tween(manager.letter[key2]).to({
            x: 630,
        }, 1000, Phaser.Easing.Linear.None, true);
    },

    HoldKeys: function () {
        var manager = this;
        manager.inputHasPlayed = false;
        manager.keySet[0].onDown.add(function () {
            if (manager.currentScene.name == "pill") {
                if (!this.game.device.windows) {
                    manager.HoldKeyPress(1);
                    manager.HoldKeyPress(0);
                    manager.keysPressed[0] = true;
                    manager.keysPressed[1] = true;
                } else {
                    manager.keysPressed[0] = true;
                    manager.keysPressed[1] = true;
                    manager.ctrlYellow.alpha = 0.8;
                    manager.ctrlLetterKeys.scale.x = 0.9;
                    manager.ctrlLetterKeys.scale.y = 0.9;
                }
            } else {
                manager.HoldKeyPress(0);
                manager.HoldKeysFeedback(0);
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
                    manager.yellowSprites[0].alpha = 1;
                    manager.yellowSprites[0].scale.x = 1;
                    manager.yellowSprites[0].scale.y = 1;
                    manager.yellowSprites[1].alpha = 1;
                    manager.yellowSprites[1].scale.x = 1;
                    manager.yellowSprites[1].scale.y = 1;
                } else {
                    manager.keysPressed[0] = false;
                    manager.keysPressed[1] = false;
                    manager.ctrlYellow.alpha = 1;
                    manager.ctrlLetterKeys.scale.x = 1;
                    manager.ctrlLetterKeys.scale.y = 1;
                }
            } else {
                manager.HoldKeyUp(0);
            }
            if (manager.currentScene.soundType == 6) {
                manager.inputSound.pause();
            }
            if (manager.currentScene.soundType == 13) {
                manager.inputSound.stop();
            }
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
                manager.HoldKeyPress(2);
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

    HoldKeysFeedback: function (num) {
        var manager = this;
        manager.yellowSprites[num].scale.x = .9;
        manager.yellowSprites[num].scale.y = .9;
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

    HoldKeyPress: function (num) {
        var manager = this;
        manager.yellowSprites[num].scale.x = .9;
        manager.yellowSprites[num].scale.y = .9;
        manager.keysPressed[num] = true;
        manager.YellowKeyInput(num);
        manager.yellowSprites[num].alpha = 0.5;
        manager.yellowSprites[num].visible = true;
    },

    HoldKeyUp: function (num) {
        var manager = this;
        manager.YellowKeyUp(num);
        manager.keysPressed[num] = false;
        manager.yellowSprites[num].scale.x = 1;
        manager.yellowSprites[num].scale.y = 1;
        manager.yellowSprites[num].alpha = 1;
    },

    AreTrue: function (element, index, array) {
        return element == true;
    },

    SequentialKeys: function () {
        var manager = this;
        if (manager.currentScene.soundType == 8) {
            manager.breathing.volume = 2.2;
        }
        for (var i = 1; i < manager.keySet.length; i++) {
            manager.yellowSprites[i].visible = false;
        }
        manager.keySet[0].onDown.add(function () {
            if (!manager.keysPressed[0]) {
                manager.IncreaseInt();
                manager.SequentialKeyPress(0);
                manager.YellowKeyUp(1);
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
                    manager.YellowKeyUp(2);
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
                        manager.YellowKeyUp(3);
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
        manager.YellowKeyUp(num);
        manager.SetKeysPressedFalse();
    },

    StillSequentialKeyFinish: function (num) {
        var manager = this;
        manager.MoveHand(num);
        manager.YellowKeyUp(num);
        manager.keysPressed[0] = false;
        manager.keysPressed[1] = false;
    },

    AlsoSequentialKeyFinish: function (num) {
        var manager = this;
        manager.MoveHand(num + 1);
        manager.YellowKeyUp(num);
        manager.keysPressed[2] = false
        manager.keysPressed[3] = false
    },

    Swipe: function () {
        var manager = this;
        manager.swipeTween = manager.add.tween(manager.hands[0]).to({
            x: 700,
            y: 520
        }, 1000, Phaser.Easing.Linear.None, true);
        manager.swipeYellowNum = 3;
        manager.gameReady = false;
        manager.swipeTween.repeat(12, 1000);
        manager.currentlyPressed = [];
        for (var i = 0; i < manager.keySet.length; i++) {
            manager.currentlyPressed[i] = false;
        }
        manager.keySet[0].onDown.add(function () {
            if (manager.swipeYellowTime != null) {
                manager.yellowSprites[2].visible = false;
                manager.yellowSprites[0].visible = false;
                manager.time.events.remove(manager.swipeYellowTime);
            }
            if (!manager.keysPressed[0]) {
                manager.yellowSprites[2].visible = false;
                manager.yellowSprites[1].visible = true;
            }
            manager.currentlyPressed[0] = true;
            manager.keysPressed[0] = true;

        }, this);
        manager.keySet[0].onUp.add(function () {
            manager.currentlyPressed[0] = false;
        }, this);
        manager.keySet[1].onDown.add(function () {
            manager.currentlyPressed[1] = true;
            if (manager.keysPressed[0] && !manager.currentlyPressed[0]) {
                manager.inputSound.play();
                manager.yellowSprites[2].visible = false;
                manager.yellowSprites[1].visible = false;
                manager.yellowSprites[0].visible = true;
                manager.keysPressed[1] = true;
                manager.IncreaseInt();
                manager.IncreaseBlend();

            }
        }, this);
        manager.keySet[1].onUp.add(function () {
            manager.currentlyPressed[1] = false;
        }, this);
        manager.keySet[2].onDown.add(function () {
            manager.currentlyPressed[2] = true;
            if (manager.keysPressed[1]) {
                manager.keysPressed[0] = false;
                manager.yellowSprites[1].visible = false;
                manager.yellowSprites[0].visible = false;
                manager.yellowSprites[2].visible = true;
                manager.IncreaseInt();
                manager.IncreaseBlend();

            }
        }, this);
        manager.keySet[2].onUp.add(function () {
            manager.currentlyPressed[2] = false;
        }, this);
        manager.yellowSprites[0].visible = false;
        manager.yellowSprites[1].visible = false;
        manager.yellowSprites[2].visible = true;
        manager.swipeYellowTime = manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.SwipePreTouch, this);
    },

    SwipePreTouch: function () {
        var manager = this;
        if (manager.swipeYellowNum <= 0) {
            manager.swipeYellowNum = 2;
        } else {
            manager.swipeYellowNum -= 1;
        }
        manager.yellowSprites[manager.swipeYellowNum].visible = false;
        if (manager.swipeYellowNum == 0) {
            manager.yellowSprites[2].visible = true;
        } else {
            manager.yellowSprites[manager.swipeYellowNum - 1].visible = true;
        }
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
        manager.YellowKeyInput(num);
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
        for (var i = 1; i < manager.keySet.length; i++) {
            manager.yellowSprites[i].visible = false;
        }
        manager.randoSound = 0;
        manager.keySet[0].onDown.add(function () {
            manager.HoldKeysFeedback(0);
            manager.yellowSprites[0].alpha = .5;
            manager.yellowSprites[0].scale.x = .9;
            manager.yellowSprites[0].scale.y = .9;
            if (manager.currentScene.soundType == 12) {
                manager.randoSound = manager.rnd.integerInRange(0, 2)
                manager.inputSound[manager.randoSound].play();
            }
            manager.keysPressed[0] = true;
        });
        manager.keySet[0].onUp.add(function () {
            manager.yellowSprites[0].alpha = 1;
            manager.yellowSprites[0].scale.x = 1;
            manager.yellowSprites[0].scale.y = 1;
            if (manager.currentScene.soundType == 12) {
                manager.inputSound[manager.randoSound].pause();
            }
            manager.keysPressed[0] = false;
        });
        manager.keySet[1].onDown.add(function () {
            manager.HoldKeysFeedback(1);
            manager.yellowSprites[1].alpha = .5;
            manager.yellowSprites[1].scale.x = .9;
            manager.yellowSprites[1].scale.y = .9;
            if (manager.currentScene.soundType == 12) {
                manager.randoSound = manager.rnd.integerInRange(0, 2)
                manager.inputSound[manager.randoSound].play();
            }
            manager.keysPressed[1] = true;
        });
        manager.keySet[1].onUp.add(function () {
            manager.yellowSprites[1].alpha = 1;
            manager.yellowSprites[1].scale.x = 1;
            manager.yellowSprites[1].scale.y = 1;
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
                manager.stophands = manager.add.sprite(550, 550, 'stophands', 0);
                manager.time.events.loop(Phaser.Timer.SECOND / 7, function () {
                    manager.RotateSpriteOutline(manager.stophands, 2, 0);
                });
                for (var i = 0; i < manager.letterKeys.length; i++) {
                    manager.letterKeys[i].visible = false;

                    manager.letter[i].visible = false;
                }
                for (var i = 0; i <= manager.yellowSprites.length; i++) {
                    if (manager.yellowSprites[i].visible) {
                        manager.yellowSprites[i].visible = false;
                    }
                }
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
                for (var i = 0; i < manager.yellowSprites.length; i++) {
                    var thisTween = manager.AlphaTweens(manager.yellowSprites[i], 0, 1000);
                    manager.yellowSprites[i].visible = false;
                }

            }
        }
    },

    TapKeys: function () {
        var manager = this;
        manager.world.sendToBack(manager.black);

        manager.gameReady = false;
        manager.YellowKeyFlashOne();
        manager.playMusic = false;
        manager.musicHasPlayed = false;
        manager.pausekey = manager.add.sprite(700, 650, 'pausekey', 0);
        manager.pauseButt = manager.add.sprite(0, 0, 'pause-0', 0);
        manager.pauseButt.visible = false;
        manager.lilblack = manager.add.sprite(650, 600, 'lilblack');
        manager.time.events.loop(Phaser.Timer.SECOND / 7, function () {
            manager.RotateSpriteOutline(manager.pausekey, 2, 0);
        });
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
                    manager.world.sendToBack(manager.arrows);
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
                    manager.world.bringToTop(manager.arrows);
                    manager.song.pause();
                    manager.singing.pause();
                    manager.playMusic = false;
                }
            }
            manager.keysPressed[0] = true;
            manager.YellowKeyInput(0);
            manager.IncreaseInt();
            manager.IncreaseBlend();
        });
        manager.keySet[0].onUp.add(function () {
            manager.keysPressed[0] = false;
            manager.YellowKeyUp(0);
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
            manager.world.bringToTop(manager.spaceYellow);
            manager.world.bringToTop(manager.space);
            manager.world.bringToTop(manager.ohLetter);
            manager.world.bringToTop(manager.eweLetter);
            manager.world.bringToTop(manager.teeLetter);
            manager.world.bringToTop(manager.spaceKey);

        }

    },


};
