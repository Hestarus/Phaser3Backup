function update() {
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
    
    if (this.isGameRunning) {
        this.chara.y -= 5;
        if (this.chara.y > 690) this.chara.y = 690;

        for (let i = 0; i < this.backgrounds.length; i++) {
            for (var j = 0; j < this.backgrounds[i].length; j++) {
                this.backgrounds[i][j].x -= this.backgrounds[i][j].getData('kecepatan');
                if (this.backgrounds[i][j].x <= -(1366 / 2)) {
                    var diff = 1366 / 2 * this.backgrounds[i].length;
                    this.backgrounds[i][j].x = 1366 + 1366 / 2 + diff;
                }
            }
        }
        if (this.timerHalangan == 0) {
            var acak_y = Math.floor((Math.random() * 680) + 60);
            var halanganBaru = this.add.image(X_POSITION.RIGHT, acak_y, 'obstc');
            halanganBaru.setOrigin(0.0);
            halanganBaru.setData("status_aktif", true);
            halanganBaru.setData("kecepatan", Math.floor((Math.random() * 15) + 10));
            halanganBaru.setDepth(5);

            this.halangan.push(halanganBaru);
            this.timerHalangan = Math.floor((Math.random() * 50) + 10);
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
        
        //SAJEN
        if (this.timerHalangan == 0) {
            var sajen_y = Math.floor((Math.random() * 680) + 60);
            var sajenBaru = this.add.image(X_POSITION.RIGHT, sajen_y, 'sajen');
            sajenBaru.setOrigin(0.0);
            sajenBaru.setData("status_aktif", true);
            sajenBaru.setData("kecepatan", 15);
            sajenBaru.setDepth(5);

            this.sajen.push(sajenBaru);
            this.timerSajen = Math.floor((Math.random() * 200) + 150);
        }
        
        for (let i = this.sajen.length - 1; i >= 0; i--) {
            this.sajen[i].x -= this.sajen[i].getData("kecepatan");

            if (this.sajen[i].x < -200) {
                this.sajen[i].destroy();
                this.sajen.splice(i, 1);
                break;
            }
        }
        this.timerSajen--;
        
        for(let sajenScore = this.sajen.length -1; sajenScore >= 0; sajenScore--){
            if (this.chara.getBounds().contains(this.sajen[sajenScore].x, this.sajen[sajenScore].y)){
                this.sajen[sajenScore].destroy();
                this.sajen.splice(sajenScore, 1);
                this.sajenScore++;
                this.label_sajen_score.setText("Sajen: "+ this.sajenScore);
                break;
            }
        }
        
        for (var i = this.halangan.length - 1; i >= 0; i--) {
            if (this.chara.x > this.halangan[i].x + 50 && this.halangan[i].getData("status_aktif") == true) {
                this.halangan[i].setData("status_aktif", false);
                this.score++;
                this.label_score.setText("Score: " + this.score);
            }
        }
        for (let i = this.halangan.length - 1; i >= 0; i--) {
            if (this.chara.getBounds().contains(this.halangan[i].x, this.halangan[i].y)) {
                this.halangan[i].setData("status_aktif", false);
                this.isGameRunning = false;
                this.snd_dead.play();
                this.trail.setVisible(false);
                if (this.charaTweens != null) {
                    this.charaTweens.stop();
                }
                let myScene = this;
                this.charaTweens = this.tweens.add({
                    targets: this.chara,
                    ease: 'Elastic.easeOut',
                    duration: 2000,
                    alpha: 0,
                    onComplete: myScene.gameOver
                });

                break;

            }
        }
        if (this.chara.y < -50) {
            this.isGameRunning = false;
            this.snd_dead.play();
            this.trail.setVisible(false);
            if (this.charaTweens != null) {
                this.charaTweens.stop();
            }
            let myScene = this;
            this.charaTweens = this.tweens.add({
                targets: this.chara,
                ease: 'Elastic.easeOut',
                duration: 2000,
                alpha: 0,
                onComplete: myScene.gameOver
            });

        }
    }
}
