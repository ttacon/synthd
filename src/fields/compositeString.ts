import {
    SerializableField,
    GeneratableField,
    SynthdType
} from '../';

type CompositeStringOptions = {
    typeName: string,
    fieldName: string,
    delimeter?: string,
};

class CompositeString implements GeneratableField {
    options: CompositeStringOptions;
    fieldGenerators: GeneratableField[];

    constructor(options: CompositeStringOptions, ...fieldGenerators: GeneratableField[]) {
        this.options = options;
        this.fieldGenerators = fieldGenerators;
    }

    name(): string {
        return this.options.fieldName;
    }

    type(): SynthdType {
        const typeName = this.options.typeName;
        return {
            typeName(): string {
                return typeName;
            }
        };
    }

    generate(): SerializableField {
        const fieldName = this.options.fieldName;
        const typeFunc = this.type;
        const fieldGenerators = this.fieldGenerators;
        const delimeter = this.options.delimeter || ' ';
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
                return gener8d.join(delimeter);
            },
        }
    }
}

export default CompositeString;
