const path = require('node:path');
const express = require('express');

const app = express();
const port = Number(process.env.PORT || 3000);
const backendUrl = (process.env.BACKEND_URL || 'http://localhost:8080').replace(/\/$/, '');

app.use('/api', async (req, res) => {
  try {
    let body;
    if (!['GET', 'HEAD'].includes(req.method)) {
      body = await readBody(req);
    }

    const headers = {};
    if (req.headers['content-type']) {
      headers['content-type'] = req.headers['content-type'];
    }

    const upstream = await fetch(`${backendUrl}${req.originalUrl}`, {
      method: req.method,
      headers,
      body,
    });

    res.status(upstream.status);
    const contentType = upstream.headers.get('content-type');
    if (contentType) res.set('content-type', contentType);
    if (upstream.status === 204) return res.end();
    return res.send(Buffer.from(await upstream.arrayBuffer()));
  } catch (error) {
    console.error('Napaka pri povezavi z backendom:', error.message);
    return res.status(502).json({ message: 'Backend trenutno ni dosegljiv. Preverite, ali deluje na vratih 8080.' });
  }
});

app.use(express.static(path.join(__dirname, 'public')));
app.get('*path', (_req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(port, () => {
  console.log(`Frontend je na voljo na http://localhost:${port}`);
  console.log(`Backend API: ${backendUrl}/api`);
});

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (chunks.length) {
    return Buffer.concat(chunks);
  }
  return undefined;
}
