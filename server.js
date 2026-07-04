const express = require("express");
const path = require("path");
require("dotenv").config();
const app = express();
const PORT = 3002;
console.log(
    "Last.fm key loaded:",
    !!process.env.LASTFM_API_KEY
);
app.use(express.json());
app.use(
    express.static(
        path.join(__dirname, "frontend")
    )
);
app.post("/analyze", async (req, res) => {
    const { artists } = req.body;
    console.log("Artists received:", artists);
    try {
        const results = [];
        for (const artist of artists) {
            const url =
                `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&artist=${encodeURIComponent(artist)}&api_key=${process.env.LASTFM_API_KEY}&format=json&autocorrect=1`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(
                `Last.fm response for ${artist}:`,
                data
            );
            const tags =
                data.toptags?.tag
                    ?.slice(0, 10)
                    .map((tag) => ({
                        name: tag.name,
                        count: Number(tag.count)
                    })) || [];
            results.push({
                artist: artist,
                tags: tags
            });
        }
        res.json(results);
    } catch (error) {
        console.error(
            "LAST FM ERROR:",
            error
        );
        res.status(500).json({
            error: "Could not analyze artists"
        });
    }
});
app.listen(PORT, () => {
    console.log("backend");
    console.log(
        `successfully running at http://localhost:${PORT}`
    );
});