import {
    SerializableField,
    GeneratableField,
    SynthdType
} from '../';

import { faker } from '@faker-js/faker';

type PhoneNumberOptions = {
    areaCode?: number,
};

class PhoneNumber implements GeneratableField {
    fieldName: string;
    options: PhoneNumberOptions;

    constructor(fieldName: string, options: PhoneNumberOptions = {}) {
        this.fieldName = fieldName;
        this.options = options;
    }

    name(): string {
        return this.fieldName;
    }

    type(): SynthdType {
        return {
            typeName(): string {
                return 'PhoneNumber';
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
                // We won't support phone numbers for now, but we should add
                // in support for specifying area codes and country formats.
                return faker.phone.phoneNumber();
            },
        }
    }

}

export default PhoneNumber;
