# SONGSCAPE

> Where your music becomes a world.

Songscape is an interactive music identity generator that transforms a user's music taste into a visual and atmospheric world.

Users enter three artists that define their music taste. Songscape analyses artist metadata and genre tags using the Last.fm API, maps them to different musical aesthetics, and generates a unique music identity, composition, and world.

## How It Works

1. Enter three artists that define your music taste.
2. Songscape retrieves artist and genre information using the Last.fm API.
3. Artist tags are mapped to musical moods and aesthetics.
4. The dominant patterns in the user's music taste are analysed.
5. Songscape generates a personalised music identity.
6. The result is presented as an interactive visual world with ambient audio.

## Features

- Music taste analysis using artist metadata
- Last.fm API integration
- Mood and aesthetic classification
- Dynamic music identity generation
- Personalised musical composition percentages
- Procedurally generated world elements
- Mood-based ambient audio
- Interactive result reveal
- Animated vinyl interface
- Scroll-based visual sticker interactions
- Responsive web design

## Example

A user might enter:

- Laufey
- Radiohead
- Ariana Grande

Songscape analyses the musical characteristics associated with these artists and may generate an identity such as:

> **THE MIDNIGHT DREAMER**

With a musical composition containing moods such as:

- Melancholic
- Dreamy
- Warm
- Bright

The dominant mood also determines the ambient soundscape of the generated world.

## Tech Stack

**Frontend**
- HTML
- CSS
- JavaScript

**Backend**
- Node.js
- Express.js

**API**
- Last.fm API

**Deployment**
- Render

**Version Control**
- Git
- GitHub

## Project Structure

    SongScape/
    │
    ├── frontend/
    │   ├── assets/
    │   │   ├── audio/
    │   │   └── stickers/
    │   │
    │   ├── index.html
    │   ├── result.html
    │   ├── style.css
    │   ├── rstyle.css
    │   ├── script.js
    │   └── result.js
    │
    ├── server.js
    ├── package.json
    ├── package-lock.json
    └── README.md

## Running Locally

Clone the repository:

    git clone <https://github.com/sherly-leona/SongScape>

Move into the project directory:

    cd SongScape

Install dependencies:

    npm install

Create a `.env` file:

    LASTFM_API_KEY=your_lastfm_api_key

Start the server:

    node server.js

Open the application at:

    http://localhost:3002

## Environment Variables

Songscape requires a Last.fm API key.

Create a `.env` file in the project directory and add:

    LASTFM_API_KEY=your_api_key

The `.env` file is excluded from version control to protect API credentials.

## Why I Built Songscape

Music recommendations usually focus on answering one question: *What should I listen to next?*

I wanted to explore a different question:

> **What would my music taste look and feel like if it became a world?**

Songscape combines music metadata, rule-based classification, interaction design, and visual storytelling to turn listening preferences into a personalised digital atmosphere.

## Future Improvements

- Spotify integration
- Shareable Songscape identity cards
- Expanded mood classification
- More dynamic visual worlds
- User accounts and saved identities
- Music taste comparison between users
- AI-generated descriptions of each music world

## Author

**Yerolu Sherly Leona**

Computer Science Engineering Student  
Interested in creative development, interactive systems, and game development.