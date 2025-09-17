import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

type DictionaryRecord = any;

const app = express();
app.use(cors());
app.use(express.json());

const EXPORT_DIR = path.resolve(process.cwd(), 'exports');
const INDEX_FILE = path.join(EXPORT_DIR, 'DictionaryCache.index.json');

function loadIndex(): { className: string; total: number; shards: string[] } {
    if (!fs.existsSync(INDEX_FILE)) {
        throw new Error(`Missing export index file: ${INDEX_FILE}`);
    }
    const raw = fs.readFileSync(INDEX_FILE, 'utf-8');
    return JSON.parse(raw);
}

function* iterateAllRecords(): Generator<DictionaryRecord> {
    const index = loadIndex();
    for (const shard of index.shards) {
        const file = path.join(EXPORT_DIR, shard);
        const raw = fs.readFileSync(file, 'utf-8');
        const arr: DictionaryRecord[] = JSON.parse(raw);
        for (const rec of arr) yield rec;
    }
}

function normalizeText(text: string): string {
    return (text || '').toLowerCase();
}

function recordMatches(rec: DictionaryRecord, q: string): boolean {
    const query = normalizeText(rec.query || rec.original_form || '');
    if (query.includes(q)) return true;
    const translation: string = rec.translation || '';
    if (normalizeText(translation).includes(q)) return true;
    return false;
}

// Swagger setup
const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'DictionaryCache 文件 API',
            version: '1.0.0',
        },
        servers: [{ url: 'http://localhost:3000' }],
    },
    apis: [],
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/health', (_req: Request, res: Response) => {
    res.json({ ok: true });
});

// GET /api/search?q=...&limit=20&offset=0
app.get('/api/search', (req: Request, res: Response) => {
    const q = normalizeText(String(req.query.q || ''));
    const limit = Math.min(parseInt(String(req.query.limit || '20'), 10) || 20, 100);
    const offset = parseInt(String(req.query.offset || '0'), 10) || 0;
    if (!q) return res.status(400).json({ error: 'missing q' });

    const results: DictionaryRecord[] = [];
    let skipped = 0;
    for (const rec of iterateAllRecords()) {
        if (!recordMatches(rec, q)) continue;
        if (skipped < offset) {
            skipped += 1;
            continue;
        }
        results.push(rec);
        if (results.length >= limit) break;
    }
    res.json({ results, limit, offset, q });
});

// GET /api/by-id/:id
app.get('/api/by-id/:id', (req: Request, res: Response) => {
    const id = String(req.params.id);
    for (const rec of iterateAllRecords()) {
        if (rec.objectId === id) return res.json(rec);
    }
    res.status(404).json({ error: 'Not found' });
});

// GET /api/stats
app.get('/api/stats', (_req: Request, res: Response) => {
    const index = loadIndex();
    res.json(index);
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
    console.log(`Swagger UI on       http://localhost:${PORT}/docs`);
});


