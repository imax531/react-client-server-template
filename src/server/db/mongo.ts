import { MongoClient } from 'mongodb';

export class MongoDB {
    collection;

    constructor(private url: string, private dbName: string) {
        MongoClient.connect(this.url, { useUnifiedTopology: true }, (err, client) => {
            if (err) throw err;
            const db = client.db(this.dbName);
            this.collection = db.collection('todo');
        });
    }

    get() {
        return new Promise((res, rej) => {
            this.collection.find({}).toArray(function (err, docs) {
                err ? rej(err) : res(docs);
            });
        });
    }

    post(id, title) {
        return new Promise((res, rej) => {
            this.collection.insert({ taskid: id, title, status: false }, (err, result) => {
                err ? rej(err) : res(result)
            });
        });
    }

    delete(id) {
        return new Promise((res, rej) => {
            this.collection.deleteOne({ taskid: id }, (err, result) => {
                err ? rej(err) : res(result)
            });
        });
    }

    update(id, status) {
        return new Promise((res, rej) => {
            this.collection.updateOne({ taskid: id }, { $set: { status } }, (err, result) => {
                err ? rej(err) : res(result)
            });
        });
    }

}
