import {
    JSONSerializer,
    Serializable,
    StorageBackend,
} from '../';

import type { Client } from '@elastic/elasticsearch';

class ElasticsearchBackend implements StorageBackend {
    client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    async store(
        indexName: string,
        docs: Serializable[],
    ): Promise<void> {
        const indexDocs = docs.map((doc) => {
            return [{
                index: {
                    _index: indexName,
                },
            }, doc.serialize(JSONSerializer)];
        });

        console.log(indexDocs)

        const accumulated = indexDocs.reduce(
            (acc, val) => acc.concat(val), 
            [],
        );

        console.log(JSON.stringify(accumulated, null, '  '));

        await this.client.bulk({
            body: accumulated,
        });
    }
}

export {
    ElasticsearchBackend,
};