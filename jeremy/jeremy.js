var N = 0, E = 1, S = 2, O = 3;

// IA d'un Jeremy = ennemie du jeu
function Jeremy(map) {
	this.map = map; // Labyrinthe où Jeremy se trouve
	this.orientation = N;
	this.visionField = 3;
	// On place par défaut Jeremy à l'arrivée du labyrinthe
	this.x = _tailleMax - 2;
	this.y = _tailleMax - 1;
	
	this.canWalk = function(x, y) {
		// Les murs et le joueur ne sont pas praticable
		if(this.map[x][y] === PLAYER
				|| this.map[x][y] === WALL) {
			return false;
		}
		
		return true;	
	}
	
	this.move;
	
	this.turnRight = function() {
		if(this.orientation < O) {
			this.orientation++;
			
		} else {
			this.orientation = N;
		}
		
	} ;
}