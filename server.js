import express from 'express';
import path from 'path';

const server = express();
const port = 8888;
server.use(express.static(__dirname + '/'));
server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

server.listen(port, (err) => {
    if (err) {
        console.log(`error happened: ${err}`);
    } else {
        console.log(`listening on port ${port}`);
    }
});