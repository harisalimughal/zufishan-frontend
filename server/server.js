import { createReadStream, existsSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

const serverDir = fileURLToPath(new URL('.', import.meta.url))
const dist = join(serverDir, '..', 'client', 'dist')
const types = { '.css': 'text/css', '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' }
const send = (res, file) => { res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' }); createReadStream(file).pipe(res) }

createServer((req, res) => {
  if (req.url === '/api/health') { res.writeHead(200, { 'Content-Type': 'application/json' }); res.end(JSON.stringify({ status: 'ok' })); return }
  const pathname = decodeURIComponent((req.url || '/').split('?')[0]); const requested = normalize(join(dist, pathname))
  const file = requested.startsWith(dist) && existsSync(requested) && statSync(requested).isFile() ? requested : join(dist, 'index.html')
  if (!existsSync(file)) { res.writeHead(503, { 'Content-Type': 'text/plain' }); res.end('Build the client first: npm run build'); return }
  send(res, file)
}).listen(process.env.PORT || 3000, () => console.log(`Zulfishan is running on http://localhost:${process.env.PORT || 3000}`))
