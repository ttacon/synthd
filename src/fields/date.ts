import {
    SerializableField,
    GeneratableField,
    SynthdType
} from '../';

import * as faker from 'faker';

type DateOptions = {
    past?: boolean,
};

class Date implements GeneratableField {
    fieldName: string;
    opts: DateOptions;

    constructor(fieldName: string, opts: DateOptions = {}) {
        this.fieldName = fieldName;
        this.opts = opts;
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
                    return faker.date.past(3);
                }
                return faker.date.recent(1);
            },
        }
    }

}

export default Date;