function create() {

    X_POSITION =
    {
        'LEFT': 0,
        'CENTER': game.canvas.width / 2,
        'RIGHT': game.canvas.width,
    };

    Y_POSITION =
    {
        'TOP': 0,
        'CENTER': game.canvas.height / 2,
        'BOOTOM': game.canvas.height,
    };

    if (snd_ambience == null) {
        snd_ambience = this.sound.add('snd_ambience');
        snd_ambience.loop = true;
        snd_ambience.setVolume(0.35);
        snd_ambience.play();
    }
    

    
    this.backgrounds = [];

    var bg_x = 1366 / 2;

    for (let i = 0; i < 3; i++) {
        var bg_awal = [];
        var BG = this.add.image(bg_x, 768 / 2, 'bg_new');
        BG.setData('kecepatan', 2); //2
        bg_awal.push(BG);
        this.backgrounds.push(bg_awal);
        bg_x += 1366
    }
    
    //=====MENAMBAHKAN HANTU=====
    this.halangan = [];
    this.timerHalangan = 0;
    
    
    // membuat variabel sound lain
    this.snd_touch = this.sound.add('snd_touch');
    var snd_transisi = this.sound.add('snd_transisi_menu');

    // menambahkan variabel penanda apakah tombol sedang diklik atau tidak
    var btnClicked = false;

    // menambahkan background ke dalam scene
    // this.add.image(X_POSITION.CENTER, Y_POSITION.CENTER, 'bg_start');

    var spnCoin = this.add.spine(X_POSITION.CENTER, 100, 'spn_chara', 'animation', true);
    spnCoin.setScale(0.5);


    const mummyAnimation = this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('sps_mummy'),
        framerate: 16,
    })

    const sprite = this.add.sprite(X_POSITION.LEFT + 100, Y_POSITION.BOOTOM-90, 'sps_mummy').setScale(4);
    sprite.play({ key: 'walk', repeat: -1 })
    
    const sprite2 = this.add.sprite(X_POSITION.RIGHT - 100, Y_POSITION.BOOTOM-90, 'sps_mummy').setScale(4);
    sprite2.play({ key: 'walk', repeat: -1 })
    
    var particleL = this.add.particles('ptc_flares');
    particleL.setVisible(false);
    particleL.createEmitter({
        frame: 'blue',
        x: X_POSITION.CENTER - 120,
        y: Y_POSITION.CENTER - 150,
        lifespan: 1400,
        speed: { min: 100, max: 300 },
        angle: 220,
        gravityY: 500,
        scale: { start: 0.6, end: 0 },
        quantity: 1,
        blendMode: 'ADD',
    })

    var particleR = this.add.particles('ptc_flares');
    particleL.setVisible(false);
    particleL.createEmitter({
        frame: 'yellow',
        x: X_POSITION.CENTER + 120,
        y: Y_POSITION.CENTER - 170,
        lifespan: 1400,
        speed: { min: 100, max: 300 },
        angle: 320,
        gravityY: 500,
        scale: { start: 0.6, end: 0 },
        quantity: 1,
        blendMode: 'ADD',
    })

    // menambahkan sprite tombol Play ke dalam scene
    var btnPlay = this.add.image(X_POSITION.CENTER, Y_POSITION.CENTER, 'btn_play');
    btnPlay.setDepth(10);
    btnPlay.setInteractive();
    btnPlay.setScale(0);

    this.tweens.add({
        targets: btnPlay,
        ease: 'Back',
        duration: 500,
        delay: 750,
        scaleX: 1,
        scaleY: 1,
    });
    
    var btnLb = this.add.image(X_POSITION.CENTER, Y_POSITION.CENTER + 160, 'btn_Lb');
    
    if(localStorage['session'] == null){
        btnLb.setDepth(10);
        btnLb.setScale(0.8);
        btnLb.setInteractive()
    }
    else{
        btnLb.setDepth(10);
        btnLb.setScale(0.8);
        btnLb.setInteractive()
    }
    
    
    

    var titleGame = this.add.image(X_POSITION.CENTER, Y_POSITION.CENTER, 'title_game');
    titleGame.setDepth(10);
    titleGame.y -= 384;

    this.tweens.add({
        ease: 'Bounce.easeOut',
        targets: titleGame,
        duration: 750,
        delay: 250,
        y: 200,
        onComplete: function () {
            particleL.setVisible(true);
            particleR.setVisible(true);
            snd_transisi.play();
        }
    });
    
    //=======Menampung Nilai Tertinggi=====
    var skorTertinggi = localStorage["highscore"] || 0;

    // membuat panel nilai
    var panelSkor = this.add.image(X_POSITION.CENTER, 768 - 120, 'panel_skor');
    panelSkor.setOrigin(0.5);
    panelSkor.setDepth(10);
    panelSkor.setAlpha(0.8);

    // membuat label skor pada panel
    var lblSkor = this.add.text(panelSkor.x + 25, panelSkor.y, "Highscore:" + skorTertinggi);
    lblSkor.setOrigin(0.5);
    lblSkor.setDepth(10);
    lblSkor.setFontSize(30);
    lblSkor.setTint(0xff732e);
    
    this.input.on('gameobjectover', function (pointer, gameObject) {
        console.log("Scene Menu | Object Over");

        if (gameObject == btnLb) {
            btnLb.setTint(0x616161);
        }

    }, this);

    this.input.on('gameobjectout', function (pointer, gameObject) {
        console.log("Scene Menu | Object Out");

        if (gameObject == btnLb) {
            btnLb.setTint(0xffffff);
        }

    }, this);
    

    // menambahkan input user
    this.input.on('gameobjectover', function (pointer, gameObject) {
        console.log("Scene Menu | Object Over");

        if (gameObject == btnPlay) {
            btnPlay.setTint(0x616161);
        }

    }, this);

    this.input.on('gameobjectout', function (pointer, gameObject) {
        console.log("Scene Menu | Object Out");

        if (gameObject == btnPlay) {
            btnPlay.setTint(0xffffff);
        }

    }, this);

    this.input.on('gameobjectdown', function (pointer, gameObject) {
        console.log("Scene Menu | Object Click");

        if (gameObject == btnPlay) {
            btnPlay.setTint(0x616161);
            btnClicked = true;
        }

    }, this);
    // menambahkan deteksi objek selesai diklik
    this.input.on('gameobjectup', function (pointer, gameObject) {
        console.log("Scene Menu | Object End Click");

        if (gameObject == btnPlay) {
            btnPlay.setTint(0xffffff);
            this.scene.start('scnPlay');
            this.snd_touch.play();
        }
        
        if (gameObject == btnLb) {
            btnPlay.setTint(0xffffff);
            this.scene.start('scnLB');
            this.snd_touch.play
            // var a = [];
            // a = JSON.parse(localStorage.getItem('session')) || [];
            // a.push(0,0,0,0);
        }

    }, this);

    this.input.on('pointerup', function (pointer, currentlyOver) {
        console.log("Scene Menu | Mouse Up");

        btnClicked = false;

    }, this);

}
