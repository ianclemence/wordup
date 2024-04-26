// import './bootstrap';
import game from "./Game";

document.addEventListener("alpine:init", () => {
    Alpine.data("game", () => game);
});
