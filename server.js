const express = require("express");
const path = require("path");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3002;
/* ---------------------------------
   MIDDLEWARE
---------------------------------- */
app.use(express.json());
app.use(
    express.static(
        path.join(__dirname, "frontend")
    )
);
/* ---------------------------------
   CHECK API KEY
---------------------------------- */
console.log(
    "LAST.FM API KEY LOADED:",
    process.env.LASTFM_API_KEY
        ? "YES"
        : "NO"
);
/* ---------------------------------
   TAGS WE DON'T WANT TO DISPLAY
---------------------------------- */
const ignoredTags = [
    "seen live",
    "favorites",
    "favourites",
    "favorite",
    "favourite",
    "love",
    "awesome",
    "beautiful",
    "cool",
    "male",
    "female",
    "american",
    "british",
    "korean",
    "japanese",
    "90s",
    "80s",
    "70s",
    "60s",
    "00s",
    "2010s",
    "2020s"
];
function isUsefulTag(tagName) {
    const tag = tagName.toLowerCase();
    return !ignoredTags.some(
        ignoredTag =>
            tag.includes(ignoredTag)
    );
}
/* ---------------------------------
   CALCULATE LAST.FM COMPOSITION
---------------------------------- */
function calculateComposition(
    artistResults
) {
    const tagScores = {};
    artistResults.forEach(
        (artist) => {
            artist.tags.forEach(
                (tag) => {
                    const tagName =
                        tag.name
                            .toLowerCase()
                            .trim();
                    if (
                        !isUsefulTag(tagName)
                    ) {
                        return;
                    }
                    if (
                        !tagScores[tagName]
                    ) {
                        tagScores[tagName] = 0;
                    }
                    tagScores[tagName] +=
                        Number(tag.count);
                }
            );
        }
    );
    const topTags =
        Object.entries(tagScores)
            .sort(
                (a, b) =>
                    b[1] - a[1]
            )
            .slice(0, 4);
    console.log(
        "TOP TAGS:",
        topTags
    );
    const total =
        topTags.reduce(
            (sum, tag) =>
                sum + tag[1],
            0
        );
    if (total === 0) {
        return [];
    }
    return topTags.map(
        ([tag, score]) => ({
            mood:
                tag.toUpperCase(),
            percentage:
                Math.round(
                    (score / total) * 100
                )
        })
    );
}
/* ---------------------------------
   GENRE → SONGSCAPE AESTHETIC
---------------------------------- */
function interpretTag(tagName) {
    const tag =
        tagName.toLowerCase();
    if (
        tag.includes("dream") ||
        tag.includes("shoegaze") ||
        tag.includes("ambient") ||
        tag.includes("ethereal") ||
        tag.includes("psychedelic") ||
        tag.includes("bedroom") ||
        tag.includes("chill")
    ) {
        return "DREAMY";
    }
    if (
        tag.includes("grunge") ||
        tag.includes("punk") ||
        tag.includes("metal") ||
        tag.includes("rock") ||
        tag.includes("noise") ||
        tag.includes("industrial") ||
        tag.includes("garage")
    ) {
        return "STATIC";

    }
    if (
        tag.includes("pop") ||
        tag.includes("dance") ||
        tag.includes("disco") ||
        tag.includes("funk") ||
        tag.includes("hyperpop") ||
        tag.includes("electropop")
    ) {
        return "BRIGHT";
    }
    if (
        tag.includes("jazz") ||
        tag.includes("soul") ||
        tag.includes("folk") ||
        tag.includes("acoustic") ||
        tag.includes("r&b") ||
        tag.includes("rnb") ||
        tag.includes("bossa") ||
        tag.includes(
            "singer-songwriter"
        )
    ) {
        return "WARM";
    }
    if (
        tag.includes("emo") ||
        tag.includes("sad") ||
        tag.includes("dark") ||
        tag.includes("slowcore") ||
        tag.includes("goth") ||
        tag.includes("melanchol")
    ) {
        return "MELANCHOLIC";
    }
    if (
        tag.includes("electronic") ||
        tag.includes("alternative") ||
        tag.includes("experimental") ||
        tag.includes("post-punk")
    ) {
        return "STATIC";
    }
    return "UNKNOWN";

}
/* ---------------------------------
   CALCULATE AESTHETICS
---------------------------------- */
function calculateAesthetics(
    composition
) {
    const aestheticScores = {
        DREAMY: 0,
        MELANCHOLIC: 0,
        BRIGHT: 0,
        WARM: 0,
        STATIC: 0
    };
    composition.forEach(
        (tag) => {
            const aesthetic =
                interpretTag(
                    tag.mood
                );
            if (
                aesthetic !== "UNKNOWN"
            ) {
                aestheticScores[aesthetic] += tag.percentage;
            }
        }
    );
    const aesthetics =  Object.entries(aestheticScores).filter(([mood, score]) => score > 0)
            .sort(
                (a, b) =>
                    b[1] - a[1]
            )
            .map(
                ([mood, score]) => ({
                    mood,
                    score
                })
            );
    console.log(
        "AESTHETICS:",
        aesthetics
    );
    return aesthetics;
}
/* ---------------------------------
   GENERATE IDENTITY
---------------------------------- */
function generateIdentity(
    aesthetics
) {
    const mainMood =
        aesthetics[0]?.mood ||
        "UNKNOWN";
    const secondMood =
        aesthetics[1]?.mood ||
        mainMood;
    const prefixes = {
        DREAMY: [
            "MIDNIGHT",
            "LUNAR",
            "CELESTIAL",
            "DISTANT"
        ],
        MELANCHOLIC: [
            "FADING",
            "LONELY",
            "HOLLOW",
            "QUIET"
        ],
        BRIGHT: [
            "GOLDEN",
            "NEON",
            "SUNLIT",
            "GLITTER"
        ],
        WARM: [
            "VELVET",
            "AMBER",
            "SOFT",
            "AUTUMN"
        ],
        STATIC: [
            "ELECTRIC",
            "BROKEN",
            "ANALOG",
            "DISTORTED"
        ],
        UNKNOWN: [
            "UNKNOWN",
            "DISTANT",
            "HIDDEN"
        ]
    };
    const endings = {
        DREAMY: [
            "DREAMER",
            "ORBIT",
            "MOON",
            "VISION"
        ],
        MELANCHOLIC: [
            "WANDERER",
            "GHOST",
            "ECHO",
            "MEMORY"
        ],
        BRIGHT: [
            "STAR",
            "HEART",
            "SPARK",
            "SUN"
        ],
        WARM: [
            "SOUL",
            "ROMANTIC",
            "GLOW",
            "HEART"
        ],
        STATIC: [
            "SIGNAL",
            "FREQUENCY",
            "RIOT",
            "NOISE"
        ],
        UNKNOWN: [
            "FREQUENCY",
            "SIGNAL",
            "WORLD"
        ]
    };
    const prefixOptions = prefixes[mainMood];
    const endingOptions = endings[secondMood];
    const prefix =prefixOptions[Math.floor(Math.random() *prefixOptions.length)];
    const ending =
        endingOptions[Math.floor(Math.random() * endingOptions.length)];
    return `THE ${prefix} ${ending}`;
}
/* ---------------------------------
   GENERATE WORLD
---------------------------------- */
function generateWorld(
    aesthetics
) {
    const worldMap = {
        DREAMY: {
            symbol: "☾",
            names: [
                "MOONLIGHT",
                "ORBIT",
                "MIST",
                "DREAMSCAPE"
            ]
        },
        MELANCHOLIC: {
            symbol: "○",
            names: [
                "HAZE",
                "ECHO",
                "RAIN",
                "MEMORY"
            ]
        },
        BRIGHT: {
            symbol: "✦",
            names: [
                "STARLIGHT",
                "SPARK",
                "SUNLIGHT",
                "NEON"
            ]
        },
        WARM: {
            symbol: "☼",
            names: [
                "GLOW",
                "AMBER",
                "VELVET",
                "SUNSET"
            ]
        },
        STATIC: {
            symbol: "⌁",
            names: [
                "STATIC",
                "SIGNAL",
                "NOISE",
                "FREQUENCY"
            ]
        }
    };
    const usableAesthetics =
        aesthetics.length > 0
            ? aesthetics
            : [
                {
                    mood: "DREAMY"
                },
                {
                    mood: "STATIC"
                },
                {
                    mood: "WARM"
                }
            ];
    return usableAesthetics
        .slice(0, 3)
        .map(
            (aesthetic) => {
                const world =
                    worldMap[
                        aesthetic.mood
                    ];
                const randomName =
                    world.names[
                        Math.floor(
                            Math.random() *
                            world.names.length
                        )
                    ];
                return {
                    mood:
                        aesthetic.mood,
                    symbol:
                        world.symbol,
                    name:
                        randomName
                };
            }
        );
}
/* ---------------------------------
   LAST.FM ANALYZE ROUTE
--------------------------------- */
app.post(
    "/analyze",
    async (req, res) => {
        const { artists } = req.body;
        console.log(
            "ARTISTS RECEIVED:",
            artists
        );
        if (
            !artists ||
            !Array.isArray(artists) ||
            artists.length !== 3
        ) {
            return res
                .status(400)
                .json({
                    error:
                        "Please provide exactly three artists"
                });
        }
        if (
            artists.some(
                artist =>
                    !artist ||
                    artist.trim() === ""
            )
        ) {
            return res
                .status(400)
                .json({
                    error:
                        "Please enter all three artists"
                });
        }
        if (
            !process.env.LASTFM_API_KEY
        ) {
            console.log(
                "LAST.FM API KEY IS MISSING"
            );
            return res.status(500).json({
                    error: "Last.fm API key is missing from the server"
                });
        }
        try {
            const artistResults = [];
            for (
                const artist of artists
            ) {
                console.log(
                    "\nANALYSING ARTIST:",
                    artist
                );
                const url =
                    "https://ws.audioscrobbler.com/2.0/" +
                    "?method=artist.gettoptags" +
                    `&artist=${encodeURIComponent(artist)}` +
                    `&api_key=${process.env.LASTFM_API_KEY}` +
                    "&format=json" +
                    "&autocorrect=1";
                console.log(
                    "CALLING LAST.FM..."
                );
                const response =
                    await fetch(
                        url,
                        {
                            headers: {
                                "User-Agent":
                                    "Songscape/1.0"
                            }
                        }
                    );
                console.log(
                    "LAST.FM HTTP STATUS:",
                    response.status
                );
                const data =  await response.json();
                console.log(
                    "LAST.FM RAW RESPONSE FOR:",
                    artist
                );
                console.dir(
                    data,
                    {
                        depth: null
                    }
                );
                if (data.error) {
                    console.log(
                        "LAST.FM ERROR:"
                    );
                    console.dir(
                        data,
                        {
                            depth: null
                        }
                    );
                    return res.status(400).json({
                            error:
                                `Last.fm error ${data.error}: ${data.message}`
                        });
                }
                const tags =
                    data.toptags?.tag
                        ?.slice(0, 20)
                        .map(
                            (tag) => ({
                                name:
                                    tag.name,
                                count:
                                    Number(
                                        tag.count
                                    )
                            })
                        ) || [];
                console.log(
                    "TAGS FOUND:",
                    tags.length
                );
                if (
                    tags.length === 0
                ) {
                    return res
                        .status(400)
                        .json({
                            error:
                                `No music tags found for ${artist}`
                        });
                }
                artistResults.push({
                    artist:
                        data.toptags
                            ?.[
                                "@attr"
                            ]
                            ?.artist ||
                        artist,
                    tags
                });
            }
            console.log(
                "\nLAST.FM ARTIST DATA:"
            );
            console.dir(
                artistResults,
                {
                    depth: null
                }
            );
            const composition =
                calculateComposition(
                    artistResults
                );
            const aesthetics =
                calculateAesthetics(
                    composition
                );
            const identity =
                generateIdentity(
                    aesthetics
                );
            const world =
                generateWorld(
                    aesthetics
                );
            const result = {
                identity,
                artists:
                    artistResults.map(
                        artist =>
                            artist.artist
                    ),
                composition,
                world
            };
            console.log(
                "\nSONGSCAPE RESULT:"
            );
            console.dir(
                result,
                {
                    depth: null
                }
            );
            res.json(result);
        }
        catch (error) {
            console.error(
                "\nSONGSCAPE SERVER ERROR:"
            );
            console.error(
                error
            );
            res
                .status(500)
                .json({
                    error:
                        `Songscape server error: ${error.message}`
                });
        }
    }
);
/* ---------------------------------
   START SERVER
---------------------------------- */
app.listen(
    PORT,
    () => {
        console.log(
            `Songscape running on port ${PORT}`
        );
    }
);