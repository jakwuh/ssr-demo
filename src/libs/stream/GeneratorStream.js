import {Readable} from 'stream';

export class GeneratorStream extends Readable {

    constructor(generator) {
        super();
        this.iterator = generator();
    }

    /**
     * @description should start pushing data until .push(data) returns false
     * @private
     */
    _read() {
        if (!this.lock) {
            this.readAndEmit().then(() => {
               this.lock = false;
            }, error => {
                this.emit('error', error);
            });
            this.lock = true;
        }
        return null;
    }

    async readAndEmit() {
        let stop = false;
        do {
            let {value, done} = this.iterator.next();
            // if current value is promise - await it
            if (value && value.then) {
                value = await value;
            }
            // we should stop if either iterator is done or
            // .push() returns false (which means readable stream internal buffers are full)
            stop = !this.push(done ? null : value) || done;
        } while (!stop)
    }

}
