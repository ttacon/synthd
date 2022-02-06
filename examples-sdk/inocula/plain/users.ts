import {
    Generatable,
    JSONSerializer,
} from '../../../src';

import {
    Date,
    Email,
    FirstName,
    LastName,
    LinkedField,
    UUID,
} from '../../../src/fields';
import UserAgent from '../../../src/fields/userAgent';

const User = new Generatable('user', [
    new UUID('_id'),
    new FirstName('firstName'),
    new LastName('lastName'),
    new Email('email'),
]);

const Session = new Generatable('session', [
    new UUID('sessionID'),
    new Date('createdAt', {
        past: true,
    }),
    new LinkedField('userID', {
        obj: User,
        field: '_id',
    }),
    new UserAgent('sessionUserAgent'),
]);

console.log(User.generate(5).map((v) => v.serialize(JSONSerializer)));
console.log(Session.generate(20).map((v) => v.serialize(JSONSerializer)));

