function update(){
		if(this.isGameRunning) {
		    
		    this.chara.y -= 5;
	    
	        if(this.chara.y > 690) this.chara.y =  690
		    
		    for(let i = 0; i < this.backgrounds.length; i++){
		        for(var j = 0; j < this.backgrounds[i].length; j++){
		            this.backgrounds[i][j].x -= this.backgrounds[i][j].getData('kecepatan');
		            
		            if(this.backgrounds[i][j].x <= -(1366/2)){
		                
		                var diff = this.backgrounds[i][j].x + (1366/2);//1366/2
		                
		                this.backgrounds[i][j].x = 1366 + 1366/2 + diff
		            }
		        }
		    }
		   
		   //menambahkan halangan pada game 
		    if(this.timerHalangan == 0){
		        var acak_y = Math.floor((Math.random()*680) + 60);
		        
		        var halanganBaru = this.add.image(1500, acak_y, 'obstc');
		        
		        halanganBaru.setOrigin(0.0);
		        halanganBaru.setData("status_aktif", true);
		        halanganBaru.setData("kecepatan", Math.floor((Math.random()*15)+10));
		        halanganBaru.setDepth(5)
		        
		        this.halangan.push(halanganBaru); //Memasukkan nilai dari halanganBaru kedalam array halangan
		        
		        this.timerHalangan = Math.floor((Math.random()*50 + 10))
		    }
		    
		    for(let i = this.halangan.length - 1; i >= 0; i--){
		        this.halangan[i].x -= this.halangan[i].getData("kecepatan");
		        
		        if(this.halangan[i].x < -200){
		            this.halangan[i].destroy();
		            
		            this.halangan.splice(i,1);
		            
		            break;
		        }
		    }
		    
		    this.timerHalangan--;
		    
		    //menambahkan panel score
		    for(var i = this.halangan.length-1; i >= 0; i--){
		        
		        if(this.chara.x > this.halangan[i].x + 50 && this.halangan[i].getData("status_aktif") == true){
		            this.halangan[i].setData("status_aktif", false);
		            this.score++;
		            this.label_score.setText(this.score)
		        }
		    }
		    
		    
		    for(let i = this.halangan.length - 1; i >= 0; i--){
		        if(this.chara.getBounds().contains(this.halangan[i].x, this.halangan[i].y)){
		         this.halangan[i].setData("status_aktif", false);
		         
		         this.isGameRunning = false;
		         
		         this.snd_dead.play();
		         this.trail.setVisible(false);
		         
		         if(this.charaTweens != null){
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
		    
		    if(this.chara.y < -50){
		        this.isGameRunning = false;
		        
		        this.snd_dead.play();
		        this.trail.setVisible(false);
		        
		        if(this.charaTweens != null){
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
