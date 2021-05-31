import Date, { DateOptions } from './date';

class PastDate extends Date {
    constructor(fieldName: string, opts: DateOptions = {}) {
        if (opts.future) {
            delete opts['future'];
        }
        opts.past = true;
        super(fieldName, opts);
    }
}

export default PastDate;