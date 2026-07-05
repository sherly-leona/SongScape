const storedResult =sessionStorage.getItem("songscapeResult");
if (!storedResult) {
    window.location.href ="./index.html";
}
const result = JSON.parse(storedResult);
console.log(
    "SONGSCAPE RESULT:",
    result
);
/* ---------------------------------
   IDENTITY
---------------------------------- */
document.getElementById(
    "identityTitle"
).innerHTML =
    result.identity
        .split(" ")
        .join("<br>");
/* ---------------------------------
   ARTISTS
---------------------------------- */
result.artists.forEach(
    (artist, index) => {
        const artistElement =
            document.getElementById(
                `resultArtist${index + 1}`
            );
        if (artistElement) {
            artistElement.textContent =
                artist.toUpperCase();
        }
    }
);
/* ---------------------------------
   COMPOSITION
---------------------------------- */
result.composition.forEach(
    (item, index) => {
        const moodElement =
            document.getElementById(
                `mood${index + 1}`
            );
        const percentageElement =
            document.getElementById(
                `percentage${index + 1}`
            );
        if (
            moodElement &&
            percentageElement
        ) {
            moodElement.textContent =
                item.mood;
            percentageElement.textContent =
                item.percentage + "%";
        }
    }
);
/* ---------------------------------
   WORLD
---------------------------------- */
result.world.forEach(
    (item, index) => {
        const worldItem =
            document.querySelectorAll(
                ".world-item"
            )[index];
        if (!worldItem) {
            return;
        }
        const symbol =
            worldItem.querySelector(
                ".world-symbol"
            );
        const name =
            document.getElementById(
                `worldName${index + 1}`
            );
        const mood =
            document.getElementById(
                `worldMood${index + 1}`
            );
        symbol.textContent = item.symbol;
        name.textContent = item.name;
        mood.textContent = item.mood;
    }
);