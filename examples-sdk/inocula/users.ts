import {
    Generatable,
    JSONSerializer,
} from '../../src';

import {
    Date,
    Email,
    FirstName,
    LastName,
    LinkedField,
    MongoObjectID,
    UUID,
} from '../../src/fields';

const User = new Generatable('user', [
    new MongoObjectID('_id'),
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
    })
]);

console.log(User.generate(5).map((v) => v.serialize(JSONSerializer)));
console.log(Session.generate(20).map((v) => v.serialize(JSONSerializer)));

