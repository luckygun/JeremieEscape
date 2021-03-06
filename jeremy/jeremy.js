// Point cardinaux
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
		if (this.map[x][y] === PLAYER || this.map[x][y] === WALL) {
			return false;
		}

		return true;
	}

	this.turnRight = function() {
		// Si on arrive à l'Ouest et qu'on tourne a droite, au revient au Nord
		if (this.orientation < O) {
			this.orientation++;

		} else {
			this.orientation = N;
		}

	};
	
	this.turnLeft = function() {
		if(this.orientation > N) {
			this.orientation--;
			
		} else {
			this.orientation = O;
		}
		
	};

	this.move = function() {
		var x2, y2;
		var pathFound = false;
		
		x2 = this.x;
		y2 = this.y;
		
		// Regarde s'il y a un chemin à gauche
		this.turnLeft();
		if(this.isPath(this.x, this.y)) {
			//this.stepForward(x2, y2)
			return true;
		}
		
		// // Regarde s'il y a un chemin à gauche
		this.turnRight();
		this.turnRight();
		if(this.isPath(this.x, this.y)) {
			//this.stepForward(x2, y2)
			return true;
		}
		
		// On revient à l'orientation de début
		this.turnLeft();
		if(this.isPath(this.x, this.y)) {
			//this.stepForward(x2, y2)
			this.stepForward(x2, y2);
			return true;
		}
		
		// Sinon on revient en arrière (on tourne de 180°)
		this.turnLeft();
		this.turnLeft();
		return false;
		
		/*
		// Recherche d'une case adjasecente libre
		while (!pathFound) {

			// Coordonnée de la case où on va aller
			

			
			
			// On cherche une autre case aux alentours si elle n'est pas praticable
			if (!this.canWalk(x2, y2)) {
				this.turnRight();
				pathFound = false;
			}
			// Sinon le chemin a été trouvé
			else pathFound = true;

		}
		
		// Jeremy avance : le point rouge est déplacé à l'écran
		this.stepForward(x2, y2);
		*/
	};
	
	this.isPath = function(x2, y2) {
		
		// On regarde l'otientation de Jeremy
		switch (this.orientation) {
		case N:
			// On regarde si on est pas déjà tout en haut du tableau
			if (this.y > 0) {
				y2--;
			}
			break;

		case E:
			// On regarde si on est pas déjà tout à droite du tableau
			if (this.x < _tailleMax) {
				x2++;
			}
			break;

		case S:
			// On regarde si on est pas déjà tout en bas du tableau
			if (this.y < _tailleMax) {
				y2++;
			}
			break;

		case O:
			// On regarde si on est pas déjà tout en gauche du tableau
			if (this.x > 0) {
				x2--;
			}
			break;
		}
		
		if(this.canWalk(x2, y2)) return true;
		else return false;
	}
	
	this.stepForward = function(x2, y2) {

		// On met à jour le labyrinthe
		map[this.x][this.y] = 0;
		map[x2][y2] = 4;
		
		// Jeremy bouge vers la nouvelle case trouvée
		this.x = x2;
		this.y = y2;
		console.log(this.x + " " + this.y);
		
		// On met à jour la vue du canvas
		dessiner(_context);
		
		//dessinerCarre(_tailleCase, _couleur.C_3, _context, this.x, this.y);

	}
	
	this.getOrientation = function() {
		switch (this.orientation) {
		case N:
			return "N";
			break;

		case E:
			return "E";;
			break;

		case S:
			return "S";
			break;

		case O:
			return "O";
			break;
		}
	}
}