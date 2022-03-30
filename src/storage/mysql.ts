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
        if (docs.length === 0) {
            return Promise.resolve();
        }

        const fieldNames = docs[0].fields.map((field) => field.name());
        const insertQuery = `INSERT INTO \`${tableName}\` (${fieldNames.join(',')}) VALUES ?`;
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
