import {
    JSONSerializer,
    Serializable,
    StorageBackend,
} from '../';

type MongoistCollection = {
    insertMany(docs: any)
};

class MongoistBackend implements StorageBackend {
    coll: MongoistCollection;

    constructor(coll: MongoistCollection) {
        this.coll = coll;
    }

    async store(docs: Serializable[]): Promise<void> {
        return this.coll.insertMany(
            docs.map((d) => d.serialize(JSONSerializer)),
        );
    }
}