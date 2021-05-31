import Date, { DateOptions } from './date';

class FutureDate extends Date {
    constructor(fieldName: string, opts: DateOptions = {}) {
        if (opts.past) {
            delete opts['past'];
        }
        opts.future = true;
        super(fieldName, opts);
    }
}

export default FutureDate;