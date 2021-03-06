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
    
    this.timerHalangan = 0;
    this.halangan = [];
    this.backgrounds = [];
        //===========MENAMBAHKAN SESAJEN==================
    this.timerSajen = 0;
    this.sajen = [];
    this.sajenScore = 0;

    var bg_x = 1366 / 2;

    for (let i = 0; i < 3; i++) {
        var bg_awal = [];

        var BG = this.add.image(bg_x, 768 / 2, 'fg_loop_back');
        var FG = this.add.image(bg_x, 768 / 2, 'fg_loop');

        BG.setData('kecepatan', 2); //2
        FG.setData('kecepatan', 4); //4
        FG.setDepth(2);

        bg_awal.push(BG);
        bg_awal.push(FG);

        this.backgrounds.push(bg_awal);

        bg_x += 1366
    }

    this.chara = this.add.image(130, 768 / 2, 'chara');
    this.chara.setDepth(3);
    this.chara.setScale(0);
    //MENAMBAHKAN PARTIKEL
    this.trail = this.add.particles('ptc_blue');
    this.trailEmitter = this.trail.createEmitter({
        x: 0,
        y: 0,
        angle: { min: 0, max: 0, },
        scale: { start: 1, end: 0 },
        blendmode: 'SCREEN',
        lifespan: 400,
        speed: 100,
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
        onComplete: function () {
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

    for (let i = 0; i < this.snd_click.length; i++) {
        this.snd_click[i].setVolume(0.5);
    }

    //Menambahkan panel score
    this.score = 0;

    this.panel_score = this.add.image(X_POSITION.LEFT + 200, 60, 'panel_skor');
    this.panel_score.setOrigin(0.5);
    this.panel_score.setDepth(10);
    this.panel_score.setAlpha(0.8);

    this.label_score = this.add.text(this.panel_score.x + 25, this.panel_score.y, "Score: " + this.score);
    this.label_score.setOrigin(0.5);
    this.label_score.setDepth(10);
    this.label_score.setFontSize(30);
    this.label_score.setTint(0xff732e);

    // MENAMBAHKAN SAJEN SCORE
    this.sajenScore = 0;
    
    this.panel_sajen_score = this.add.image(X_POSITION.RIGHT - 200, 60, 'panel_skor');
    this.panel_sajen_score.setOrigin(0.5);
    this.panel_sajen_score.setDepth(10);
    this.panel_sajen_score.setAlpha(0.8);

    this.label_sajen_score = this.add.text(this.panel_sajen_score.x + 25, this.panel_sajen_score.y,"Sajen: " + this.sajenScore);
    this.label_sajen_score.setOrigin(0.5);
    this.label_sajen_score.setDepth(10);
    this.label_sajen_score.setFontSize(30);
    this.label_sajen_score.setTint(0xff732e);
    
    
    
    this.gameOver = function () {
        let highscore   = localStorage["highscore"] || 0;
        if (myScene.score > highscore) {
            localStorage["highscore"] = myScene.score;
        }
        
        let highscore_LB = localStorage["highscore_LB"] || 0;
        localStorage["highscore_LB"] = myScene.score;
        var scoreOcong = myScene.sajenScore;
        
        function SaveDataToLocalStorage(score) {
            var a = [];
            a = JSON.parse(localStorage.getItem('session')) || [];
            a.push(score);
            
            function bblSort(arr) {
               for (var i = 0; i < arr.length; i++) {
                    for (var j = 0; j < (arr.length - i - 1); j++) {
                        if (arr[j] > arr[j + 1]) {
                        var temp = arr[j]
                        arr[j] = arr[j + 1]
                        arr[j + 1] = temp
                        }
                    }
                }
             }
            bblSort(a);
        
            
            a.reverse();
            if(a.length > 5){
                a.pop();
            }
            
            localStorage.setItem('session', JSON.stringify(a));
        }
        SaveDataToLocalStorage(scoreOcong);
        

        myScene.scene.start('scnMenu');
    }

    this.input.on('pointerup', function (pointer, currentlyOver) {
        console.log("Scene Play || Mouse Pointer Up");

        if (!this.isGameRunning) return;

        this.charaTweens = this.tweens.add({
            targets: this.chara,
            ease: 'Power1',
            duration: 750,
            y: this.chara.y + 200
        });

        this.snd_click[Math.floor((Math.random() * 2))].play();
    }, this);

}
