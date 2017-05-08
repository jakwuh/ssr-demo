import './Bicycle.css';
import {SafeString} from 'handlebars/runtime';
import partialTemplate from './Wheel.hbs';
import template from './Bicycle.hbs';
import {SSR_HASH_ATTR} from '../enum';
import Cache from 'lru-cache';

const cache = new Cache(100);

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

    async render() {
        const uid = this.getUID();
        const {count, chunks} = this;
        const parts = [];

        if (cache.has(uid)) {
            console.info('Cache hit.');
            return cache.get(uid);
        }

        for (let i = 0; i < chunks; ++i) {
            parts.push(await this.renderPartial({offset: count * i, count}));
        }

        const content = new SafeString(parts.join(''));
        const html = new SafeString(template({SSR_HASH_ATTR, content, uid}));
        cache.set(uid, html);
        return html;
    }

}
