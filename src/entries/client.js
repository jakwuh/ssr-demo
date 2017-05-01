import 'babel-polyfill';
import {Bicycle} from '../components/Bicycle.js';
import fetch from '../libs/api/fetch';

function start() {
    const $container = document.querySelector('div.bicycle');
    const app = new Bicycle({fetch});

    app.render().then(html => {
        $container.innerHTML = html; // XSS ! don't do that ;)
    });
}

start();
