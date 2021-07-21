window.onload=initGame();

function initGame(){

const gBoard = document.querySelector('.gBoard')
let size = 10
let mineAmount = 20
let elCells = []
let isGameOver = false;

function buildBoard(){
//Set mines at random locations
const minesArray = Array(mineAmount).fill('mine');
const emptyArray = Array(size*size - mineAmount).fill('valid');
//console.log(emptyArray);
//console.log(minesArray);
const gameArray = emptyArray.concat(minesArray);
//console.log(gameArray);
const mixArray = gameArray.sort(() => Math.random() - 0.5);
//console.log(mixArray);
    
     for(let i = 0; i < size*size; i++){
         const elCell = document.createElement('div')
         elCell.setAttribute('id', i)
         elCell.classList.add(mixArray[i])
         gBoard.appendChild(elCell)
          elCells.push(elCell)

          //left click
          elCell.addEventListener('click', function(e){
              click(elCell) 
          });

     }
//add numbers
for (let i = 0; i < elCells.length; i++){

//define edges
const isLeftEdge = (i % size === 0)
const isRightEdge = (i % size === size - 1)
let total = 0;
 if (elCells[i].classList.contains('valid')){
     if (i > 0 && !isLeftEdge && elCells[i - 1].classList.contains('mine')) total++;
     if (i > 9 && !isRightEdge && elCells[i + 1 - size].classList.contains('mine')) total++;
     if (i > 10 && elCells[i - size].classList.contains('mine')) total++;
     if (i > 11 && !isLeftEdge && elCells[i - 1 - size].classList.contains('mine')) total++;
     if (i < 98 && !isRightEdge && elCells[i + 1].classList.contains('mine')) total++;
     if (i < 90 && !isLeftEdge && elCells[i - 1 + size].classList.contains('mine')) total++;
     if (i < 88 && !isRightEdge && elCells[i +  1 + size].classList.contains('mine')) total++;
     if (i > 89 && elCells[i + size].classList.contains('mine')) total++;
     



     elCells[i].setAttribute('data', total);
     console.log(elCells[i]);
      

        }
        
    }
    
}

buildBoard();

//click on cell actions

function click(elCell){
    let currentId = elCell.id;
     if(isGameOver) return;
     if(elCell.classList.contains('checked') || elCell.classList.contains('flag')){
         return;
     }
     if(elCell.classList.contains('mine')){
         console.log('game over')
     } else {
         let total = elCell.getAttribute('data');

         if(total != 0){
             elCell.classList.add('checked')
             elCell.innerHTML = total;
             return; 
         }
         
            elCell.classList.add('checked');
         //checkCell(elCell, currentId)       
     }    
}

/*
//check neighboring cells once cell is clicked
function checkCell(elCell, currentId){
const isLeftEdge = (currentId % size === 0)
const isRightEdge = (currentId % size === size - 1)

setTimeout(() => {
    if (currentId > 0 && !isLeftEdge){
        const newId = elCells[parseInt(currentId) - 1].id
        const newCell = document.getElementById(newId)
        click(newCell)
    }
    if(currentId > 9 && !isRightEdge){
        const newId = elCells[parseInt(currentId) + 1 - size].id
        const newCell = document.getElementById(newId)
        click(newCell)
    }
    if(currentId > 10 && !isRightEdge){
        const newId = elCells[parseInt(currentId - size)].id
        const newCell = document.getElementById(newId)
        click(newCell)
    }
    if(currentId > 11 && !isLeftEdge){
        const newId = elCells[parseInt(currentId) - 1 - size].id
        const newCell = document.getElementById(newId)
        click(newCell)
    }
    if(currentId > 98 && !isRightEdge){
        const newId = elCells[parseInt(currentId) + 1].id
        const newCell = document.getElementById(newId)
        click(newCell)
    }
    if(currentId > 90 && !isLeftEdge){
        const newId = elCells[parseInt(currentId) - 1 + size].id
        const newCell = document.getElementById(newId)
        click(newCell)
    }
    if(currentId > 88 && !isRightEdge){
        const newId = elCells[parseInt(currentId) + 1 + size].id
        const newCell = document.getElementById(newId)
        click(newCell)
    }
    if(currentId > 89 && !isRightEdge){
        const newId = elCells[parseInt(currentId) + size].id
        const newCell = document.getElementById(newId)
        click(newCell)
    }
}, 10)

*/
}








