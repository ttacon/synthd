import {
    SerializableField,
    GeneratableField,
    SynthdType
} from '../';

import * as faker from 'faker';

class UserAgent implements GeneratableField {
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
                return 'UserAgent';
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
                return faker.internet.userAgent();
            },
        }
    }

}

export default UserAgent;
