import {
    SerializableField,
    GeneratableField,
    SynthdType
} from '../';

import { faker } from '@faker-js/faker';


class City implements GeneratableField {
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
                return 'City';
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
                return faker.address.city();
            },
        }
    }

}

export default City;
