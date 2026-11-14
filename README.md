# Earth Jukebox

**Listen to the planet.** Earth Jukebox turns real natural events (wildfires, storms, volcanoes, earthquakes and more) into sound on a 3D NASA map. Click an event, or press play and let the days or the world sweep by.

Built for the **NASA Space Apps Challenge 2026** by **Binaya** and **Sadin**, from **Sri Lanka**.

> Independent project. Not affiliated with or endorsed by NASA.

## Live demo

- Live site: https://binaya-fdp77.github.io/earth-jukebox/
- Source code: https://github.com/Binaya-fdp77/earth-jukebox

## What it does

- **Hear real events.** Each event type has its own sound. Pitch follows latitude, loudness follows magnitude, and stereo position follows longitude.
- **Two ways to play.** *By date* plays events in time order. *Sweep W to E* moves a line across the map and plays what it passes.
- **Play one event's story.** Press play on an event to hear it from start to end along its track.
- **3D map.** Pan, zoom, tilt, switch satellite / live satellite / dark, search countries and filter by event type.
- **Record and download.** Record your session, pause, listen back and download a `.wav`.
- **Export data.** Download the visible events as CSV.

## Events and sounds

| Event | Sound | Data |
|---|---|---|
| Wildfires | Crackling pops over a low roar | NASA EONET |
| Storms | Wind, raindrops, whale-like cry; thunder for strong storms | NASA EONET |
| Volcanoes | Deep boom, brass swell, sub-bass | NASA EONET |
| Floods | Soft sine drops | NASA EONET |
| Landslides | Low rumble | NASA EONET |
| Earthquakes | Thud and rumble; bigger magnitude is lower and louder | USGS M4.5+ feed |
| Drought | Dry crackles, thin hot breeze | NASA EONET |
| Dust & Haze | Soft sandy breath | NASA EONET |
| Sea & Lake Ice | Glassy bell tones | NASA EONET |
| Snow | Quiet floating plinks | NASA EONET |
| Heat & Cold | Warm drone with a cicada buzz | NASA EONET |

All sounds are generated live in the browser from each event's data. No backend is needed.

## Data sources

- **NASA EONET v3** (Earth Observatory Natural Event Tracker): natural event reports.
- **NASA GIBS**: satellite imagery (Blue Marble, VIIRS true color).
- **USGS Earthquake Hazards Program**: M4.5+ earthquake feed.

## Run it locally

You need Python 3 (any static server works).

```bash
git clone https://github.com/Binaya-fdp77/earth-jukebox.git
cd earth-jukebox
python -m http.server 8000
```

Open http://localhost:8000/ for the home page, or http://localhost:8000/jukebox.html for the jukebox. An internet connection is needed for live NASA and USGS data and imagery.

## Optional: NASA audio clips

The app can layer real NASA audio on top of the generated sounds. Put clips in `earth-jukebox/audio/` named `storm.mp3`, `quake.mp3`, `volcano.mp3`, `ice.mp3` and `haze.mp3`. Missing files are skipped. Check each clip's usage terms and keep the credit.

## Tech

Three.js (3D map), Tone.js (sound synthesis and recording), TopoJSON (country borders), Font Awesome. Plain HTML, CSS and JavaScript.

## Use of AI

AI assistance (Claude by Anthropic) was used to help write and debug code, and to draft this README and the project deck. The concept, data choices and testing are the team's.

## Credits

NASA EONET, NASA GIBS, USGS, Three.js, Tone.js. Team: **Binaya** and **Sadin**, Sri Lanka.
