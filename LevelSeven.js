SceneGame.LevelSeven = function(game){
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

SceneGame.LevelSeven.prototype = {


    create: function(){ 
        var levelSeven = this;
        document.getElementById("tutorial").src = "assets/image/fingers9.gif";
        levelSeven.maggie = levelSeven.add.sprite(0, 0, 'maggie1');
        levelSeven.maggieSound = game.add.audio('dog');
        levelSeven.cursors = levelSeven.input.keyboard.createCursorKeys();
        
        levelSeven.upInt = 0;
        levelSeven.maggieSound.play();
        levelSeven.time.events.add(Phaser.Timer.SECOND * 10, levelSeven.nextScene, this);
       
    },
    
    
    update: function(){
        var levelSeven = this;
       
        
        if(levelSeven.cursors.down.isDown){
            levelSeven.upInt--;
        } else{
            levelSeven.upInt++;
        }
        
        if(levelSeven.upInt == 20){
            levelSeven.maggie.destroy();
            levelSeven.maggie = levelSeven.add.sprite(0, 0, 'maggie2');
            //levelSeven.world.sendToBack(levelSeven.maggie);
        }
        if(levelSeven.upInt == 30){
            levelSeven.maggie.destroy();
            levelSeven.maggie = levelSeven.add.sprite(0, 0, 'maggie3');
            //levelSeven.world.sendToBack(levelSeven.maggie);
        }
        if(levelSeven.upInt == 40){
            levelSeven.maggie.destroy();
            levelSeven.maggie = levelSeven.add.sprite(0, 0, 'maggie4');
            //levelSeven.world.sendToBack(levelSeven.maggie);
        }
        if(levelSeven.upInt == 50){
            levelSeven.maggie.destroy();
            levelSeven.maggie = levelSeven.add.sprite(0, 0, 'maggie5');
            //levelSeven.world.sendToBack(levelSeven.maggie);
        }
        if(levelSeven.upInt == 60){
            levelSeven.maggie.destroy();
            levelSeven.maggie = levelSeven.add.sprite(0, 0, 'maggie6');
            //levelSeven.world.sendToBack(levelSeven.maggie);
        }
        if(levelSeven.upInt == 70){
            levelSeven.maggie.destroy();
            levelSeven.maggie = levelSeven.add.sprite(0, 0, 'maggie7');
            //levelSeven.world.sendToBack(levelSeven.maggie);
        }
        if(levelSeven.upInt == 80){
            levelSeven.maggie.destroy();
            levelSeven.maggie = levelSeven.add.sprite(0, 0, 'maggie8');
            //levelSeven.world.sendToBack(levelSeven.maggie);
        }
        if(levelSeven.upInt == 90){
            levelSeven.maggie.destroy();
            levelSeven.maggie = levelSeven.add.sprite(0, 0, 'maggie9');
            //levelSeven.world.sendToBack(levelSeven.maggie);
        }
        if(levelSeven.upInt == 100){
            levelSeven.maggie.destroy();
            levelSeven.maggie = levelSeven.add.sprite(0, 0, 'maggie10');
            //levelSeven.world.sendToBack(levelSeven.maggie);
        }
        if(levelSeven.upInt == 110){
            levelSeven.maggie.destroy();
            levelSeven.maggie = levelSeven.add.sprite(0, 0, 'maggie11');
            //levelSeven.world.sendToBack(levelSeven.maggie);
        }
        if(levelSeven.upInt == 120){
            levelSeven.maggie.destroy();
            levelSeven.maggie = levelSeven.add.sprite(0, 0, 'maggie12');
            //levelSeven.world.sendToBack(levelSeven.maggie);
        }
        if(levelSeven.upInt == 130){
            levelSeven.maggie.destroy();
            levelSeven.maggie = levelSeven.add.sprite(0, 0, 'maggie13');
            //levelSeven.world.sendToBack(levelSeven.maggie);
        }
        
        if(levelSeven.upInt == 140){
            levelSeven.maggie.destroy();
            levelSeven.maggie = levelSeven.add.sprite(0, 0, 'maggie14');
            //levelSeven.world.sendToBack(levelSeven.maggie);
        }
        if(levelSeven.upInt == 150){
            levelSeven.maggie.destroy();
            levelSeven.maggie = levelSeven.add.sprite(0, 0, 'maggie15');
            //levelSeven.world.sendToBack(levelSeven.maggie);
        }
        if(levelSeven.upInt == 160){
            levelSeven.maggie.destroy();
            levelSeven.maggie = levelSeven.add.sprite(0, 0, 'maggie16');
            //levelSeven.world.sendToBack(levelSeven.maggie);
        }
        
    },
    
    nextScene: function(){
        var levelSeven = this;
        levelSeven.maggieSound.pause();
        this.state.start('LevelFive');
    },

};