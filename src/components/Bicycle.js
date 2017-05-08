import './Bicycle.css';
import {SafeString} from 'handlebars/runtime';
import partialTemplate from './Wheel.hbs';
import template from './Bicycle.hbs';
import {SSR_HASH_ATTR} from '../enum';

export class Bicycle {

    constructor({fetch, count = 100, chunks = 3}) {
        Object.assign(this, {fetch, count, chunks});
    }

    renderPartial({offset, count}) {
        return this.fetch({offset, count}).then(items => items.map(partialTemplate).join(''));
    }

    getUID() {
        return `${this.count}-${this.chunks}`;
    }

    getContext(context) {
        const uid = this.getUID();
        return Object.assign({SSR_HASH_ATTR, uid}, context);
    }

    async render() {
        const {count, chunks} = this;
        const parts = [];

        for (let i = 0; i < chunks; ++i) {
            parts.push(await this.renderPartial({offset: count * i, count}));
        }

        const content = new SafeString(parts.join(''));
        const html = template(this.getContext({content}));
        return new SafeString(html);
    }

}
