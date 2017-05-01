import rawData from './data.json';

const data = rawData.map(([date, price]) => ({date, price: price.toFixed(2)}));

/**
 * In real applications fetching data from the client is not the same as fetching data
 * from the server as long as both SSR-server and API-server are in the same DC
 */
const delay = IS_SERVER ? 100 : 500;

export default function({offset = 0, count = 20} = {}) {
    return new Promise(resolve => {
        setTimeout(() => resolve(data.slice(offset, offset + count)) ,delay)
    });
}
