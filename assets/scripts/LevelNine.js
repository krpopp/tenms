SceneGame.LevelNine = function(game){
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

SceneGame.LevelNine.prototype = {


    create: function(){ 
        var levelNine = this;
        document.getElementById("tutorial").src = "assets/image/fingers6.gif";
        levelNine.book = levelNine.add.sprite(0, 0, 'book1');
        levelNine.bookSound = game.add.audio('page');
        levelNine.cursors = levelNine.input.keyboard.createCursorKeys();
        
        levelNine.upInt = 0;
        
        levelNine.time.events.add(Phaser.Timer.SECOND * 10, levelNine.nextScene, this);
       
    },
    
    
    update: function(){
        var levelNine = this;
       
        
        if(levelNine.cursors.left.isDown){
            levelNine.upInt++;
        } 
        
        if(levelNine.upInt == 20){
            levelNine.book.destroy();
            levelNine.book = levelNine.add.sprite(0, 0, 'book2');
            //levelNine.world.sendToBack(levelNine.book);
        }
        if(levelNine.upInt == 40){
            levelNine.book.destroy();
            levelNine.book = levelNine.add.sprite(0, 0, 'book3');
            //levelNine.world.sendToBack(levelNine.book);
        }
        if(levelNine.upInt == 60){
            levelNine.bookSound.play();
            levelNine.book.destroy();
            levelNine.book = levelNine.add.sprite(0, 0, 'book4');
            //levelNine.world.sendToBack(levelNine.book);
        }
        if(levelNine.upInt == 80){
            levelNine.book.destroy();
            levelNine.book = levelNine.add.sprite(0, 0, 'book5');
            //levelNine.world.sendToBack(levelNine.book);
        }
        if(levelNine.upInt == 100){
            levelNine.book.destroy();
            levelNine.book = levelNine.add.sprite(0, 0, 'book6');
            //levelNine.world.sendToBack(levelNine.book);
        }
        if(levelNine.upInt == 120){
            levelNine.bookSound.play();
            levelNine.book.destroy();
            levelNine.book = levelNine.add.sprite(0, 0, 'book7');
            //levelNine.world.sendToBack(levelNine.book);
        }
        if(levelNine.upInt == 140){
            levelNine.book.destroy();
            levelNine.book = levelNine.add.sprite(0, 0, 'book8');
            //levelNine.world.sendToBack(levelNine.book);
        }
        if(levelNine.upInt == 160){
            levelNine.book.destroy();
            levelNine.book = levelNine.add.sprite(0, 0, 'book9');
            //levelNine.world.sendToBack(levelNine.book);
        }
        
    },
    
    nextScene: function(){
        var levelNine = this;
        levelNine.bookSound.pause();
        this.state.start('LevelTwo');
    },

};