import CompositeString from './compositeString';
import Animal from './animal';
import City from './city';

describe('compositeString', () => {
    it('should be able to generate a complex string', () => {
        const field = new CompositeString({
                typeName: 'Team Name',
                fieldName: 'teamName',
            },
            new City('city'),
            new Animal('animal'),
        );
        const team :string = field.generate().value();
        const teamPieces = team.split(' ');
        expect(teamPieces.length).toBeGreaterThanOrEqual(2);
    });

    it('should accomodate custom delimeters', () => {
        const field = new CompositeString({
                typeName: 'Team Name',
                fieldName: 'teamName',
                delimeter: '-',
            },
            new City('city'),
            new Animal('animal'),
        );
        const team :string = field.generate().value();
        const teamPieces = team.split('-');
        expect(teamPieces.length).toBeGreaterThanOrEqual(2);
    });
});
