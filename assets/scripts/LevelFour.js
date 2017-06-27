SceneGame.LevelFour = function(game){
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

SceneGame.LevelFour.prototype = {


    create: function(){ 
        var levelfour = this;
        document.getElementById("tutorial").src = "assets/image/fingers12.gif";
        console.log("sup");
        levelfour.fountain = levelfour.add.sprite(0, 0, 'fountain1');
        
        levelfour.cursors = levelfour.input.keyboard.createCursorKeys();
        
        levelfour.upInt = 0;
        
        levelfour.time.events.add(Phaser.Timer.SECOND * 10, levelfour.nextScene, this);
        
        levelfour.faucetClick = game.add.audio('faucetClick');
        levelfour.wFountain = game.add.audio('wFountain');
        levelfour.water = game.add.audio('water');
        levelfour.okPlay = false;
        levelfour.doNotSwitch = true;
    },
    
    
    update: function(){
        var levelfour = this;
       
        //add that the water just goes on if you hold space
        
        if(levelfour.cursors.down.isDown){
           levelfour.upInt++;
            if(levelfour.doNotSwitch){
                levelfour.okPlay = true;
            }
        } 
        if(levelfour.okPlay){
           levelfour.faucetClick.play();
           levelfour.wFountain.play();
            levelfour.water.play();
            levelfour.doNotSwitch = false;
           levelfour.okPlay = false;
        }
        if(levelfour.upInt == 50){
            levelfour.fountain.destroy();
            levelfour.fountain = levelfour.add.sprite(0, 0, 'fountain2');
            levelfour.world.sendToBack(levelfour.fountain);
        }
        if(levelfour.upInt == 100){
            levelfour.fountain.destroy();
            levelfour.fountain = levelfour.add.sprite(0, 0, 'fountain3');
            levelfour.world.sendToBack(levelfour.fountain);
        }
        if(levelfour.upInt == 150){
            levelfour.fountain.destroy();
            levelfour.fountain = levelfour.add.sprite(0, 0, 'fountain4');
            levelfour.world.sendToBack(levelfour.fountain);
        }
        if(levelfour.upInt == 200){
            levelfour.fountain.destroy();
            levelfour.fountain = levelfour.add.sprite(0, 0, 'fountain5');
            levelfour.world.sendToBack(levelfour.fountain);
        }
        if(levelfour.upInt == 250){
            levelfour.fountain.destroy();
            levelfour.fountain = levelfour.add.sprite(0, 0, 'fountain6');
            levelfour.world.sendToBack(levelfour.fountain);
        }
        if(levelfour.upInt == 300){
            levelfour.fountain.destroy();
            levelfour.fountain = levelfour.add.sprite(0, 0, 'fountain7');
            levelfour.world.sendToBack(levelfour.fountain);
        }
        if(levelfour.upInt == 350){
            levelfour.fountain.destroy();
            levelfour.fountain = levelfour.add.sprite(0, 0, 'fountain8');
            levelfour.world.sendToBack(levelfour.fountain);
        }
        if(levelfour.upInt == 400){
            levelfour.fountain.destroy();
            levelfour.fountain = levelfour.add.sprite(0, 0, 'fountain9');
            levelfour.world.sendToBack(levelfour.fountain);
        }
        if(levelfour.upInt == 450){
            levelfour.fountain.destroy();
            levelfour.fountain = levelfour.add.sprite(0, 0, 'fountain10');
            levelfour.world.sendToBack(levelfour.fountain);
        }
        
    },
    
    nextScene: function(){
        var levelfour = this;
        levelfour.faucetClick.pause();
        levelfour.wFountain.pause();
        levelfour.water.pause();
        this.state.start('LevelOne');
    },

};