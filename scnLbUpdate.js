function update(){
    for (let i = 0; i < this.backgrounds.length; i++)
	{
	    for (var j = 0; j < this.backgrounds[i].length;  j++)
	    {
	        this.backgrounds[i][j].x -= this.backgrounds[i][j].getData('kecepatan');
	        if  (this.backgrounds[i][j].x <= -(1366/2)){
	            var diff = 1366/2 * this.backgrounds[i].length - 3;
	            this.backgrounds[i][j].x = 1366 + 1366/2 + diff;
	        }
	    }
	}
}
