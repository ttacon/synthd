import { type } from "os";

class Generatable {

    name: string;
    fields: GeneratableField[];

    constructor(name: string, fields: GeneratableField[]) {
        this.name = name;
        this.fields = fields;
    }

    generate(count: number): Serializable[] {
        const values = [];

        for (let i=0;i<count; i++) {
            values.push(new Serializable(
                this.fields.map((f) => f.generate()),
            ));
        }

        return values;
    }

    getFieldByName(name: string): GeneratableField {
        for (const field of this.fields) {
            if (field.name() === name) {
                return field;
            }
        }
        return UnknownField;    }
}

const UnknownField: GeneratableField = {
    name(): string { return '<unknown>'; },
    type(): SynthdType {
        return {
            typeName(): string { return '<unknown>'; },
        }
    },
    generate(): SerializableField {
        return {
            name(): string { return '<unknown>'; },
            type(): SynthdType {
                return {
                    typeName(): string { return '<unknown>'; },
                }
            },
            value(): any {
                throw new Error('<unknown field>');
            }
        }
    }
};

class Serializable {
    fields: SerializableField[];

    constructor(fields: SerializableField[]) {
        this.fields = fields;
    }

    serialize(serializer: Serializer): any {
        return serializer(this.fields);
    }
}

type Serializer = (fields: SerializableField[]) => any;

function JSONSerializer(fields: SerializableField[]): any {
    // Make an object and return it.
    const obj: {[key: string]: any} = {};

    for (const field of fields) {
        obj[field.name()] = field.value();
    }

    return obj;
}

interface SerializableField {
    name(): string;
    type(): SynthdType;
    value(): any;
}

interface SynthdType {
    typeName(): string;
}

interface GeneratableField {
    name(): string;
    type(): SynthdType;
    generate(): SerializableField;
}

interface StorageBackend {
    store(name: string, docs: Serializable[]): void;
}

export {
    Generatable,
    GeneratableField,
    Serializable,
    Serializer,
    SerializableField,
    StorageBackend,
    SynthdType,

    JSONSerializer,
}

export * from './fields';
export * from './storage';