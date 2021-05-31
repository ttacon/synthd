import FutureDateField from './futureDate';


describe('futureDate', () => {
    it('should be able to retrieve the name of the field', () => {
        const field = new FutureDateField('dateField');
        expect(field.name()).toEqual('dateField');
    });

    it('should be in the future', () => {
        const field = new FutureDateField('dateField', {
            yearsOffset: 2,
        });
        const date = new Date();
        const generated = new Date(field.generate().value());
        const yearDifference = generated.getFullYear() - date.getFullYear();
        expect(yearDifference <= 2).toBe(true);
    });

    it('should ignore the past date option', () => {
        const field = new FutureDateField('dateField', {
            past: true,
            yearsOffset: 2,
        });
        const date = new Date();
        const generated = new Date(field.generate().value());
        const yearDifference = generated.getFullYear() - date.getFullYear();
        expect(yearDifference <= 2).toBe(true);
    });
});