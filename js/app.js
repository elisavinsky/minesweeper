window.onload=initGame();

function initGame(){

const gBoard = document.querySelector('.gBoard')
let size = 12
let mineAmount = 30
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
     if (i > 11 && !isRightEdge && elCells[i + 1 - size].classList.contains('mine')) total++;
     if (i > 12 && elCells[i - size].classList.contains('mine')) total++;
     if (i > 13 && !isLeftEdge && elCells[i - 1 - size].classList.contains('mine')) total++;
     if (i < 142 && !isRightEdge && elCells[i + 1].classList.contains('mine')) total++;
     if (i < 132 && !isLeftEdge && elCells[i - 1 + size].classList.contains('mine')) total++;
     if (i < 130 && !isRightEdge && elCells[i +  1 + size].classList.contains('mine')) total++;
     if (i < 131 && elCells[i + size].classList.contains('mine')) total++;
     

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
         checkCell(elCell, currentId)
             
     }  
     elCell.classList.add('checked');    
}


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
    if(currentId > 11 && !isRightEdge){
        const newId = elCells[parseInt(currentId) + 1 - size].id
        const newCell = document.getElementById(newId)
        click(newCell)
    }
    if(currentId > 12 && !isRightEdge){
        const newId = elCells[parseInt(currentId - size)].id
        const newCell = document.getElementById(newId)
        click(newCell)
    }
    if(currentId > 13 && !isLeftEdge){
        const newId = elCells[parseInt(currentId) - 1 - size].id
        const newCell = document.getElementById(newId)
        click(newCell)
    }
    if(currentId > 142 && !isRightEdge){
        const newId = elCells[parseInt(currentId) + 1].id
        const newCell = document.getElementById(newId)
        click(newCell)
    }
    if(currentId < 132 && !isLeftEdge){
        const newId = elCells[parseInt(currentId) - 1 + size].id
        const newCell = document.getElementById(newId)
        click(newCell)
    }
    if(currentId < 130 && !isRightEdge){
        const newId = elCells[parseInt(currentId) + 1 + size].id
        const newCell = document.getElementById(newId)
        click(newCell)
    }
    if(currentId < 131 && !isRightEdge){
        const newId = elCells[parseInt(currentId) + size].id
        const newCell = document.getElementById(newId)
        click(newCell)
    }
}, 10)

}
}








