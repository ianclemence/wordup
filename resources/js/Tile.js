export default class Tile {
    constructor(letter = "", position) {
        this.position = position;
        this.letter = letter;
        this.status = ""; // correct, present, absent
    }

    static updateStatusesForRow(row, theWord) {
        const wordArray = theWord.split(""); // Convert theWord to an array of characters

        // Check for correct letters
        for (let tile of row) {
            if (wordArray[tile.position] === tile.letter) {
                tile.status = "correct";
                wordArray[tile.position] = null; // Mark the letter as found in the word array
            }
        }

        // Check for present letters
        for (let tile of row) {
            const indexInWord = wordArray.indexOf(tile.letter);
            if (indexInWord !== -1) {
                tile.status = "present";
                wordArray[indexInWord] = null; // Mark the letter as found in the word array
            }
        }

        // Anything that remains in the word array is absent
        for (let letter of wordArray.filter((letter) => letter !== null)) {
            const tile = row.find((tile) => tile.letter === letter);
            if (tile) {
                tile.status = "absent";
            }
        }
    }

    fill(key) {
        this.letter = key.toLowerCase();
    }

    empty() {
        this.letter = "";
    }
}
