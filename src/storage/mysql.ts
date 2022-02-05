import {
    ArrayFieldSerializer,
    Serializable,
    StorageBackend,
} from '../';

import type { Connection } from 'mysql';

class MySQLBackend implements StorageBackend {
    db: Connection;

    constructor(db: Connection) {
        this.db = db;
    }

    async store(
        tableName: string,
        docs: Serializable[],
    ): Promise<void> {
        const insertQuery = `INSERT INTO ${tableName} VALUES ?`;
        const values = docs.map((d) => d.serialize(ArrayFieldSerializer));
        return new Promise((resolve, reject) => {
            this.db.query(insertQuery, [ values ], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
}

export {
    MySQLBackend,
};
