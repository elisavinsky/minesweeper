window.onload=initGame();

function initGame(){
     

const gBoard = document.querySelector('.gBoard')
let width = 10
let mineAmount = 20
let elCells = []


function buildBoard(){
//Set mines at random locations
const minesArray = Array(mineAmount).fill('mine');
const emptyArray = Array(width*width - mineAmount).fill('valid');

//console.log(emptyArray);
//console.log(minesArray);
const gameArray = emptyArray.concat(minesArray);
//console.log(gameArray);
const mixArray = gameArray.sort(() => Math.random() - 0.5);
//console.log(mixArray);
    
     for(let i = 0; i < width*width; i++){
         const elCell = document.createElement('div')
         elCell.setAttribute('id', i)
         gBoard.appendChild(elCell)
         elCells.push(elCell)
     }
}
 
buildBoard();


}
