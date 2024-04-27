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

<body class="font-sans antialiased text-gray-900 bg-[#0e1626] grid">
    <div class="min-h-screen flex flex-col justify-center items-center pt-6">
        <div class="w-full sm:max-w-2xl mt-6 px-6 py-4">

            {{-- Navigation components --}}
            <x-main-navigation />

            <div x-data="game" @keyup.window="onKeyPress($event.key)">

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
            </div>
        </div>
    </div>

    @livewireScripts
</body>

</html>
