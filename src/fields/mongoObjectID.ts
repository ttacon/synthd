import {
    SerializableField,
    GeneratableField,
    SynthdType
} from '../';

function mongoObjectID() {
    const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
}

class MongoObjectID implements GeneratableField {
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
                return 'MongoObjectID';
            }
        };
    }

    generate(): SerializableField {
        const fieldName = this.fieldName;
        const typeFunc = this.type;
        const value = mongoObjectID();
        return {
            name(): string {
                return fieldName;
            },
            type: typeFunc,
            value(): any {
                return value;
            },
        }
    }

}

export default MongoObjectID;