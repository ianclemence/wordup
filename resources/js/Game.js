import Tile from "./Tile";
import { secretWord } from "./Words";

export default {
    guessesAllowed: 5,
    theWord: secretWord, // specific words
    // theWord: allWords[Math.floor(Math.random() * allWords.length)], // random words
    currentRowIndex: 0,
    state: "active", // pending, active, complete
    errors: false,
    message: "",

    letters: [
        "QWERTYUIOP".split(""),
        "ASDFGHJKL".split(""),
        ["Enter", ..."ZXCVBNM".split(""), "Backspace"],
    ],

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

    matchingTileForKey(key) {
        return this.board
            .flat()
            .filter((tile) => tile.status)
            .sort((t1, t2) => (t2.status === "correct" ? 1 : -1))
            .find((tile) => tile.letter === key.toLowerCase());
    },

    onKeyPress(key) {
        this.message = "";
        this.errors = false;

        // Validation
        if (/^[A-z]$/.test(key)) {
            this.fillTile(key);
        } else if (key === "Backspace" && this.state !== "complete") {
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

    submitGuess() {
        // if the guess length is less than the guess of the word
        if (this.currentGuess.length < this.theWord.length) {
            // then return
            return;
        }

        // Update the tile colors
        Tile.updateStatusesForRow(this.currentRow, this.theWord);

        if (this.currentGuess === this.theWord) {
            this.state = "complete";
            this.message = "🎉 You Win! 🎉";
        } else if (this.remainingGuesses === 0) {
            this.state = "complete";
            this.message = `😔 Game Over. You Lose! (${this.theWord.toUpperCase()}) 😔`;
        } else {
            this.currentRowIndex++;
            this.message = "❌ Incorrect! ❌";
        }
    },
};
