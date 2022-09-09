import Tile from "./Tile";

export default {
    guessesAllowed: 3,
    theWord: 'cat', // to-do
    currentRowIndex: 0,
    state: 'active', // pending, active, complete
    message: '',

    get currentGuess() {
        return this.currentRow.map((tile) => tile.letter).join("");
    },

    init() {
        this.board = Array.from({ length: this.guessesAllowed }, () => {
            return Array.from({ length: this.theWord.length }, () => new Tile());
        });
    },

    onKeyPress(key) {
        this.message = '';

        // Validation
        if (/^[A-z]$/.test(key)) {
            this.fillTile(key);
        } else if (key === "Enter") {
            this.submitGuess();
        }
    },

    fillTile(key) {
        for (let tile of this.currentRow) {
            if (!tile.letter) {
                tile.fill(key);

                break;
            }
        }
    },

    submitGuess() {
        let guess = this.currentGuess;

        // if the guess length is less than the guess of the word
        if (guess.length < this.theWord.length) {
            // then return
            return;
        }

        if (guess === this.theWord) {
            this.message = 'You Win!';
        } else if (this.guessesAllowed === this.currentRowIndex + 1) {
            this.message = 'Game Over. You Lose!';

            this.state = 'complete';
        } else {
            this.message = 'Incorrect!';

            this.currentRowIndex++;
        }
    },

    get currentRow() {
        return this.board[this.currentRowIndex];
    },
};
