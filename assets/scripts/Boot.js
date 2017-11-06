var SceneGame = {};

SceneGame.Boot = function (game) {

};

SceneGame.Boot.prototype = {

    init: function () {
        this.input.maxPointers = 1;
        this.input.maxPointers = 1;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        if (!this.game.device.desktop) {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.forceLandscape = true;
            this.scale.pageAlignHorizontally = true;
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
        }
    },

    preload: function () {

        this.load.json('scenes', 'assets/json/scenes.json');
        this.load.atlasJSONArray('outline', 'assets/textures/outline.png', 'assets/textures/outline.json');
        this.load.atlasJSONArray('logo', 'assets/textures/logo.png', 'assets/textures/logo.json');

    },

    create: function () {
        this.state.start('Preloader');
    },
    enterIncorrectOrientation: function () {
        this.orientated = false;
        document.getElementById('orientation').style.display = 'none';
    },
    leaveIncorrectOrientation: function () {
        this.orientated = true;
        document.getElementById('orientation').style.display = 'none';
    },

};
