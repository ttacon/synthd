import {
    SerializableField,
    GeneratableField,
    SynthdType
} from '../';


/**
 * Occasionally, you need to generate a field with the same value across all your data (e.g.
 * an activation field). In that situation, a `ConstantField` is what you want to use. Its job
 * is to always return the same value, no matter what.
 *
 * You can use it like so:
 * ```typescript
 * const numConstant = new Constant('numConstant', 5);
 *
 * const strConstant = new Constant('strConstant', 'Hello, there!');
 * ```
 */
class Constant implements GeneratableField {
    fieldName: string;
    value: any;

    constructor(fieldName: string, value: any) {
        if (value === undefined) {
            throw new Error('must provide a value');
        }
        this.fieldName = fieldName;
        this.value = value;
    }

    name(): string {
        return this.fieldName;
    }

    type(): SynthdType {
        return {
            typeName(): string {
                return 'Constant';
            }
        };
    }

    generate(): SerializableField {
        const value: number = this.value;
        const fieldName = this.fieldName;
        const typeFunc = this.type;
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

export default Constant;
