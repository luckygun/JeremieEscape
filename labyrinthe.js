// http://lemon-cake.fr/generateur-labyrinthe-algo-growing-tree/

// mur = 2

var PLAYER = 3;
var WALL = 2;

var _couleur = {
    C_0 : "#FFFFFF", //blanc
    C_1 : "#242424", //gris
    C_2 : "#42E8CD", //turquoise
    C_3 : "#E81C3C", //rose
    C_4 : "#E8FF3C", //jaune
    C_5 : "#FFFF3C", //jaune clair
};

var _map; // Le tableau dans lequel sera stocké le laby
var _context; // Notre contexte canvas
var _tailleCase; // La taille d'une case (en px ici)
var _tailleMax; // Le nombre de case
     
_tailleMax = 29;
_tailleCase = 25;

function dessinerCarre(taille, couleur, ctx, x, y){
    ctx.fillStyle = couleur;
    ctx.fillRect(x, y, taille, taille)
    ctx.fill();
}

function genererLaby(_tailleZone){
    //Initialisation des variables utilisées dans le code
    var map = new Array(_tailleMax);
    var pile = new Array();
    var x, y , k, l, temp,fin, nbVoisins, dir;
    var voisins = new Array(4); 
     
    // Comme le calcul va être fait de nombreuses fois, on stocke le tout
    var maxTailleMax = _tailleMax-1;
     
    //On définit les bordures horizontales et on 
    for(x = 0; x < _tailleMax; x++){
        //Nécessaire en JS pour gérer les tableaux à 2 dimensions
        map[x] = new Array(_tailleMax);
        map[0][x] = map[x][0] = 2;
    }
     
    //Generation du reste du labyrinthe
    for(y = 2; y < _tailleMax; y=y+2){
        for(x = 2; x < _tailleMax; x=x+2){
            map[x][y-1] = 2;
            map[x-1][y] = 2;
            map[x][y] = 2;
             
        }
    }
    // Coordonnées aléatoire du début du chemin
    temp = Math.floor((_tailleMax-2)/2);
    x = Math.floor(Math.random()*temp)*2+1;
    y = Math.floor(Math.random()*temp)*2+1;
    do{
        fin = false;
        while(!fin){
            map[x][y] = 1;
            //Recherche des voisins libres
            nbVoisins = 0; //Dans un premier temps, aucun voisin n'a été trouvé
            //On test chaque case voisine, si la case est vide, on stocke sa direction dans un tableau
            if (( y-2 >= 1)&&( map[x][y-2] != 1 ))               voisins[nbVoisins++] = 0;
            if (( y+2 <= maxTailleMax)&&( map[x][y+2] != 1 ))    voisins[nbVoisins++] = 2;
            if (( x+2 <= maxTailleMax)&&( map[x+2][y] != 1 ))    voisins[nbVoisins++] = 1;
            if (( x-2 >= 1)&&( map[x-2][y] != 1 ))               voisins[nbVoisins++] = 3;
             
            //Si aucun voisin libre n'a été trouvé, on s'arrête là
            if(nbVoisins == 0 )fin = true;
             
            //Sinon, on cherche la prochaine case à visiter
            else{
                //Initialisation de la future direction de la case
                k = l = 0;
                //On empile le contexte de la case actuelle, pour revenir dessus ensuite
                pile.push(x);
                pile.push(y);
                //On choisit une direction selon celles stockées précédemment dans le tableau
                dir = voisins[Math.floor(Math.random()*nbVoisins)];
                switch(dir){
                    case 0 :
                        l -= 2;
                        break;
                    case 1 :
                        k += 2;
                        break;
                    case 2 :
                        l += 2;
                        break;
                    case 3 : 
                        k -= 2;
                        break;
                    default :
                        break;
                }
                //On retire le mur situé entre l'ancienne et la nouvelle case
                map[x+k/2][y+l/2] = 0;
                //On redéfinit les coordonnées de la case courante
                x += k;
                y += l;
            }
        }
        //Dans la mesure ou auncun voisin n'a été trouvé, on dépile afin de repartir
        //sur une autre case précédemment visitée
        y = pile.pop();
        x = pile.pop();
    }
    while(pile[0]);
         
     
    //Définition du départ et arrivée du laby
    map[1][1] = 3;
    map[_tailleMax-2][maxTailleMax] = 4;
     
    return map;
}

function dessiner(context){
    var c;//Couleur de la case
    //Sauvegarde du contexte avant les modification pour l'affichage du laby
    context.save();
    //Dessin du labyrinth
    for(var y = 0; y < _tailleMax; y++){
        for(var x = 0; x < _tailleMax; x++){
            // Utilisation d'un switch, plus pratique qu'une indexation
            // lors de la présence de cas particuliers
            switch(_map[x][y]){
                case 2 : // Mur
                    c = _couleur.C_1; // Noir / gris
                    break;
                case 3 : // Joueur
                    c = _couleur.C_2; // Bleu
                    break;
                case 4 : // Sortie -> position départ Jeremy
                    c = _couleur.C_3; // Rose
                    break;
                case 5 :
                    c = _couleur.C_4;
                    break;
                     
                default :
                    c = _couleur.C_0;
                    break;
            }
            dessinerCarre(_tailleCase, c, context,0, 0);
            //on déplace le contexte pour le dessin du prochain carré
            context.translate(_tailleCase,0);
        }
    // Une fois au bout de la ligne, retour au début à la ligne suivante
    context.translate(-_tailleCase*(_tailleMax), _tailleCase);
    }
    //Restauration du contexte pour repartir au bon endroit lors des prochains affichages
    context.restore();
     
}
