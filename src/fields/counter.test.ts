import Counter from './counter';

describe('counter', () => {
    it('should be able to generate a basic counter', () => {
        const field = new Counter('basic');
        let num: number = field.generate().value();
        expect(num).toEqual(0);

        num = field.generate().value();
        expect(num).toEqual(1);
    });

    it('should be able to generate a basic counter from a defined start', () => {
        const field = new Counter('basic', {
            start: 10,
        });
        let num: number = field.generate().value();
        expect(num).toEqual(10);

        num = field.generate().value();
        expect(num).toEqual(11);
    });

    it('should be able to generate a number with a custom step value', () => {
        const field = new Counter('basic', {
            increment: 100,
        });
        let num: number = field.generate().value();
        expect(num).toEqual(0);

        num = field.generate().value();
        expect(num).toEqual(100);
    });

    it('should know its name', () => {
        const field = new Counter('basic', {
            increment: 100,
        });
        expect(field.type().typeName()).toEqual('Counter');
    });


});
