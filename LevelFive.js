SceneGame.LevelFive = function(game){
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

SceneGame.LevelFive.prototype = {


    create: function(){ 
        var levelFive = this;
        document.getElementById("tutorial").src = "assets/image/fingers10.gif";
        levelFive.type = levelFive.add.sprite(0, 0, 'type1');
                        
        levelFive.time.events.add(Phaser.Timer.SECOND * 10, levelFive.nextScene, this);
        
        levelFive.click1 = game.add.audio('click1');
        levelFive.click2 = game.add.audio('click2');
        levelFive.click3 = game.add.audio('click3');
        levelFive.click4 = game.add.audio('click4');
        levelFive.click5 = game.add.audio('click5');
        
        levelFive.inFive = true;
       
    },
    
    
    update: function(){
        var levelFive = this;
       
        levelFive.input.keyboard.onDownCallback = function(changePic){
            if(levelFive.inFive){
            console.log('it happen');
            levelFive.type.destroy();
            levelFive.myInt = levelFive.rnd.integerInRange(21, 29);
            if(levelFive.myInt == 21){
               levelFive.type = levelFive.add.sprite(0, 0, 'type1'); 
               levelFive.click1.play();
            }
            if(levelFive.myInt == 22){
                levelFive.type = levelFive.add.sprite(0, 0, 'type2');
                levelFive.click2.play();
            }
            if(levelFive.myInt == 23){
                levelFive.type = levelFive.add.sprite(0, 0, 'type3');
               levelFive.click3.play();
            }
            if(levelFive.myInt == 24){
                levelFive.type = levelFive.add.sprite(0, 0, 'type4');
               levelFive.click4.play();
            }
            if(levelFive.myInt == 25){
                levelFive.type = levelFive.add.sprite(0, 0, 'type5');
                levelFive.click5.play();
            }
            if(levelFive.myInt == 26){
                levelFive.type = levelFive.add.sprite(0, 0, 'type6');
                levelFive.click1.play();
            }
            if(levelFive.myInt == 27){
                levelFive.type = levelFive.add.sprite(0, 0, 'type7');
                levelFive.click2.play();
            }
            if(levelFive.myInt == 28){
                levelFive.type = levelFive.add.sprite(0, 0, 'type8');
                levelFive.click3.play();
            }
            if(levelFive.myInt == 29){
                levelFive.type = levelFive.add.sprite(0, 0, 'type9');
                levelFive.click4.play();
            }
            levelFive.world.sendToBack(levelFive.type);
        }
        }
        
    },
    
    nextScene: function(){
        var levelFive = this;
        levelFive.inFive = false;
        this.state.start('LevelSix');
    },

};