SceneGame.Manager = function(game){
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

SceneGame.Manager.prototype = {


    create: function(){ 
        var manager = this;
        manager.cursors = manager.input.keyboard.createCursorKeys();
        manager.photoSet = [];
        manager.keySet = [];
        manager.SceneSwitch(0);
    },
    
    PhotoPlay: function(keys){
        var manager = this;
        
    },
    
    PhotoLoader: function(){
        var manager = this;
        for (var i = 0; i <= manager.photoSet.length; i++){
            manager.load.image(manager.photoSet[i], 'assets/image/' + manager.photoSet[i] + '.png');
        }
        manager.load.start();
        manager.load.onLoadComplete.add(manager.PhotoCreate, this);
    },
    
    PhotoCreate: function(){
        var manager = this;
        manager.photo = manager.add.sprite(0,0,manager.photoSet[0]);
    },
    
    
    update: function(){
        var manager = this;
    },
    
    //switch statement will need to be reworked so that it loads texture packer images
    
    SceneSwitch: function(scene){
        var manager = this;
        manager.photoSet.length = 0;
        manager.keySet.length = 0;
        switch(scene){
            case 0:
                manager.photoSet.push('hand2','hand3','hand4','hand5','hand6','hand7','hand8','hand9','hand10','hand11','hand12','hand13','hand14','hand15','hand16');
                manager.keySet.push(manager.cursors.up, manager.cursors.down);
                break;
            case 1:
                manager.photoSet.push('brush2','brush3','brush4','brush5','brush6','brush7','brush8','brush9','brush10');
                manager.keySet.push(up);
                break;
            case 2:
                manager.photoSet.push('cat2','cat3','cat4','cat5','cat6','cat7','cat8','cat9','cat10','cat11','cat12');
                manager.keySet.push(up);
                break;

                    }
        console.log(manager.keySet);
        manager.PhotoLoader()
    }


};