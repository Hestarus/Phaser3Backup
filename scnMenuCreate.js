function create(){
    var skorTertinggi = localStorage["highscore"] || 0;
    var btnClicked = false;
    
    this.add.image(1024/2, 768/2, 'bg_start');
   
    var btnPlay = this.add.image(1024/2, 768/2, 'btn_play');
    btnPlay.setDepth(10);
    btnPlay.setScale(0);
    btnPlay.setInteractive();
    
    this.tweens.add({
        targets: btnPlay,
        ease: 'Back',
        duration: 500,
        delay: 750,
        scaleX: 1,
        scaleY: 1,
    })
   
    var titleGame = this.add.image(1024/2, 200, 'title_game');
    titleGame.setDepth(10);
    titleGame.y -= 384;
    
    this.tweens.add({
        targets: titleGame,
        ease: 'Bounce.easeOut',
        delay: 750,
        duration: 500,
        y: 200,
    })
    
    this.input.on('gameobjectover', function (pointer, gameObject){
        console.log("Scene Menu | Object Over");
        
        if (gameObject == btnPlay){
            btnPlay.setTint(0x616161);
        }
        
    }, this);
    
    this.input.on('gameobjectout', function (pointer, gameObject){
        console.log("Scene Menu | Object Out");
        
        if (gameObject == btnPlay){
            btnPlay.setTint(0xffffff);
        }
        
    }, this);
    
    this.input.on('gameobjectdown', function (pointer, gameObject){
        console.log("Scene Menu | Object Click");
        
        if (gameObject == btnPlay){
            btnPlay.setTint(0x616161);
            btnClicked = true;
        }
        
    }, this);
        // menambahkan deteksi objek selesai diklik
    this.input.on('gameobjectup', function (pointer, gameObject){
        console.log("Scene Menu | Object End Click");
        
        if (gameObject == btnPlay){
            btnPlay.setTint(0xffffff);
            this.scene.start('scnPlay');

        }
        
    }, this);
    
    this.input.on('pointerup', function (pointer, currentlyOver){
        console.log("Scene Menu | Mouse Up");
        
        btnClicked = false;
        
    }, this);
    
    //Panel Skor Tertinggi
    
    var panelSkor = this.add.image(1024/2, 768-120, 'panel_skor');
    panelSkor.setOrigin(0.5);
    panelSkor.setDepth(10);
    panelSkor.setAlpha(0.8);
    
    //Label skor pada panel
    
    var lbskor = this.add.text(panelSkor.x+25, panelSkor.y, "Highscore:" + skorTertinggi);
    lbskor.setOrigin(0.5);
    lbskor.setDepth(10);
    lbskor.setFontSize(30);
    lbskor.setTint(0xff732e);
}
