# SeaQuake — PNW Earthquake Visualizer

A real-time earthquake map for the Pacific Northwest.

---

## For Joe

This project was started by Joseph Jacobson McClenahan — geophysicist, software developer in training, Mariners fan, and one of the better humans to have lived in the Pacific Northwest.

Joe earned a master's degree in geophysics from the University of Wyoming in 2012, spent three years working in the oil and gas industry in Houston, and then moved back to Seattle in 2016 to reinvent himself as a software engineer. He attended Code Fellows, taught himself full-stack development, and started building things. SeaQuake was one of them — a quiet little project that combined everything he loved: the geology of the PNW, the Pacific Northwest itself, and the craft of writing software.

He left it unfinished. In February 2017, two months after pushing his last commit, Joe was diagnosed with Stage IV esophageal cancer. He died on May 5, 2018, at his home in Seattle. He was 31.

Joe wrote a blog throughout his treatment at [joemcclenahan.com](http://joemcclenahan.com). He wrote about chemo, about Cooper his dog, about the Mariners, about blood clots and feeding tubes and Hamilton and the importance of universal healthcare. He wrote every week, clearly and honestly, and he ended every single post the same way: *"Thanks for reading. Love, Joe."*

He never came back to finish this one.

I'm his cousin. I found the repo, read the code, and decided to complete what he started. The backend was his — the data pipeline, the USGS API integration, the PNW bounding box he hardcoded with intention. I built the frontend visualization he never got to write.

Joe was a geophysicist who understood the deep structure of the earth — fault lines, subduction zones, the slow violence of tectonic movement under the Pacific Northwest. He knew better than most what this region sits on top of, and why it matters to pay attention. That's why he built this. That's why it exists.

If you find it useful, or just kind of cool, that's enough. That would have been enough for him.

---

## What It Does

SeaQuake pulls live earthquake data from the USGS Earthquake Hazards Program API and displays every seismic event recorded in the Pacific Northwest over the past 7 days on an interactive map. Markers are sized and color-coded by magnitude. Click any marker to see the quake's magnitude, location, depth, event type, timestamp, and a link to the full USGS event page. The header shows the total event count and the largest recorded quake for the week.

---

## Tech Stack

- **Backend:** Python 3, Sanic (async web framework)
- **Data source:** USGS Earthquake Hazards Program API (live GeoJSON feed)
- **Frontend:** Vanilla JS, Leaflet.js, CARTO dark tile layer

---

## Running It Locally

```bash
# Install dependencies
pip install -r requirements.txt

# Start the server
python app.py

# Open in browser
http://localhost:8000
```

---

## In Memory Of

**Joseph Jacobson McClenahan**
June 28, 1986 — May 5, 2018

> *"I hope that I've done enough in my short time on this earth to have made a little mark and that whenever the time comes I can say that I lived a good and full life and I didn't waste what a gift it was."*
>
> — Joe, March 2018

If you'd like to honor him, the family established a memorial fund for esophageal cancer research at [Fred Hutchinson Cancer Research Center](https://www.fredhutch.org).

---

*Completed by Dan Smith, 2026.*
