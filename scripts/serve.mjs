import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = resolve('out');
const types = { '.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.json':'application/json','.txt':'text/plain','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.woff2':'font/woff2','.ico':'image/x-icon' };
try { await stat(resolve(root,'index.html')); } catch { console.error('Run npm run build before npm start.'); process.exit(1); }
createServer(async (req,res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    let file = resolve(root, '.' + pathname);
    if (file !== root && !file.startsWith(root + sep)) { res.writeHead(403); res.end(); return; }
    if ((await stat(file)).isDirectory()) file = resolve(file,'index.html');
    const bytes = await readFile(file);
    res.writeHead(200,{'Content-Type':types[extname(file)] || 'application/octet-stream'});
    res.end(req.method === 'HEAD' ? undefined : bytes);
  } catch {
    res.writeHead(404,{'Content-Type':'text/html'});
    res.end(await readFile(resolve(root,'404.html')).catch(()=> 'Not found'));
  }
}).listen(Number(process.env.PORT || 3000),'127.0.0.1',() => console.log(`Preview: http://localhost:${process.env.PORT || 3000}`));
