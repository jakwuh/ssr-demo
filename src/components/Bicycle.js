import './Bicycle.css';
import {SafeString} from 'handlebars/runtime';
import partialTemplate from './Wheel.hbs';
import headerTemplate from './BicycleHeader.hbs';
import footerTemplate from './BicycleFooter.hbs';
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

    *render() {
        const uid = this.getUID();
        const {count, chunks} = this;

        yield headerTemplate({SSR_HASH_ATTR, uid});

        for (let i = 0; i < chunks; ++i) {
            yield this.renderPartial({offset: count * i, count});
        }

        yield footerTemplate();
    }

}
