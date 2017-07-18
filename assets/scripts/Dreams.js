SceneGame.Dreams = function (game) {
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

SceneGame.Dreams.prototype = {

    create: function () {
        var dreams = this;
        dreams.scenesJSON = dreams.cache.getJSON("dreamScenes");

        dreams.CreateVariables();
        for (var i = 0; i < dreams.scenesJSON.Scenes.length; i++) {
            if (dreams.scenesJSON.Scenes[i].time == "morning") {
                dreams.preloadedSets.push(dreams.scenesJSON.Scenes[i].name);
            } else if (dreams.scenesJSON.Scenes[i].time == "start") {
                dreams.currentScene = dreams.scenesJSON.Scenes[i];
            } else {
                dreams.unloadedSets.push(dreams.scenesJSON.Scenes[i].name);
            }
        }
        dreams.CreatePausedStuff();
        dreams.InitCreateHands();

    },

    CreatePausedStuff: function () {
        var dreams = this;
        dreams.paused = dreams.add.sprite(dreams.world.centerX, 200, "paused", "paused00");
        dreams.paused.anchor.setTo(0.5, 0.5);
        dreams.paused.visible = false;
        dreams.game.onBlur.add(function () {
            dreams.paused.visible = true;
            dreams.world.bringToTop(dreams.paused);
        }, this);
        dreams.game.onFocus.add(function () {
            dreams.paused.visible = false;
        }, this);
    },

    CreateVariables: function () {
        var dreams = this;
        dreams.preloadedSets = [];
        dreams.unloadedSets = [];
        dreams.currentSet = [];
        dreams.letterSpriteFrame = 1;
        dreams.buttonPressFrame = [];
        dreams.buttonPressFrameSets = [];
        dreams.handimation = [];
        dreams.letter = [];
        dreams.letterFrame = [];
        dreams.hasLetters = false;
    },

    CreateKeySprite: function () {
        var dreams = this;
        if (dreams.currentScene.name == "treez") {
            for (var i = 0; i < dreams.currentScene.keySet.length; i++) {
                dreams.CreateYellowBG(dreams.currentScene.keySet[i], i);
            }
        } else {
            for (var i = 0; i < dreams.currentScene.keySet.length; i++) {
                dreams.CreateYellowBG(dreams.currentScene.keySet[i], i);
            }
        }
    },

    CreateYellowBG: function (keyName, num) {
        var dreams = this;
        switch (keyName) {
            case "dreams.cursors.up":
                console.log("up");
                dreams.CreateAllSpritesETC(num, 850, 200, 20);
                break;
            case "dreams.cursors.down":
                console.log("down");
                dreams.CreateAllSpritesETC(num, 700, 200, 60);
                if (dreams.hands[num] != null) {
                    dreams.hands[num].scale.y = -1;
                }
                break;
            case "dreams.cursors.right":
                dreams.CreateAllSpritesETC(num, 900, 200, 0);
                break;
            case "dreams.cursors.left":
                dreams.CreateAllSpritesETC(num, 340, 200, 150);
                if (dreams.hands[num] != null) {
                    dreams.hands[num].scale.y = -1;
                }
                break;
        }
    },

    InitCreateHands: function () {
        var dreams = this;
        dreams.hands = [];
        for (var i = 0; i < 4; i++) {
            dreams.hands.push(dreams.add.sprite(-100, -100, "singleHand", "hand0"));
            dreams.hands[i].anchor.setTo(0.5, 0.5);
            dreams.handimation.push(dreams.hands[i].animations.add("twitch"));
            dreams.hands[i].visible = false;
        }
        dreams.PhotoLoader();
    },


    CreateAllSpritesETC: function (num, handX, handY, handRot) {
        var dreams = this;
        dreams.PlaceHands(num, handX, handY, handRot);
        if (dreams.currentScene.hands == 1) {
            for (var i = 1; i < dreams.hands.length; i++) {
                dreams.hands[i].visible = false;
            }
        }
    },

    PlaceHands: function (num, posX, posY, rot) {
        var dreams = this;
        dreams.hands[num].visible = true;
        dreams.hands[num].position.x = posX;
        dreams.hands[num].position.y = posY;
        dreams.handimation[num].play(10, true);
        dreams.hands[num].angle += rot;
    },

    RotateSpriteOutline: function (frameNumber, endFrame, startFrame) {
        var dreams = this;
        if (frameNumber == endFrame) {
            frameNumber = startFrame;
        } else {
            frameNumber += 1;
        }
    },

    PhotoLoader: function () {
        var dreams = this;
        dreams.sceneSpeed = dreams.currentScene.speed;
        if (dreams.unloadedSets.length != 0) {
            var nextSet = dreams.unloadedSets.pop();
            dreams.preloadedSets.push(nextSet);
            for (var i = 0; i < dreams.scenesJSON.Scenes.length; i++) {
                if (dreams.scenesJSON.Scenes[i].name == nextSet) {
                    var sheetNum = dreams.scenesJSON.Scenes[i].sheets;
                    for (var j = 0; j < sheetNum; j++) {
                        this.load.atlasJSONArray(dreams.scenesJSON.Scenes[i].name + "-" + j, "assets/textures/" + dreams.scenesJSON.Scenes[i].name + "-" + j + ".png", "assets/textures/" + dreams.scenesJSON.Scenes[i].name + "-" + j + ".json");
                        for (var k = 0; k < this.scenesJSON.Scenes[i].sound.length; k++) {
                            this.load.audio(this.scenesJSON.Scenes[i].sound[k], "assets/sound/" + this.scenesJSON.Scenes[i].sound[k]);
                        }
                    }
                }
            }
            dreams.load.start();
        }
        dreams.PhotoCreate();
    },

    PhotoCreate: function () {
        var dreams = this;
        dreams.currentSet.push(dreams.add.sprite(0, 280, dreams.currentScene.name + "-" + "0", dreams.currentScene.name + "00"));

        dreams.upInt = 0;
        dreams.sheetNum = 0;
        dreams.spriteNum = 0;
        dreams.gameReady = true;
        dreams.CreateKeySprite();
        dreams.KeyCheckSwitch(dreams.currentScene.pattern);
        if (dreams.currentScene.name != "sleep") {
            //dreams.time.events.add(Phaser.Timer.SECOND * 10, dreams.NextScene, this);
        }
        if (dreams.currentScene.startframe != null) {
            dreams.startFrame = dreams.add.sprite(0, 0, dreams.currentScene.startframe);
            for (var i = 0; i < dreams.hands.length; i++) {
                dreams.world.bringToTop(dreams.hands[i]);
            }
        }
    },

    NextScene: function () {
        var dreams = this;
        dreams.RemoveEverything();
        if (dreams.preloadedSets.length != 0) {
            var nextSet = dreams.preloadedSets.shift();
            for (var i = 0; i < this.scenesJSON.Scenes.length; i++) {
                if (this.scenesJSON.Scenes[i].name == nextSet) {
                    dreams.currentScene = dreams.scenesJSON.Scenes[i];
                    dreams.switchSound = null;
                    dreams.currentSound = null;
                    dreams.TempSounddreams();
                    dreams.PhotoLoader();
                    if (dreams.currentScene.name == "coffee") {
                        dreams.music = dreams.add.audio('music');
                        dreams.music.volume = .3;
                        dreams.music.play();
                    }
                    if (dreams.currentScene.name == "subway") {
                        dreams.music.stop();
                    }
                    break;
                }
            }

        }
    },

    RemoveEverything: function () {
        var dreams = this;
        if (dreams.currentSound != null) {
            dreams.currentSound.stop();
        }
        for (var i = 0; i < dreams.currentSet.length; i++) {
            dreams.currentSet[i].kill();
        }
        for (var i = 0; i < dreams.hands.length; i++) {
            dreams.hands[i].visible = false;
        }

        dreams.hasLetters = false;
        dreams.time.events.removeAll();
    },

    update: function () {
        var dreams = this;
        if (dreams.eventSoundTime) {
            if (dreams.upInt == dreams.currentScene.soundFrame) {
                dreams.eventSound.play();
                dreams.eventSoundTime = false;
            }
        }

    },

    TempSounddreams: function () {
        var dreams = this;
        dreams.eventSoundTime = false;
        switch (dreams.currentScene.soundType) {
            case 0:
                dreams.baseSound = dreams.add.audio(dreams.currentScene.sound[0]);
                dreams.baseSound.play();
                dreams.currentSound = dreams.baseSound;
                break;
            case 1:
                dreams.eventSound = dreams.add.audio(dreams.currentScene.sound[0]);
                dreams.eventSoundTime = true;
                dreams.currentSound = dreams.eventSound;
                break;
            case 2:
                dreams.baseSound = dreams.add.audio(dreams.currentScene.sound[0]);
                dreams.baseSound.play();
                dreams.switchSound = dreams.add.audio(dreams.currentScene.sound[1]);
                dreams.currentSound = dreams.baseSound;
                break;
            case 3:
                break;
        }
        if (dreams.currentScene.loop) {
            dreams.baseSound.loopFull();
        }
    },
    MidSounddreams: function () {
        var dreams = this;
        if (dreams.switchSound != null) {
            dreams.currentSound.pause();
            dreams.switchSound.play();
            dreams.currentSound = dreams.switchSound;
            dreams.switchSound = null;
        }
    },

    KeyCheckSwitch: function (pattern) {
        var dreams = this;
        switch (pattern) {
            case 4:
                dreams.AnyKey();
                break;
        }
    },



    EndGame: function (number) {
        var dreams = this;
        dreams.keySet[number].onDown.add(function () {
            dreams.IncreaseInt();
            dreams.EndBringToTop();
            if (dreams.number > 7) {
                dreams.AlphaTweens(dreams.tLid, 0, 1000);
                dreams.AlphaTweens(dreams.bLid, 0, 1000);
            } else {
                dreams.YTweens(dreams.tLid, '+50', 1000);
                dreams.YTweens(dreams.bLid, '-50', 1000);
            }
            dreams.time.events.add(Phaser.Timer.SECOND / 10, dreams.EndIncreaseInt, this);
        }, this);
    },

    AlphaTweens: function (sprite, alphaNum, time) {
        var dreams = this;
        dreams.add.tween(sprite).to({
            alpha: alphaNum
        }, time, Phaser.Easing.Linear.None, true);
    },

    YTweens: function (sprite, yNum, time) {
        var dreams = this;
        dreams.endTopTween = dreams.add.tween(sprite).to({
            y: yNum
        }, time, Phaser.Easing.Linear.None, true);
    },

    HoldKeys: function () {
        var dreams = this;
        dreams.keySet[0].onDown.add(function () {
            dreams.HoldKeyPress(0);
        });
        dreams.keySet[0].onUp.add(function () {
            dreams.HoldKeyUp(0);
        });
        if (dreams.keySet[1] != null) {
            dreams.keySet[1].onDown.add(function () {
                dreams.HoldKeyPress(1);
            });
            dreams.keySet[1].onUp.add(function () {
                dreams.HoldKeyUp(1);
            });
        }
        if (dreams.keySet[2] != null) {
            dreams.keySet[2].onDown.add(function () {
                dreams.correct.HoldKeyPress(2);
            });
            dreams.keySet[2].onUp.add(function () {
                dreams.HoldKeyUp(2);
            });
        }
        if (dreams.keySet[3] != null) {
            dreams.keySet[3].onDown.add(function () {
                dreams.HoldKeyPress(3);
            });
            dreams.keySet[3].onUp.add(function () {
                dreams.HoldKeyUp(3);
            });
        }
    },

    HoldKeyPress: function (num) {
        var dreams = this;
        dreams.keysPressed[num] = true;
    },

    HoldKeyUp: function (num) {
        var dreams = this;
        dreams.keysPressed[num] = false;
    },

    AreTrue: function (element, index, array) {
        return element == true;
    },

    MoveHand: function (key) {
        var dreams = this;
        switch (dreams.keySet[key]) {
            case dreams.cursors.left:
                dreams.NewHandPos(620, 810, 60);
                break;
            case dreams.cursors.right:
                dreams.NewHandPos(690, 830, 90);
                break;
            case dreams.cursors.up:
                dreams.NewHandPos(560, 780, 100);
                break;
            case dreams.cursors.down:
                dreams.NewHandPos(610, 830, 90);
                break;
            case dreams.cue:
                dreams.NewHandPos(620, 810, 60);
                break;
            case dreams.doubleEwe:
                dreams.NewHandPos(690, 830, 90);
                break;
        }
    },

    NewHandPos: function (posX, posY, rot) {
        var dreams = this;
        dreams.hands[0].position.x = posX;
        dreams.hands[0].position.y = posY;
        dreams.hands[0].angle = rot;
    },

    RestartCheck: function () {
        var dreams = this;
        if (dreams.currentScene.restart) {
            dreams.sheetNum = 0;
            dreams.spriteNum = 0;
            dreams.gameReady = true;
        }
    },


    AnyKey: function () {
        var dreams = this;
        dreams.gameReady = false;
        dreams.input.keyboard.onDownCallback = function () {
            dreams.IncreaseInt();
        };
    },

    IncreaseInt: function () {
        var dreams = this;
        dreams.upInt += 1;
        if (dreams.currentScene.soundType == 2) {
            if (dreams.upInt == dreams.currentScene.soundFrame) {
                dreams.MidSounddreams();
            }
        }
        if (dreams.upInt != 0) {
            if (dreams.upInt % dreams.sceneSpeed == 0) {
                if (dreams.spriteNum >= 3) {
                    dreams.sheetNum += 1;
                    dreams.spriteNum = 0;
                    if (dreams.sheetNum >= dreams.currentScene.sheets) {
                        dreams.gameReady = false;
                        dreams.RestartCheck();
                        if (dreams.currentScene.restartSheet != null) {
                            dreams.SpecificSheetRestart();
                        }
                    } else {
                        dreams.currentSet.push(dreams.add.sprite(0, 280, dreams.currentScene.name + "-" + dreams.sheetNum, dreams.currentScene.name + dreams.sheetNum + dreams.spriteNum));
                    }
                } else {
                    if (dreams.sheetNum <= dreams.currentScene.sheets) {
                        dreams.spriteNum += 1;
                        dreams.currentSet.push(dreams.add.sprite(0, 280, dreams.currentScene.name + "-" + dreams.sheetNum, dreams.currentScene.name + dreams.sheetNum + dreams.spriteNum));
                    }
                }
                for (var i = 0; i < dreams.hands.length; i++) {
                    dreams.world.bringToTop(dreams.hands[i]);
                }

            }
        }

    }


};
