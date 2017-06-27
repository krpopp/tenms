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
        manager.keySet = [];
        manager.sceneSpeed = 0;
        manager.spriteSet = [];
        manager.sheetSet = [];
        manager.SceneSwitch(0);
    },
    
    PhotoLoader: function(count, name){
        var manager = this;
        manager.count = count;
        manager.name = name;
        for (var i = 0; i < count; i++){
            manager.sheetSet.push(name+'-'+i);
            for(var j = 0; j < 4; j++){
                manager.spriteSet.push(name+i+j);
                console.log('assets/textures/'+name+'-'+j+'.png');
                console.log('assets/textures/'+name+'-'+i+'.json');
                manager.load.atlasJSONArray(name+j, 'assets/textures/'+name+'-'+j+'.png', 'assets/textures/'+name+'-'+i+'.json');
                //manager.load.image(manager.photoSet[i], 'assets/image/' + manager.photoSet[i] + '.png'); 
            }
        }
        manager.load.onLoadComplete.add(manager.PhotoCreate, this);
        manager.load.start();
    },
    
    PhotoCreate: function(){
        var manager = this;
        //manager.photo = manager.add.sprite(0,0,manager.photoSet[0]);
        //manager.photo = manager.add.sprite(0,0,manager.name+'00',manager.name+'-0');
        manager.photo = manager.add.sprite(0,0,'hands-0','hands00');
        manager.keysPressed = [];
        for(var i = 0; i < manager.keySet.length; i++){
            manager.keysPressed[i] = false;
        }
        manager.upInt = 0;
        manager.sheetNum = 0;
        manager.spriteNum = 0;
        manager.allKeys = false;
        manager.gameReady = true;
    },
    
    PhotoPlay: function(keys){
        var manager = this;
        
    },
    
    
    update: function(){
        var manager = this;
        if(manager.gameReady){
            manager.KeyCheckSwitch(0);
            if(manager.upInt != 0){
                if(manager.upInt%manager.sceneSpeed == 0){
                    console.log("so what's the deal here");
                    manager.spriteNum += 1;
                    if(manager.spriteNum/4){
                        manager.sheetNum += 1;
                        manager.spriteNum == 0;
                    }
                    if(manager.sheetNum >= manager.keySet.length && manager.spriteNum > 3){
                        console.log("end");
                    } else{
                        manager.add.sprite(0,0,manager.name+manager.sheetNum+manager.spriteNum,manager.name+'-'+manager.sheetNum);   
                    }
                }   
            }
        }
    },
    
    //switch statement will need to be reworked so that it loads texture packer images
    
    SceneSwitch: function(scene){
        var manager = this;
        manager.keySet.length = 0;
        switch(scene){
            case 0:
                manager.sceneSpeed = 30;
                console.log(manager.sceneSpeed);
                manager.PhotoLoader(4, 'hands');
                manager.keySet.push(manager.cursors.up, manager.cursors.down);
                break;
            case 1:
                manager.photoSet.push(2, 'brush');
                manager.keySet.push(manager.cursors.left);
                break;
            case 2:
                manager.photoSet.push(3, 'cat');
                manager.keySet.push(manager.cursors.up);
                break;
            case 3:
                manager.photoSet.push(2, 'fountain');
                manager.keySet.push(manager.cursors.down);
                break;
            case 4:
                manager.photoSet.push(2, 'type');
                //this is an any key on down callback
                break;
            case 5:
                manager.photoSet.push(3, 'write');
                manager.keySet.push(manager.cursors.up, manager.cursors.down, manager.cursors.right, manager.cursors.left);
                break;
            case 6:
                manager.photoSet.push(4, 'maggie');
                manager.keySet.push(manager.cursors.down);
                break;
            case 7:
                manager.photoSet.push(2, 'coffee');
                manager.keySet.push(manager.cursors.down);
                break;
            case 8:
                manager.photoSet.push(3, 'book');
                manager.keySet.push(manager.cursors.left);
                break;
            case 9:
                manager.photoSet.push(3, 'juice');
                manager.keySet.push(manager.cursors.left, manager.cursors.right);
                break;
            case 10:
                manager.photoSet.push(2, 'fridge');
                manager.keySet.push(manager.cursors.left, manager.cursors.right);
                break;
            case 11:
                manager.photoSet.push(3, 'egg');
                manager.keySet.push(manager.cursors.down);
                break;
                    }
    },
    
    KeyCheckSwitch: function(scene){
        var manager = this;
        switch(scene){
            case 0:
            case 1:
            case 2:
            case 3:
            case 6:
                manager.HoldKeys();
                break;
            case 9:
            case 5:
                manager.SequentialKeys();
                break;
            case 11:
            case 8:
                manager.TapKeys();
                break;
            case 10: 
                manager.SwitchKeys();
                break;
            case 4:
                manager.AnyKey();
                break;
                    }
    },
                
    HoldKeys: function(){
        var manager = this;
        if(manager.keySet[0].isDown){
            manager.keysPressed[0] = true;
            //console.log("ONE");
        } else{
            manager.keysPressed[0] = false;
        }
        if(manager.keySet[1] != null){
            if(manager.keySet[1].isDown){
                manager.keysPressed[1] = true;
                //console.log("TWO");
            } else{
                manager.keysPressed[1] = false;
            }
        }
        if(manager.keySet[2] != null){
            if(manager.keySet[2].isDown){
                manager.keysPressed[2] = true;
                console.log("THREE");
            } else{
                manager.keysPressed[2] = false;
            }
        }
        if(manager.keySet[3] != null){
            if(manager.keySet[3].isDown){
                manager.keysPressed[3] = true;
                console.log("FOUR");
            } else{
                manager.keysPressed[3] = false;
            }
        }

        if(manager.keysPressed.every(manager.AreTrue)){
            manager.allKeys = true;
            console.log(manager.allKeys);
        } else{
            manager.allKeys = false;
        }
        if(manager.allKeys){
            manager.IncreaseInt();
        }
    },
    
    AreTrue: function(element, index, array){
        var manager = this;
        return element == true;   
    },
    
    SequentialKeys: function(){
        var manager = this;
        var keyOnePress = false;
        var keyTwoPress = false;
        var keyThreePress = false;
        var keyFourPress = true;
        if(manager.keySet[0].isDown && keyFourPress){
            keyOnePress = true;
            keyFourPress = false;
        }
        if(manager.keySet[1].isDown && keyOnePress){
            keyTwoPress = true;
            keyOnePress = false;
        }
        if(manager.keySet[2] != null){
            if(manager.keySet[2].isDown && keyTwoPress){
                keyThreePress = true;
                keyTwoPress = false;
            }
        }
        if(manager.keySet[3] != null){
            if(manager.keySet[3].isDown && keyThreePress){
                keyFourPress = true;
                keyThreePress = false;
            }
        }
    },
    
    TapKeys: function(){
        var manager = this;
        //manager.tap = manager.keySet[0].onDown.add(manager.IncreaseInt, this);
    },
    
    AnyKey: function(){
        var manager = this;
        manager.input.keyboard.onDownCallback = function(){
            //change the picture in here
        }
    },
    
    SwitchKeys: function(){
        var manager = this;
        var keyOnePress = false;
        var keyTwoPress = false;
        var keyThreePress = false;
        var keyFourPress = false;
        //have threshold range for when the game is ready to move on to the next picture
        if(manager.keySet[0].isDown){
            
        }
    },
    
    IncreaseInt: function(){
        var manager = this;
        manager.upInt += 1;
        if(manager.upInt == manager.sceneSpeed){
            console.log("ok");
        }
    }


};