import Constant from './constant';

describe('constant', () => {
    it('should be able to generate a basic constant', () => {
        const field = new Constant('basic', 'foo');
        const val: any = field.generate().value();
        expect(val).toEqual('foo');
    });

    it('should throw an error if no value is provided', () => {
        // @ts-expect-error: We expect this to error in TS world, but not JS world.
        expect(() => new Constant('basic')).toThrow(Error);
    });

    it('should know its name', () => {
        const field = new Constant('basic', 42);
        expect(field.type().typeName()).toEqual('Constant');
    });
});
