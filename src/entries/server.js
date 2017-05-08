import 'babel-polyfill';
import express from 'express';
import {startTimer, endTimer} from '../libs/middleware/timingMiddleware';
import {GeneratorStream} from '../libs/stream/GeneratorStream';
import documentGenerator from '../pages/DocumentGenerator';

const app = express();
const port = 3000;

app.use('/dist', express.static('dist/client/'));
app.use(startTimer);

app.use(async (req, res, next) => {
    const stream = new GeneratorStream(documentGenerator);
    stream.pipe(res);
    next()
});

app.use(endTimer);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
