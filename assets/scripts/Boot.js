var SceneGame = {};

SceneGame.Boot = function (game) {

};

SceneGame.Boot.prototype = {

    init: function () {

        this.input.maxPointers = 1;

        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop) {
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
        } else {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMAx(480, 260, 1024, 768);
            this.scale.forceLandscape = true;
            this.scale.pageAlignHorizontally = true;
        }


    },

    preload: function () {

        this.load.json('scenes', 'assets/json/scenes.json');
        for (var i = 0; i < 4; i++) {
            this.load.atlasJSONArray('sky-' + i, 'assets/textures/sky-' + i + '.png', 'assets/textures/sky-' + i + '.json');
        }

        this.load.atlasJSONArray('outline', 'assets/textures/outline.png', 'assets/textures/outline.json');
        this.load.atlasJSONArray('logo', 'assets/textures/logo.png', 'assets/textures/logo.json');

    },

    create: function () {

        this.state.start('Preloader');

    }

}
