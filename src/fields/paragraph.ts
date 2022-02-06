import {
    SerializableField,
    GeneratableField,
    SynthdType
} from '../';

import { faker } from '@faker-js/faker';

type ParagraphOptions = {
    numberOfSentences?: number,
    numberOfParagraphs?: number,
};

class Paragraph implements GeneratableField {
    fieldName: string;
    options: ParagraphOptions;

    constructor(fieldName: string, options: ParagraphOptions = {}) {
        this.fieldName = fieldName;
        this.options = options;
    }

    name(): string {
        return this.fieldName;
    }

    type(): SynthdType {
        return {
            typeName(): string {
                return 'Paragraph';
            }
        };
    }

    generate(): SerializableField {
        const fieldName = this.fieldName;
        const typeFunc = this.type;
        const options = this.options;
        return {
            name(): string {
                return fieldName;
            },
            type: typeFunc,
            value(): any {
                if (options.numberOfParagraphs) {
                    return faker.lorem.paragraphs(options.numberOfParagraphs);
                }
                return faker.lorem.paragraph(options.numberOfSentences);
            },
        }
    }

}

export default Paragraph;
