window.onload = function(){
	var forme;
     
    /* Initialisation de la zone Canvas */
    // Recuperation de l'element canvas
    forme = document.getElementById("board");
    //On lui donne une hauteur et largeur, faites vous plaiz'
    forme.width =forme.height  = _tailleCase * _tailleMax;
    //forme.style.marginLeft = (window.innerWidth - forme.width)*0.5+'px';
    //forme.style.marginTop = (window.innerHeight - forme.height)*0.2+'px';
     
    //Recuperation du contexte canvas
    _context = forme.getContext("2d");  
     
    // Génération du laby 
    _map = genererLaby(_tailleMax);
     
    //Dessin du laby
    dessiner(_context);
    
    var jeremy = new Jeremy(_map);
	joueur = new Joueur(_map);
    //alert(jeremy.orientation);
    console.log(_map[1][2]);
    //var res = jeremy.canWalk(5, 6);
    
    /*
    for (var i = 0 ; i < 5 ; i++) {
    	jeremy.turnLeft();
        console.log(jeremy.getOrientation());
    }
    */
    
    setInterval(function() {
		jeremy.move();
	}, 200);
    
	
}