import {
    SerializableField,
    GeneratableField,
    SynthdType,
    Generatable
} from '../';


type Reference = {
    obj: Generatable,
    field: string,
};


class LinkedField implements GeneratableField {
    fieldName: string;
    ref: Reference;
    valuePool: SerializableField[] = [];

    constructor(fieldName: string, ref: Reference) {
        this.fieldName = fieldName;
        this.ref = ref;

        const refField = this.getRefField();
        const originalGenerate = refField.generate;
        const valuePoolRef = this.valuePool;
        refField.generate = function(): SerializableField {
            const generatedField = originalGenerate.apply(refField);
            valuePoolRef.push(generatedField);
            return generatedField;
        };
    }

    getRefField(): GeneratableField {
        return this.ref.obj.getFieldByName(this.ref.field);
    }

    name(): string {
        return this.fieldName;
    }

    type(): SynthdType {
        const refField = this.getRefField();
        if (!refField) {
            return undefined;
        }
        return refField.type();
    }

    generate(): SerializableField {
        const fieldName = this.fieldName;
        const typeFunc = this.type;
        const valuePool = this.valuePool;
        return {
            name(): string {
                return fieldName;
            },
            type: typeFunc,
            value(): any {
                if (!valuePool.length) {
                    return undefined;
                }

                return valuePool[
                    Math.floor(Math.random()*valuePool.length)
                ].value();
            },
        }
    }

}

export default LinkedField;