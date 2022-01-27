function create(){
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
    
    this.add.image(X_POSITION.CENTER, Y_POSITION.CENTER, 'bg_start');
    var panel = this.add.image(X_POSITION.CENTER, Y_POSITION.CENTER, 'panel');
    panel.setOrigin(0.5);
    panel.setDepth(10);
    panel.setAlpha(1);
    
    
    var nilaiscore1 = localStorage["session"];
    var nilaiscore2 = localStorage["session"];
    var nilaiscore3 = localStorage["session"];
    var nilaiscore4 = localStorage["session"];
    var nilaiscore5 = localStorage["session"];

    var score = localStorage["session"];
    var highscoreLB = localStorage["highscore_LB"];
    
    var retrievedData = localStorage.getItem("session");
    var scoreData = JSON.parse(retrievedData);
    console.log(scoreData);

        let label_score1 = this.add.text(panel.x, panel.y -170, "Score Ke 1: "+ scoreData[0]);
        label_score1.setOrigin(0.5);
        label_score1.setDepth(10);
        label_score1.setFontSize(40);
        label_score1.setTint(0xff732e);
        
        let label_score2 = this.add.text(panel.x, panel.y -130, "Score Ke 2: "+ scoreData[1]);
        label_score2.setOrigin(0.5);
        label_score2.setDepth(10);
        label_score2.setFontSize(40);
        label_score2.setTint(0xff732e);
        
        let label_score3 = this.add.text(panel.x, panel.y -90, "Score Ke 3: "+ scoreData[2]);
        label_score3.setOrigin(0.5);
        label_score3.setDepth(10);
        label_score3.setFontSize(40);
        label_score3.setTint(0xff732e);
        
        let label_score4 = this.add.text(panel.x, panel.y -50, "Score Ke 4: "+ scoreData[3]);
        label_score4.setOrigin(0.5);
        label_score4.setDepth(10);
        label_score4.setFontSize(40);
        label_score4.setTint(0xff732e);
        
        let label_score5 = this.add.text(panel.x, panel.y + -10, "Score Ke 5: "+ scoreData[4]);
        label_score5.setOrigin(0.5);
        label_score5.setDepth(10);
        label_score5.setFontSize(40);
        label_score5.setTint(0xff732e);    
    
    
    
    
        
    
    //MEMASUKAN SCORE KE PANEL
    
    
    var btnBack = this.add.image(panel.x, Y_POSITION.CENTER+ 200, 'btn_play');
    btnBack.setScale(0.5);
    btnBack.setInteractive();
    btnBack.setDepth(10);
    
    
    this.input.on('gameobjectup', function (pointer, gameObject) {
        // console.log("Scene Menu | Object End Click");

        if (gameObject == btnBack) {
            btnBack.setTint(0xffffff);
            this.scene.start('scnMenu');
            // this.snd_touch.play();
        }
    }, this);
    
}
