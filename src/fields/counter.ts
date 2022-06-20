import {
    SerializableField,
    GeneratableField,
    SynthdType
} from '../';


export type CounterOptions = {
  start?: number;
  increment?: number;
};

export type CounterState = {
    start: number;
    increment: number;
};

/**
 * A Counter is an auto incrementing number. It can often be used for a SQL
 * database auto-incrementing ID field.
 *
 * Beyond it's basic counting functionality, you can tweak two settings to get custom
 * behaviour:
 *
 * You can set a custom starting value:
 * ```typescript
 * const field = new Counter('customStart', {
     start: 10,
   });
 * ```
 *
 * You can also set a custom starting increment step value:
 * ```typescript
 * const field = new Counter('customIncrement', {
 *   increment: 100,
 * });
 * ```
 */
class Counter implements GeneratableField {
    fieldName: string;
    options: CounterState;

    constructor(fieldName: string, options: CounterOptions = {
        start: 0,
        increment: 1,
    }) {
        this.fieldName = fieldName;
        this.options = {
            start: options?.start || 0,
            increment: options?.increment || 1,
        };
    }

    name(): string {
        return this.fieldName;
    }

    type(): SynthdType {
        return {
            typeName(): string {
                return 'Counter';
            }
        };
    }

    generate(): SerializableField {
        const value: number = this.options.start;
        this.options.start += this.options.increment;

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

export default Counter;
