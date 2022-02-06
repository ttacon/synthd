import {
    SerializableField,
    GeneratableField,
    SynthdType
} from '../';

import { faker } from '@faker-js/faker';

type IPAddressOptions = {
    ipv6: boolean,
};

class IPAddress implements GeneratableField {
    fieldName: string;
    options: IPAddressOptions;

    constructor(fieldName: string,options: IPAddressOptions) {
        this.fieldName = fieldName;
        this.options = options;
    }

    name(): string {
        return this.fieldName;
    }

    type(): SynthdType {
        return {
            typeName(): string {
                return 'IPAddress';
            }
        };
    }

    generate(): SerializableField {
        const fieldName = this.fieldName;
        const typeFunc = this.type;
        const options = this.options;
        return {
            name(): string {
                return fieldName;
            },
            type: typeFunc,
            value(): any {
                if (options.ipv6) {
                    return faker.internet.ipv6();
                }
                return faker.internet.ip();
            },
        }
    }

}

export default IPAddress;
