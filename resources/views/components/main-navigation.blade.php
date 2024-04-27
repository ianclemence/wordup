<div class="flex flex-row items-center justify-between mb-6" x-data="{ instructions: true }">
    <div class="hidden"></div>

    <a href="/">
        <x-application-logo class="w-20 h-20 fill-current text-gray-500" />
    </a>

    <button type="button"
        class="relative flex items-center justify-center rounded-lg outline-none transition duration-75 focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-70 -m-1.5 h-9 w-9 text-gray-400 hover:text-gray-500 focus-visible:ring-primary-600 dark:text-gray-500 dark:hover:text-gray-400 dark:focus-visible:ring-primary-500"
        @click="instructions = !instructions">
        <span class="sr-only">Instructions</span>
        <x-heroicon-o-question-mark-circle class="w-20 h-20" />
    </button>

    {{-- modal --}}
    <div class="fixed inset-0 z-30 flex items-center justify-center overflow-auto bg-black bg-opacity-50"
        x-show="instructions" @click.away="instructions = false" x-cloak>

        {{-- modal inner --}}
        <div class="relative max-w-2xl rounded-lg bg-gray-100 px-4 py-16 sm:px-6 lg:px-8 shadow-xl dark:bg-gray-900 text-gray-900 dark:text-white"
            x-transition:enter="motion-safe:ease-out duration-300" x-transition:enter-start="opacity-0 scale-90"
            x-transition:enter-end="opacity-100 scale-100">

            {{-- close modal button --}}
            <div class="absolute top-4 end-4">
                <button type="button"
                    class="relative flex items-center justify-center rounded-lg outline-none transition duration-75 focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-70 -m-1.5 h-9 w-9 text-gray-400 hover:text-gray-500 focus-visible:ring-primary-600 dark:text-gray-500 dark:hover:text-gray-400 dark:focus-visible:ring-primary-500"
                    @click="instructions = false">
                    <span class="sr-only">Close</span>
                    <x-heroicon-o-x-mark class="h-6 w-6" />
                </button>
            </div>

            {{-- content --}}
            <h1 class="text-center text-3xl sm:text-4xl">
                How to Play WordUp
            </h1>

            <p class="mx-auto my-4 max-w-md text-center text-lg">
                Guess today's mystery word within <strong class="font-bold"> FIVE </strong> guesses.
            </p>

            <ul class="mx-auto max-w-md text-start text-sm space-y-1 list-disc ml-5">
                <li>Each guess must be a valid 4-letter word.</li>
                <li>The color of the tiles will change to show how close your guess was to the word.</li>
            </ul>

            <p class="mx-auto mt-4 max-w-md font-bold text-start text-base">
                Examples:
            </p>

            <ul class="mx-auto my-6 max-w-md text-start text-sm space-y-3">
                <li class="space-x-3">
                    <button type="button" class="inline-block rounded border p-3 text-1xl font-medium">
                        C
                    </button>
                    <button type="button" class="inline-block rounded border p-3 text-1xl font-medium text-[#47d747]">
                        A
                    </button>
                    <button type="button" class="inline-block rounded border p-3 text-1xl font-medium">
                        R
                    </button>
                    <button type="button" class="inline-block rounded border p-3 text-1xl font-medium">
                        E
                    </button>
                </li>
                <li><strong class="text-[#47d747] text-2xl"> A </strong> is in the word and in the correct position.</li>
                <li class="space-x-3">
                    <button type="button" class="inline-block rounded border p-3 text-1xl font-medium">
                        P
                    </button>
                    <button type="button" class="inline-block rounded border p-3 text-1xl font-medium">
                        L
                    </button>
                    <button type="button" class="inline-block rounded border p-3 text-1xl font-medium">
                        A
                    </button>
                    <button type="button" class="inline-block rounded border p-3 text-1xl font-medium text-[#f7f749]">
                        Y
                    </button>
                </li>
                <li><strong class="text-[#f7f749] text-2xl"> Y </strong> is in the word but in the wrong position.</li>
            </ul>

            <h1 class="text-center text-2xl sm:text-3xl">
                Good Luck, Have Fun! ✨
            </h1>
        </div>
    </div>
</div>
