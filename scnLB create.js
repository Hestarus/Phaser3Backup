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
    
    var highscore = localStorage["highscore"] || 0; 

    this.add.image(X_POSITION.CENTER, Y_POSITION.CENTER, 'bg_start')
    
    //=====PANEL LEADERBOARD=====
    var panel = this.add.image(X_POSITION.CENTER, Y_POSITION.CENTER, 'panel_skor');
    
    var scoreText = this.add.text(panel.x + 25, panel.y, "Highscore: "+highscore)   
    scoreText.setOrigin(0.5);
    scoreText.setDepth(10);
    scoreText.setFontSize(30);
    scoreText.setTint(0xff732e);``
}
