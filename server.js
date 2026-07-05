const express = require("express");
const path = require("path");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3002;


app.use(express.json());

app.use(
    express.static(
        path.join(__dirname, "frontend")
    )
);


const moodMap = {

    dreamy: [
        "dream pop",
        "dreamy",
        "ambient",
        "shoegaze",
        "ethereal",
        "psychedelic",
        "bedroom pop"
    ],

    melancholic: [
        "sad",
        "melancholic",
        "melancholy",
        "slowcore",
        "emo",
        "dark",
        "indie folk",
        "sadcore"
    ],

    bright: [
        "pop",
        "k-pop",
        "dance",
        "electropop",
        "synthpop",
        "happy",
        "funk",
        "disco"
    ],

    warm: [
        "jazz",
        "soul",
        "folk",
        "acoustic",
        "singer-songwriter",
        "bossa nova",
        "rnb",
        "r&b"
    ],

    static: [
        "rock",
        "alternative",
        "electronic",
        "post-punk",
        "noise",
        "industrial",
        "punk",
        "experimental"
    ]
};


function classifyTag(tagName) {

    const tag =
        tagName.toLowerCase();


    for (const mood in moodMap) {

        if (moodMap[mood].includes(tag)) {

            return mood;

        }

    }


    return null;
}


function calculateMoods(artistResults) {

    const moodScores = {
        dreamy: 0,
        melancholic: 0,
        bright: 0,
        warm: 0,
        static: 0
    };


    artistResults.forEach((artist) => {

        artist.tags.forEach((tag) => {

            const mood =
                classifyTag(tag.name);


            if (mood) {

                moodScores[mood] +=
                    Number(tag.count);

            }

        });

    });


    const total =
        Object.values(moodScores)
            .reduce(
                (sum, score) => sum + score,
                0
            );


    if (total === 0) {

        return [
            {
                mood: "DREAMY",
                percentage: 25
            },

            {
                mood: "WARM",
                percentage: 25
            },

            {
                mood: "BRIGHT",
                percentage: 25
            },

            {
                mood: "MELANCHOLIC",
                percentage: 25
            }
        ];

    }


    return Object.entries(moodScores)

        .map(([mood, score]) => ({

            mood: mood.toUpperCase(),

            percentage:
                Math.round(
                    (score / total) * 100
                )

        }))

        .filter(
            mood => mood.percentage > 0
        )

        .sort(
            (a, b) =>
                b.percentage - a.percentage
        )

        .slice(0, 4);

}


function generateIdentity(moods) {

    const mainMood =
        moods[0]?.mood;


    const secondMood =
        moods[1]?.mood;


    const prefixes = {

        DREAMY: "MIDNIGHT",

        MELANCHOLIC: "LONELY",

        BRIGHT: "GOLDEN",

        WARM: "VELVET",

        STATIC: "ELECTRIC"

    };


    const endings = {

        DREAMY: "DREAMER",

        MELANCHOLIC: "WANDERER",

        BRIGHT: "STAR",

        WARM: "SOUL",

        STATIC: "SIGNAL"

    };


    const prefix =
        prefixes[mainMood] || "MIDNIGHT";


    const ending =
        endings[secondMood] ||
        endings[mainMood] ||
        "DREAMER";


    return `THE ${prefix} ${ending}`;

}


function generateWorld(moods) {

    const worldMap = {

        DREAMY: {
            symbol: "☾",
            name: "MOONLIGHT"
        },

        MELANCHOLIC: {
            symbol: "○",
            name: "HAZE"
        },

        BRIGHT: {
            symbol: "✦",
            name: "STARLIGHT"
        },

        WARM: {
            symbol: "☼",
            name: "GLOW"
        },

        STATIC: {
            symbol: "⌁",
            name: "STATIC"
        }

    };


    return moods
        .slice(0, 3)
        .map((mood) => ({

            mood: mood.mood,

            symbol:
                worldMap[mood.mood].symbol,

            name:
                worldMap[mood.mood].name

        }));

}


app.post("/analyze", async (req, res) => {

    const { artists } = req.body;


    if (
        !artists ||
        !Array.isArray(artists) ||
        artists.length !== 3
    ) {

        return res.status(400).json({

            error:
                "Please provide exactly three artists"

        });

    }


    try {

        const artistResults = [];


        for (const artist of artists) {

            const url =
                `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&artist=${encodeURIComponent(artist)}&api_key=${process.env.LASTFM_API_KEY}&format=json&autocorrect=1`;


            const response =
                await fetch(url, {

                    headers: {

                        "User-Agent":
                            "Songscape/1.0"

                    }

                });


            const data =
                await response.json();


            if (data.error) {

                return res.status(400).json({

                    error:
                        `Could not analyse ${artist}`

                });

            }


            const tags =
                data.toptags?.tag
                    ?.slice(0, 15)
                    .map((tag) => ({

                        name: tag.name,

                        count:
                            Number(tag.count)

                    })) || [];


            artistResults.push({

                artist:
                    data.toptags?.["@attr"]?.artist
                    || artist,

                tags: tags

            });

        }


        const moods =
            calculateMoods(artistResults);


        const identity =
            generateIdentity(moods);


        const world =
            generateWorld(moods);


        const result = {

            identity: identity,

            artists:
                artistResults.map(
                    artist => artist.artist
                ),

            composition: moods,

            world: world

        };


        console.log(
            "SONGSCAPE RESULT:",
            result
        );


        res.json(result);


    } catch (error) {

        console.error(
            "SONGSCAPE ERROR:",
            error
        );


        res.status(500).json({

            error:
                "Songscape could not generate your world"

        });

    }

});


app.listen(PORT, () => {

    console.log(
        `Songscape running on port ${PORT}`
    );

});