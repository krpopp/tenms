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
        manager.cursors = manager.input.keyboard.createCursorKeys();
        manager.scenesJSON = manager.cache.getJSON('scenes');
        manager.preloadedSets = [];
        manager.unloadedSets = [];

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

        console.log(manager.preloadedSets);
        console.log(manager.unloadedSets);

        //also, set the keys for the initial scene
        //for some reason, this one can't be set by the function
        manager.keySet = getKeys;

        //load photos, set up the next scene
        manager.PhotoLoader();

    },

    //this grabs and binds the keys for each level
    FindKeys: function () {
        var manager = this;
        var getKeys = [];
        manager.keySet = [];
        getKeys.push(eval(manager.currentScene.keySet));
        if (getKeys[0].length >= 2) {
            var arrayKey = [];
            for (var i = 0; i < getKeys[0].length; i++) {
                arrayKey.push(eval(getKeys[0][i]));
            }
            manager.keySet = arrayKey;
        } else {
            manager.keySet = getKeys;
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
                    console.log("hello");
                    var sheetNum = manager.scenesJSON.Scenes[i].sheets;
                    for (var j = 0; j < sheetNum; j++) {
                        this.load.atlasJSONArray(manager.scenesJSON.Scenes[i].name + '-' + j, 'assets/textures/' + manager.scenesJSON.Scenes[i].name + '-' + j + '.png', 'assets/textures/' + manager.scenesJSON.Scenes[i].name + '-' + j + '.json');
                    }
                }
            }
            manager.load.start();
            manager.load.onLoadComplete.add(function () {}, this);

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
        manager.time.events.add(Phaser.Timer.SECOND * 10, manager.NextScene, this);
        manager.gameReady = true;
    },

    //picks the next scene from the array of already loaded scenes
    NextScene: function () {
        var manager = this;
        manager.world.removeAll();
        if (manager.preloadedSets.length != 0) {
            //var nextSet = manager.preloadedSets[Math.floor(Math.random() * manager.unloadedSets.length)];
            var nextSet = manager.preloadedSets.shift();
            for (var i = 0; i < this.scenesJSON.Scenes.length; i++) {
                if (this.scenesJSON.Scenes[i].name == nextSet) {
                    manager.currentScene = manager.scenesJSON.Scenes[i];
                    console.log(manager.currentScene.name);
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
            manager.KeyCheckSwitch(manager.currentScene.pattern);
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
                manager.AnyKey();
                break;
        }
    },

    ////FROM HERE ON I NEED TO FIX AND COMPLETE THIS CODE


    //for holding down one+ keys
    HoldKeys: function () {
        var manager = this;
        if (manager.keySet[0].isDown) {
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

    //move this
    //checks if every bool in an array is true
    AreTrue: function (element, index, array) {
        var manager = this;
        return element == true;
    },

    //for when keys must be pressed in a certain order
    SequentialKeys: function () {
        var manager = this;
        if (manager.keySet[0].isDown) {
            manager.keysPressed[0] = true;
        }
        if (manager.keySet[1].isDown && manager.keysPressed[0]) {
            manager.keysPressed[1] = true;
        }
        if (manager.keysPressed.length == 2) {
            if (manager.keysPressed[1]) {
                manager.IncreaseInt();
                manager.keysPressed[1] = false;
                manager.keysPressed[0] = false;
            }
        } else if (manager.keysPressed.length == 3) {
            if (manager.keySet[2].isDown && manager.keysPressed[1]) {
                manager.keysPressed[2] = true;
            }
            if (manager.keysPressed[2]) {
                manager.IncreaseInt();
                manager.keysPressed[1] = false;
                manager.keysPressed[0] = false;
                manager.keysPressed[2] = false;
            }
        } else if (manager.keysPressed.length == 4) {
            if (manager.keySet[3].isDown && manager.keysPressed[2]) {
                manager.keysPressed[3] = true;
            }
            if (manager.keysPressed[2]) {
                manager.IncreaseInt();
                manager.keysPressed[1] = false;
                manager.keysPressed[0] = false;
                manager.keysPressed[2] = false;
                manager.keysPressed[3] = false;
            }
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
            //change the picture in here
        }
    },

    //going back and forth between two keys
    //can possibl combine with or make distinct from SequentialKeys
    SwitchKeys: function () {
        var manager = this;
        //have threshold range for when the game is ready to move on to the next picture
        if (manager.keySet[0].isDown && !manager.keysPressed[0]) {
            manager.IncreaseInt();
            if (manager.upInt >= 30) {
                manager.keysPressed[0] = true;
            }
        }
        if (manager.keySet[1].isDown && manager.keysPressed[0]) {
            manager.IncreaseInt();
            if (manager.upInt >= 60) {
                manager.keyPress[0] = false;
            }
        }
    },

    //Int that increases based on input in order to move the photos forward
    IncreaseInt: function () {
        var manager = this;
        manager.upInt += 1;

    }


};
