import 'babel-polyfill';
import {Bicycle} from '../components/Bicycle.js';
import fetch from '../libs/api/fetch';
import {SSR_HASH_ATTR} from '../enum';

function start() {
    const $container = document.querySelector('div#container');
    const app = new Bicycle({fetch});

    const expectedUID = app.getUID();
    const actualIUD = $container.children[0].getAttribute(SSR_HASH_ATTR);

    if (expectedUID !== actualIUD) {
        app.render().then(html => {
            $container.innerHTML = html; // XSS ! don't do that ;)
        });
    }
}

start();
