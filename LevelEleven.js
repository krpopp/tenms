SceneGame.LevelEleven = function(game){
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

SceneGame.LevelEleven.prototype = {


    create: function(){
        var levelEleven = this;
        document.getElementById("tutorial").src = "assets/image/fingers2.gif";
        levelEleven.fridge = levelEleven.add.sprite(0, 0, 'fridge1');
        levelEleven.fridgeSound = game.add.audio('fridgeHum');
        levelEleven.cursors = levelEleven.input.keyboard.createCursorKeys();
        
        levelEleven.upInt = 0;
        
        levelEleven.hitRight = false;
        levelEleven.hitLeft = true;
        levelEleven.fridgeSound.play();
        levelEleven.time.events.add(Phaser.Timer.SECOND * 10, levelEleven.nextScene, this);
       
    },
    
    
    update: function(){
        var levelEleven = this;
       
        
        if(levelEleven.cursors.right.isDown && !levelEleven.hitRight){
            levelEleven.upInt ++;
        } 
        if(levelEleven.cursors.left.isDown && !levelEleven.hitLeft){
            levelEleven.upInt ++;
        }
        
        if(levelEleven.upInt == 10){
            levelEleven.fridge.destroy();
            levelEleven.fridge = levelEleven.add.sprite(0, 0, 'fridge2');
            //levelEleven.world.sendToBack(levelEleven.fridge);
        }
        if(levelEleven.upInt == 20){
            levelEleven.hitLeft = false;
            levelEleven.fridge.destroy();
            levelEleven.fridge = levelEleven.add.sprite(0, 0, 'fridge3');
            //levelEleven.world.sendToBack(levelEleven.fridge);
        }
        if(levelEleven.upInt == 30){
            levelEleven.fridge.destroy();
            levelEleven.fridge = levelEleven.add.sprite(0, 0, 'fridge4');
            //levelEleven.world.sendToBack(levelEleven.fridge);
        }
        if(levelEleven.upInt == 40){
            levelEleven.fridge.destroy();
            levelEleven.fridge = levelEleven.add.sprite(0, 0, 'fridge5');
            //levelEleven.world.sendToBack(levelEleven.fridge);
        }
        if(levelEleven.upInt == 50){
            levelEleven.fridge.destroy();
            levelEleven.fridge = levelEleven.add.sprite(0, 0, 'fridge6');
            //levelEleven.world.sendToBack(levelEleven.fridge);
        }
        if(levelEleven.upInt == 60){
            levelEleven.hitRight = true;
            levelEleven.fridge.destroy();
            levelEleven.fridge = levelEleven.add.sprite(0, 0, 'fridge7');
            //levelEleven.world.sendToBack(levelEleven.fridge);
        }
        if(levelEleven.upInt == 70){
            levelEleven.hitRight = false;
            levelEleven.fridge.destroy();
            levelEleven.fridge = levelEleven.add.sprite(0, 0, 'fridge8');
            //levelEleven.world.sendToBack(levelEleven.fridge);
        }
        if(levelEleven.upInt == 80){
            levelEleven.fridge.destroy();
            levelEleven.fridge = levelEleven.add.sprite(0, 0, 'fridge9');
            //levelEleven.world.sendToBack(levelEleven.fridge);
        }
        if(levelEleven.upInt == 90){
            levelEleven.fridge.destroy();
            levelEleven.fridge = levelEleven.add.sprite(0, 0, 'fridge10');
            //levelEleven.world.sendToBack(levelEleven.fridge);
        }
        if(levelEleven.upInt == 100){
            levelEleven.fridge.destroy();
            levelEleven.fridge = levelEleven.add.sprite(0, 0, 'fridge11');
            //levelEleven.world.sendToBack(levelEleven.fridge);
        }
        
    },
    
    nextScene: function(){
        var levelEleven = this;
        levelEleven.fridgeSound.pause();
        this.state.start('LevelTen');
    },

};