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
    ElasticsearchBackend,
 } from '../../src/storage/elasticsearch';

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

import { Client } from '@elastic/elasticsearch';

const client = new Client({ node: 'http://localhost:9200' })

const backend = new ElasticsearchBackend(client);

const finished = Promise.all([
    backend.store('users', User.generate(5)),
    backend.store('sessions', Session.generate(20)),
]);

finished.then(() => process.exit());