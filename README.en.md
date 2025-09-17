# Russian Dictionary System

A Russian-Chinese dictionary system powered by local JSON data: file-based Express API and a modern Vite + React + TypeScript frontend.

## Project structure
```
cidian_russiam/
├── server/src/            # Express backend (file-based API)
├── web/                   # Vite + React frontend
├── exports/               # JSON data shards (place your data here)
└── README.md              # Documentation (Chinese)
```

## Quick Start
- Requirements: Node.js 18+
- Install deps:
```bash
npm install
```
- Prepare data: put `DictionaryCache.part*.json` and `DictionaryCache.index.json` into `exports/`.

### Run backend
```bash
npm run dev:server
```
Backend runs at `http://localhost:3000` with Swagger docs at `/docs`.

### Run frontend
```bash
cd web
npm install
npm run dev
```
Visit the address printed by Vite (e.g. `http://localhost:5173`).

## Features
- Search Russian/Chinese words
- Rich word detail page (grammar, pronunciation, usage, related words, etc.)
- Responsive, modern UI (Tailwind CSS v4)
- MVVM architecture (services + viewmodels + views)

## Environment variables
```bash
# backend
PORT=3000
# frontend
VITE_API_BASE_URL=your-deployed-domain/api
VITE_DOCS_URL=your-deployed-domain/docs
```

## License
MIT License
