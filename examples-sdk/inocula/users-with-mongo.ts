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
    PhoneNumber,
    UserAgent,
    UUID,
} from '../../src/fields';

import {
    MongoistBackend,
 } from '../../src/storage/mongo';

const User = new Generatable('user', [
    new MongoObjectID('_id'),
    new FirstName('firstName'),
    new LastName('lastName'),
    new Email('email'),
    new PhoneNumber('phoneNumber'),
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

import mongoist from 'mongoist';
import UserAgent from '../../src/fields/userAgent';

const db = mongoist('mongodb://localhost:27017/users-with-mongo');

const mongoBackend = new MongoistBackend(db);

const finished = Promise.all([
    mongoBackend.store('users', User.generate(5)),
    mongoBackend.store('sessions', Session.generate(20)),
]);

finished.then(() => process.exit());