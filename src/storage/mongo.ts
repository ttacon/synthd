import {
    JSONSerializer,
    Serializable,
    StorageBackend,
} from '../';

type MongoistCollection = {
    insertMany(docs: any)
};

class MongoistBackend implements StorageBackend {
    db: any;

    constructor(db: any) {
        this.db = db;
    }

    async store(
        collectionName: string,
        docs: Serializable[],
    ): Promise<void> {
        await this.db.collection(collectionName).insertMany(
            docs.map((d) => d.serialize(JSONSerializer)),
        );
    }
}

export {
    MongoistBackend,
    MongoistCollection,
};