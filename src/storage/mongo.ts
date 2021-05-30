import {
    JSONSerializer,
    Serializable,
    StorageBackend,
} from '../';

import type { DatabaseWithProxy } from 'mongoist';

class MongoistBackend implements StorageBackend {
    db: DatabaseWithProxy;

    constructor(db: DatabaseWithProxy) {
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
};