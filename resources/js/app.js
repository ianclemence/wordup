// import './bootstrap';
let grid = document.querySelector('#game');

// The number of guesses (3)
let guessesAllowed = 3;
// The length of the word (3)
let wordLength = 3;


// // Generate 3 rows
// let fragment = document.createDocumentFragment();

// let generateGrid = () => {
//     Array.from({ length: guessesAllowed }).forEach(() => {
//         let row = document.createElement('div');
//         row.classList.add('row');
    
//         Array.from({ length: wordLength }).forEach(() => {
//             let tile = document.createElement('div');
//             tile.classList.add('tile');
    
//             row.appendChild(tile);
//         })
    
//         fragment.appendChild('row');
//     });
    
    
//     grid.appendChild(fragment);
// }

// // Initialize
// generateGrid();