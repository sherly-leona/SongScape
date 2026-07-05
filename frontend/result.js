const storedResult =
    sessionStorage.getItem(
        "songscapeResult"
    );


if (!storedResult) {

    window.location.href =
        "./index.html";

}


const result =
    JSON.parse(storedResult);



console.log(
    "SONGSCAPE RESULT:",
    result
);



/* -----------------------------
   ELEMENTS
----------------------------- */


const enterScreen =
    document.getElementById(
        "enterScreen"
    );


const enterIdentity =
    document.getElementById(
        "enterIdentity"
    );


const enterWorldButton =
    document.getElementById(
        "enterWorldButton"
    );


const resultContainer =
    document.getElementById(
        "resultContainer"
    );


const worldAudio =
    document.getElementById(
        "worldAudio"
    );


const vinylRecord =
    document.getElementById(
        "vinylRecord"
    );



/* -----------------------------
   IDENTITY
----------------------------- */


function formatIdentity(identity) {

    return identity
        .split(" ")
        .join("<br>");

}


document.getElementById(
    "identityTitle"
).innerHTML =
    formatIdentity(
        result.identity
    );


enterIdentity.innerText =
    result.identity;



/* -----------------------------
   ARTISTS
----------------------------- */


document.getElementById(
    "resultArtist1"
).innerText =
    result.artists[0] ||
    "UNKNOWN";


document.getElementById(
    "resultArtist2"
).innerText =
    result.artists[1] ||
    "UNKNOWN";


document.getElementById(
    "resultArtist3"
).innerText =
    result.artists[2] ||
    "UNKNOWN";



/* -----------------------------
   COMPOSITION
----------------------------- */


const composition =
    result.composition || [];


for (
    let index = 0;
    index < 4;
    index++
) {

    const moodElement =
        document.getElementById(
            `mood${index + 1}`
        );


    const percentageElement =
        document.getElementById(
            `percentage${index + 1}`
        );


    if (composition[index]) {

        moodElement.innerText =
            composition[index]
                .mood
                .toUpperCase();


        percentageElement.innerText =
            composition[index]
                .percentage;

    } else {

        moodElement.innerText =
            "—";


        percentageElement.innerText =
            "—";

    }

}



/* -----------------------------
   WORLD
----------------------------- */


const world =
    result.world || [];


for (
    let index = 0;
    index < 3;
    index++
) {

    const worldName =
        document.getElementById(
            `worldName${index + 1}`
        );


    const worldMood =
        document.getElementById(
            `worldMood${index + 1}`
        );


    if (world[index]) {

        worldName.innerText =
            world[index]
                .name
                .toUpperCase();


        worldMood.innerText =
            world[index]
                .mood
                .toUpperCase();

    }

}



/* -----------------------------
   FIND DOMINANT MOOD
----------------------------- */


let mainMood =
    "dreamy";


if (
    result.aesthetics &&
    result.aesthetics.length > 0
) {

    mainMood =
        result.aesthetics[0]
            .mood
            .toLowerCase();

}


console.log(
    "DOMINANT WORLD MOOD:",
    mainMood
);



/* -----------------------------
   AUDIO MAP
----------------------------- */


const audioMap = {

    dreamy:
        "./assets/audio/dreamy.mp3",

    static:
        "./assets/audio/static.mp3",

    bright:
        "./assets/audio/bright.mp3",

    warm:
        "./assets/audio/warm.mp3",

    melancholic:
        "./assets/audio/melancholic.mp3"

};



if (audioMap[mainMood]) {

    worldAudio.src =
        audioMap[mainMood];

} else {

    worldAudio.src =
        audioMap.dreamy;

}



/* -----------------------------
   ENTER WORLD
----------------------------- */


enterWorldButton.addEventListener(

    "click",

    async () => {


        try {

            await worldAudio.play();


            console.log(
                "WORLD AUDIO PLAYING:",
                mainMood
            );

        } catch (error) {

            console.log(
                "AUDIO ERROR:",
                error
            );

        }


        enterScreen.classList.add(
            "leave-world"
        );


        setTimeout(
            () => {

                enterScreen.style.display =
                    "none";


                resultContainer.classList.remove(
                    "hidden-result"
                );


                resultContainer.classList.add(
                    "reveal-result"
                );


                vinylRecord.classList.add(
                    "vinyl-playing"
                );


                window.scrollTo(
                    0,
                    0
                );

            },

            900

        );


    }

);