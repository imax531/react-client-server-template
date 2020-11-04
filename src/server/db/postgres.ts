const { Pool } = require('pg')

export class Postgres {
    pool;

    constructor(private url: string) {
        this.pool = new Pool({ connectionString: this.url });
        this.pool.query('CREATE TABLE IF NOT EXISTS tasks (taskid VARCHAR (36) PRIMARY KEY, title VARCHAR (128), status BOOLEAN)');
    }

    get() {
        return this.pool.query('SELECT * FROM tasks').then(res => res.rows);
    }

    post(id, title) {
        return this.pool.query('INSERT INTO tasks (taskid, title, status) VALUES ($1::text, $2::text, false)', [id, title]);
    }

    delete(id) {
        return this.pool.query('DELETE FROM tasks WHERE taskid = $1::text', [id]);
    }

    update(id, status) {
        return this.pool.query('UPDATE tasks SET status = $2::boolean WHERE taskid = $1::text', [id, status]);
    }
}