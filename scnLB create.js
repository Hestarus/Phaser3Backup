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
    var panel = this.add.image(X_POSITION.CENTER, Y_POSITION.CENTER, 'panel_skor');
    panel.setOrigin(0.5);
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
