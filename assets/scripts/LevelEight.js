SceneGame.LevelEight = function(game){
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

SceneGame.LevelEight.prototype = {


    create: function(){ 
        var levelEight = this;
        document.getElementById("tutorial").src = "assets/image/fingers5.gif";
        levelEight.coffee = levelEight.add.sprite(0, 0, 'coffee1');
        levelEight.coffeeSound = game.add.audio('slurp');
        levelEight.cursors = levelEight.input.keyboard.createCursorKeys();
        
        levelEight.upInt = 0;
        
        levelEight.time.events.add(Phaser.Timer.SECOND * 10, levelEight.nextScene, this);
       
    },
    
    
    update: function(){
        var levelEight = this;
       
        
        if(levelEight.cursors.down.isDown){
            levelEight.upInt++;
        } 
        
        if(levelEight.upInt == 20){
            levelEight.coffee.destroy();
            levelEight.coffee = levelEight.add.sprite(0, 0, 'coffee2');
            //levelEight.world.sendToBack(levelEight.coffee);
        }
        if(levelEight.upInt == 30){
            levelEight.coffee.destroy();
            levelEight.coffee = levelEight.add.sprite(0, 0, 'coffee3');
            //levelEight.world.sendToBack(levelEight.coffee);
        }
        if(levelEight.upInt == 40){
            levelEight.coffee.destroy();
            levelEight.coffee = levelEight.add.sprite(0, 0, 'coffee4');
            //levelEight.world.sendToBack(levelEight.coffee);
        }
        if(levelEight.upInt == 50){
            levelEight.coffee.destroy();
            levelEight.coffee = levelEight.add.sprite(0, 0, 'coffee5');
            //levelEight.world.sendToBack(levelEight.coffee);
        }
        if(levelEight.upInt == 60){
            levelEight.coffeeSound.play();
            levelEight.coffee.destroy();
            levelEight.coffee = levelEight.add.sprite(0, 0, 'coffee6');
            //levelEight.world.sendToBack(levelEight.coffee);
        }
        if(levelEight.upInt == 70){
            levelEight.coffee.destroy();
            levelEight.coffee = levelEight.add.sprite(0, 0, 'coffee7');
            //levelEight.world.sendToBack(levelEight.coffee);
        }
        if(levelEight.upInt == 80){
            levelEight.coffee.destroy();
            levelEight.coffee = levelEight.add.sprite(0, 0, 'coffee8');
            //levelEight.world.sendToBack(levelEight.coffee);
        }
        if(levelEight.upInt == 90){
            levelEight.coffee.destroy();
            levelEight.coffee = levelEight.add.sprite(0, 0, 'coffee9');
            //levelEight.world.sendToBack(levelEight.coffee);
        }
        
    },
    
    nextScene: function(){
        var levelEight = this;
        levelEight.coffeeSound.pause();
        this.state.start('LevelNine');
    },

};