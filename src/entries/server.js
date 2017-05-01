import 'babel-polyfill';
import express from 'express';
import template from '../pages/Document.hbs';
import {Bicycle} from '../components/Bicycle';
import {startTimer, endTimer} from '../libs/middleware/timingMiddleware';
import fetch from '../libs/api/fetch';
import {SafeString} from 'handlebars/runtime';

const app = express();
const port = 3000;

app.use('/dist', express.static('dist/client/'));
app.use(startTimer);

app.use(async (req, res, next) => {
    const app = new Bicycle({fetch});
    const content = await app.render();
    // const content = new SafeString(`<div class="loader"></div>`);

    res.end(template({content}));
    next()
});

app.use(endTimer);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
