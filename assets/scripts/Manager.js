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
        manager.scenesJSON = manager.cache.getJSON('scenes');
        manager.muffled = manager.add.audio('muffled');
        manager.muffled.play();
        manager.currentSound = manager.muffled;
        if (!this.game.device.firefox) {
            manager.muffled.loopFull();
        }
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
        manager.greyscale = manager.add.sprite(0, 0, 'greyscale');
        manager.greyscale.blendMode = 14;


        manager.InitCreateHands();

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
        manager.letter = [];
        manager.letterFrame = [];
        manager.bottleYPos = [460, 380, 300, 300, 380, 460];
        manager.hasLetters = false;
        manager.tabYellowFrame = 0;
        manager.tabLetterFrame = 41;
        manager.tabLetterKeyFrame = 12;
        manager.ctrlYellowFrame = 0;
        manager.ctrlLetterFrame = 32;
        manager.ctrlLetterKeyFrame = 12;
        manager.deleteFrame = 17;
        manager.deleteKeyFrame = 4;
        manager.deleteYellowFrame = 0;
        manager.ripple = [];
        manager.rndSprite = [];
        manager.rndSheet = [];
    },

    CreateKeySprite: function () {
        var manager = this;
        var allDone = false;
        switch (manager.currentScene.pattern) {
            case 11:
                manager.CreateHoldAndSequence();
                allDone = true;
                break;
            case 12:
                manager.CreateIncreaseEachSequence();
                allDone = true;
                break;
            case 13:
                manager.CreateHoldAndSwitch();
                allDone = true;
                break;
            case 14:
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
            case 18:
                manager.CreateMOM();
                allDone = true;
                break;
            case 19:
                manager.CreateCantSleep();
                allDone = true;
                break;
            case 20:
                manager.CreateSpace();
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
                case 'manager.em':
                    manager.CreateMusicPlay();
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
                        manager.ArrowsandKeysVisible();
                        manager.arrows.alpha = 1;
                        manager.keySprites.alpha = 1;
                        manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.RotateOutline, this);
                        for (var i = 0; i < manager.currentScene.keySet.length; i++) {
                            manager.CreateYellowBG(manager.currentScene.keySet[i], i);
                        }
                    } else {
                        manager.PlainArrowCreate(500, 330);
                    }
                    break;
            }
        }
        manager.ArrowsandHandsToTop();
    },

    CreateHoldAndSequence: function () {
        var manager = this;
        manager.LetterReset();
        manager.bottleXPos = [420, 370, 420, 520, 570, 520];
        manager.CreateLetterKeys(0, 770, 620);
        manager.BottleYellowBG(0);
        for (var i = 1; i < manager.keySet.length; i++) {
            manager.CreateLetterKeys(i, manager.bottleXPos[i - 1], manager.bottleYPos[i - 1]);
            manager.BottleYellowBG(i, i - 1);
        }
        manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.LetterRotateOutline, this);
    },

    CreateIncreaseEachSequence: function () {
        var manager = this;
        manager.LetterReset();
        for (var i = 0; i < manager.keySet.length; i++) {

            manager.CreateLetterKeys(i, 440 + (50 * i), 210 + (100 * i));
            manager.ShirtLetterBG(i);
        }
        manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.LetterRotateOutline, this);
    },

    CreateHoldAndSwitch: function () {
        var manager = this;
        manager.LetterReset();
        manager.shiftLetter = manager.add.sprite(515, 390, 'morekeys', 'shift1');
        manager.shiftLetterYellow = manager.add.sprite(500, 380, 'midkeys', 'midKeyBG1');
        manager.shiftLetterKey = manager.add.sprite(500, 380, 'morekeys', 'midkey1');
        manager.shiftLetter.visible = false;
        manager.shiftLetterYellow.visible = false;
        manager.shiftLetterKey.visible = false;
        manager.ArrowsandKeysVisible();
        manager.CreateAllSpritesETC(0, 630, 445, 800, 600, 45);

        manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.LetterRotateOutline, this);
        manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.RotateShift, this);
        manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.RotateOutline, this);
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
        manager.CreateLetterKeys(0, 550, 420);
        manager.BottleYellowBG(0);
        manager.letter[0].visible = false;
        manager.letterKeys[0].visible = false;
        manager.yellowSprites[0].visible = false;
        manager.bottleXPos = [520, 470, 520, 620, 670, 620];
        for (var i = 1; i < manager.keySet.length; i++) {
            manager.CreateLetterKeys(i, manager.bottleXPos[i - 1], manager.bottleYPos[i - 1]);
            manager.BottleYellowBG(i, i - 1);
        }
        manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.LetterRotateOutline, this);
    },

    CreateDelete: function () {
        var manager = this;
        manager.LetterReset();
        manager.bigyellowSprites = manager.add.sprite(550, 380, 'morekeys', 'bigYellBG1');
        manager.bigletter = manager.add.sprite(560, 390, 'morekeys', 'del1');
        manager.bigletterKeys = manager.add.sprite(550, 380, 'morekeys', 'bigkey1');
        manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.DeleteRotateOutline, this);
    },

    CreateExcel: function () {
        var manager = this;
        manager.LetterReset();
        manager.TabKeyCreate();
        manager.ControlKeyCreate();
        manager.CreateLetterKeys(0, 620, 420);
        manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.LetterRotateOutline, this);
        manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.TabRotateOutline, this);
    },

    CreateMOM: function () {
        var manager = this;
        manager.LetterReset();
        for (var i = 0; i < manager.keySet.length; i++) {
            manager.CreateLetterKeys(i, 450 + (100 * i), 380);
            manager.CreateLetterYellowBG(i, 480 + (100 * i), 420, 530 + (100 * i), 380);
        }
        manager.letter[0] = manager.add.sprite(470, 400, 'mju', 'M1');
        manager.letter[1] = manager.add.sprite(570, 400, 'oh', 'o1');
        manager.letter[2] = manager.add.sprite(670, 400, 'mju', 'M1');
        manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.LetterRotateOutline, this);
    },

    CreateCantSleep: function () {
        var manager = this;
        manager.LetterReset();
        manager.sleepArray = ['s1', 'l1', 'e1', 'e1', 'p1'];
        manager.thinkArray = ['t1', 'ach1', 'aye1', 'en1', 'kay1'];
        manager.cantSleepArray = [0, 1, 2, 3, 4];
        Phaser.ArrayUtils.shuffle(manager.cantSleepArray);
        for (var i = 0; i < 5; i++) {
            manager.CreateLetterKeys(i, 550 + (100 * i), 380);
            manager.CreateLetterYellowBG(i, 580 + (100 * i), 620, 550 + (100 * i), 380);
            manager.letter[i] = manager.add.sprite(570 + (100 * i), 400, 'sleep', manager.sleepArray[i]);
        }
        manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.LetterRotateOutline, this);
    },

    ChangeCantSleepLetters: function () {
        var manager = this;
        var num = manager.cantSleepArray.pop();
        manager.letter[num].destroy();
        manager.yellowSprites[num].visible = false;
        switch (num) {
            case 0:
                manager.letter[num] = manager.add.sprite(570 + (100 * num), 400, 'sleep', manager.thinkArray[num]);
                break;
            case 1:
                manager.letter[num] = manager.add.sprite(570 + (100 * num), 400, 'tyghbn', manager.thinkArray[num]);
                break;
            case 2:
                manager.letter[num] = manager.add.sprite(570 + (100 * num), 400, 'morekeys', manager.thinkArray[num]);
                break;
            case 3:
                manager.letter[num] = manager.add.sprite(570 + (100 * num), 400, 'tyghbn', manager.thinkArray[num]);
                break;
            case 4:
                manager.letter[num] = manager.add.sprite(570 + (100 * num), 400, 'morekeys', manager.thinkArray[num]);
                break;
        }
    },

    CreateJog: function () {
        var manager = this;
        manager.LetterReset();
        for (var i = 0; i < manager.keySet.length; i++) {
            manager.CreateLetterKeys(i, 480 + (100 * i), 330);
            manager.LetterYellowBG(manager.currentScene.keySet[i], i);
        }
        manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.LetterRotateOutline, this);
    },

    CreatePill: function () {
        var manager = this;
        manager.LetterReset();
        manager.CreateLetterKeys(0, 480, 330);
        manager.CreateLetterKeys(1, 600, 330);
        manager.LetterYellowBG('manager.function', 0);
        manager.LetterYellowBG(manager.currentScene.keySet[0], 1);
        manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.LetterRotateOutline, this);
        manager.arrows.visible = false;
        manager.keySprites.visible = false;
    },

    CreateMusicPlay: function () {
        var manager = this;
        manager.LetterReset();
        manager.keySprites.visible = false;
        for (var i = 0; i < manager.keySet.length; i++) {
            manager.CreateLetterKeys(i, 440 + (50 * i), 210 + (100 * i));
            manager.LetterYellowBG(manager.currentScene.keySet[i], i);
        }
        manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.LetterRotateOutline, this);
    },

    CreateSleep: function () {
        var manager = this;
        manager.LetterReset();
        manager.CreateLetterKeys(0, 580, 330);
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
            manager.letterKeys[i] = manager.add.sprite(440 + (200 * manager.nextX), 120 + (80 * manager.nextY), 'qw', 'qwkey0');
            manager.LetterYellowBG(manager.currentScene.keySet[i], i);
        }
        manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.LetterRotateOutline, this);
    },

    CreateBigO: function () {
        var manager = this;
        manager.LetterReset();
        manager.yellowSprites[0] = manager.add.sprite(550, 380, 'qw', 'qwYellow1');
        manager.letter[0] = manager.add.sprite(570, 400, 'oh', 'o1');
        manager.letterKeys[0] = manager.add.sprite(550, 380, 'qw', 'qwkey0');
    },

    CreateSpace: function () {
        var manager = this;
        manager.LetterReset();
        manager.spaceYellowNum = 6;
        manager.spaceKeyNum = 3;
        manager.spaceOutlineNum = 0;
        manager.spaceYellow = manager.add.sprite(640, 420, 'space', 'spaceY1');
        manager.spaceKey = manager.add.sprite(550, 390, 'space', 'spaceW1');
        manager.spaceYellow.anchor.setTo(0.5, 0.5);
        manager.ohLetter = manager.add.sprite(550, 390, 'oh', 'o1');
        manager.eweLetter = manager.add.sprite(590, 390, 'mju', 'U1');
        manager.teeLetter = manager.add.sprite(630, 390, 'tyghbn', 'tee3');
        manager.ohLetter.alpha = 0;
        manager.eweLetter.alpha = 0;
        manager.teeLetter.alpha = 0;
        manager.spaceOutline = manager.add.sprite(480, 380, 'space', 'spaceOL1');
        manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.SpaceRotate, this);
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
        manager.input.keyboard.reset();


    },

    RemoveEverything: function () {
        var manager = this;
        manager.ResetKeyboard();
        manager.tweens.removeAll();
        if (!this.game.device.desktop) {
            manager.hammertime.destroy();
        }

        manager.keysPressed = [];
        if (manager.currentSound != null) {
            manager.currentSound.stop();
        }
        if (manager.graphics != null) {
            manager.graphics.destroy();
        }
        //        if (gyro != null) {
        //            gyro.destroy();
        //        }

        if (manager.muffled != null) {
            manager.muffled.stop();
            manager.muffled.destroy();
        }
        for (var i = 0; i < manager.currentSet.length; i++) {
            manager.currentSet[i].destroy();
            console.log(manager.currentSet[i]);
        }
        for (var i = 0; i < manager.yellowSprites.length; i++) {
            manager.yellowSprites[i].visible = false;
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
        if (manager.music == null) {
            manager.sound.stopAll();
        }
        if (manager.baseSound != null) {
            manager.baseSound.destroy();
        }
        if (manager.ripple[0] != null) {
            for (var i = 0; i < manager.ripple.length; i++) {
                manager.ripple[i].visible = false;
            }
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
        if (manager.startFrame != null) {
            manager.startFrame.destroy();
        }
        if (manager.downSprite != null) {
            manager.downSprite.destroy();
        }
        if (manager.underPic != null) {
            manager.underPic.destroy();
        }
        if (manager.insidePic != null) {
            manager.insidePic.destroy();
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
        manager.roomTone.stop();
        manager.roomTone.destroy();
        if (manager.excelText != null) {
            for (var i = 0; i < manager.excelText.length; i++) {
                manager.excelText[i].destroy();
            }
        }
        if (manager.tabYellow) {
            manager.tabYellow.destroy();
            manager.tabLetter.destroy();
            manager.tabLetterKeys.destroy();
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
        //manager.black.destroy();
        manager.hasLetters = false;
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
        manager.deleteKey = manager.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
        manager.space = manager.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

    EndYellowBG: function (keyName, num) {
        var manager = this;
        switch (num) {
            case 0:
                manager.CreateLetterYellowBG(num, 620, 360, 720, 360);
                break;
            case 1:
                manager.CreateLetterYellowBG(num, 540, 360, 640, 360);
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
        manager.tabLetter = manager.add.sprite(530, 590, 'morekeys', 'tab1');
    },

    TabKeyCreate: function () {
        var manager = this;
        manager.MidKeyCreate(500, 380, 500, 380);
        manager.tabYellow.visible = false;
        manager.tabLetter.visible = false;
        manager.tabLetterKeys.visible = false;
    },

    ControlKeyCreate: function () {
        var manager = this;
        manager.ctrlYellow = manager.add.sprite(460, 420, 'midkeys', 'midKeyBG1');
        manager.CreateLetterYellowBG(0, 660, 410, 660, 410);
        manager.ctrlLetter = manager.add.sprite(490, 430, 'morekeys', 'ctrl1');
        manager.letter[0] = manager.add.sprite(650, 430, 'morekeys', 'v1');
        manager.ctrlLetterKeys = manager.add.sprite(460, 420, 'morekeys', 'midkey1');
    },

    CreateLetterYellowBG: function (num, yellX, yellY, pressX, pressY) {
        var manager = this;
        manager.yellowSprites[num].position.x = yellX;
        manager.yellowSprites[num].position.y = yellY;
        manager.SetSpriteData(num);
    },

    ShirtLetterBG: function (num) {
        var manager = this;
        switch (num) {
            case 0:
                manager.letter[num] = manager.add.sprite(460, 230, 'mju', 'U3');
                manager.CreateLetterYellowBG(num, 520, 350, 420, 550);
                break;
            case 1:
                manager.letter[num] = manager.add.sprite(505, 310, 'mju', 'J3');
                manager.CreateLetterYellowBG(num, 565, 450, 465, 650);
                break;
            case 2:
                manager.letter[num] = manager.add.sprite(570, 410, 'mju', 'M3');
                manager.CreateLetterYellowBG(num, 620, 550, 520, 650);
                break;
        }
    },

    BottleYellowBG: function (num, set) {
        var manager = this;
        switch (num) {
            case 0:
                manager.letter[num] = manager.add.sprite(790, 420, 'down', 0);
                manager.CreateLetterYellowBG(0, 810, 640, 770, 600);
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

    LetterYellowBG: function (keyName, num) {
        var manager = this;
        switch (keyName) {
            case "manager.cue":
                manager.letter[num] = manager.add.sprite(500 + (100 * num), 340, "qw", "qwQ1");
                manager.CreateLetterYellowBG(num, 520 + (100 * num), 360, 320 + (100 * num), 360);
                break;
            case "manager.doubleEwe":
                manager.letter[num] = manager.add.sprite(500 + (100 * num), 340, "qw", "qwW1");
                manager.CreateLetterYellowBG(num, 520 + (100 * num), 360, 320 + (100 * num), 360);
                break;
            case "manager.em":
                manager.letter[num] = manager.add.sprite(460 + (50 * 2), 230 + (100 * 2), "mju", "M3");
                manager.CreateLetterYellowBG(num, 480 + (50 * num), 250 + (100 * num), 480 + (50 * num), 250 + (100 * num));
                break;
            case "manager.jay":
                manager.letter[num] = manager.add.sprite(465 + (50 * num), 230 + (100 * num), "mju", "J3");
                manager.CreateLetterYellowBG(num, 480 + (50 * num), 250 + (100 * num), 480 + (50 * num), 250 + (100 * num));
                break;
            case "manager.ewe":
                manager.letter[num] = manager.add.sprite(470 + (50 * 0), 230 + (100 * 0), "mju", "U3");
                manager.CreateLetterYellowBG(num, 480 + (50 * num), 250 + (100 * num), 480 + (50 * num), 250 + (100 * num));
                break;
            case "manager.keyFive":
                manager.letter[num] = manager.add.sprite(470 + (200 * manager.nextX), 140 + (80 * manager.nextY), "numbers", "numbers50");
                manager.CreateLetterYellowBG(num, 480 + (200 * manager.nextX), 150 + (80 * manager.nextY), 480 + (50 * num), 230 + (100 * num));
                break;
            case "manager.keySix":
                manager.letter[num] = manager.add.sprite(470 + (200 * manager.nextX), 140 + (80 * manager.nextY), "numbers", "numbers60");
                manager.CreateLetterYellowBG(num, 480 + (200 * manager.nextX), 150 + (80 * manager.nextY), 480 + (50 * num), 230 + (100 * num));
                break;
            case "manager.tee":
                manager.letter[num] = manager.add.sprite(470 + (200 * manager.nextX), 140 + (80 * manager.nextY), "tyghbn", "tee3");
                manager.CreateLetterYellowBG(num, 480 + (200 * manager.nextX), 150 + (80 * manager.nextY), 480 + (50 * num), 230 + (100 * num));
                break;
            case "manager.why":
                manager.letter[num] = manager.add.sprite(470 + (200 * manager.nextX), 140 + (80 * manager.nextY), "tyghbn", "why3");
                manager.CreateLetterYellowBG(num, 480 + (200 * manager.nextX), 150 + (80 * manager.nextY), 480 + (50 * num), 230 + (100 * num));
                break;
            case "manager.gee":
                manager.letter[num] = manager.add.sprite(470 + (200 * manager.nextX), 140 + (80 * manager.nextY), "tyghbn", "gee3");
                manager.CreateLetterYellowBG(num, 480 + (200 * manager.nextX), 150 + (80 * manager.nextY), 480 + (50 * num), 230 + (100 * num));
                break;
            case "manager.ach":
                manager.letter[num] = manager.add.sprite(470 + (200 * manager.nextX), 140 + (80 * manager.nextY), "tyghbn", "ach3");
                manager.CreateLetterYellowBG(num, 480 + (200 * manager.nextX), 150 + (80 * manager.nextY), 480 + (50 * num), 230 + (100 * num));
                break;
            case "manager.bee":
                manager.letter[num] = manager.add.sprite(470 + (200 * manager.nextX), 140 + (80 * manager.nextY), "tyghbn", "bee3");
                manager.CreateLetterYellowBG(num, 480 + (200 * manager.nextX), 150 + (80 * manager.nextY), 480 + (50 * num), 230 + (100 * num));
                break;
            case "manager.en":
                manager.letter[num] = manager.add.sprite(470 + (200 * manager.nextX), 140 + (80 * manager.nextY), "tyghbn", "en3");
                manager.CreateLetterYellowBG(num, 480 + (200 * manager.nextX), 150 + (80 * manager.nextY), 480 + (50 * num), 230 + (100 * num));
                break;
            case "manager.function":
                manager.letter[num] = manager.add.sprite(490, 350, "morekeys", "function");
                manager.CreateLetterYellowBG(num, 520, 370, 530, 360);
                break;
            case "manager.efNine":
                manager.letter[num] = manager.add.sprite(620, 350, "morekeys", "efnine");
                manager.CreateLetterYellowBG(num, 640, 370, 630, 360);
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
                manager.CreateAllSpritesETC(num, 625, 370, 850, 440, 20);
                break;
            case "manager.cursors.down":
                manager.CreateAllSpritesETC(num, 625, 450, 700, 660, 60);
                break;
            case "manager.cursors.right":
                manager.CreateAllSpritesETC(num, 700, 450, 820, 665, 60);
                break;
            case "manager.cursors.left":
                manager.CreateAllSpritesETC(num, 540, 450, 340, 530, 150);
                break;
        }
        manager.SetSpriteData(num);
    },

    InitCreateHands: function () {
        var manager = this;
        manager.arrows = manager.add.sprite(520, 360, 'arrows');
        for (var i = 0; i < 10; i++) {
            manager.yellowSprites[i] = manager.add.sprite(-100, -100, "qw", "qwYellow1");
            manager.yellowSprites[i].visible = false;
        }
        manager.PhotoLoader();
    },

    SetSpriteData: function (num) {
        var manager = this;
        manager.yellowSprites[num].anchor.setTo(0.5, 0.5);
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

    TabRotateOutline: function () {
        var manager = this;
        if (manager.tabYellowFrame == 4) {
            manager.tabYellowFrame = 0;
        } else {
            manager.tabYellowFrame += 1;
        }
        if (manager.tabLetterFrame == 43) {
            manager.tabLetterFrame = 41;
        } else {
            manager.tabLetterFrame += 1;
        }
        if (manager.tabLetterKeyFrame == 14) {
            manager.tabLetterKeyFrame = 12;
        } else {
            manager.tabLetterKeyFrame += 1;
        }
        if (manager.ctrlYellowFrame == 4) {
            manager.ctrlYellowFrame = 0;
        } else {
            manager.ctrlYellowFrame += 1;
        }
        if (manager.ctrlLetterFrame == 34) {
            manager.ctrlLetterFrame = 32;
        } else {
            manager.ctrlLetterFrame += 1;
        }
        if (manager.ctrlLetterKeyFrame == 14) {
            manager.ctrlLetterKeyFrame = 12;
        } else {
            manager.ctrlLetterKeyFrame += 1;
        }
        manager.tabYellow.frame = manager.tabYellowFrame;
        manager.tabLetter.frame = manager.tabLetterFrame;
        manager.tabLetterKeys.frame = manager.tabLetterKeyFrame;
        manager.ctrlYellow.frame = manager.ctrlYellowFrame;
        manager.ctrlLetter.frame = manager.ctrlLetterFrame;
        manager.ctrlLetterKeys.frame = manager.ctrlLetterKeyFrame;
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
        manager.wait = manager.add.sprite(500, 530, "wait", "wait0");
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
        manager.arrows.visible = false;
        manager.guess = manager.add.sprite(500, 330, "guess", "guess0");
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
        manager.PhotoCreate();
    },

    RoomToneStart: function () {
        var manager = this;
        if (manager.currentScene.tone != null) {
            manager.roomTone = manager.add.audio(manager.currentScene.tone);
            manager.roomTone.play();
        }
    },

    PhotoCreate: function () {
        var manager = this;

        manager.currentSet.push(manager.add.sprite(0, 0, manager.currentScene.name + "-" + "0", 0));

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
        if (!this.game.device.desktop) {
            manager.MobileCheckSwitch(manager.currentScene.mobilePattern);
        } else {
            manager.KeyCheckSwitch(manager.currentScene.pattern);
        }
        if (manager.currentScene.name != "sleep" && manager.currentScene.name != "wakephone") {
            manager.StartNextScene = manager.time.events.add(Phaser.Timer.SECOND * 5, manager.NextScene, this);

        }
        if (manager.currentScene.name == "wakephone") {
            manager.MorningScenes();
        }
        if (manager.currentScene.startframe != null) {
            manager.startFrame = manager.add.sprite(0, 0, manager.currentScene.startframe);
        }
        manager.RoomToneStart();
        manager.ArrowsandHandsToTop();
    },

    NextScene: function () {
        var manager = this;
        if (manager.preloadedSets.length != 0) {
            manager.RemoveEverything();
            var nextSet = manager.preloadedSets.shift();
            for (var i = 0; i < this.scenesJSON.Scenes.length; i++) {
                if (this.scenesJSON.Scenes[i].name == nextSet) {
                    manager.currentScene = manager.scenesJSON.Scenes[i];
                    manager.switchSound = null;
                    manager.currentSound = null;
                    manager.TempSoundManager();
                    manager.FindKeys();
                    manager.PhotoLoader();
                    if (manager.currentScene.name == "closet") {
                        manager.music = manager.add.audio('music');
                        manager.music.volume = .3;
                        manager.music.play();
                    }
                    if (manager.currentScene.name == "subway") {
                        manager.music.stop();
                        manager.music.destroy();
                    }
                    break;
                }
            }
        } else {
            location.reload();
        }
        manager.greyscale.alpha = 1;
    },

    TopLidDownThings: function () {
        var manager = this;
        manager.startTween = true;
        manager.AlphaTweens(manager.mLid, 0, 1000);
        manager.tLidTween.pause();
        manager.bLidTween.pause();
        manager.LidsBringToTop();
        for (var i = 0; i < manager.ripple.length; i++) {
            manager.world.bringToTop(manager.ripple[i]);
        }
        manager.ArrowsandHandsToTop();
        manager.tLid.position.y--;
        if (manager.tLid.position.y <= -400) {
            manager.NextScene();
        }
        manager.bLid.position.y++;
    },

    PatternThreeThings: function () {
        var manager = this;
        if (!manager.goDown && manager.upInt >= manager.currentScene.switchInt) {
            manager.goDown = true;
            manager.SequentialKeyPress(0);
            manager.YellowKeyUp(1);
        }
        if (manager.goDown && manager.upInt <= 0) {
            manager.goDown = false;
            manager.SequentialKeyPress(1);
            manager.YellowKeyUp(0);
        }
        if (manager.keysPressed[0]) {
            if (!manager.goDown) {
                manager.IncreaseInt();
                manager.IncreaseBlend();
            }
        }
        if (manager.keysPressed[1]) {
            if (manager.goDown) {
                manager.DecreaseInt();
            }
        }
    },

    PatternTenThings: function () {
        var manager = this;
        if (manager.upInt >= manager.currentScene.switchInt) {
            manager.yellowSprites[0].visible = false;
            manager.yellowSprites[1].visible = true;
            manager.keysPressed[0] = false;
            manager.keysPressed[1] = false;
            manager.keySet[0].reset;
            manager.keySet.shift();
            manager.yellowSprites.shift();
            manager.ContinueSwitch();
            manager.currentScene.switchInt = 500;
        }
    },

    PatternThirteenThings: function () {
        var manager = this;
        if (manager.upInt >= manager.currentScene.switchPoints[0]) {
            for (var i = 0; i < manager.keysPressed.length; i++) {
                manager.keysPressed[i] = false;
            }
            manager.shiftLetter.visible = true;
            manager.shiftLetterYellow.visible = true;
            manager.shiftLetterKey.visible = true;
            manager.world.bringToTop(manager.shiftLetter);
            manager.keySprites.visible = false;
            manager.arrows.visible = false;
            manager.yellowSprites[0].visible = false;
            manager.currentScene.switchPoints.shift();
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
                console.log("uhhh");
                manager.IncreaseInt();
                manager.IncreaseBlend();
                manager.ArrowsandHandsToTop();
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
        manager.DecreaseBlend();
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
        if (manager.currentScene.pattern == 5) {
            manager.NoInput();
        }
        if (manager.currentScene.pattern == 10) {
            manager.PatternTenThings();
        }
        if (manager.currentScene.pattern == 13) {
            manager.PatternThirteenThings();
        }
        if (manager.currentScene.pattern == 18) {
            if (manager.keysPressed[2]) {
                manager.time.events.repeat(Phaser.Timer.SECOND / 3, 8, manager.MOMAutoPlay, this);
                manager.keysPressed[2] = false;
            }
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
                manager.insidePic.alpha -= .01;
                manager.spaceKey.alpha -= .01;
                if (manager.ohLetter.alpha < 1) {
                    manager.ohLetter.alpha += .01;
                    manager.eweLetter.alpha += .01;
                    manager.teeLetter.alpha += .01;
                }
                manager.world.bringToTop(manager.insidePic);
                manager.world.bringToTop(manager.upperPic);
                manager.world.bringToTop(manager.spaceYellow);
                manager.world.bringToTop(manager.spaceOutline);
                manager.world.bringToTop(manager.spaceKey);
            }
        }

    },

    SleepThings: function () {
        var manager = this;
        if (manager.onePress && manager.zeroPress) {
            manager.moveNum = manager.add.tween(manager.endNumber).to({
                x: 565
            }, 1000, Phaser.Easing.Linear.None, true);
            manager.endTween = manager.AlphaTweens(manager.logo, 1, 1000);
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
                if (manager.currentScene.name == "voicemailmorning") {
                    manager.baseSound = manager.add.audio("sink");
                    manager.baseSound.play();
                }

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
            case 4:
                break;
            case 5:
                manager.eventSound = manager.add.audio(manager.currentScene.sound[0]);
                manager.currentSound = manager.eventSound;
                break;
        }
        if (manager.currentScene.loop) {
            if (!this.game.device.firefox) {
                manager.baseSound.loopFull();
            }
        }
    },

    IncreaseBlend: function () {
        var manager = this;
        if (manager.greyscale.alpha > 0.1) {
            manager.greyscale.alpha -= 0.05;
        }
    },

    DecreaseBlend: function () {
        var manager = this;
        if (manager.greyscale.alpha < 1) {
            manager.greyscale.alpha += 0.01;
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
        manager.ArrowsandHandsToTop();
    },

    LidCreate: function (tY, bY, blY) {
        var manager = this;
        manager.tLid = manager.add.sprite(0, tY, "toplid");
        manager.bLid = manager.add.sprite(0, bY, "lowerlid");
        // manager.black = manager.add.sprite(0, blY, "black");
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
            case 10:
                manager.yellowSprites[1].visible = false;
                manager.ContinueSwitch();
                break;
            case 11:
                manager.HoldAndSequence();
                break;
            case 12:
                manager.IncreaseEachSequence();
                break;
            case 13:
                manager.HoldAndSwitch();
                break;
            case 14:
                manager.ChangeEach();
                break;
            case 15:
                manager.Delete();
                break;
            case 16:
                manager.Excel();
                break;
            case 17:
                manager.SocMeds();
                break;
            case 18:
                manager.MOM();
                break;
            case 19:
                manager.CantSleep();
                break;
            case 20:
                manager.SpaceOut();
                break;
        }
    },

    MobileCheckSwitch: function (pattern) {
        var manager = this;
        switch (pattern) {
            case 0:
                manager.PinchOut();
                break;
            case 1:
                manager.TieShoes();
                break;
            case 2:
                manager.FingerSwipe();
                break;
            case 3:
                manager.SipCoffee();
                break;
            case 4:
                manager.FridgeLook();
                break;
            case 5:
                manager.ButtonShirt();
                break;
        }
    },

    PinchOut: function () {
        var manager = this;
        manager.myElement = document.getElementById("content");
        manager.hammertime = new Hammer(manager.myElement);
        manager.hammertime.get('pinch').set({
            enable: true
        });
        manager.hammertime.on('pinchout', function (ev) {
            manager.topLidDown = true;
            manager.IncreaseInt();
            manager.IncreaseBlend();
        });

        manager.hammertime.on('pinchend', function (ev) {
            manager.topLidDown = false;
        })
    },

    TieShoes: function () {
        var manager = this;
        var tieShoeSymbolX = [390, 500, 600, 650, 500, 290, 160, 200, 270, 400, 460, 400, 350];
        var tieShoeSymbolY = [150, 200, 300, 400, 500, 500, 400, 300, 200, 300, 360, 430, 350];
        manager.graphics = manager.add.graphics(0, 0);
        manager.graphics.beginFill(0xFF0000, 1);
        for (var i = 0; i < tieShoeSymbolX.length; i++) {
            manager.graphics.drawCircle(tieShoeSymbolX[i], tieShoeSymbolY[i], 30);
        }
        manager.graphics.inputEnabled = true;
        manager.graphics.events.onInputOver.add(manager.onDown, this);
    },

    onDown: function () {
        var manager = this;
        manager.IncreaseInt();
        manager.IncreaseBlend();
        manager.world.bringToTop(manager.graphics);
        console.log("sooooo");
    },

    FingerSwipe: function () {
        var manager = this;
        manager.myElement = document.getElementById("content");
        manager.hammertime = new Hammer(manager.myElement);
        manager.hammertime.get('pan').set({
            direction: Hammer.DIRECTION_UP
        });
        manager.hammertime.on('panup', function (ev) {
            console.log("in event");
            manager.IncreaseInt();
            manager.IncreaseBlend();
        });
    },

    SipCoffee: function () {
        var manager = this;
        gyro.startTracking(function (o) {
            o.alpha;
            if (o.alpha >= 2) {
                console.log(o.alpha);
                manager.IncreaseInt();
                manager.IncreaseBlend();
            }
        });
    },

    FridgeLook: function () {
        var manager = this;
        gyro.startTracking(function (o) {
            o.alpha;
            if (o.alpha >= 2) {
                console.log(o.beta);
                manager.IncreaseInt();
                manager.IncreaseBlend();
            }
        });
    },

    ButtonShirt: function () {
        var manager = this;

    },

    EndCreate: function () {
        var manager = this;
        manager.number = 0;
        manager.LidCreate(-450, 300, 501);
        manager.endNumber = manager.add.sprite(610, 340, 'numbers', 'numbers' + (manager.number + 1) + '0');
        manager.EndBringToTop();
        manager.EndGame(0);
    },

    ArrowsandHandsToTop: function () {
        var manager = this;
        manager.world.bringToTop(manager.greyscale);

        for (var i = 0; i < manager.yellowSprites.length; i++) {
            manager.world.bringToTop(manager.yellowSprites[i]);
        }
        if (manager.letterKeys != null) {
            for (var i = 0; i < manager.letterKeys.length; i++) {
                manager.world.bringToTop(manager.letterKeys[i]);
            }
        }
        if (manager.letter != null) {
            for (var i = 0; i < manager.letter.length; i++) {
                manager.world.bringToTop(manager.letter[i]);
            }
        }
        for (var i = 0; i < manager.ripple.length; i++) {
            manager.world.bringToTop(manager.ripple[i]);
        }
        manager.world.bringToTop(manager.arrows);
        manager.world.bringToTop(manager.keySprites);

    },

    LidsBringToTop: function () {
        var manager = this;
        manager.world.bringToTop(manager.tLid);
        manager.world.bringToTop(manager.bLid);
        //manager.world.bringToTop(manager.black);

    },

    EndBringToTop: function () {
        var manager = this;
        manager.LidsBringToTop();
        manager.world.bringToTop(manager.yellowSprites[0]);
        manager.world.bringToTop(manager.letterKeys[0]);
        manager.world.bringToTop(manager.endNumber);
    },

    EndGame: function (number) {
        var manager = this;
        manager.keySet[number].onDown.add(function () {
            manager.IncreaseInt();
            manager.IncreaseBlend();
            manager.EndBringToTop();
            manager.AlphaTweens(manager.endNumber, 0, 200);
            manager.AlphaTweens(manager.yellowSprites[0], 0, 200);
            console.log("called end game");
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
        manager.IncreaseBlend();
        manager.EndBringToTop();
        manager.keySet[manager.number].reset();
        manager.number += 1;
        manager.AlphaTweens(manager.endNumber, 1, 200);
        manager.AlphaTweens(manager.yellowSprites[0], 1, 200);
        manager.endNumber.frame += 3;
        if (manager.number < 9) {
            manager.EndGame(manager.number);
        } else {
            manager.yellowSprites[0].alpha = 1;
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
        manager.time.events.add(Phaser.Timer.SECOND * 3, manager.NextScene, this);
        manager.logo = manager.add.sprite(860, 340, 'logo', 'logo_0000_Layer-3.png');
        var cropRect = new Phaser.Rectangle(0, 0, -550, manager.logo.height);
        manager.logo.alpha = 0;
        manager.logo.scale.x = .5;
        manager.logo.scale.y = .5;
        manager.logo.crop(cropRect);
    },

    FinalLetterCreate: function () {
        var manager = this;
        manager.finalOne = manager.add.sprite(540, 340, 'numbers', 'numbers10');
        manager.letterKeys[1] = manager.add.sprite(500, 330, "qw", "qwkey0");
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

    TapDifferent: function () {
        var manager = this;
        manager.keySet[0].onDown.add(function () {
            if (manager.flashOne != null) {
                manager.time.events.remove(manager.flashOne);
                manager.time.events.remove(manager.flashTwo);
                manager.yellowSprites[0].visible = false;
                manager.yellowSprites[1].visible = false;
            }
            manager.IncreateOneInt(manager.currentScene.name1);
            manager.ArrowsandHandsToTop();
            manager.IncreaseBlend();
            manager.notPressed = false;
        });
        manager.keySet[0].onUp.add(function () {
            manager.time.events.add(Phaser.Timer.SECOND / 20, manager.SetPressedFalse, this);
        });
        manager.keySet[1].onDown.add(function () {
            manager.IncreateOneInt(manager.currentScene.name2);
            manager.ArrowsandHandsToTop();
            manager.IncreaseBlend();
            manager.notPressed = false;
        });
        manager.keySet[1].onUp.add(function () {
            manager.time.events.add(Phaser.Timer.SECOND / 20, manager.SetPressedFalse, this);
        });
        manager.yellowSprites[1].visible = false;
        manager.currentKey = 0;
        manager.notPressed = true;
        manager.flashOne = manager.time.events.loop(Phaser.Timer.SECOND / 5, manager.FlashYellowBGOne, this);
        manager.flashTwo = manager.time.events.loop(Phaser.Timer.SECOND / 5, manager.FlashYellowBGTwo, this);
    },

    SetPressedFalse: function () {
        var manager = this;
        if (!manager.notPressed) {
            manager.notPressed = true;
        }
    },

    FlashYellowBGOne: function () {
        var manager = this;
        manager.FlashYellowBackgroun(0);
        if (manager.notPressed) {
            manager.IncreaseInt();
            manager.IncreaseBlend();
        }
    },

    FlashYellowBGTwo: function () {
        var manager = this;
        manager.FlashYellowBackgroun(1);

    },


    FlashYellowBackgroun: function (num) {
        var manager = this;
        if (manager.currentKey == num) {
            if (manager.yellowSprites[num].visible) {
                manager.yellowSprites[num].visible = false;
            } else if (!manager.yellowSprites[num].visible) {
                manager.yellowSprites[num].visible = true;
            }
        } else {
            manager.yellowSprites[num].visible = false;
        }
    },

    ContinueSwitch: function () {
        var manager = this;
        manager.keySet[0].onDown.add(function () {
            manager.HoldKeysFeedback(0);
            manager.keysPressed[0] = true;
            manager.keysPressed[1] = true;
        });
        manager.keySet[0].onUp.add(function () {
            manager.add.tween(manager.yellowSprites[0]).to({
                alpha: 1,
            }, 1000, Phaser.Easing.Linear.None, true);
            manager.yellowSprites[0].scale.x = 1;
            manager.yellowSprites[0].scale.y = 1;
            manager.keysPressed[0] = false;
            manager.keysPressed[1] = false;
        });
    },

    IncreateOneInt: function (sheet) {
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
                        manager.currentSet.push(manager.add.sprite(0, 0, sheet + "-" + manager.sheetNum, sheet + manager.sheetNum + manager.spriteNum));
                        manager.rndSheet.push(manager.currentScene.name + "-" + manager.sheetNum);
                    }
                } else {
                    if (manager.sheetNum <= manager.currentScene.sheets) {
                        manager.spriteNum += 1;
                        manager.currentSet.push(manager.add.sprite(0, 0, sheet + "-" + manager.sheetNum, sheet + manager.sheetNum + manager.spriteNum));
                        manager.rndSheet.push(manager.currentScene.name + "-" + manager.sheetNum);
                    }
                }
            }
        }
        manager.ArrowsandHandsToTop();
    },

    SocMeds: function () {
        var manager = this;
        manager.screen = manager.add.sprite(150, 0, "socialmedia-0", 0);
        manager.world.sendToBack(manager.screen);
        manager.CreateClicks();
        manager.keySet[0].onDown.add(function () {
            manager.oneClick.play();
            if (manager.screen.frame < 8) {
                manager.screen.frame += 1;
            }
        });
        manager.YellowKeyFlashOne();
    },

    CreateClicks: function () {
        var manager = this;
        manager.oneClick = manager.add.audio('oneClick');
        manager.twoClick = manager.add.audio('twoClick');
        manager.threeClick = manager.add.audio('threeClick');
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
        manager.hasPasted = false;
        manager.world.sendToBack(manager.insidePic);
        for (var i = 0; i < manager.currentSet.length; i++) {
            manager.world.sendToBack(manager.currentSet[i]);
        }
        manager.world.bringToTop(manager.spaceYellow);
        manager.world.bringToTop(manager.spaceOutline);
        manager.world.bringToTop(manager.spaceKey);

        manager.currentSound = manager.add.audio(manager.currentScene.sound);
        manager.keySet[0].onDown.add(function () {
            manager.pressedSpace = true;
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
    },

    MOM: function (num) {
        var manager = this;
        manager.gameReady = false;
        manager.currentSound = manager.add.audio(manager.currentScene.sound);
        manager.yellowSprites[1].visible = false;
        manager.yellowSprites[2].visible = false;
        manager.time.events.repeat(Phaser.Timer.SECOND / 5, 4, manager.MOMAutoPlay, this);
        manager.keySet[0].onDown.add(function () {
            if (!manager.keysPressed[0]) {
                manager.MOMThings(0, 1);

                manager.keysPressed[0] = true;
            }
        });
        manager.keySet[1].onDown.add(function () {
            if (manager.keysPressed[0] && !manager.keysPressed[1]) {
                manager.MOMThings(1, 2);

                manager.keysPressed[1] = true;
            }
        });
        manager.keySet[2].onDown.add(function () {
            if (manager.keysPressed[1]) {
                if (!manager.keysPressed[2]) {
                    manager.IncreaseInt();
                    manager.IncreaseBlend();
                    manager.currentSound.play();
                    manager.yellowSprites[2].visible = false;
                    manager.keysPressed[2] = true;
                    manager.callNow = manager.add.audio("shortCall");
                    manager.callNow.play();
                    manager.ResetKeyboard();
                }
            }
        });
    },

    MOMThings: function (offSprite, onSprite) {
        var manager = this;
        manager.IncreaseInt();
        manager.IncreaseBlend();

        manager.currentSound.play();
        manager.yellowSprites[offSprite].visible = false;
        manager.yellowSprites[onSprite].visible = true;
    },

    MOMAutoPlay: function () {
        var manager = this;
        manager.IncreaseInt();
        manager.IncreaseBlend();
    },

    Excel: function () {
        var manager = this;
        manager.gameReady = false;
        manager.insidePic = manager.add.sprite(150, 0, manager.currentScene.insidePicSheet, manager.currentScene.insidePicSprite);
        manager.hasPasted = false;
        manager.cursor = manager.add.sprite(280, 80, "compmaterials", "excelcursor");
        manager.excelText = [];

        manager.CreateClicks();
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
                manager.threeClick.play();
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
        manager.world.sendToBack(manager.excelText);
        manager.world.sendToBack(manager.cursor);
        manager.world.sendToBack(manager.insidePic);
    },

    HoldAndSwitch: function () {
        var manager = this;
        manager.letPress = true;
        manager.shiftPress = false;
        manager.keySet[0].onDown.add(function () {
            if (manager.letPress) {
                manager.HoldKeysFeedback(0);
                for (var i = 0; i < manager.keysPressed.length; i++) {
                    manager.keysPressed[i] = true;
                }
            }
        });
        manager.keySet[0].onUp.add(function () {
            for (var i = 0; i < manager.keysPressed.length; i++) {
                manager.HoldKeyUp(0);
                manager.keysPressed[i] = false;
            }
        });
        manager.keySet[1].onDown.add(function () {
            if (manager.shiftPress) {
                manager.currentSound.stop();
                manager.currentScene.sound.shift();
                manager.currentSound = manager.add.audio(manager.currentScene.sound[0]);
                manager.currentSound.play();
                manager.IncreaseInt();
                manager.IncreaseBlend();
                manager.keySet.shift();
                manager.keySet.shift();
                manager.shiftLetter.visible = false;
                manager.shiftLetterYellow.visible = false;
                manager.shiftLetterKey.visible = false;
                manager.ArrowsandKeysVisible();
                manager.yellowSprites[0].visible = true;
                manager.letPress = true;
                manager.shiftPress = false;
            }
        });
    },

    ArrowsandKeysVisible: function () {
        var manager = this;
        manager.keySprites.visible = true;
        manager.arrows.visible = true;
    },

    ChangeEach: function () {
        var manager = this;
        manager.gameReady = false;
        manager.keySet[1].onDown.add(function () {
            if (!manager.keysPressed[0]) {

                manager.ChangeEachMoveYellow(1, 1);
            }
            manager.keysPressed[0] = true;
        });
        manager.keySet[2].onDown.add(function () {
            if (!manager.keysPressed[1]) {

                manager.ChangeEachMoveYellow(1, 2);
            }
            if (manager.keysPressed[0]) {
                manager.keysPressed[1] = true;
            }
        });
        manager.keySet[3].onDown.add(function () {
            if (!manager.keysPressed[2]) {

                manager.ChangeEachMoveYellow(1, 3);
            }
            if (manager.keysPressed[1]) {
                manager.keysPressed[2] = true;
            }
        });
        manager.keySet[4].onDown.add(function () {
            if (!manager.keysPressed[3]) {

                manager.ChangeEachMoveYellow(1, 4);
            }
            if (manager.keysPressed[2]) {
                manager.keysPressed[3] = true;
            }
        });
        manager.keySet[5].onDown.add(function () {
            if (!manager.keysPressed[4]) {


                manager.ChangeEachMoveYellow(1, 5);
            }
            if (manager.keysPressed[3]) {
                manager.keysPressed[4] = true;
            }
        });
        manager.keySet[6].onDown.add(function () {
            if (!manager.keysPressed[5]) {
                for (var i = 1; i < manager.letterKeys.length; i++) {
                    manager.letter[i].visible = false;
                    manager.letterKeys[i].visible = false;
                }
                manager.letter[6].visible = false;
                manager.ArrowsandKeysVisible();
                manager.CreateAllSpritesETC(1, 630, 445, 800, 600, 45);

                manager.IncreaseInt();
                manager.IncreaseBlend();
            }
            if (manager.keysPressed[4]) {
                manager.keysPressed[5] = true;
            }
        });
        manager.keySet[0].onDown.add(function () {
            if (manager.keysPressed[5]) {
                manager.HoldKeysFeedback(1);
                manager.keysPressed[6] = true;
                manager.gameReady = true;
            }
        })
        manager.keySet[0].onUp.add(function () {
            manager.HoldKeyUp(1);
        })
    },

    ChangeEachMoveYellow: function (spriteNum, posNum) {
        var manager = this;
        manager.IncreaseInt();
        manager.IncreaseBlend();

        manager.yellowSprites[spriteNum].position.x = manager.bottleXPos[posNum] + 35;
        manager.yellowSprites[spriteNum].position.y = manager.bottleYPos[posNum] + 30;
    },

    IncreaseEachSequence: function () {
        var manager = this;
        manager.gameReady = false;
        manager.increaseYellowNum = 0;
        for (var i = 0; i < 4; i++) {
            manager.yellowSprites[i].visible = false;
        }
        manager.keySet[0].onDown.add(function () {
            manager.keysPressed[0] = true;
            if (!manager.keysPressed[1]) {
                if (manager.increaseEachYellowTime != null) {
                    manager.time.events.remove(manager.increaseEachYellowTime);
                    manager.SwipeThingsVisibilities(0, 2, 1);
                }
                if (manager.upInt <= manager.currentScene.switchInt) {
                    manager.IncreaseInt();
                    manager.IncreaseBlend();
                }
            }
        })
        manager.keySet[1].onDown.add(function () {
            manager.keysPressed[1] = true;
            if (manager.keysPressed[0]) {
                if (manager.upInt <= manager.currentScene.switchInt) {
                    manager.SwipeThingsVisibilities(0, 1, 2);
                    manager.IncreaseInt();
                    manager.IncreaseBlend();
                }
            }
        })
        manager.keySet[2].onDown.add(function () {
            manager.keysPressed[2] = true;
            if (manager.keysPressed[1]) {
                if (manager.upInt <= manager.currentScene.switchInt) {
                    manager.IncreaseInt();
                    manager.IncreaseBlend();

                    manager.SwipeThingsVisibilities(1, 2, 0);
                }
                for (var i = 0; i < manager.keysPressed.length; i++) {
                    manager.keysPressed[i] = false;
                }
            }
        })
        manager.increaseEachYellowTime = manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.IncreaseEachPreTouch, this);
    },

    IncreaseEachPreTouch: function () {
        var manager = this;
        if (manager.increaseYellowNum >= 2) {
            manager.increaseYellowNum = 0;
        } else {
            manager.increaseYellowNum += 1;
        }
        manager.yellowSprites[manager.increaseYellowNum].visible = false;
        if (manager.increaseYellowNum == 2) {
            manager.yellowSprites[0].visible = true;
        } else {
            manager.yellowSprites[manager.increaseYellowNum + 1].visible = true;
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

                if (manager.upInt >= 10) {
                    if (manager.upInt > 20) {
                        manager.BlanketOver();
                    } else {
                        manager.CantSleepIncreaseInt();
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

    HoldAndSequence: function () {
        var manager = this;
        manager.gameReady = false;
        manager.keySet[0].onDown.add(function () {
            manager.keysPressed[0] = true;
            manager.HoldKeysFeedback(0);
        });
        manager.keySet[0].onUp.add(function () {
            manager.keysPressed[0] = false;
            manager.HoldKeyUp(0);
        });
        manager.keySet[1].onDown.add(function () {
            if (manager.keysPressed[0]) {

                manager.ChangeEachMoveYellow(1, 1);
                manager.keysPressed[1] = true;
            }
        });
        manager.keySet[2].onDown.add(function () {
            if (manager.keysPressed[0]) {
                if (manager.keysPressed[1]) {
                    manager.yellowSprites[1].position.x = manager.bottleXPos[2] + 35;
                    manager.yellowSprites[1].position.y = manager.bottleYPos[2] + 30;
                    manager.keysPressed[2] = true;
                }
            }
        });
        manager.keySet[3].onDown.add(function () {
            if (manager.keysPressed[0]) {
                if (manager.keysPressed[2]) {


                    manager.ChangeEachMoveYellow(1, 3);
                    manager.keysPressed[3] = true;
                }
            }
        });
        manager.keySet[4].onDown.add(function () {
            if (manager.keysPressed[0]) {
                if (manager.keysPressed[3]) {
                    manager.yellowSprites[1].position.x = manager.bottleXPos[4] + 35;
                    manager.yellowSprites[1].position.y = manager.bottleYPos[4] + 30;
                    manager.keysPressed[4] = true;
                }
            }
        });
        manager.keySet[5].onDown.add(function () {
            if (manager.keysPressed[0]) {
                if (manager.keysPressed[4]) {
                    manager.yellowSprites[1].position.x = manager.bottleXPos[5] + 35;
                    manager.yellowSprites[1].position.y = manager.bottleYPos[5] + 30;
                    manager.keysPressed[5] = true;
                }
            }
        });
        manager.keySet[6].onDown.add(function () {
            if (manager.keysPressed[0]) {
                for (var j = 1; j < manager.keysPressed.length; j++) {
                    manager.keysPressed[j] = false;
                }
                manager.ChangeEachMoveYellow(1, 0);
            }
        });
    },

    ManyKeySequence: function () {
        var manager = this;
        manager.keysPressed[0] = false;
        manager.keySet[manager.ManyKeyInt].onDown.add(function () {
            manager.IncreaseInt();
            manager.IncreaseBlend();
            manager.keysPressed[0] = true;
            manager.yellowSprites[manager.ManyKeyInt].visible = false;
            manager.yellowSprites[manager.ManyKeyInt + 1].visible = true;
        });
        var nextKey = manager.ManyKeyInt + 1;
        manager.keySet[nextKey].onDown.add(function () {
            if (manager.keysPressed[0]) {
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
        manager.keySet[0].onDown.add(function () {
            manager.HoldKeyPress(0);
            manager.HoldKeysFeedback(0);
            if (manager.currentScene.name == "pill") {
                manager.HoldKeyPress(1);
                manager.HoldKeysFeedback(1);
            }
        });
        manager.keySet[0].onUp.add(function () {
            manager.HoldKeyUp(0);
            if (manager.currentScene.name == "pill") {
                manager.HoldKeyUp(1);
            }
        });
        if (manager.keySet[1] != null) {
            manager.keySet[1].onDown.add(function () {
                manager.HoldKeysFeedback(1);
                manager.HoldKeyPress(1);
            });
            manager.keySet[1].onUp.add(function () {
                manager.HoldKeyUp(1);
            });
        }
        if (manager.keySet[2] != null) {
            manager.keySet[2].onDown.add(function () {
                manager.HoldKeysFeedback(2);
                manager.correct.HoldKeyPress(2);
            });
            manager.keySet[2].onUp.add(function () {
                manager.HoldKeyUp(2);
            });
        }
        if (manager.keySet[3] != null) {
            manager.keySet[3].onDown.add(function () {
                manager.HoldKeysFeedback(3);
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
        manager.add.tween(manager.yellowSprites[num]).to({
            alpha: .5,
        }, 1000, Phaser.Easing.Linear.None, true);
        if (manager.ripple[num] != null) {
            manager.ripple[num].visible = true;
            manager.ripple[num].position.x = manager.yellowSprites[num].position.x;
            manager.ripple[num].position.y = manager.yellowSprites[num].position.y;
        } else {
            manager.ripple[num] = manager.add.sprite(manager.yellowSprites[num].position.x, manager.yellowSprites[num].position.y, 'newkeys', 14);
            manager.ripple[num].anchor.setTo(0.5, 0.5);
        }
        manager.time.events.repeat(Phaser.Timer.SECOND / 8, 4, manager.RippleAnim, this, num);
    },

    RippleAnim: function (num) {
        var manager = this;
        manager.ripple[num].frame += 1;
        if (manager.ripple[num].frame == 18) {
            manager.ripple[num].frame = 14;
            manager.ripple[num].visible = false;
        }
    },

    Delete: function () {
        var manager = this;
        manager.gameReady = false;
        manager.CreateClicks();
        manager.underPic = manager.add.sprite(150, 0, "plainScreen");
        manager.insidePic = manager.add.sprite(150, 0, manager.currentScene.insidePicSheet, manager.currentScene.insidePicSprite);
        manager.world.sendToBack(manager.insidePic);
        manager.world.sendToBack(manager.underPic);
        manager.deleteKey.onDown.add(function () {
            manager.threeClick.play();
            manager.insidePic.visible = false;
        });
    },

    HoldKeyPress: function (num) {
        var manager = this;
        manager.keysPressed[num] = true;
        manager.YellowKeyInput(num);
        manager.add.tween(manager.yellowSprites[num]).to({
            alpha: .5,
        }, 1000, Phaser.Easing.Linear.None, true);
        manager.yellowSprites[num].visible = true;
    },

    HoldKeyUp: function (num) {
        var manager = this;
        manager.YellowKeyUp(num);
        manager.keysPressed[num] = false;
        manager.add.tween(manager.yellowSprites[num]).to({
            alpha: 1,
        }, 1000, Phaser.Easing.Linear.None, true);
        manager.yellowSprites[num].scale.x = 1;
        manager.yellowSprites[num].scale.y = 1;
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
        manager.YellowKeyUp(num);
        manager.SetKeysPressedFalse();
    },

    Swipe: function () {
        var manager = this;
        manager.swipeYellowNum = 3;
        manager.gameReady = false;
        manager.currentlyPressed = [];
        for (var i = 0; i < manager.keySet.length; i++) {
            manager.currentlyPressed[i] = false;
        }
        manager.keySet[0].onDown.add(function () {
            if (manager.swipeYellowTime != null) {
                manager.time.events.remove(manager.swipeYellowTime);
                manager.ArrowsandHandsToTop();

                manager.yellowSprites[2].visible = false;
                manager.yellowSprites[0].visible = false;
            }
            if (!manager.keysPressed[0]) {
                manager.yellowSprites[2].visible = false;
                manager.ArrowsandHandsToTop();
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
                manager.SwipeThingsVisibilities(2, 1, 0);
                manager.keysPressed[1] = true;
                manager.IncreaseInt();
                manager.IncreaseBlend();
                manager.ArrowsandHandsToTop();
            }
        }, this);
        manager.keySet[1].onUp.add(function () {
            manager.currentlyPressed[1] = false;
        }, this);
        manager.keySet[2].onDown.add(function () {
            manager.currentlyPressed[2] = true;
            if (manager.keysPressed[1]) {
                manager.keysPressed[0] = false;
                manager.SwipeThingsVisibilities(1, 0, 2);
                manager.IncreaseInt();
                manager.IncreaseBlend();
                manager.ArrowsandHandsToTop();
            }
        }, this);
        manager.keySet[2].onUp.add(function () {
            manager.currentlyPressed[2] = false;
        }, this);
        manager.SwipeThingsVisibilities(0, 1, 2);
        manager.swipeYellowTime = manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.SwipePreTouch, this);
    },

    SwipeThingsVisibilities: function (offSprite1, offSprite2, onSprite) {
        var manager = this;
        manager.yellowSprites[offSprite1].visible = false;
        manager.yellowSprites[offSprite2].visible = false;
        manager.yellowSprites[onSprite].visible = true;
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
        for (var i = 1; i < manager.keySet.length; i++) {
            manager.yellowSprites[i].visible = false;
        }
        manager.keySet[0].onDown.add(function () {
            manager.HoldKeysFeedback(0);
            manager.keysPressed[0] = true;
        });
        manager.keySet[0].onUp.add(function () {
            manager.HoldKeyUp(0);
            manager.keysPressed[0] = false;
        });
        manager.keySet[1].onDown.add(function () {
            manager.HoldKeysFeedback(1);
            manager.keysPressed[1] = true;
        });
        manager.keySet[1].onUp.add(function () {
            manager.HoldKeyUp(1);
            manager.keysPressed[1] = false;
        });
    },

    RestartCheck: function () {
        var manager = this;
        if (manager.currentScene.restart) {
            manager.sheetNum = 0;
            manager.spriteNum = 0;
            manager.gameReady = true;
        } else {
            if (!manager.currentScene.decrease) {
                manager.ResetKeyboard();
                for (var i = 0; i < manager.yellowSprites.length; i++) {
                    var thisTween = manager.AlphaTweens(manager.yellowSprites[i], 0, 1000);
                    manager.yellowSprites[i].visible = false;
                }
                for (var i = 0; i < manager.ripple.length; i++) {
                    manager.ripple[i].visible = false;
                }
                manager.time.events.remove(manager.StartNextScene);
                manager.time.events.add(Phaser.Timer.SECOND * 2, manager.NextScene, this);
            }
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
                    manager.ResetSpriteNumbers();
                } else {
                    if (manager.sheetNum <= manager.currentScene.sheets) {
                        manager.spriteNum += 1;
                        manager.PushNewSet();
                    }
                }
            }
        }
        manager.ArrowsandHandsToTop();
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
    },

    PushNewSet: function () {
        var manager = this;
        manager.currentSet.push(manager.add.sprite(0, 0, manager.currentScene.name + "-" + manager.sheetNum, manager.spriteNum));
        manager.rndSheet.push(manager.currentScene.name + "-" + manager.sheetNum);
        manager.ArrowsandHandsToTop();

    },

    ResetSpriteNumbers: function () {
        var manager = this;
        manager.sheetNum += 1;
        manager.spriteNum = 0;
        if (manager.sheetNum >= manager.currentScene.sheets) {
            manager.gameReady = false;
            manager.RestartCheck();
        } else {
            manager.PushNewSet();
        }
    },

    NoInput: function () {
        var manager = this;
        manager.upInt += 1;
        if (manager.upInt != 0) {
            if (manager.upInt % manager.sceneSpeed == 0) {
                if (manager.spriteNum >= 3) {
                    manager.ResetSpriteNumbers();
                } else {
                    if (manager.sheetNum <= manager.currentScene.sheets) {
                        manager.spriteNum += 1;
                        manager.PushNewSet();
                    }
                }
            }
        }
        manager.ArrowsandHandsToTop();
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
                    manager.PushNewSet();

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
        manager.ArrowsandHandsToTop();
    },

    IncreaseInt: function () {
        var manager = this;
        manager.upInt += 1;
        if (manager.currentScene.name != "computerframe") {
            if (manager.currentScene.soundType == 2) {
                if (manager.upInt == manager.currentScene.soundFrame) {
                    manager.MidSoundManager();
                }
            }
            if (manager.currentScene.soundType == 5) {
                if (manager.upInt % manager.currentScene.soundMult == 0) {
                    manager.eventSound.play();
                }
            }
            if (manager.upInt != 0) {
                if (manager.upInt % manager.sceneSpeed == 0) {
                    if (manager.spriteNum >= 3) {
                        manager.ResetSpriteNumbers();
                    } else {
                        if (manager.sheetNum < manager.currentScene.sheets) {
                            manager.spriteNum += 1;
                            if (manager.currentScene.name + "-" + manager.sheetNum != null) {
                                manager.PushNewSet();
                            }
                        }
                    }


                }
            }
        }
        manager.ArrowsandHandsToTop();
    },

    CantSleepIncreaseInt: function () {
        var manager = this;
        manager.upInt += 1;
        var beRand = manager.rnd.integerInRange(0, 1);
        if (beRand == 1) {
            var nextSet = manager.rnd.integerInRange(0, manager.rndSheet.length);
            manager.CantSleepRnd = manager.add.sprite(0, 0, manager.rndSheet[nextSet], 0);
        } else {
            if (manager.currentScene.name != "computerframeplain") {
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
                                manager.currentSet.push(manager.add.sprite(0, 0, manager.currentScene.name + "-" + manager.sheetNum, manager.spriteNum));
                            }
                        } else {
                            if (manager.sheetNum <= manager.currentScene.sheets) {
                                manager.spriteNum += 1;
                                manager.currentSet.push(manager.add.sprite(0, 0, manager.currentScene.name + "-" + manager.sheetNum, manager.spriteNum));
                            }
                        }

                    }
                }
            }
        }
        manager.ArrowsandHandsToTop();
    }


};
