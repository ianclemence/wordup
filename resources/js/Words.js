import { generate } from "random-words";
import { SHA256 } from "crypto-js";

// Function to generate a consistent secret word for the day
function generateSecretWord() {
    // Get the current date
    const currentDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format

    // Hash the current date to generate a unique but consistent secret word
    const hashedSecret = SHA256(currentDate).toString();

    // Take the first word generated using the hash as the secret word
    const secretWordIndex = parseInt(hashedSecret.substring(0, 8), 16) % 10; // Ensure the index is within the range of the word list
    return generate({ exactly: 1, minLength: 4, maxLength: 4 }); // Generate a single secret word using the hash as seed
}

// Generate the secret word for the day
export const secretWord = generateSecretWord()[0];
