import {
    SerializableField,
    GeneratableField,
    SynthdType
} from '../';

class CompositeString implements GeneratableField {
    fieldName: string;
    typeName: string;
    fieldGenerators: GeneratableField[];

    constructor(typeName: string, fieldName: string, ...fieldGenerators: GeneratableField[]) {
        this.typeName = typeName;
        this.fieldName = fieldName;
        this.fieldGenerators = fieldGenerators;
    }

    name(): string {
        return this.fieldName;
    }

    type(): SynthdType {
        const typeName = this.typeName;
        return {
            typeName(): string {
                return typeName;
            }
        };
    }

    generate(): SerializableField {
        const fieldName = this.fieldName;
        const typeFunc = this.type;
        const fieldGenerators = this.fieldGenerators;
        return {
            name(): string {
                return fieldName;
            },
            type: typeFunc,
            value(): any {
                const gener8d = [];
                for (const gen of fieldGenerators) {
                    gener8d.push(gen.generate().value());
                }
                return gener8d.join(" ");
            },
        }
    }
}

export default CompositeString;
