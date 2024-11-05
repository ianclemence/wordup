<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])

    @livewireStyles
</head>

<body class="font-sans antialiased text-gray-900 bg-[#0e1626] grid select-none">
    <div class="min-h-screen flex flex-col justify-center items-center pt-6 sm:pt-0">
        <div class="w-full sm:max-w-md mt-6 px-6 py-4">

            {{-- Navigation components --}}
            <x-main-navigation />

            <div x-data="game" @keyup.window="onKeyPress($event.key)">

                {{-- Game components --}}
                <div id="game">
                    <template x-for="(row, index) in board">
                        <div class="row"
                            :class="{ 'current': currentRowIndex === index, 'invalid': currentRowIndex === index && errors }">
                            <template x-for="tile in row">
                                <div class="tile h-24 sm:h-16" :class="tile.status" x-text="tile.letter"></div>
                            </template>
                        </div>
                    </template>
                </div>

                {{-- Keyboard components --}}
                <div class="mt-8 space-y-3"
                    @click.stop="$event.target.matches('button') && onKeyPress($event.target.textContent)">
                    <template x-for="row in letters">
                        <div class="flex justify-center">
                            <template x-for="key in row">
                                <button type="button" class="key bg-[#c5c5c5] border-0 rounded h-12 px-4 mx-0.5"
                                    :class="matchingTileForKey(key)?.status" x-text="key">
                                </button>
                            </template>
                        </div>
                    </template>
                </div>

                {{-- Output --}}
                <div class="text-white justify-center flex font-medium text-xl mt-4" x-text="message"></div>

                <!-- Add this button inside the game area in welcome.blade.php -->
                <div class="mt-4">
                    <button @click="getHint()"
                            :disabled="hintUsed"
                            class="bg-blue-500 text-white rounded px-4 py-2"
                            :class="{'opacity-50 cursor-not-allowed': hintUsed}">
                        Get a Hint
                    </button>
                </div>

                <!-- Add this section in welcome.blade.php to display the leaderboard -->
                <div class="mt-6">
                    <h2 class="text-white text-2xl mb-4">Leaderboard</h2>
                    <ul id="leaderboard" class="text-white">
                        <!-- Leaderboard entries will be populated here -->
                    </ul>
                </div>

                <!-- Add this section in welcome.blade.php to select difficulty -->
                <div class="mt-4">
                    <label for="difficulty" class="text-white">Select Difficulty:</label>
                    <select id="difficulty" class="bg-gray-800 text-white rounded px-2 py-1">
                        <option value="easy">Easy (7 guesses, 4 letters)</option>
                        <option value="medium" selected>Medium (5 guesses, 5 letters)</option>
                        <option value="hard">Hard (3 guesses, 6 letters)</option>
                    </select>
                </div>
            </div>
        </div>
    </div>

    @livewireScripts
</body>

</html>
