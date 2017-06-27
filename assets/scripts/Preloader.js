SceneGame.Preloader = function (game){
    
    this.background = null;
    this.preloadBar = null;
    
    this.ready = false;
    
};

SceneGame.Preloader.prototype = {
    
    preload: function(){
        
        this.stage.backgroundColor = "000000";
        
        this.loading = this.add.sprite(500, 250, 'loading');
        this.loadPlay = this.loading.animations.add('loadPlay');
        this.loading.animations.play('loadPlay', 5, true);
        
        this.load.image('brush1', 'assets/image/brush1.png');
        this.load.image('brush2', 'assets/image/brush2.png');
        this.load.image('brush3', 'assets/image/brush3.png');
        this.load.image('brush4', 'assets/image/brush4.png');
        this.load.image('brush5', 'assets/image/brush5.png');
        this.load.image('brush6', 'assets/image/brush6.png');
        this.load.image('brush7', 'assets/image/brush7.png');
        this.load.image('brush8', 'assets/image/brush8.png');
        this.load.image('brush9', 'assets/image/brush9.png');
        this.load.image('brush10', 'assets/image/brush10.png');
        
        this.load.image('cat1', 'assets/image/cat1.png');
        this.load.image('cat2', 'assets/image/cat2.png');
        this.load.image('cat3', 'assets/image/cat3.png');
        this.load.image('cat4', 'assets/image/cat4.png');
        this.load.image('cat5', 'assets/image/cat5.png');
        this.load.image('cat6', 'assets/image/cat6.png');
        this.load.image('cat7', 'assets/image/cat7.png');
        this.load.image('cat8', 'assets/image/cat8.png');
        this.load.image('cat9', 'assets/image/cat9.png');
        this.load.image('cat10', 'assets/image/cat10.png');
        this.load.image('cat11', 'assets/image/cat11.png');
        this.load.image('cat12', 'assets/image/cat12.png');
        
        this.load.image('hand1', 'assets/image/hand1.png');
        this.load.image('hand2', 'assets/image/hand2.png');
        this.load.image('hand3', 'assets/image/hand3.png');
        this.load.image('hand4', 'assets/image/hand4.png');
        this.load.image('hand5', 'assets/image/hand5.png');
        this.load.image('hand6', 'assets/image/hand6.png');
        this.load.image('hand7', 'assets/image/hand7.png');
        this.load.image('hand8', 'assets/image/hand8.png');
        this.load.image('hand9', 'assets/image/hand9.png');
        this.load.image('hand10', 'assets/image/hand10.png');
        this.load.image('hand11', 'assets/image/hand11.png');
        this.load.image('hand12', 'assets/image/hand13.png');
        this.load.image('hand13', 'assets/image/hand13.png');
        this.load.image('hand14', 'assets/image/hand14.png');
        this.load.image('hand15', 'assets/image/hand15.png');
        this.load.image('hand16', 'assets/image/hand16.png');
        
        this.load.image('fountain1', 'assets/image/fountain1.png');
        this.load.image('fountain2', 'assets/image/fountain2.png');
        this.load.image('fountain3', 'assets/image/fountain3.png');
        this.load.image('fountain4', 'assets/image/fountain4.png');
        this.load.image('fountain5', 'assets/image/fountain5.png');
        this.load.image('fountain6', 'assets/image/fountain6.png');
        this.load.image('fountain7', 'assets/image/fountain7.png');
        this.load.image('fountain8', 'assets/image/fountain8.png');
        this.load.image('fountain9', 'assets/image/fountain9.png');
        this.load.image('fountain10', 'assets/image/fountain10.png');
        
        this.load.image('type1', 'assets/image/type1.png');
        this.load.image('type2', 'assets/image/type2.png');
        this.load.image('type3', 'assets/image/type3.png');
        this.load.image('type4', 'assets/image/type4.png');
        this.load.image('type5', 'assets/image/type5.png');
        this.load.image('type6', 'assets/image/type6.png');
        this.load.image('type7', 'assets/image/type7.png');
        this.load.image('type8', 'assets/image/type8.png');
        this.load.image('type9', 'assets/image/type9.png');
        
        this.load.image('write1', 'assets/image/write1.png');
        this.load.image('write2', 'assets/image/write2.png');
        this.load.image('write3', 'assets/image/write3.png');
        this.load.image('write4', 'assets/image/write4.png');
        this.load.image('write5', 'assets/image/write5.png');
        this.load.image('write6', 'assets/image/write6.png');
        this.load.image('write7', 'assets/image/write7.png');
        this.load.image('write8', 'assets/image/write8.png');
        this.load.image('write9', 'assets/image/write9.png');
        this.load.image('write10', 'assets/image/write10.png');
        this.load.image('write11', 'assets/image/write11.png');
        this.load.image('write12', 'assets/image/write12.png');
        this.load.image('write13', 'assets/image/write13.png');
        this.load.image('write14', 'assets/image/write14.png');
        this.load.image('write15', 'assets/image/write15.png');
        
        this.load.image('maggie1', 'assets/image/maggie1.png');
        this.load.image('maggie2', 'assets/image/maggie2.png');
        this.load.image('maggie3', 'assets/image/maggie3.png');
        this.load.image('maggie4', 'assets/image/maggie4.png');
        this.load.image('maggie5', 'assets/image/maggie5.png');
        this.load.image('maggie6', 'assets/image/maggie6.png');
        this.load.image('maggie7', 'assets/image/maggie7.png');
        this.load.image('maggie8', 'assets/image/maggie8.png');
        this.load.image('maggie9', 'assets/image/maggie9.png');
        this.load.image('maggie10', 'assets/image/maggie10.png');
        this.load.image('maggie11', 'assets/image/maggie11.png');
        this.load.image('maggie12', 'assets/image/maggie12.png');
        this.load.image('maggie13', 'assets/image/maggie13.png');
        this.load.image('maggie14', 'assets/image/maggie14.png');
        this.load.image('maggie15', 'assets/image/maggie15.png');
        this.load.image('maggie16', 'assets/image/maggie16.png');
        
        this.load.image('juice1', 'assets/image/juice1.png');
        this.load.image('juice2', 'assets/image/juice2.png');
        this.load.image('juice3', 'assets/image/juice3.png');
        this.load.image('juice4', 'assets/image/juice4.png');
        this.load.image('juice5', 'assets/image/juice5.png');
        this.load.image('juice6', 'assets/image/juice6.png');
        this.load.image('juice7', 'assets/image/juice7.png');
        this.load.image('juice8', 'assets/image/juice8.png');
        this.load.image('juice9', 'assets/image/juice9.png');
        this.load.image('juice10', 'assets/image/juice10.png');
        this.load.image('juice11', 'assets/image/juice11.png');
        this.load.image('juice12', 'assets/image/juice12.png');
        this.load.image('juice13', 'assets/image/juice13.png');
        this.load.image('juice14', 'assets/image/juice14.png');
        
        this.load.image('egg1', 'assets/image/egg1.png');
        this.load.image('egg2', 'assets/image/egg2.png');
        this.load.image('egg3', 'assets/image/egg3.png');
        this.load.image('egg4', 'assets/image/egg4.png');
        this.load.image('egg5', 'assets/image/egg5.png');
        this.load.image('egg6', 'assets/image/egg6.png');
        this.load.image('egg7', 'assets/image/egg7.png');
        this.load.image('egg8', 'assets/image/egg8.png');
        this.load.image('egg9', 'assets/image/egg9.png');
        this.load.image('egg10', 'assets/image/egg10.png');
        this.load.image('egg11', 'assets/image/egg11.png');
        this.load.image('egg12', 'assets/image/egg12.png');
        
        this.load.image('coffee1', 'assets/image/coffee1.png');
        this.load.image('coffee2', 'assets/image/coffee2.png');
        this.load.image('coffee3', 'assets/image/coffee3.png');
        this.load.image('coffee4', 'assets/image/coffee4.png');
        this.load.image('coffee5', 'assets/image/coffee5.png');
        this.load.image('coffee6', 'assets/image/coffee6.png');
        this.load.image('coffee7', 'assets/image/coffee7.png');
        this.load.image('coffee8', 'assets/image/coffee8.png');
        this.load.image('coffee9', 'assets/image/coffee9.png');
        
        this.load.image('fridge1', 'assets/image/fridge1.png');
        this.load.image('fridge2', 'assets/image/fridge2.png');
        this.load.image('fridge3', 'assets/image/fridge3.png');
        this.load.image('fridge4', 'assets/image/fridge4.png');
        this.load.image('fridge5', 'assets/image/fridge5.png');
        this.load.image('fridge6', 'assets/image/fridge6.png');
        this.load.image('fridge7', 'assets/image/fridge7.png');
        this.load.image('fridge8', 'assets/image/fridge8.png');
        this.load.image('fridge9', 'assets/image/fridge9.png');
        this.load.image('fridge10', 'assets/image/fridge10.png');
        this.load.image('fridge11', 'assets/image/fridge11.png');
        
        this.load.image('book1', 'assets/image/book1.png');
        this.load.image('book2', 'assets/image/book2.png');
        this.load.image('book3', 'assets/image/book3.png');
        this.load.image('book4', 'assets/image/book4.png');
        this.load.image('book5', 'assets/image/book5.png');
        this.load.image('book6', 'assets/image/book6.png');
        this.load.image('book7', 'assets/image/book7.png');
        this.load.image('book8', 'assets/image/book8.png');
        this.load.image('book9', 'assets/image/book9.png');
        this.load.image('book10', 'assets/image/book10.png');
        this.load.image('book11', 'assets/image/book11.png');
        this.load.image('book12', 'assets/image/book12.png');
        this.load.image('book13', 'assets/image/book13.png');


        this.load.image('lid1', 'assets/image/lid1.png');
        this.load.image('lid2', 'assets/image/lid2.png');
        
        this.load.audio('purr', 'assets/sound/Purr.wav');
        this.load.audio('faucet', 'assets/sound/wFaucet.mp3');
        this.load.audio('writing', 'assets/sound/writing.wav');
        this.load.audio('morning', 'assets/sound/morning.wav');
        this.load.audio('faucetClick', 'assets/sound/FaucetClick.wav');
        this.load.audio('wFountain', 'assets/sound/wFountain.wav');
        this.load.audio('water', 'assets/sound/water.wav');
        this.load.audio('slurp', 'assets/sound/slurp.wav');
        this.load.audio('page', 'assets/sound/page.wav');
        this.load.audio('dog', 'assets/sound/dogWalk.wav');
        this.load.audio('eggFry', 'assets/sound/eggFry.wav');
        this.load.audio('juiceShake', 'assets/sound/juiceShake.wav');
        this.load.audio('fridgeHum', 'assets/sound/fridge.wav');
        
        this.load.audio('click1', 'assets/sound/click1.wav');
        this.load.audio('click2', 'assets/sound/click2.wav');
        this.load.audio('click3', 'assets/sound/click3.wav');
        this.load.audio('click4', 'assets/sound/click4.wav');
        this.load.audio('click5', 'assets/sound/click5.wav');
        
        this.load.audio('tone1', 'assets/sound/roomTone1.mp3');
        this.load.audio('tone3', 'assets/sound/roomTone3.wav');
        
        
    }, 
    
    create: function(){
        this.ready = true;
        this.state.start('Manager');
    }
    
};