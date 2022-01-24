function create(){
    var skorTertinggi = localStorage["highscore"] || 0;
    var btnClicked = false;
    
    this.add.image(1024/2, 768/2, 'bg_start');
    
    //SPINE CHARACTER
    var spnCoin = this.add.spine(1024/2, 100, 'spn_chara', 'animation', true);
    spnCoin.setScale(0.5);
    
    const mummyAnimation = this.anims.create({
        key: 'walk',
        frame: this.anims.generateFrameNumbers('sps_mummy'),
        framRate: 16
    })
    
    const sprite = this.add.sprite(270, Y_POSISITION + 150, 'sps_mummy').setScale(4);
    sprite.play({key: 'walk', repeat: -1});
    
    var particleL = this.add.particles('ptc_flares');
    particleL.setVisible(false);
    particleL.createEmitter({
        frame: 'blue',
        x: 1024/2 - 100,
        y: 220,
        lifespan: 1400,
        speed: {min: 100, max: 300},
        angle: 220,
        gravityY: 500,
        scale: {start: 0.6, end: 0},
        quantity: 1,
        blendMode: 'ADD'
    });
    
    var particleR = this.add.particles('ptc_flares');
    particleR.setVisible(false);
    particleR.createEmitter({
        frame: 'yellow',
        x: 1024/2 + 100,
        y: 220,
        lifespan: 1400,
        speed: {min: 100, max: 300},
        angle: 320,
        gravity: 500,
        scale: {start: 0.6, end: 0},
        quantity: 1,
        blendMode: 'ADD'
    })
   
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
    
    //BACKSOUND GAME;
    if(snd_ambience == null){
        snd_ambience = this.sound.add('snd_ambience');
        snd_ambience.loop = true;
        snd_ambience.setVolume(0.35);
        snd_ambience.play();
    }
    
    this.snd_touch = this.sound.add('snd_touch');
    var snd_transisi = this.sound.add('snd_transisi_menu');
   
    var titleGame = this.add.image(1024/2, 200, 'title_game');
    titleGame.setDepth(10);
    titleGame.y -= 384;
    
    this.tweens.add({
        targets: titleGame,
        ease: 'Bounce.easeOut',
        delay: 750,
        duration: 500,
        y: 200,
        onComplete: function(){
            snd_transisi.play();
        }
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
            this.snd_touch.play();

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

    
