SceneGame.LevelTwo = function(game){
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

SceneGame.LevelTwo.prototype = {


    create: function(){ 
        var levelTwo = this;
        document.getElementById("tutorial").src = "assets/image/fingers7.gif";
        levelTwo.brushTeeth = levelTwo.add.sprite(0, 0, 'brush1');
        
        levelTwo.cursors = levelTwo.input.keyboard.createCursorKeys();
        
        levelTwo.upInt = 0;
        
        levelTwo.time.events.add(Phaser.Timer.SECOND * 10, levelTwo.nextScene, this);
        levelTwo.faucet = game.add.audio('faucet');
       levelTwo.faucet.play();
    },
    
    
    update: function(){
        var levelTwo = this;
       
        if(levelTwo.cursors.left.isDown){
           levelTwo.upInt++;
        } 
        if(levelTwo.upInt == 50){
            levelTwo.brushTeeth.destroy();
            levelTwo.brushTeeth = levelTwo.add.sprite(0, 0, 'brush2');
            levelTwo.world.sendToBack(levelTwo.brushTeeth);
        }
        if(levelTwo.upInt == 100){
            levelTwo.brushTeeth.destroy();
            levelTwo.brushTeeth = levelTwo.add.sprite(0, 0, 'brush3');
            levelTwo.world.sendToBack(levelTwo.brushTeeth);
        }
        if(levelTwo.upInt == 150){
            levelTwo.brushTeeth.destroy();
            levelTwo.brushTeeth = levelTwo.add.sprite(0, 0, 'brush4');
            levelTwo.world.sendToBack(levelTwo.brushTeeth);
        }
        if(levelTwo.upInt == 200){
            levelTwo.brushTeeth.destroy();
            levelTwo.brushTeeth = levelTwo.add.sprite(0, 0, 'brush5');
            levelTwo.world.sendToBack(levelTwo.brushTeeth);
        }
        if(levelTwo.upInt == 250){
            levelTwo.brushTeeth.destroy();
            levelTwo.brushTeeth = levelTwo.add.sprite(0, 0, 'brush6');
            levelTwo.world.sendToBack(levelTwo.brushTeeth);
        }
        if(levelTwo.upInt == 300){
            levelTwo.brushTeeth.destroy();
            levelTwo.brushTeeth = levelTwo.add.sprite(0, 0, 'brush7');
            levelTwo.world.sendToBack(levelTwo.brushTeeth);
        }
        if(levelTwo.upInt == 350){
            levelTwo.brushTeeth.destroy();
            levelTwo.brushTeeth = levelTwo.add.sprite(0, 0, 'brush8');
            levelTwo.world.sendToBack(levelTwo.brushTeeth);
        }
        if(levelTwo.upInt == 400){
            levelTwo.brushTeeth.destroy();
            levelTwo.brushTeeth = levelTwo.add.sprite(0, 0, 'brush9');
            levelTwo.world.sendToBack(levelTwo.brushTeeth);
        }
        if(levelTwo.upInt == 450){
            levelTwo.brushTeeth.destroy();
            levelTwo.brushTeeth = levelTwo.add.sprite(0, 0, 'brush10');
            levelTwo.world.sendToBack(levelTwo.brushTeeth);
        }
        
    },
    
    nextScene: function(){
        var levelTwo = this;
        levelTwo.faucet.pause();
        this.state.start('LevelThree');
    },

};