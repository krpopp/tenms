SceneGame.LevelTwelve = function(game){
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

SceneGame.LevelTwelve.prototype = {


    create: function(){
        var levelTwelve = this;
        document.getElementById("tutorial").src = "assets/image/fingers4.gif";
        levelTwelve.egg = levelTwelve.add.sprite(0, 0, 'egg1');
        levelTwelve.eggSound = game.add.audio('eggFry');
        levelTwelve.left = levelTwelve.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        
        levelTwelve.upInt = 0;
        
        levelTwelve.eggSound.play();
        levelTwelve.left.onDown.add(levelTwelve.increaseInt, this);
        levelTwelve.time.events.add(Phaser.Timer.SECOND * 10, levelTwelve.nextScene, this);
       
    },
    
    
    update: function(){
        var levelTwelve = this;
                
        if(levelTwelve.upInt >= 1){
            levelTwelve.upInt--;
        }
        
        if(levelTwelve.upInt == 10){
            levelTwelve.egg.destroy();
            levelTwelve.egg = levelTwelve.add.sprite(0, 0, 'egg2');
            //levelTwelve.world.sendToBack(levelTwelve.egg);
        }
        if(levelTwelve.upInt == 20){
            levelTwelve.hitLeft = false;
            levelTwelve.egg.destroy();
            levelTwelve.egg = levelTwelve.add.sprite(0, 0, 'egg3');
            //levelTwelve.world.sendToBack(levelTwelve.egg);
        }
        if(levelTwelve.upInt == 30){
            levelTwelve.egg.destroy();
            levelTwelve.egg = levelTwelve.add.sprite(0, 0, 'egg4');
            //levelTwelve.world.sendToBack(levelTwelve.egg);
        }
        if(levelTwelve.upInt == 40){
            levelTwelve.egg.destroy();
            levelTwelve.egg = levelTwelve.add.sprite(0, 0, 'egg5');
            //levelTwelve.world.sendToBack(levelTwelve.egg);
        }
        if(levelTwelve.upInt == 50){
            levelTwelve.egg.destroy();
            levelTwelve.egg = levelTwelve.add.sprite(0, 0, 'egg6');
            //levelTwelve.world.sendToBack(levelTwelve.egg);
        }
        if(levelTwelve.upInt == 60){
            levelTwelve.hitRight = true;
            levelTwelve.egg.destroy();
            levelTwelve.egg = levelTwelve.add.sprite(0, 0, 'egg7');
            //levelTwelve.world.sendToBack(levelTwelve.egg);
        }
        if(levelTwelve.upInt == 70){
            levelTwelve.hitRight = false;
            levelTwelve.egg.destroy();
            levelTwelve.egg = levelTwelve.add.sprite(0, 0, 'egg8');
            //levelTwelve.world.sendToBack(levelTwelve.egg);
        }
        if(levelTwelve.upInt == 80){
            levelTwelve.egg.destroy();
            levelTwelve.egg = levelTwelve.add.sprite(0, 0, 'egg9');
            //levelTwelve.world.sendToBack(levelTwelve.egg);
        }
        if(levelTwelve.upInt == 90){
            levelTwelve.egg.destroy();
            levelTwelve.egg = levelTwelve.add.sprite(0, 0, 'egg10');
            //levelTwelve.world.sendToBack(levelTwelve.egg);
        }
        if(levelTwelve.upInt == 100){
            levelTwelve.egg.destroy();
            levelTwelve.egg = levelTwelve.add.sprite(0, 0, 'egg11');
            //levelTwelve.world.sendToBack(levelTwelve.egg);
        }
        if(levelTwelve.upInt == 110){
            levelTwelve.egg.destroy();
            levelTwelve.egg = levelTwelve.add.sprite(0, 0, 'egg12');
            //levelTwelve.world.sendToBack(levelTwelve.egg);
        }
        
    },
    
    increaseInt: function(){
        var levelTwelve = this;
        levelTwelve.upInt+=10;
    },
    
    nextScene: function(){
        var levelTwelve = this;
        levelTwelve.eggSound.pause();
        this.state.start('LevelEight');
    },

};