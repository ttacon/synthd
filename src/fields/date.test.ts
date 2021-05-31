import DateField from './date';


describe('date', () => {
    it('should be able to retrieve the name of the field', () => {
        const field = new DateField('dateField');
        expect(field.name()).toEqual('dateField');
    });

    it('should respect past date options', () => {
        const field = new DateField('dateField', {
            past: true,
            yearsOffset: 2,
        });
        const date = new Date();
        const generated = new Date(field.generate().value());
        const yearDifference = date.getFullYear() - generated.getFullYear();
        expect(yearDifference <= 2).toBe(true);
    });

    it('should respect future date options', () => {
        const field = new DateField('dateField', {
            future: true,
            yearsOffset: 2,
        });
        const date = new Date();
        const generated = new Date(field.generate().value());
        const yearDifference = generated.getFullYear() - date.getFullYear();
        expect(yearDifference <= 2).toBe(true);
    });
});