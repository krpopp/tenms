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
        manager.cursors = manager.input.keyboard.createCursorKeys();
        manager.scenesJSON = manager.cache.getJSON('scenes');
        manager.keySet = [];
        manager.preloadedSets = [];
        manager.unloadedSets = [];
        for (var i = 0; i < manager.scenesJSON.Scenes.length; i++) {
            if (manager.scenesJSON.Scenes[i].time == 'morning') {
                manager.preloadedSets.push(manager.scenesJSON.Scenes[i].name);
            } else if (manager.scenesJSON.Scenes[i].time == 'start') {
                manager.preloadedSets.push(manager.scenesJSON.Scenes[i].name);
                manager.currentScene = manager.scenesJSON.Scenes[i];
                var getSheets = manager.scenesJSON.Scenes[i].sheets;
                var getName = manager.scenesJSON.Scenes[i].name;
                var getKeys = [];
                for (var j = 0; j < manager.scenesJSON.Scenes[i].keySet.length; j++) {
                    var tempVar = eval(manager.scenesJSON.Scenes[i].keySet[j]);
                    getKeys.push(tempVar);
                }
            } else {
                manager.unloadedSets.push(manager.scenesJSON.Scenes[i].name);
            }
        }
        manager.spriteSet = [];
        manager.sheetSet = [];
        manager.sceneSpeed = manager.currentScene.speed;
        manager.keySet = [];

        manager.keySet = getKeys;
        console.log("the create key set is " + manager.keySet);
        manager.PhotoLoader(getSheets, getName);

    },

    PhotoLoader: function (count, name) {
        var manager = this;
        manager.count = count;
        manager.name = name;
        for (var i = 0; i < count; i++) {
            manager.sheetSet.push(name + '-' + i);
            for (var j = 0; j < 4; j++) {
                manager.spriteSet.push(name + i + j);
            }
        }
        if (manager.unloadedSets.length != 0) {
            var nextSet = manager.unloadedSets[Math.floor(Math.random() * manager.unloadedSets.length)];
            for (var i = 0; i < this.scenesJSON.Scenes.length; i++) {
                if (this.scenesJSON.Scenes[i].name == nextSet) {
                    var sheetNum = this.scenesJSON.Scenes[i].sheets;
                    for (var j = 0; j < sheetNum; j++) {
                        this.load.atlasJSONArray(this.scenesJSON.Scenes[i].name + '-' + j, 'assets/textures/' + this.scenesJSON.Scenes[i].name + '-' + j + '.png', 'assets/textures/' + this.scenesJSON.Scenes[i].name + '-' + j + '.json');
                    }
                }
            }
            manager.load.start();

        } else {
            console.log("reached end of array");
        }
        manager.PhotoCreate();

    },

    PhotoCreate: function () {
        var manager = this;
        manager.photo = manager.add.sprite(0, 0, manager.name + '-' + '0', manager.name + '00');
        manager.keysPressed = [];
        for (var i = 0; i < manager.keySet.length; i++) {
            manager.keysPressed[i] = false;
        }
        manager.upInt = 0;
        manager.sheetNum = 0;
        manager.spriteNum = 0;
        manager.allKeys = false;
        manager.time.events.add(Phaser.Timer.SECOND * 10, manager.NextScene, this);
        manager.gameReady = true;
    },

    NextScene: function () {
        var manager = this;
        manager.world.removeAll();
        if (manager.preloadedSets.length != 0) {
            var nextSet = manager.preloadedSets[Math.floor(Math.random() * manager.unloadedSets.length)];
            for (var i = 0; i < this.scenesJSON.Scenes.length; i++) {
                if (this.scenesJSON.Scenes[i].name == nextSet) {
                    manager.currentScene = manager.scenesJSON.Scenes[i];

                    var getKeys = [];
                    console.log(manager.currentScene.name);
                    if (manager.currentScene.keySet === Array) {
                        for (var j = 0; j < manager.currentScene.keySet.length; j++) {
                            var tempVar = eval(manager.currentScene.keySet[j]);
                            getKeys.push(tempVar);
                        }
                    } else {
                        getKeys.push(eval(manager.currentScene.keySet))
                    }

                    manager.keySet = [];

                    manager.keySet = getKeys;
                    console.log("the key set in the enxt scene is " + manager.keySet);
                    manager.sceneSpeed = manager.currentScene.speed;
                    manager.PhotoLoader(manager.currentScene.sheets, manager.currentScene.name);
                    break;
                }
            }

        } else {
            console.log("reached end of array");
        }
    },


    update: function () {
        var manager = this;
        if (manager.gameReady) {
            manager.KeyCheckSwitch(manager.currentScene.pattern);
            if (manager.upInt != 0) {
                if (manager.upInt % manager.sceneSpeed == 0) {
                    if (manager.spriteNum >= 3) {
                        manager.sheetNum += 1;
                        manager.spriteNum = 0;
                        if (manager.sheetNum >= manager.sheetSet.length) {
                            manager.gameReady = false;
                        } else {
                            var tempSprite = manager.add.sprite(0, 0, manager.name + '-' + manager.sheetNum, manager.name + manager.sheetNum + manager.spriteNum);
                        }
                    } else {
                        manager.spriteNum += 1;
                        var tempSprite = manager.add.sprite(0, 0, manager.name + '-' + manager.sheetNum, manager.name + manager.sheetNum + manager.spriteNum);
                    }
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
                manager.AnyKey();
                break;
        }
    },

    HoldKeys: function () {
        var manager = this;
        if (manager.keySet[0].isDown) {
            console.log("press");
            manager.keysPressed[0] = true;
        } else {
            manager.keysPressed[0] = false;
        }
        if (manager.keySet[1] != null) {
            if (manager.keySet[1].isDown) {
                manager.keysPressed[1] = true;
            } else {
                manager.keysPressed[1] = false;
            }
        }
        if (manager.keySet[2] != null) {
            if (manager.keySet[2].isDown) {
                manager.keysPressed[2] = true;
            } else {
                manager.keysPressed[2] = false;
            }
        }
        if (manager.keySet[3] != null) {
            if (manager.keySet[3].isDown) {
                manager.keysPressed[3] = true;
            } else {
                manager.keysPressed[3] = false;
            }
        }

        if (manager.keysPressed.every(manager.AreTrue)) {
            manager.allKeys = true;
        } else {
            manager.allKeys = false;
        }
        if (manager.allKeys) {
            manager.IncreaseInt();
        }
    },

    AreTrue: function (element, index, array) {
        var manager = this;
        return element == true;
    },

    SequentialKeys: function () {
        var manager = this;
        var keyOnePress = false;
        var keyTwoPress = false;
        var keyThreePress = false;
        var keyFourPress = true;
        if (manager.keySet[0].isDown && keyFourPress) {
            keyOnePress = true;
            keyFourPress = false;
        }
        if (manager.keySet[1].isDown && keyOnePress) {
            keyTwoPress = true;
            keyOnePress = false;
        }
        if (manager.keySet[2] != null) {
            if (manager.keySet[2].isDown && keyTwoPress) {
                keyThreePress = true;
                keyTwoPress = false;
            }
        }
        if (manager.keySet[3] != null) {
            if (manager.keySet[3].isDown && keyThreePress) {
                keyFourPress = true;
                keyThreePress = false;
            }
        }
    },

    TapKeys: function () {
        var manager = this;
        //manager.tap = manager.keySet[0].onDown.add(manager.IncreaseInt, this);
    },

    AnyKey: function () {
        var manager = this;
        manager.input.keyboard.onDownCallback = function () {
            //change the picture in here
        }
    },

    SwitchKeys: function () {
        var manager = this;
        var keyOnePress = false;
        var keyTwoPress = false;
        var keyThreePress = false;
        var keyFourPress = false;
        //have threshold range for when the game is ready to move on to the next picture
        if (manager.keySet[0].isDown) {

        }
    },

    IncreaseInt: function () {
        var manager = this;
        manager.upInt += 1;

    }


};
