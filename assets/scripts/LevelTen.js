SceneGame.LevelTen = function(game){
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

SceneGame.LevelTen.prototype = {


    create: function(){
        var levelTen = this;
        document.getElementById("tutorial").src = "assets/image/fingers3.gif";
        levelTen.juice = levelTen.add.sprite(0, 0, 'juice1');
        levelTen.juiceSound = game.add.audio('juiceShake');
        levelTen.cursors = levelTen.input.keyboard.createCursorKeys();
        
        levelTen.upInt = 0;
        
        levelTen.pressLeft = false;
        levelTen.pressRight = false;
        levelTen.juiceSound.play();
        levelTen.time.events.add(Phaser.Timer.SECOND * 10, levelTen.nextScene, this);
       
    },
    
    
    update: function(){
        var levelTen = this;
       
        
        if(levelTen.cursors.left.isDown){
            levelTen.pressLeft = true;
        } 
        if(levelTen.pressLeft && levelTen.cursors.right.isDown){
            levelTen.pressRight = true;
        }
        if(levelTen.pressRight){
            levelTen.upInt += 10;
            levelTen.pressLeft = false;
            levelTen.pressRight = false;
        }

        
        if(levelTen.upInt == 10){
            levelTen.juice.destroy();
            levelTen.juice = levelTen.add.sprite(0, 0, 'juice2');
            //levelTen.world.sendToBack(levelTen.juice);
        }
        if(levelTen.upInt == 20){
            levelTen.juice.destroy();
            levelTen.juice = levelTen.add.sprite(0, 0, 'juice3');
            //levelTen.world.sendToBack(levelTen.juice);
        }
        if(levelTen.upInt == 30){
            levelTen.juice.destroy();
            levelTen.juice = levelTen.add.sprite(0, 0, 'juice4');
            //levelTen.world.sendToBack(levelTen.juice);
        }
        if(levelTen.upInt == 40){
            levelTen.juice.destroy();
            levelTen.juice = levelTen.add.sprite(0, 0, 'juice5');
            //levelTen.world.sendToBack(levelTen.juice);
        }
        if(levelTen.upInt == 50){
            levelTen.juice.destroy();
            levelTen.juice = levelTen.add.sprite(0, 0, 'juice6');
            //levelTen.world.sendToBack(levelTen.juice);
        }
        if(levelTen.upInt == 60){
            levelTen.juice.destroy();
            levelTen.juice = levelTen.add.sprite(0, 0, 'juice7');
            //levelTen.world.sendToBack(levelTen.juice);
        }
        if(levelTen.upInt == 70){
            levelTen.juice.destroy();
            levelTen.juice = levelTen.add.sprite(0, 0, 'juice8');
            //levelTen.world.sendToBack(levelTen.juice);
        }
        if(levelTen.upInt == 80){
            levelTen.juice.destroy();
            levelTen.juice = levelTen.add.sprite(0, 0, 'juice9');
            //levelTen.world.sendToBack(levelTen.juice);
        }
        if(levelTen.upInt == 90){
            levelTen.juice.destroy();
            levelTen.juice = levelTen.add.sprite(0, 0, 'juice10');
            //levelTen.world.sendToBack(levelTen.juice);
        }
        if(levelTen.upInt == 100){
            levelTen.juice.destroy();
            levelTen.juice = levelTen.add.sprite(0, 0, 'juice11');
            //levelTen.world.sendToBack(levelTen.juice);
        }
        if(levelTen.upInt == 110){
            levelTen.juice.destroy();
            levelTen.juice = levelTen.add.sprite(0, 0, 'juice12');
            //levelTen.world.sendToBack(levelTen.juice);
        }
        if(levelTen.upInt == 120){
            levelTen.juice.destroy();
            levelTen.juice = levelTen.add.sprite(0, 0, 'juice13');
            //levelTen.world.sendToBack(levelTen.juice);
        }
        if(levelTen.upInt == 130){
            levelTen.juice.destroy();
            levelTen.juice = levelTen.add.sprite(0, 0, 'juice14');
            //levelTen.world.sendToBack(levelTen.juice);
            levelTen.upInt = 0;
        }
        
    },
    
    nextScene: function(){
        var levelTen = this;
        levelTen.juiceSound.pause();
        this.state.start('LevelTwelve');
    },

};