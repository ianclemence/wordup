<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />

    <!-- Styles -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    {{-- AlpineJS --}}
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
</head>

<body class="font-sans antialiased text-gray-900 bg-[#0e1626] grid">
    <main class="h-full flex flex-col items-center mx-auto max-w-screen-xl" x-data="game" @keyup.window="onKeyPress($event.key)">
        <h1 class="mt-6 text-center text-4xl font-bold tracking-tight text-white sm:text-5xl">
            WordUp
        </h1>

        {{-- Instructions --}}
        <div class="w-full sm:max-w-md px-6 py-4 text-sm text-white">
            <ul>
                <li class="mb-2">
                    🟢 : a perfect match.
                </li>
                <li class="mb-2">
                    🟡 : the letter is present in the word but in the wrong tile.
                </li>
            </ul>
        </div>

        <output x-text="message"></output>

        {{-- Game components --}}
        <div id="game">
            <template x-for="(row, index) in board">
                <div class="row"
                    :class="{ 'current': currentRowIndex === index, 'invalid': currentRowIndex === index && errors }">
                    <template x-for="tile in row">
                        <div class="tile" :class="tile.status" x-text="tile.letter"></div>
                    </template>
                </div>
            </template>
        </div>

        {{-- Keyboard components --}}
        <div id="keyboard" @click.stop="$event.target.matches('button') && onKeyPress($event.target.textContent)">
            <template x-for="row in letters">
                <div class="row">
                    <template x-for="key in row">
                        <button type="button" class="key" :class="matchingTileForKey(key)?.status" x-text="key">
                        </button>
                    </template>
                </div>
            </template>
        </div>
    </main>
</body>

</html>
