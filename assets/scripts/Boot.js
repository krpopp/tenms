var SceneGame = {};

SceneGame.Boot = function (game){
    
};

SceneGame.Boot.prototype = {
    
    init: function(){
        
        this.input.maxPointers = 1;
        
        this.stage.disableVisibilityChange = true;     
        
        if(this.game.device.desktop){
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
        }
        else{
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMAx(480, 260, 1024, 768);
            this.scale.forceLandscape = true;
            this.scale.pageAlignHorizontally = true;
        }
        
    },
    
    preload: function (){
        
        this.load.spritesheet('loading', 'assets/image/loading.png', 246, 100);

    },
    
    create: function (){
    
        this.state.start('Preloader');
    
    }
    
}