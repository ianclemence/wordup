class Leaderboard {
    static saveScore(playerName, guessesTaken) {
        const scores = JSON.parse(localStorage.getItem('leaderboard')) || [];
        const date = new Date().toLocaleDateString(); // Get the current date

        // Add the new score
        scores.push({ playerName, guessesTaken, date });

        // Sort scores by number of guesses taken (ascending)
        scores.sort((a, b) => a.guessesTaken - b.guessesTaken);

        // Save the updated scores to local storage
        localStorage.setItem('leaderboard', JSON.stringify(scores));
    }

    static getScores() {
        return JSON.parse(localStorage.getItem('leaderboard')) || [];
    }
}

export default Leaderboard; 
