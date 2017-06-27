SceneGame.LevelOne = function(game){
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

SceneGame.LevelOne.prototype = {


    create: function(){ 
        var levelOne = this;
        
        document.getElementById("tutorial").src = "assets/image/fingers1.gif";
        
        levelOne.openEyes = levelOne.add.sprite(0, 0, 'hand1');
        levelOne.topLid = levelOne.add.sprite(0, 0, 'lid1');
        levelOne.bottomLid = levelOne.add.sprite(0, 0, 'lid2');
        
        levelOne.cursors = levelOne.input.keyboard.createCursorKeys();
        
        levelOne.topLidDown = false;
        levelOne.bottomLidDown = false;
                
        levelOne.morning = game.add.audio('morning');
        levelOne.morning.play();
       
    },
    
    
    update: function(){
        var levelOne = this;
       
        if(levelOne.cursors.up.isDown){
           levelOne.topLidDown = true;
        } else{
            levelOne.topLidDown = false;
        }
        if(levelOne.cursors.down.isDown){
            levelOne.bottomLidDown = true;
        } else{
           levelOne.bottomLidDown = false;
        }
        
        if(levelOne.topLidDown && levelOne.bottomLidDown){
            levelOne.topLid.position.y--;
            levelOne.bottomLid.position.y++;
        }
        if(levelOne.topLid.position.y == -175){
            levelOne.time.events.add(Phaser.Timer.SECOND * 10, levelOne.nextScene, this);
            levelOne.openEyes.destroy();
            levelOne.openEyes = levelOne.add.sprite(0, 0, 'hand2');
            levelOne.world.sendToBack(levelOne.openEyes);
        }
         if(levelOne.topLid.position.y == -200){
            levelOne.openEyes.destroy();
            levelOne.openEyes = levelOne.add.sprite(0, 0, 'hand3');
            levelOne.world.sendToBack(levelOne.openEyes);
        }
         if(levelOne.topLid.position.y == -220){
            levelOne.openEyes.destroy();
            levelOne.openEyes = levelOne.add.sprite(0, 0, 'hand4');
            levelOne.world.sendToBack(levelOne.openEyes);
        }
         if(levelOne.topLid.position.y == -250){
            levelOne.openEyes.destroy();
            levelOne.openEyes = levelOne.add.sprite(0, 0, 'hand5');
            levelOne.world.sendToBack(levelOne.openEyes);
        }
         if(levelOne.topLid.position.y == -280){
            levelOne.openEyes.destroy();
            levelOne.openEyes = levelOne.add.sprite(0, 0, 'hand6');
            levelOne.world.sendToBack(levelOne.openEyes);
        }
         if(levelOne.topLid.position.y == -310){
            levelOne.openEyes.destroy();
            levelOne.openEyes = levelOne.add.sprite(0, 0, 'hand7');
            levelOne.world.sendToBack(levelOne.openEyes);
        }
         if(levelOne.topLid.position.y == -340){
            levelOne.openEyes.destroy();
            levelOne.openEyes = levelOne.add.sprite(0, 0, 'hand8');
            levelOne.world.sendToBack(levelOne.openEyes);
        }
        if(levelOne.topLid.position.y == -370){
            levelOne.openEyes.destroy();
            levelOne.openEyes = levelOne.add.sprite(0, 0, 'hand9');
            levelOne.world.sendToBack(levelOne.openEyes);
        }
        if(levelOne.topLid.position.y == -400){
            levelOne.openEyes.destroy();
            levelOne.openEyes = levelOne.add.sprite(0, 0, 'hand10');
            levelOne.world.sendToBack(levelOne.openEyes);
        }
        if(levelOne.topLid.position.y == -430){
            levelOne.openEyes.destroy();
            levelOne.openEyes = levelOne.add.sprite(0, 0, 'hand11');
            levelOne.world.sendToBack(levelOne.openEyes);
        }
        if(levelOne.topLid.position.y == -460){
            levelOne.openEyes.destroy();
            levelOne.openEyes = levelOne.add.sprite(0, 0, 'hand12');
            levelOne.world.sendToBack(levelOne.openEyes);
        }
        if(levelOne.topLid.position.y == -490){
            levelOne.openEyes.destroy();
            levelOne.openEyes = levelOne.add.sprite(0, 0, 'hand13');
            levelOne.world.sendToBack(levelOne.openEyes);
        }
        if(levelOne.topLid.position.y == -520){
            levelOne.openEyes.destroy();
            levelOne.openEyes = levelOne.add.sprite(0, 0, 'hand14');
            levelOne.world.sendToBack(levelOne.openEyes);
        }
         if(levelOne.topLid.position.y == -550){
            levelOne.openEyes.destroy();
            levelOne.openEyes = levelOne.add.sprite(0, 0, 'hand15');
            levelOne.world.sendToBack(levelOne.openEyes);
        }
         if(levelOne.topLid.position.y == -580){
            levelOne.openEyes.destroy();
            levelOne.openEyes = levelOne.add.sprite(0, 0, 'hand16');
            levelOne.world.sendToBack(levelOne.openEyes);
        }
    },
    
    nextScene: function(){
        var levelOne = this;
                levelOne.morning.pause();

        this.state.start('LevelEleven');
    },
};