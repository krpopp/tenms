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
        manager.gameReady = true;
    },
    
    PhotoPlay: function(keys){
        var manager = this;
        
    },
    
    
    update: function(){
        var manager = this;
        if(manager.gameReady){
            manager.KeyCheckSwitch(0);
        }
    },
    
    //switch statement will need to be reworked so that it loads texture packer images
    
    SceneSwitch: function(scene){
        var manager = this;
        manager.photoSet.length = 0;
        manager.keySet.length = 0;
        switch(scene){
            case 0:
                manager.photoSet.push('hand2', 'hand3', 'hand4', 'hand5', 'hand6', 'hand7', 'hand8', 'hand9', 'hand10', 'hand11', 'hand12', 'hand13', 'hand14', 'hand15', 'hand16');
                manager.keySet.push(manager.cursors.up, manager.cursors.down);
                break;
            case 1:
                manager.photoSet.push('brush2', 'brush3', 'brush4', 'brush5', 'brush6', 'brush7', 'brush8', 'brush9', 'brush10');
                manager.keySet.push(manager.cursors.left);
                break;
            case 2:
                manager.photoSet.push('cat2', 'cat3', 'cat4', 'cat5', 'cat6', 'cat7', 'cat8', 'cat9', 'cat10', 'cat11', 'cat12');
                manager.keySet.push(manager.cursors.up);
                break;
            case 3:
                manager.photoSet.push('fountain2', 'fountain3', 'fountain4', 'fountain5', 'fountain6', 'fountain7', 'fountain8', 'fountain9');
                manager.keySet.push(manager.cursors.down);
                break;
            case 4:
                manager.photoSet.push('type1', 'type2', 'type3', 'type4', 'type5', 'type6', 'type7', 'type8', 'type9');
                //this is an any key on down callback
                break;
            case 5:
                manager.photoSet.push('write2', 'write3', 'write4', 'write5', 'write6', 'write7', 'write8', 'write9', 'write10', 'write11', 'write12', 'write13', 'write14', 'write15');
                manager.keySet.push(manager.cursors.up, manager.cursors.down, manager.cursors.right, manager.cursors.left);
                break;
            case 6:
                manager.photoSet.push('maggie2', 'maggie3', 'maggie4', 'maggie5', 'maggie6', 'maggie7', 'maggie8', 'maggie9', 'maggie10', 'maggie11', 'maggie12', 'maggie13', 'maggie14', 'maggie15', 'maggie16');
                manager.keySet.push(manager.cursors.down);
                break;
            case 7:
                manager.photoSet.push('coffee2', 'coffee3', 'coffee4', 'coffee5', 'coffee6', 'coffee7', 'coffee8', 'coffee9');
                manager.keySet.push(manager.cursors.down);
                break;
            case 8:
                manager.photoSet.push('book2', 'book3', 'book4', 'book5', 'book6', 'book7', 'book8', 'book9');
                manager.keySet.push(manager.cursors.left);
                break;
            case 9:
                manager.photoSet.push('juice2', 'juice3', 'juice4', 'juice5', 'juice6', 'juice7', 'juice8', 'juice9', 'juice10', 'juice11', 'juice12', 'juice13', 'juice14');
                manager.keySet.push(manager.cursors.left, manager.cursors.right);
                break;
            case 10:
                manager.photoSet.push('fridge2', 'fridge3', 'fridge4', 'fridge5', 'fridge6', 'fridge7', 'fridge8', 'fridge9', 'fridge10', 'fridge11');
                manager.keySet.push(manager.cursors.left, manager.cursors.right);
                break;
            case 11:
                manager.photoSet.push('egg2', 'egg3', 'egg4', 'egg5', 'egg6', 'egg7', 'egg8', 'egg9', 'egg10', 'egg11', 'egg12');
                manager.keySet.push(manager.cursors.down);
                break;
                    }
        console.log(manager.keySet);
        manager.PhotoLoader()
    },
    
    KeyCheckSwitch: function(scene){
        var manager = this;
        switch(scene){
            case 0:
                manager.HoldKeys();
                break;
            case 1:
                manager.HoldKeys();
                break;
            case 2:
                manager.HoldKeys();
                break;
                    }
    },
                
    HoldKeys: function(){
        var manager = this;
        if(manager.keySet[0].isDown){
            console.log("ONE");
        }
        if(manager.keySet[1] != null){
            if(manager.keySet[1].isDown){
                console.log("TWO");
            }
        }
        if(manager.keySet[2] != null){
            if(manager.keySet[2].isDown){
                console.log("THREE");
            }
        }
        if(manager.keySet[3] != null){
            if(manager.keySet[3].isDown){
                console.log("FOUR");
            }
        }
    },
    
    SequentialKeys: function(){
        var manager = this;
        
    }


};