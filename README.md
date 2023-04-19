# Wordup

This repository contains the source code for Wordup, a web-based game where players try to guess a secret three-letter word within five tries. The game provides feedback on the player's guess, indicating which letters are correct and in the correct position, and which letters are correct but in the wrong position.

## How Wordup Works

To play Wordup, follow these steps:

1. Visit the website where Wordup is installed.
2. Click the "Start Game" button to begin a new game.
3. The game will randomly select a three-letter word from a pre-defined list of words.
4. You will have five tries to guess the secret word.
5. After each guess, the game will provide feedback on your guess in the form of colored dots.
   * A green dot indicates a letter that is in the correct position in the secret word.
   * A yellow dot indicates a letter that is correct but in the wrong position in the secret word.
   * A gray dot indicates a letter that is not in the secret word.
6. Use this feedback to refine your guess and ultimately guess the correct word.
7. If you are able to guess the correct word within five tries, you win the game!

## Technology Stack

Wordup has been created using the following technologies:

* JavaScript - for the game's logic and interactivity.
* Tailwind CSS - for styling and layout.
* AlpineJS - for reactive and dynamic components.
* Livewire - for building reactive and dynamic interfaces using PHP.
* Laravel - for backend development and API integrations.

## Getting Started

To run Wordup locally, follow these steps:

1. Clone the repository to your local machine using `git clone https://github.com/ianclemence/wordup.git`.
2. Navigate to the project directory using `cd wordup`.
3. Run `composer install` to install the Laravel dependencies.
4. Copy the `.env.example` file to `.env` and update the database credentials.
5. Run `php artisan key:generate` to generate an application key.
6. Run `php artisan migrate` to run the database migrations.
7. Run `php artisan serve` to start the web server.
8. Visit the URL provided by `php artisan serve` in your web browser to play Wordup.

## Support

If you have any questions or issues with Wordup, please contact me.

## License

This website is licensed under the MIT license.
