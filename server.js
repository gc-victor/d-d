const fs = require('fs');
const http = require('http');
const path = require('path');
const WebSocket = require('ws');
const chokidar = require('chokidar');

const FgCyan = '\x1b[36m';
const FgGreen = '\x1b[32m';
const FgRed = '\x1b[31m';
const FgYellow = '\x1b[33m';

const cwd = path.resolve(process.cwd());
const jsConfigFile = path.resolve(cwd, 'd-d.config.js');

if (!fs.existsSync(jsConfigFile)) {
    console.log(FgGreen, `You have to create the d-d.config.js :)`);
    process.exit(1);
}

const config = require(jsConfigFile).default;

const dist = config.dist || '/dist';
const src = config.src || '/src';
const port = config.port || 1234;
const socketPort = config.socketPort || 1235;

const MIME = config.mime || {
    css: 'text/css',
    gif: 'image/gif',
    html: 'text/html',
    ico: 'image/x-icon',
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    js: 'text/javascript',
    json: 'application/json',
    pdf: 'application/pdf',
    png: 'image/png',
    svg: 'image/svg+xml',
    xml: 'text/xml'
};

function createHandler(method) {
    return (req, res) => method.apply(this, [req, res]);
}

function route(url) {
    const path = `${cwd}${dist}${url}`;

    try {
        const content = fs.readFileSync(path).toString();

        console.log(
            FgYellow,
            `[${new Date().toLocaleTimeString()}]`,
            '200',
            url
        );

        return createHandler(write(content, 200, path));
    } catch (e) {
        console.log(FgRed, `[${new Date().toLocaleTimeString()}]`, '404', url);

        return createHandler(write(`File not found: ${url}`, 404));
    }
}

function write(content, code, pathname) {
    const contentTransformed = content.replace(
        '</body>',
        `<script>
            (function() {
                const ws = new WebSocket('ws://localhost:${socketPort}');
                const onChange = ${config.onChangeClient && config.onChangeClient.toString()};
                
                ws.onmessage = ({ data }) => {
                    onChange && onChange(data);
                    !onChange && window.location.reload();
                };
            })();
        </script>
        </body>`
    );

    return function (req, res) {
        res.writeHead(code || 200, {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': pathname
                ? MIME[pathname.split('.').pop()]
                : 'text/plain'
        });
        res.write(contentTransformed);
        res.end();
    };
}

function watch(ws) {
    chokidar.watch(src).on('change', (pathname) => {
        if (ws.readyState === 1) {
            console.log('\n', FgGreen, 'File changed: ' + pathname, '\n');
            config.onChangeServer(pathname);
            ws.send(pathname);
        }
    });
}

function server() {
    return http.createServer((req, res) => {
        route(req.url)(req, res);
    });
}

const wss = new WebSocket.Server({ port: socketPort });

wss.on('connection', function connection(ws) {
    console.log('\n');
    console.log(FgCyan, 'WebSocket connection');
    console.log('\n');
    ws.on('error', (error) => console.log(error));
    watch(ws);
});

server().listen(port);

console.log('\n');
console.log(FgCyan, `Server: http://localhost:${port}`);
console.log('\n');
