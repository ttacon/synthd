import {
    SerializableField,
    GeneratableField,
    SynthdType
} from '../';

import { faker  } from '@faker-js/faker';

export type DateOptions = {
    past?: boolean,
    future?: boolean,
    yearsOffset?: number,
};

class Date implements GeneratableField {
    fieldName: string;
    opts: DateOptions;

    constructor(fieldName: string, opts: DateOptions = {}) {
        this.fieldName = fieldName;
        this.opts = opts;

        if ((this.opts.past || this.opts.future) && !this.opts.yearsOffset) {
            this.opts.yearsOffset = 3;
        }
    }

    name(): string {
        return this.fieldName;
    }

    type(): SynthdType {
        return {
            typeName(): string {
                return 'Date';
            }
        };
    }

    generate(): SerializableField {
        const fieldName = this.fieldName;
        const typeFunc = this.type;
        return {
            name(): string {
                return fieldName;
            },
            type: typeFunc,
            value: ():any => {
                if (this.opts.past) {
                    return faker.date.past(this.opts.yearsOffset);
                } else if (this.opts.future) {
                    return faker.date.future(this.opts.yearsOffset)
                }
                return faker.date.recent(1);
            },
        }
    }

}

export default Date;
