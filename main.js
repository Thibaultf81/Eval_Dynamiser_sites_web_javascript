// Liste des boutons et des dés
let newGameButton = document.getElementById('new_game');
let rollDiceButton = document.getElementById('roll_dice');
let holdButton = document.getElementById('hold');
let dice1 = document.getElementById('dice1');
let dice2 = document.getElementById('dice2');
let dice3 = document.getElementById('dice3');
let dice4 = document.getElementById('dice4');
let dice5 = document.getElementById('dice5');
let dice6 = document.getElementById('dice6');

// Scores des joueurs et "dots" pour déterminer le joueur qui lance le dé
// Score global
let globalScore1 = document.getElementById('global_score1');
let globalScore2 = document.getElementById('global_score2');
const globalScore = [globalScore1, globalScore2];

// Score courant
let currentScore1 = document.getElementById('score_current1');
let currentScore2 = document.getElementById('score_current2');
const currentScore = [currentScore1, currentScore2];

// "dot" pour voir quel joueur joue
let dotPlayer1 = document.getElementById('dot_player1');
let dotPlayer2 = document.getElementById('dot_player2');
const dotPlayer = [dotPlayer1, dotPlayer2];

// Permet de déterminer le joueur qui joue
let currentPlayer = 0;


// Fonction qui détermine un nombre aléatoire entre 1 et 6.
function rollDice(max) {
    return Math.floor((Math.random() * max) + 1);
}

const player = () => {
    // A chaque lancé de dé, le dé précédent ne sera plus affiché
    dice1.style.display = 'none';
    dice2.style.display = 'none';
    dice3.style.display = 'none';
    dice4.style.display = 'none';
    dice5.style.display = 'none';
    dice6.style.display = 'none';
    // récupère le chiffre aléatoire entre 1 et 6
    let randomNumber = rollDice(6);

    // détermine le dé à afficher en fonction du nombre aléatoire entre 1 et 6 généré
    switch(randomNumber) {
        case 1:
            dice1.style.display = 'inline';
            currentScore[currentPlayer].textContent = 0;
            dotPlayer[currentPlayer].style.display = 'none';
            changePlayer();
            return;
        case 2:
            dice2.style.display = 'inline';
            break;
        case 3:
            dice3.style.display = 'inline';
            break;
        case 4:
            dice4.style.display = 'inline';
            break;
        case 5:
            dice5.style.display = 'inline';
            break;
        case 6:
            dice6.style.display = 'inline';
            break;
    }

    // Ajoute le montant du dé dans le "Current score" du joueur
    currentScore[currentPlayer].textContent = parseInt(currentScore[currentPlayer].textContent) + randomNumber; 
    
    // On appelle la fonction qui ajoute de le score courant au score global
    holdButton.addEventListener('click', holdScore);
}

// Appel de la fonction qui ajoute le score au global et passe le tour
holdButton.addEventListener('click', holdScore);

// fonction qui permet de changer de joueur
function changePlayer() {
    currentPlayer += 1;
    currentPlayer = currentPlayer%2
    dotPlayer[currentPlayer].style.display = 'inline';
}

// fonction qui permet d'enregistrer le score courant dans le score global et de remettre le score courant à 0
// et de passer le tour
function holdScore() {
    globalScore[currentPlayer].textContent = parseInt(globalScore[currentPlayer].textContent) + parseInt(currentScore[currentPlayer].textContent);
    currentScore[currentPlayer].textContent = 0;
    if(parseInt(globalScore[currentPlayer].textContent) >= 100) {
        alert('Bravo ! le joueur ' + (currentPlayer + 1) + ' a gagné avec ' + globalScore[currentPlayer].textContent + ' points !');
        let restart = confirm('Voulez-vous relancer une partie ?')
        if(restart === true) {
        startGame();
        }
    }
    dotPlayer[currentPlayer].style.display = 'none';
    changePlayer();
}

// Fonction qui lors du clic sur "New Game" demande si on veut relancer une partie ou non.
function newGame() {
    newGameButton.addEventListener('click', () => {
        let restart = confirm('Voulez-vous relancer une partie ?')
        if(restart === true) {
        startGame();
        }
    })
}

// Fonction qui permet de commencer le jeu
function startGame() {
    globalScore1.textContent = 0;
    globalScore2.textContent = 0;
    currentScore1.textContent = 0;
    currentScore2.textContent = 0;
    dotPlayer[currentPlayer].style.display = 'inline';
    rollDiceButton.addEventListener('click', player);
}

// On appelle la fonction qui démarre le jeu
startGame();
// On appelle la fonction qui relance une partie
newGame();