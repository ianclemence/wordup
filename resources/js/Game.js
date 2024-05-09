import Tile from "./Tile";
import { secretWord } from "./Words";

// Function to get the current date in the format YYYY-MM-DD
function getCurrentDate() {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

console.log(localStorage);

// Exporting an object with properties and methods related to the game
export default {
    // Number of guesses allowed
    guessesAllowed: 5,
    // The secret word to guess
    theWord: secretWord,
    // Index of the current row being guessed
    currentRowIndex: 0,
    // Current state of the game: pending, active, complete
    state: "active",
    // Flag for errors
    errors: false,
    // Message to display to the player
    message: "",

    // Keyboard layout: array of arrays representing rows of keys
    letters: [
        "QWERTYUIOP".split(""),
        "ASDFGHJKL".split(""),
        ["Enter", ..."ZXCVBNM".split(""), "Backspace"],
    ],

    // Getter method to retrieve the current row of tiles being guessed
    get currentRow() {
        return this.board[this.currentRowIndex];
    },

    // Getter method to retrieve the current guess as a string
    get currentGuess() {
        return this.currentRow.map((tile) => tile.letter).join("");
    },

    // Getter method to calculate the remaining guesses
    get remainingGuesses() {
        return this.guessesAllowed - this.currentRowIndex - 1;
    },

    // Method to initialize the game board with tiles
    init() {
        const currentDate = getCurrentDate();
        const savedDate = localStorage.getItem("gameDate");
        const savedWord = localStorage.getItem("secretWord");

        if (savedDate === currentDate && savedWord) {
            this.theWord = savedWord;

            // Retrieve saved game state from localStorage
            const savedGame = localStorage.getItem("savedGame");
            const savedState = localStorage.getItem("savedState");
            const savedRows =
                JSON.parse(localStorage.getItem("savedRows")) || [];
            const savedRowIndex = localStorage.getItem("savedRowIndex");

            if (savedGame) {
                // Parse the saved game and assign it to the game board
                this.board = JSON.parse(savedGame);

                // Restore the current game state
                this.state = savedState ? savedState : "active";

                // Restore the current row index from localStorage
                this.currentRowIndex = savedRowIndex
                    ? parseInt(savedRowIndex)
                    : 0;

                savedRows.forEach((row, rowIndex) => {
                    row.forEach((tileData, tileIndex) => {
                        // Calculate the position based on the row and tile index
                        const position = tileIndex;

                        // Create a new Tile instance from the saved data
                        const newTile = new Tile(tileData.letter, position);

                        // Update the corresponding Tile instance in this.board
                        this.board[rowIndex][tileIndex] = newTile;
                    });

                    // Call the static method updateStatusesForRow with the updated row
                    Tile.updateStatusesForRow(
                        this.board[rowIndex],
                        this.theWord
                    );
                });

                if (savedState === "complete") {
                    if (this.currentGuess === this.theWord) {
                        this.message = "🎉 Congrats! You've won WordUp! 🎉";
                    } else {
                        this.message = `😔 Oops...You lost! The word was: ${this.theWord.toUpperCase()} 😔`;
                    }
                } else {
                    // If the game is not complete, restore the board with saved guesses
                    this.board = this.board.map((row, rowIndex) =>
                        row.map((tile, tileIndex) => {
                            const newTile = new Tile(tile.letter, tileIndex);
                            // Set the status of the new Tile based on the corresponding Tile in the saved game
                            newTile.status = tile.status;
                            return newTile;
                        })
                    );
                }
            } else {
                this.board = Array.from({ length: this.guessesAllowed }, () => {
                    return Array.from(
                        { length: this.theWord.length },
                        (item, index) => new Tile(item, index)
                    );
                });
            }
        } else {
            // Clear local storage
            localStorage.clear();
            // Generate a new word for the day
            this.theWord = secretWord;
            // Save the new word and date in localStorage
            localStorage.setItem("gameDate", currentDate);
            localStorage.setItem("secretWord", this.theWord);

            this.board = Array.from({ length: this.guessesAllowed }, () => {
                return Array.from(
                    { length: this.theWord.length },
                    (item, index) => new Tile(item, index)
                );
            });
        }
    },

    // Save the current game to localStorage
    saveGame(row) {
        // Deserialize previously saved rows from local storage
        const savedRows = JSON.parse(localStorage.getItem("savedRows")) || [];

        // Add the current row to the array of saved rows
        savedRows.push(row);

        // Serialize and save the updated array of rows to local storage
        localStorage.setItem("savedRows", JSON.stringify(savedRows));

        // Serialize the game board to JSON format
        localStorage.setItem("savedGame", JSON.stringify(this.board));

        // Save the current state
        localStorage.setItem("savedState", this.state);

        // Save the current row index
        localStorage.setItem("savedRowIndex", this.currentRowIndex);
    },

    // Method to find the matching tile for a given keyboard input key
    matchingTileForKey(key) {
        return this.board
            .flat() // Flatten the 2D array of tiles
            .filter((tile) => tile.status) // Filter out filled tiles
            .sort((t1, t2) => (t2.status === "correct" ? 1 : -1)) // Sort tiles by correctness
            .find((tile) => tile.letter === key.toLowerCase()); // Find tile with matching letter
    },

    // Method to handle key presses
    onKeyPress(key) {
        if (this.state === "complete") {
            // Don't allow key presses when the game is complete
            return;
        }

        this.message = "";
        this.errors = false;

        if (/^[A-z]$/.test(key)) {
            this.fillTile(key);
        } else if (key === "Backspace" && this.state !== "complete") {
            this.emptyTile();
        } else if (key === "Enter") {
            this.submitGuess();
        }
    },

    // Method to fill an empty tile with a letter
    fillTile(key) {
        for (let tile of this.currentRow) {
            if (!tile.letter) {
                tile.fill(key);
                break;
            }
        }
    },

    // Method to empty the last filled tile
    emptyTile() {
        for (let tile of [...this.currentRow].reverse()) {
            if (tile.letter) {
                tile.empty();
                break;
            }
        }
    },

    // Method to submit the current guess
    submitGuess() {
        const row = this.currentRow;

        // If the guess length is less than the word length, return
        if (this.currentGuess.length < this.theWord.length) {
            return;
        }

        // Update tile colors based on correctness
        Tile.updateStatusesForRow(row, this.theWord);

        // Check if the guess matches the word
        if (this.currentGuess === this.theWord) {
            this.state = "complete";
            this.message = "🎉 Congrats! You've won WordUp! 🎉";
        } else if (this.remainingGuesses === 0) {
            // If no remaining guesses, game over
            this.state = "complete";
            this.message = `😔 Oops...You lost! The word was: ${this.theWord.toUpperCase()} 😔`;
        } else {
            // Otherwise, move to the next row and display an incorrect message
            this.currentRowIndex++;
            this.message = "❌ Incorrect! ❌";
        }

        this.saveGame(row);
    },
};
