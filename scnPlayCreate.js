function create(){
    
    this.timerHalangan = 0;
    this.halangan = [];
    this.backgrounds = [];
    
    var bg_x = 1366/2;
    
    for(let i = 0; i < 2; i++){
        var bg_awal = [];
        
        var BG = this.add.image(bg_x, 768/2, 'fg_loop_back');
        var FG = this.add.image(bg_x, 768/2, 'fg_loop');
        
        BG.setData('kecepatan', 2);
        FG.setData('kecepatan', 4);
        FG.setDepth(2);
        
        bg_awal.push(BG);
        bg_awal.push(FG);
        
        this.backgrounds.push(bg_awal);
        
        bg_x += 1366
    }
    
    this.chara = this.add.image(130, 768/2, 'chara');
    this.chara.setDepth(3);
    this.chara.setScale(0);
    
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
	    }
	});
	
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
    }, this)
	
}
