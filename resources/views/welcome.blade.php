<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>WordUp</title>

    <!-- Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    {{-- AlpineJS --}}
    <script src="//unpkg.com/alpinejs"></script>
    {{-- VanillaJS --}}
    {{-- <script src="/js/app.js"></script> --}}
</head>

<body>
    <div id="game" x-data="{ guessesAllowed: 4, wordLength: 3 }">
        <template x-for="row in Array.from({ length: guessesAllowed })">
            <div class="row">
                <template x-for="tile in Array.from({ length: wordLength })">
                    <div class="tile"></div>
                </template>
            </div>
        </template>
    </div>
</body>

</html>