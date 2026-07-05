const music = document.getElementById("bgmusic");
document.addEventListener(
    "click",
    () => {
        music.play()
            .then(() => {
                console.log("MUSIC PLAYING");
            })
            .catch((error) => {
                console.log("AUDIO ERROR:", error);
            });
    },
    { once: true }
);
const stickers = [
    "./assets/stickers/sticker1.png",
    "./assets/stickers/sticker2.png",
    "./assets/stickers/sticker3.png",
    "./assets/stickers/sticker4.png",
    "./assets/stickers/sticker5.png",
    "./assets/stickers/sticker6.png",
    "./assets/stickers/sticker7.png",
    "./assets/stickers/sticker8.png"
];
let availableStickers = [...stickers];
function createSticker(scrollPosition) {
    const sticker = document.createElement("img");
    if (availableStickers.length === 0) {
        availableStickers = [...stickers];
    }
    const randomIndex = Math.floor(Math.random() * availableStickers.length);
    const randomSticker = availableStickers[randomIndex];
    availableStickers.splice(randomIndex, 1);
    sticker.src = randomSticker;
    sticker.classList.add("sticker");
    const sectionNumber = Math.floor(scrollPosition / window.innerHeight);
    let leftPosition;
    if (sectionNumber === 0) {
        const side = Math.random() < 0.5;
        if (side) {
            leftPosition = 3 + Math.random() * 15;
        } else {
            leftPosition = 82 + Math.random() * 13;
        }
    } else if (sectionNumber === 1) {
        leftPosition = 65 + Math.random() * 27;
    } else if (sectionNumber === 2) {
        const side = Math.random() < 0.5;
        if (side) {
            leftPosition =
                3 + Math.random() * 15;
        } else {
            leftPosition =
                82 + Math.random() * 13;
        }
    } else{
        const side = Math.random() < 0.5;
        if (side) {
            leftPosition =
                2 + Math.random() * 12;
        } else {
            leftPosition =
                85 + Math.random() * 10;
        }
    }
    sticker.style.left = leftPosition + "%";
    sticker.style.top =
        scrollPosition +
        Math.random() * 200 +
        "px";
    const randomRotation =
        Math.random() * 40 - 20;
    const randomSize =
        80 + Math.random() * 70;
    sticker.style.width =
        randomSize + "px";
    sticker.style.transform =
        `rotate(${randomRotation}deg)`;
    document.body.appendChild(sticker);
}
let lastStickerScroll = 0;
window.addEventListener("scroll", () => {
    while (window.scrollY - lastStickerScroll > 300) {
        lastStickerScroll += 300;
        createSticker(lastStickerScroll);
    }
});
const artistForm =
    document.getElementById("artistForm");


artistForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        const artists = [

            document
                .getElementById("artist1")
                .value
                .trim(),

            document
                .getElementById("artist2")
                .value
                .trim(),

            document
                .getElementById("artist3")
                .value
                .trim()

        ];


        try {

            const response =
                await fetch("/analyze", {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify({

                        artists: artists

                    })

                });


            const result =
                await response.json();


            if (!response.ok) {

                alert(result.error);

                return;

            }


            sessionStorage.setItem(

                "songscapeResult",

                JSON.stringify(result)

            );


            window.location.href =
                "./result.html";


        } catch (error) {

            console.error(error);


            alert(
                "Could not generate your Songscape"
            );

        }

    }
);
