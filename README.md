# Earth 3D Visualization

An interactive web application that visualizes Earth’s geographic and environmental data in 3D across multiple historical layers. Users can explore different years, view country information, climate data, and custom layers such as forest area and land use.

## Features
- **Time‑travel layers** – Browse land‑use and climate layers for specific years (1995‑2025) via WebP image overlays.
- **Country lookup** – Click on a country to see detailed information pulled from `data/country.json`.
- **Historical climate data** – Visualize temperature trends using the `data/historical_data.json` dataset.
- **Search & navigation** – Fast city‑panel search, map zoom/pan, and a responsive UI built with vanilla JavaScript.
- **Responsive design** – Works on both desktop and mobile browsers.

## Project Structure
```
assets/             # Static assets (images, layers, icons)
  layers/          # Year‑specific WebP overlays
  images/          # Miscellaneous images (e.g., leaf.ico)
data/               # JSON datasets (countries, historical data)
js/                 # Application logic (API wrappers, UI components)
style.css, style_new.css   # Global styles
index.html          # Landing page
explore_earth.html  # Main 3‑D globe view
```

## Getting Started
1. **Clone the repository**
   ```bash
   git clone <repo‑url>
   cd earth-3d
   ```
2. **Open `explore_earth.html` in a browser** (no server needed for basic use). For full API key functionality, serve the folder with a simple HTTP server:
   ```bash
   npx serve .   # or `python -m http.server`
   ```
3. **Configure API keys** – Edit `js/api-keys.js` with your own keys for any external services referenced in `js/api.js`.

## Contributing
- Fork the repo and create a feature branch.
- Keep JavaScript modular; add new layers under `assets/layers/` and reference them in `js/globe-config.js`.
- Run `npm install` if you add build tooling; otherwise, pull requests are welcome directly on the static files.

## License
MIT License – see the `LICENSE` file for details.

---
*Generated with Claude Code*