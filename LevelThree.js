SceneGame.LevelThree = function(game){
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

SceneGame.LevelThree.prototype = {


    create: function(){ 
        var levelThree = this;
        document.getElementById("tutorial").src = "assets/image/fingers8.gif";
        levelThree.cat = levelThree.add.sprite(0, 0, 'cat1');
        
        levelThree.cursors = levelThree.input.keyboard.createCursorKeys();
        
        levelThree.upInt = 0;
        
       levelThree.time.events.add(Phaser.Timer.SECOND * 10, levelThree.nextScene, this);
        
        levelThree.catPurr = game.add.audio('purr');
        levelThree.catPurr.play();
       
    },
    
    
    update: function(){
        var levelThree = this;
       
        if(levelThree.cursors.up.isDown){
           levelThree.upInt++;
        } 
        if(levelThree.upInt == 30){
            levelThree.cat.destroy();
            levelThree.cat = levelThree.add.sprite(0, 0, 'cat2');
            levelThree.world.sendToBack(levelThree.cat);
        }
        if(levelThree.upInt == 60){
            levelThree.cat.destroy();
            levelThree.cat = levelThree.add.sprite(0, 0, 'cat3');
            levelThree.world.sendToBack(levelThree.cat);
        }
        if(levelThree.upInt == 90){
            levelThree.cat.destroy();
            levelThree.cat = levelThree.add.sprite(0, 0, 'cat4');
            levelThree.world.sendToBack(levelThree.cat);
        }
        if(levelThree.upInt == 120){
            levelThree.cat.destroy();
            levelThree.cat = levelThree.add.sprite(0, 0, 'cat5');
            levelThree.world.sendToBack(levelThree.cat);
        }
        if(levelThree.upInt == 150){
            levelThree.cat.destroy();
            levelThree.cat = levelThree.add.sprite(0, 0, 'cat6');
            levelThree.world.sendToBack(levelThree.cat);
        }
        if(levelThree.upInt == 180){
            levelThree.cat.destroy();
            levelThree.cat = levelThree.add.sprite(0, 0, 'cat7');
            levelThree.world.sendToBack(levelThree.cat);
        }
        if(levelThree.upInt == 210){
            levelThree.cat.destroy();
            levelThree.cat = levelThree.add.sprite(0, 0, 'cat8');
            levelThree.world.sendToBack(levelThree.cat);
        }
        if(levelThree.upInt == 240){
            levelThree.cat.destroy();
            levelThree.cat = levelThree.add.sprite(0, 0, 'cat9');
            levelThree.world.sendToBack(levelThree.cat);
        }
        if(levelThree.upInt == 270){
            levelThree.cat.destroy();
            levelThree.cat = levelThree.add.sprite(0, 0, 'cat10');
            levelThree.world.sendToBack(levelThree.cat);
        }
        if(levelThree.upInt == 300){
            levelThree.cat.destroy();
            levelThree.cat = levelThree.add.sprite(0, 0, 'cat11');
            levelThree.world.sendToBack(levelThree.cat);
        }
        if(levelThree.upInt == 330){
            levelThree.cat.destroy();
            levelThree.cat = levelThree.add.sprite(0, 0, 'cat12');
            levelThree.world.sendToBack(levelThree.cat);
        }
    
    },
    
    nextScene: function(){
        var levelThree = this;
        this.state.start('LevelSeven');
        levelThree.catPurr.pause();
    },

};