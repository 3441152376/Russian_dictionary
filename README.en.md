# Russian Dictionary System

A Russian–Chinese dictionary system based on local JSON data. It includes a file-based Express API and a modern Vite + React + TypeScript frontend.

Language switch: [简体中文](./README.md) | English | [Русский](./README.ru.md)

## Architecture
```
cidian_russiam/
├── tools/export/           # Optional data-prep scripts (no cloud access in this repo)
├── server/src/            # Express backend (file-based API)
├── web/                   # Vite + React frontend
├── exports/               # JSON data shards (place your data here)
└── README.md             # Main documentation
```

## Quick Start

### 1. Requirements
```bash
node --version   # Node.js 18+
npm install      # install dependencies
```

### 2. Prepare data
Place `DictionaryCache.part*.json` and `DictionaryCache.index.json` into the `exports/` directory.

### 3. Start backend
```bash
npm run dev:server
# or
nohup npx ts-node --esm server/src/index.ts > server.dev.log 2>&1 &
```
Backend runs at `http://localhost:3000` and exposes:
- REST APIs
- Swagger docs: `http://localhost:3000/docs`

### 4. Start frontend
```bash
cd web
npm install
npm run dev
```
Open the URL printed by Vite (typically `http://localhost:5173` or `5174`).

## Data Overview
- Total records: 21,636
- Source: local JSON shards in `exports/`
- Fields: pronunciation, grammar, usage, cultural notes, etc.

## API

### Search
```http
GET /api/search?q=keyword&limit=20&offset=0
```

### Detail
```http
GET /api/by-id/:objectId
```

### Stats
```http
GET /api/stats
```

### Health
```http
GET /health
```

More docs: `your-deployed-domain/docs`

## Deployment

### Backend
1. Build: `npm run build`
2. Upload `dist/` to your server
3. Install production deps: `npm install --production`
4. Start: `npm run start:server`

### Frontend
1. `cd web`
2. Build: `npm run build`
3. Upload `dist/` to a static web server
4. Configure reverse proxy to the backend

### Environment variables
```bash
# backend
PORT=3000

# frontend
VITE_API_BASE_URL=your-deployed-domain/api
VITE_DOCS_URL=your-deployed-domain/docs
```

## Development Guide

### Tech Stack
- Backend: Node.js + Express + TypeScript
- Frontend: Vite + React + TypeScript + Tailwind CSS
- Data: local JSON (no cloud dependency)
- Architecture: MVVM (services + viewmodels + views)

### Source Layout
```
├── tools/export/              # optional data-prep scripts
├── server/src/index.ts        # Express backend
├── web/src/                   # React source
│   ├── services/api.ts        # API services
│   ├── viewmodels/            # MVVM viewmodels
│   ├── pages/                 # pages
│   └── App.tsx                # app entry
└── exports/                   # data shards
```

### Common Commands
```bash
# backend dev
npm run dev:server

# frontend dev
cd web && npm run dev

# production build
npm run build
cd web && npm run build
```

## Features
- Search for Russian/Chinese keywords
- Word details: grammar, gender, inflections, pronunciation, related words, usage examples, cultural notes, etymology, sentence analysis, metadata
- Responsive modern UI
- Keyboard-friendly interactions (Enter to search)

## Security
- Use environment variables in production setups

## Changelog

### v1.0.0
- React + TypeScript frontend
- Word detail page
- Responsive design and modern UI
- MVVM architecture
- Swagger API docs

## License (Non-Commercial Use License)
- Personal, non-commercial use: free, no authorization required.
- Commercial use: prior written authorization from the author is required.
- See `LICENSE` for full terms.

## Author and Company
- Product & Author: EyuJun (Russian learning app) — see: [https://russian.egg404.com/](https://russian.egg404.com/)
- Company: Luzhou Shanhe Network Technology Co., Ltd. — [https://egg404.com/](https://egg404.com/)
