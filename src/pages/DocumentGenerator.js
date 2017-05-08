import headerTemplate from './Header.hbs';
import footerTemplate from './Footer.hbs';
import {Bicycle} from '../components/Bicycle';
import fetch from '../libs/api/fetch';

export default function *() {
    yield headerTemplate();

    const app = new Bicycle({fetch});
    // delegate rendering to root component
    yield * app.render();

    yield footerTemplate();
}
