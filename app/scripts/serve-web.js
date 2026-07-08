const fs = require('fs');
const http = require('http');
const path = require('path');

const root = path.resolve(__dirname, '../dist');
const preferredPort = Number(process.env.PORT || 8092);

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
  '.webp': 'image/webp',
};

function resolveFile(requestUrl, port) {
  const urlPath = decodeURIComponent(new URL(requestUrl, `http://localhost:${port}`).pathname);
  const requestedPath = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, '');
  const filePath = path.join(root, requestedPath);

  if (!filePath.startsWith(root)) {
    return path.join(root, 'index.html');
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    return filePath;
  }

  return path.join(root, 'index.html');
}

function prepareResponse(filePath, data) {
  if (path.basename(filePath) !== 'index.html') {
    return data;
  }

  return Buffer.from(
    data
      .toString('utf8')
      .replace('body {\n        overflow: hidden;\n      }', 'body {\n        overflow: auto;\n        margin: 0;\n        background: #F4F7FC;\n      }')
      .replace('#root {\n        display: flex;\n        height: 100%;\n        flex: 1;\n      }', '#root {\n        display: flex;\n        height: 100%;\n        min-height: 100vh;\n        width: 100%;\n        flex: 1;\n      }\n      #root > div {\n        display: flex;\n        min-height: 100%;\n        width: 100%;\n      }'),
  );
}

function createServer(port) {
  return http.createServer((req, res) => {
    const filePath = resolveFile(req.url, port);
    const ext = path.extname(filePath);

    fs.readFile(filePath, (error, data) => {
      if (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Unable to load app.');
        return;
      }

      res.writeHead(200, {
        'Cache-Control': 'no-store',
        'Content-Type': contentTypes[ext] || 'application/octet-stream',
      });
      res.end(prepareResponse(filePath, data));
    });
  });
}

function listen(port) {
  const server = createServer(port);

  server.once('error', (error) => {
    if (error.code === 'EADDRINUSE' && !process.env.PORT) {
      listen(port + 1);
      return;
    }

    throw error;
  });

  server.listen(port, () => {
    console.log(`MMD Exam App is running at http://localhost:${port}`);
  });
}

listen(preferredPort);
