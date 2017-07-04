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

        manager.muffled = manager.add.audio('muffled');
        manager.muffled.play();
        manager.muffled.loopFull();

        manager.cursors = manager.input.keyboard.createCursorKeys();
        manager.scenesJSON = manager.cache.getJSON('scenes');
        manager.preloadedSets = [];
        manager.unloadedSets = [];
        manager.keySprites;
        manager.keySpriteFrame = 9;
        manager.yellowSprites = [];
        manager.buttonPressFrame = [];
        manager.yellowSpriteFrame = 12;
        manager.buttonPressFrameSets = [];
        manager.pressSprites = [];
        manager.hands = [];
        manager.handimation = [];

        manager.correct = manager.add.audio('correct');

        manager.keyboard = this.game.input.keyboard;

        //seperate init loaded scenes from unloaded ones
        for (var i = 0; i < manager.scenesJSON.Scenes.length; i++) {
            if (manager.scenesJSON.Scenes[i].time == 'morning') {
                manager.preloadedSets.push(manager.scenesJSON.Scenes[i].name);
            } else if (manager.scenesJSON.Scenes[i].time == 'start') {
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
        manager.neverPressed = true;

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
        //load photos, set up the next scene
        manager.PhotoLoader();
    },

    CreateKeySprite: function () {
        var manager = this;
        manager.keySprites = manager.add.sprite(500, 550, 'keys', 'keys-0');
        for (var i = 0; i < manager.currentScene.keySet.length; i++) {
            manager.CreateYellowBG(manager.currentScene.keySet[i], i);
        }
        manager.time.events.loop(Phaser.Timer.SECOND / 7, manager.RotateOutline, this);
    },

    //many of these time events are running on top of one another
    //i need to make this stop - possibly reload the manager script?

    CreateYellowBG: function (keyName, num) {
        var manager = this;
        switch (keyName) {
            case "manager.cursors.up":
                manager.yellowSprites[num] = manager.add.sprite(620, 570, 'keys', 'yellowkeys-' + num);
                manager.yellowSprites[num].anchor.setTo(.5, .5);
                manager.pressSprites[num] = manager.add.sprite(620, 570, 'keys', 'keypress-0');
                manager.pressSprites[num].anchor.setTo(.5, .5);
                manager.pressSprites[num].visible = false;
                manager.PlaceHands(num, 850, 620, 20);
                manager.world.sendToBack(manager.yellowSprites[num]);
                break;
            case "manager.cursors.down":
                manager.yellowSprites[num] = manager.add.sprite(620, 610, 'keys', 'yellowkeys-' + num);
                manager.yellowSprites[num].anchor.setTo(.5, .5);
                manager.pressSprites[num] = manager.add.sprite(620, 610, 'keys', 'keypress-0');
                manager.pressSprites[num].anchor.setTo(.5, .5);
                manager.pressSprites[num].visible = false;
                manager.PlaceHands(num, 700, 820, 60);
                manager.hands[num].scale.y = -1;
                manager.world.sendToBack(manager.yellowSprites[num]);
                break;
            case "manager.cursors.right":
                manager.yellowSprites[num] = manager.add.sprite(700, 610, 'keys', 'yellowkeys-' + num);
                manager.pressSprites[num] = manager.add.sprite(700, 610, 'keys', 'keypress-0');
                manager.pressSprites[num].anchor.setTo(.5, .5);
                manager.pressSprites[num].visible = false;
                manager.yellowSprites[num].anchor.setTo(.5, .5);
                manager.PlaceHands(num, 900, 595, 0);
                manager.world.sendToBack(manager.yellowSprites[num]);
                break;
            case "manager.cursors.left":
                manager.yellowSprites[num] = manager.add.sprite(540, 610, 'keys', 'yellowkeys-' + num);
                manager.pressSprites[num] = manager.add.sprite(540, 610, 'keys', 'keypress-0');
                manager.pressSprites[num].anchor.setTo(.5, .5);
                manager.pressSprites[num].visible = false;
                manager.yellowSprites[num].anchor.setTo(.5, .5);
                manager.PlaceHands(num, 340, 700, 150);
                manager.hands[num].scale.y = -1;
                manager.world.sendToBack(manager.yellowSprites[num]);
                break;
        }
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
        };

        manager.yellowSpriteFrame += 1;
        if (manager.yellowSpriteFrame == 15) {
            manager.yellowSpriteFrame = 12;
        }
    },

    PlaceHands: function (num, posX, posY, rot) {
        var manager = this;
        manager.hands[num] = manager.add.sprite(posX, posY, 'singleHand', 'hand0');
        manager.hands[num].anchor.setTo(.5, .5);
        manager.handimation[num] = manager.hands[num].animations.add('twitch');
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
        //        manager.keySet = [];
        //        console.log(manager.currentScene.keySet)
        //        getKeys.push(eval(manager.currentScene.keySet[0]));
        //        manager.keySet = getKeys;
        //        console.log(manager.keySet);
        //        if (getKeys[0].length >= 2) {
        //            var arrayKey = [];
        //            for (var i = 0; i < getKeys[0].length; i++) {
        //                arrayKey.push(eval(getKeys[0][i]));
        //            }
        //            manager.keySet = arrayKey;
        //        } else {
        //            manager.keySet = getKeys;
        //        }

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
                        this.load.atlasJSONArray(manager.scenesJSON.Scenes[i].name + '-' + j, 'assets/textures/' + manager.scenesJSON.Scenes[i].name + '-' + j + '.png', 'assets/textures/' + manager.scenesJSON.Scenes[i].name + '-' + j + '.json');
                    }
                }
            }
            manager.load.start();

        } else {
            console.log("reached end of array");
        }
        manager.PhotoCreate();


    },

    //creates the actual sprites for the level
    //should perhaps run these in reverse, so that the levels are loading while play is happening
    PhotoCreate: function () {
        var manager = this;

        manager.photo = manager.add.sprite(0, 0, manager.currentScene.name + '-' + '0', manager.currentScene.name + '00');
        manager.keysPressed = [];
        for (var i = 0; i < manager.keySet.length; i++) {
            manager.keysPressed[i] = false;
        }
        manager.upInt = 0;
        manager.sheetNum = 0;
        manager.spriteNum = 0;
        manager.allKeys = false;
        //        if (manager.currentScene.name != "wakephone") {
        manager.CreateKeySprite();
        manager.gameReady = true;
        manager.KeyCheckSwitch(manager.currentScene.pattern);
        manager.time.events.add(Phaser.Timer.SECOND * 10, manager.NextScene, this);
        //        } else if (manager.currentScene.name == "wakephone") {
        //            manager.MorningScenes();
        //        }

    },

    //picks the next scene from the array of already loaded scenes
    NextScene: function () {
        var manager = this;
        manager.cursors.up.reset();
        manager.cursors.down.reset();
        //        for (var i = 0; i < manager.keySet.length; i++) {
        //            manager.keySet[i].destroy();
        //        }
        manager.world.removeAll();
        manager.time.events.removeAll();
        if (manager.preloadedSets.length != 0) {
            //var nextSet = manager.preloadedSets[Math.floor(Math.random() * manager.unloadedSets.length)];
            var nextSet = manager.preloadedSets.shift();
            for (var i = 0; i < this.scenesJSON.Scenes.length; i++) {
                if (this.scenesJSON.Scenes[i].name == nextSet) {
                    manager.currentScene = manager.scenesJSON.Scenes[i];
                    manager.FindKeys();
                    manager.PhotoLoader();
                    break;
                }
            }

        } else {
            console.log("reached end of array");
        }
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
            //                        if (manager.currentScene.name == "wakephone") {
            //                            if (manager.topLidDown) {
            //                                manager.startTween = true;
            //                                manager.mLidTween = manager.add.tween(manager.mLid).to({
            //                                    alpha: 0
            //                                }, 1000, Phaser.Easing.Linear.None, true);
            //                                manager.tLidTween.pause();
            //                                manager.bLidTween.pause();
            //                                manager.world.bringToTop(manager.tLid);
            //                                manager.world.bringToTop(manager.bLid);
            //                                manager.tLid.position.y--;
            //                                manager.bLid.position.y++;
            //                                manager.morningInt++;
            //                            }
            //                            manager.EyelidTweens();
            //                        }

        }

    },

    //    MorningScenes: function () {
    //        var manager = this;
    //        manager.morningInt = 0;
    //        console.log("this");
    //        manager.tLid = manager.add.sprite(0, -100, 'toplid');
    //        manager.bLid = manager.add.sprite(0, 0, 'lowerlid');
    //        manager.mLid = manager.add.sprite(0, 0, 'midlid');
    //        manager.tLidTween = game.add.tween(manager.tLid).to({
    //            y: manager.tLid.position.y - 20
    //        }, 3000, Phaser.Easing.Back.Out, true);
    //        manager.tLidTween.repeat(1000, 1000);
    //        manager.bLidTween = game.add.tween(manager.bLid).to({
    //            y: manager.bLid.position.y + 20
    //        }, 3000, Phaser.Easing.Back.Out, true);
    //        manager.bLidTween.repeat(1000, 1000);
    //        manager.tLidTween.yoyo(true, 1000);
    //        manager.bLidTween.yoyo(true, 1000);
    //        manager.gameReady = false;
    //        manager.cursors.up.onDown.add(function () {
    //            manager.topLidDown = true;
    //        })
    //        manager.cursors.up.onUp.add(function () {
    //            manager.topLidDown = false;
    //        })
    //        manager.cursors.down.onDown.add(function () {
    //            manager.bottomLidDown = true;
    //            if (manager.morningInt == 100) {
    //                manager.muffled.stop();
    //                manager.transtionAlarm = manager.add.audio('transition');
    //                manager.transtionAlarm.play();
    //                manager.transtionAlarm.onStop.add(function () {
    //                    manager.morning = manager.add.audio('morning');
    //                    manager.morning.play();
    //                })
    //                manager.time.events.add(Phaser.Timer.SECOND * 10, manager.NextScene, this);
    //                manager.gameReady = true;
    //            }
    //        })
    //        manager.cursors.down.onUp.add(function () {
    //            manager.bottomLidDown = false;
    //        })
    //    },

    //    EyelidTweens: function () {
    //        var manager = this;
    //        if (!manager.topLidDown) {
    //            if (manager.tLid.position.y < -120 && manager.startTween) {
    //                if (manager.tLid.position.y > -180) {
    //                    manager.tLidReTween = manager.add.tween(manager.tLid).to({
    //                        y: -100
    //                    }, 500, Phaser.Easing.Back.Out, true);
    //                    manager.bLidReTween = manager.add.tween(manager.bLid).to({
    //                        y: 0
    //                    }, 500, Phaser.Easing.Back.Out, true);
    //                    manager.tLidReTween.onComplete.add(function () {
    //                        manager.tLidTween.resume();
    //                        manager.bLidTween.resume();
    //                        manager.startTween = false;
    //                    })
    //                } else {
    //                    manager.tLidTween.stop();
    //                    manager.bLidTween.stop();
    //                    manager.tLidTween = game.add.tween(manager.tLid).to({
    //                        y: manager.tLid.position.y - 20
    //                    }, 3000, Phaser.Easing.Back.Out, true);
    //                    manager.tLidTween.repeat(1000, 1000);
    //                    manager.bLidTween = game.add.tween(manager.bLid).to({
    //                        y: manager.bLid.position.y + 20
    //                    }, 3000, Phaser.Easing.Back.Out, true);
    //                    manager.startTween = false;
    //                }
    //            }
    //        }
    //        if (manager.sheetNum >= manager.currentScene.sheets) {
    //            manager.gameReady = false;
    //        }
    //    },



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
                manager.AnyKey();
                break;
        }
    },

    ////FROM HERE ON I NEED TO FIX AND COMPLETE THIS CODE

    YellowKeyInput: function (num) {
        var manager = this;
        manager.yellowSprites[num].visible = false;
        manager.pressSprites[num].visible = true;
        manager.pressSprites[num].alpha = 1;
        manager.buttonPressFrame[0] = 0
        manager.time.events.repeat(Phaser.Timer.SECOND / 15, 8, function () {
            manager.pressSprites[num].frame = manager.buttonPressFrame[num];
            manager.buttonPressFrame[num] += 1;
            manager.pressSprites[num].alpha -= .15;
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

    //for holding down one+ keys
    HoldKeys: function () {
        var manager = this;
        manager.keySet[0].onDown.add(function () {
            manager.correct.play();
            manager.keysPressed[0] = true;
            manager.YellowKeyInput(0);
        })
        manager.keySet[0].onUp.add(function () {
            manager.YellowKeyUp(0);
            manager.keysPressed[0] = false;
        })
        if (manager.keySet[1] != null) {
            manager.keySet[1].onDown.add(function () {
                manager.correct.play();
                manager.keysPressed[1] = true;
                manager.YellowKeyInput(1);
            })
            manager.keySet[1].onUp.add(function () {
                manager.YellowKeyUp(1);
                manager.keysPressed[1] = false;
            })
        }
        if (manager.keySet[2] != null) {
            manager.keySet[2].onDown.add(function () {
                manager.correct.play();
                manager.keysPressed[2] = true;
                manager.YellowKeyInput(2);
            })
            manager.keySet[2].onUp.add(function () {
                manager.YellowKeyUp(2);
                manager.keysPressed[2] = false;
            })
        }
        if (manager.keySet[3] != null) {
            manager.keySet[3].onDown.add(function () {
                manager.correct.play();
                manager.keysPressed[3] = true;
                manager.YellowKeyInput(3);
            })
            manager.keySet[3].onUp.add(function () {
                manager.YellowKeyUp(3);
                manager.keysPressed[3] = false;
            })
        }
    },

    //move this
    //checks if every bool in an array is true
    AreTrue: function (element, index, array) {
        var manager = this;
        return element == true;
    },

    //for when keys must be pressed in a certain order
    SequentialKeys: function () {
        var manager = this;
        console.log(manager.keySet.length);
        manager.keySet[0].onDown.add(function () {
            manager.correct.play();
            manager.YellowKeyInput(0);
            console.log("up");
            manager.keysPressed[0] = true;
        })
        manager.keySet[1].onDown.add(function () {
            manager.correct.play();
            manager.YellowKeyInput(1);
            if (manager.keysPressed[0]) {
                console.log("left");
                manager.keysPressed[1] = true;
                if (manager.keySet.length == 2) {
                    console.log("why is life");
                    manager.IncreaseInt();
                    manager.keysPressed[1] = false;
                    manager.keysPressed[0] = false;

                }
            }
        })

        if (manager.keySet.length >= 3) {
            manager.keySet[2].onDown.add(function () {
                manager.correct.play();
                manager.YellowKeyInput(2);
                if (manager.keysPressed[1]) {
                    console.log("down");
                    manager.keysPressed[2] = true;
                }
                if (manager.keysPressed[2] && manager.keySet.length == 3) {
                    manager.IncreaseInt();
                    manager.keysPressed[1] = false;
                    manager.keysPressed[0] = false;
                    manager.keysPressed[2] = false;
                }
            })

        }
        if (manager.keySet.length >= 4) {
            manager.keySet[3].onDown.add(function () {
                manager.correct.play();
                manager.YellowKeyInput(3);
                if (manager.keysPressed[2]) {
                    manager.keysPressed[3] = true;
                }
                if (manager.keysPressed[3]) {
                    manager.IncreaseInt();
                    manager.keysPressed[1] = false;
                    manager.keysPressed[0] = false;
                    manager.keysPressed[2] = false;
                    manager.keysPressed[3] = false;
                }
            })

        }
    },

    //for repeatedly tapping a single key
    TapKeys: function () {
        var manager = this;
        manager.tap = manager.keySet[0].onDown.add(manager.IncreaseInt, this);
    },

    //for when you can press any key :p 
    AnyKey: function () {
        var manager = this;
        manager.input.keyboard.onDownCallback = function () {
            manager.IncreaseInt();
        }
    },


    //Int that increases based on input in order to move the photos forward
    IncreaseInt: function () {
        var manager = this;
        manager.upInt += 1;
        if (manager.upInt != 0) {
            if (manager.upInt % manager.sceneSpeed == 0) {
                if (manager.spriteNum >= 3) {
                    manager.sheetNum += 1;
                    manager.spriteNum = 0;
                    if (manager.sheetNum >= manager.currentScene.sheets) {
                        manager.gameReady = false;
                    } else {
                        var tempSprite = manager.add.sprite(0, 0, manager.currentScene.name + '-' + manager.sheetNum, manager.currentScene.name + manager.sheetNum + manager.spriteNum);
                    }
                } else {
                    manager.spriteNum += 1;
                    var tempSprite = manager.add.sprite(0, 0, manager.currentScene.name + '-' + manager.sheetNum, manager.currentScene.name + manager.sheetNum + manager.spriteNum);
                }
                for (var i = 0; i < manager.hands.length; i++) {
                    manager.world.bringToTop(manager.hands[i]);
                }
            }
        }

    }


};
