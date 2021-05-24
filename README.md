# synthd

Synthetic data generation system.

This is changing frequently, do not expect this to be stable until v0.1.0.

## What we're building

Teams need the ability to generate and store generated data at scale.
`synthd` has a few goals:

 1. An SDK for generating test data.
 2. A CLI command for generating data from JSON definitions.
 3. A CLI command for generating JSON definitions from Mongo and SQL example data.

This allows quality engineers, and developers in general, to develop a
substantial amount of data in order to teat functionality at scale, all
with a minimum of effort.

### Examples

#### JSON test data

(From `examples-sdk/inocula/users`).

```ts
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
```

#### Storing test data in Mongo

```sh
# <Example to be added>
```