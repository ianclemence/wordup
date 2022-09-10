import Tile from "./Tile";
import words from "./words3";

export default {
    guessesAllowed: 3,
    theWord: "cat", // to-do
    currentRowIndex: 0,
    state: "active", // pending, active, complete
    errors: false,
    message: "",

    get currentRow() {
        return this.board[this.currentRowIndex];
    },

    get currentGuess() {
        return this.currentRow.map((tile) => tile.letter).join("");
    },

    get remainingGuesses() {
        return this.guessesAllowed - this.currentRowIndex - 1;
    },

    init() {
        this.board = Array.from({ length: this.guessesAllowed }, () => {
            return Array.from(
                { length: this.theWord.length },
                (item, index) => new Tile(index)
            );
        });
    },

    onKeyPress(key) {
        this.message = "";
        this.errors = false;

        // Validation
        if (/^[A-z]$/.test(key)) {
            this.fillTile(key);
        } else if (key === "Backspace") {
            this.emptyTile();
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

    emptyTile() {
        for (let tile of [...this.currentRow].reverse()) {
            if (tile.letter) {
                tile.empty();

                break;
            }
        }
    },

    // async submitGuess() {
    submitGuess() {
        // if the guess length is less than the guess of the word
        if (this.currentGuess.length < this.theWord.length) {
            // then return
            return;
        }

        if (!words.includes(this.currentGuess.toUpperCase())) {
            this.errors = true;

            return (this.message = "Not a Word");
        }

        // Using a dictionary API
        // if (await this.checkDictionary(this.currentGuess)) {
        //     this.errors = true;

        //     return this.message = "Not a Word";
        // }

        // Update the tile colors
        Tile.updateStatusesForRow(this.currentRow, this.theWord);

        if (this.currentGuess === this.theWord) {
            this.state = "complete";

            return (this.message = "You Win!");
        }

        if (this.remainingGuesses === 0) {
            this.state = "complete";

            return (this.message = "Game Over. You Lose!");
        }

        this.currentRowIndex++;

        return (this.message = "Incorrect!");
    },
};
