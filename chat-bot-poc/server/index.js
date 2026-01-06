import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

app.disable('etag');

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

const dbFilePath = path.join(__dirname, '..', 'src', 'assets', 'db.json');

app.get('/api/customers', async (req, res) => {
  try {
    const data = await fs.readFile(dbFilePath, 'utf-8');
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  } catch (error) {
    console.error('Error reading db.json', error);
    res.status(500).json({
      error: 'Failed to read data',
      message: error instanceof Error ? error.message : String(error),
      code: error && typeof error === 'object' && 'code' in error ? error.code : undefined,
      path: dbFilePath,
    });
  }
});

app.listen(PORT, () => {
  console.log(`API server listening at http://localhost:${PORT}`);
});
