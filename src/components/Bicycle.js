import './Bicycle.css';
import template from './Wheel.hbs';
import {SafeString} from 'handlebars/runtime';

export class Bicycle {

    constructor({fetch}) {
        this.fetch = fetch;
    }

    renderPartial({offset, count}) {
        return this.fetch({offset, count}).then(items => items.map(template).join(''));
    }

    async render() {
        const parts = [];
        const count = 100;
        const chunks = 3;

        for (let i = 0; i < chunks; ++i) {
            parts.push(await this.renderPartial({offset: count * i, count}));
        }

        return new SafeString(parts.join(''));
    }

}
