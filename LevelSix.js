SceneGame.LevelSix = function(game){
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

SceneGame.LevelSix.prototype = {


    create: function(){ 
        var levelSix = this;
        document.getElementById("tutorial").src = "assets/image/fingers11.gif";
        levelSix.write = levelSix.add.sprite(0, 0, 'write1');
        levelSix.writeSound = game.add.audio('writing');
        levelSix.cursors = levelSix.input.keyboard.createCursorKeys();
        
        levelSix.upInt = 0;
        
        levelSix.upPress = false;
        levelSix.leftPress = false;
        levelSix.downPress = false;
        levelSix.rightPress = false;
        
        levelSix.time.events.add(Phaser.Timer.SECOND * 10, levelSix.nextScene, this);
       
    },
    
    
    update: function(){
        var levelSix = this;
       
        if(levelSix.cursors.up.isDown){
           levelSix.upPress = true;
        } else{
            //levelSix.upPress = false;
        }
        if(levelSix.upPress && levelSix.cursors.left.isDown){
            levelSix.leftPress = true;
        } else{
           // levelSix.leftPress = false;
        }
        if(levelSix.leftPress && levelSix.cursors.down.isDown){
            levelSix.downPress = true;
        } else{
            //levelSix.downPress = false;
        }
        if(levelSix.downPress && levelSix.cursors.right.isDown){
            levelSix.rightPress = true;
        } else{
           // levelSix.rightPress = false;
        }
        
        if(levelSix.rightPress){
            levelSix.upInt++;
            levelSix.rightPress = false;
            levelSix.downPress = false;
            levelSix.leftPress = false;
            levelSix.upPress = false;
        }
        
        if(levelSix.upInt == 1){
            levelSix.writeSound.play();
            levelSix.write.destroy();
            levelSix.write = levelSix.add.sprite(0, 0, 'write2');
            //levelSix.world.sendToBack(levelSix.write);
        }
        if(levelSix.upInt == 2){
            levelSix.write.destroy();
            levelSix.write = levelSix.add.sprite(0, 0, 'write3');
            //levelSix.world.sendToBack(levelSix.write);
        }
        if(levelSix.upInt == 3){
            levelSix.write.destroy();
            levelSix.write = levelSix.add.sprite(0, 0, 'write4');
            //levelSix.world.sendToBack(levelSix.write);
        }
        if(levelSix.upInt == 4){
            levelSix.write.destroy();
            levelSix.write = levelSix.add.sprite(0, 0, 'write5');
            //levelSix.world.sendToBack(levelSix.write);
        }
        if(levelSix.upInt == 5){
            levelSix.write.destroy();
            levelSix.write = levelSix.add.sprite(0, 0, 'write6');
            //levelSix.world.sendToBack(levelSix.write);
        }
        if(levelSix.upInt == 6){
            levelSix.write.destroy();
            levelSix.write = levelSix.add.sprite(0, 0, 'write7');
            //levelSix.world.sendToBack(levelSix.write);
        }
        if(levelSix.upInt == 7){
            levelSix.write.destroy();
            levelSix.write = levelSix.add.sprite(0, 0, 'write8');
            //levelSix.world.sendToBack(levelSix.write);
        }
        if(levelSix.upInt == 8){
            levelSix.write.destroy();
            levelSix.write = levelSix.add.sprite(0, 0, 'write9');
            //levelSix.world.sendToBack(levelSix.write);
        }
        if(levelSix.upInt == 9){
            levelSix.write.destroy();
            levelSix.write = levelSix.add.sprite(0, 0, 'write10');
            //levelSix.world.sendToBack(levelSix.write);
        }
        if(levelSix.upInt == 10){
            levelSix.write.destroy();
            levelSix.write = levelSix.add.sprite(0, 0, 'write11');
            //levelSix.world.sendToBack(levelSix.write);
        }
        if(levelSix.upInt == 11){
            levelSix.write.destroy();
            levelSix.write = levelSix.add.sprite(0, 0, 'write12');
            //levelSix.world.sendToBack(levelSix.write);
        }
        if(levelSix.upInt == 12){
            levelSix.write.destroy();
            levelSix.write = levelSix.add.sprite(0, 0, 'write13');
            //levelSix.world.sendToBack(levelSix.write);
        }
        
        if(levelSix.upInt == 13){
            levelSix.write.destroy();
            levelSix.write = levelSix.add.sprite(0, 0, 'write14');
            //levelSix.world.sendToBack(levelSix.write);
        }
        if(levelSix.upInt == 14){
            levelSix.write.destroy();
            levelSix.write = levelSix.add.sprite(0, 0, 'write15');
            //levelSix.world.sendToBack(levelSix.write);
        }
        
    },
    
    nextScene: function(){
        var levelSix = this;
        levelSix.writeSound.pause();
        this.state.start('LevelFour');
    },

};