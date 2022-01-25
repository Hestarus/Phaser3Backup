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
    panel.setAlpha(0.8);
    
    this.score = localStorage["highscore_LB"];
    var label_score = this.add.text(panel.x - 85, panel.y -170, "Score Terakhir: "+ this.score);
    label_score.setOrigin(0.5);
    label_score.setDepth(10);
    label_score.setFontSize(30);
    label_score.setTint(0xff732e);
    
    var btnBack = this.add.image(panel.x + 210, Y_POSITION.CENTER, 'btn_play');
    btnBack.setScale(0.5);
    btnBack.setInteractive();
    
    
    this.input.on('gameobjectup', function (pointer, gameObject) {
        // console.log("Scene Menu | Object End Click");

        if (gameObject == btnBack) {
            btnBack.setTint(0xffffff);
            this.scene.start('scnMenu');
            this.snd_touch.play();
        }
    }, this);
    
}
