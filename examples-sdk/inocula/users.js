const {
    Generatable,
    JSONSerializer,
} = require('synthd');

const {
    Date,
    Email,
    FirstName,
    LastName,
    LinkedField,
    MongoObjectID,
    UserAgent,
    UUID,
} = require('synthd/fields');

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
    }),
    new UserAgent('sessionUserAgent'),
]);

console.log(User.generate(5).map((v) => v.serialize(JSONSerializer)));
console.log(Session.generate(20).map((v) => v.serialize(JSONSerializer)));

