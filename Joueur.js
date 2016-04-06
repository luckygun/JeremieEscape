
function Joueur(map) {
	this.map = map; // Labyrinthe où le joueur se trouve


	// On place par défaut le joueur à l'entrée du labyrinthe
	this.x = 1;
	this.y = 1;

	this.canWalk = function(x, y) {
		if (this.map[x][y] === PLAYER || this.map[x][y] === WALL) {
			return false;
		}
		return true;
	}
	
	this.haut = function(){
		console.log("haut");
		map[this.x][this.y] = 0;
		if(this.canWalk((this.x),(this.y-1))===true){
			this.y = this.y-1;
		}
		map[this.x][this.y] = 3;
		dessiner(_context);
	}

	this.gauche = function(){
		console.log("gauche");
		map[this.x][this.y] = 0;
		if(this.canWalk((this.x-1),(this.y))===true){
			this.x = this.x-1;
		}
		map[this.x][this.y] = 3;
		dessiner(_context);
	}

	this.droite = function(){
		console.log("droite");
		map[this.x][this.y] = 0;
		if(this.canWalk((this.x+1),(this.y))===true){
			this.x = this.x+1;
		}
		map[this.x][this.y] = 3;
		dessiner(_context);
	}

	this.bas = function(){
		console.log("bas");
		map[this.x][this.y] = 0;
		if(this.canWalk((this.x),(this.y+1))===true){
			this.y = this.y+1;
		}
		map[this.x][this.y] = 3;
		dessiner(_context);
	}

}


