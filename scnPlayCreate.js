function create(){
    
    this.timerHalangan = 0;
    this.halangan = [];
    this.backgrounds = [];
    
    var bg_x = 1366/2;
    
    for(let i = 0; i < 2; i++){
        var bg_awal = [];
        
        var BG = this.add.image(bg_x, 768/2, 'fg_loop_back');
        var FG = this.add.image(bg_x, 768/2, 'fg_loop');
        
        BG.setData('kecepatan', 4); //2
        FG.setData('kecepatan', 8); //4
        FG.setDepth(2);
        
        bg_awal.push(BG);
        bg_awal.push(FG);
        
        this.backgrounds.push(bg_awal);
        
        bg_x += 1366
    }
    
    this.chara = this.add.image(130, 768/2, 'chara');
    this.chara.setDepth(3);
    this.chara.setScale(0);
    
    //MENAMBAHKAN PARTIKEL
    this.trail = this.add.particles('ptc_blue');
    this.trailEmitter = this.trail.createEmitter({
        x:0,
        y:0,
        angle: {min: 0, max: 0,},
        scale: {start: 1, end: 0},
        blendmode: 'SCREEN',
        lifespan: 400,
        speed:100,
        on: true,
        follow: this.chara,
        tint: 0xff1d00
    })
    
    this.trailEmitter.emitParticle(16);
    this.trail.setDepth(2);
    this.trail.setVisible(false);
    
    // this.isGameRunning = false;
	
	var myScene = this;
	
	this.tweens.add({
	    delay: 250,
	    targets: this.chara,
	    ease: 'Back.Out',
	    duration: 500,
	    scaleX: 1,
	    scaleY: 1,
	    onComplete: function(){
	        myScene.isGameRunning = true;
	        myScene.trail.setVisible(true)
	    }
	});
	
	//SUARA KETIKA BERTABRAKAN
	this.snd_dead = this.sound.add('snd_dead');
	
	this.snd_click = [];
	this.snd_click.push(this.sound.add('snd_klik_1'));
	this.snd_click.push(this.sound.add('snd_klik_2'));
	this.snd_click.push(this.sound.add('snd_klik_3'));
	
	for(let i = 0; i < this.snd_click.length; i++){
	    this.snd_click[i].setVolume(0.5);
	}
	
	//Menambahkan panel score
	this.score = 0;
	
	this.panel_score = this.add.image(1024/2, 60, 'panel_skor');
	this.panel_score.setOrigin(0.5);
	this.panel_score.setDepth(10);
    this.panel_score.setAlpha(0.8);
	
	this.label_score = this.add.text(this.panel_score.x + 25, this.panel_score.y, this.score);
	this.label_score.setOrigin(0.5);
	this.label_score.setDepth(10);
	this.label_score.setFontSize(30);
	this.label_score.setTint(0xff732e);
    
    
    this.gameOver = function(){
        let highscore = localStorage["highscore"] || 0;
        
        if(myScene.score > highscore){
            localStorage["highscore"] = myScene.score;
        }
        
        myScene.scene.start('scnMenu');
    }
    
    this.input.on('pointerup', function(pointer, currentlyOver){
        console.log("Scene Play || Mouse Pointer Up");
        
        if(!this.isGameRunning) return;
        
        this.charaTweens = this.tweens.add({
            targets: this.chara,
            ease: 'Power1',
            duration: 750,
            y: this.chara.y + 200
        })
        
        this.snd_click[Math.floor((Math.random()*2))].play();
    }, this)
	
}
