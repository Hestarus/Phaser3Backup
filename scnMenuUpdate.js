function update(){

	
	for (let i = 0; i < this.backgrounds.length; i++) {
            for (var j = 0; j < this.backgrounds[i].length; j++) {
                this.backgrounds[i][j].x -= this.backgrounds[i][j].getData('kecepatan');
                if (this.backgrounds[i][j].x <= -(1366 / 2)) {
                    var diff = 1366 / 2 * this.backgrounds[i].length-3;
                    this.backgrounds[i][j].x = 1366 + 1366 / 2 + diff;
                }
            }
        }
	
	if (this.timerHalangan == 0) {
        var acak_y = Math.floor((Math.random() * 680) + 60);
        var halanganBaru = this.add.image(1600, acak_y, 'ghost');
        halanganBaru.setOrigin(0.0);
        halanganBaru.setData("status_aktif", true);
        halanganBaru.setData("kecepatan", Math.floor((Math.random() * 30) + 15));
        halanganBaru.setDepth(0);
        this.halangan.push(halanganBaru);
        this.timerHalangan = Math.floor((Math.random() * 150) + 50);
    }
    for (let i = this.halangan.length - 1; i >= 0; i--) {
        this.halangan[i].x -= this.halangan[i].getData("kecepatan");
        if (this.halangan[i].x < -200) {
            this.halangan[i].destroy();
            this.halangan.splice(i, 1);
            break;
        }
    }
    
    this.timerHalangan--;
    for (var i = this.halangan.length - 1; i >= 0; i--) {
    
    }
        var enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        if(enter.isDown){
            // btnPlay.setTint(0xffffff);
            this.scene.start('scnPlay');
            this.snd_touch.play();
            console.log("Enter")
        }
}
