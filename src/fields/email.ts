import {
    SerializableField,
    GeneratableField,
    SynthdType
} from '../';

import { faker } from '@faker-js/faker';


class Email implements GeneratableField {
    fieldName: string;

    constructor(fieldName: string) {
        this.fieldName = fieldName;
    }

    name(): string {
        return this.fieldName;
    }

    type(): SynthdType {
        return {
            typeName(): string {
                return 'Email';
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
            value(): any {
                return faker.internet.email();
            },
        }
    }

}

export default Email;
