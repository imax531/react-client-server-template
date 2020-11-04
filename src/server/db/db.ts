export class DB {
    constructor(private mongo, private postgres) { }

    // NOTE: this implementation does NOT verify syncronization of the databases and does not handle partial successes!
    // Handling such cases requires more robust error handleing and (depending on the chose design) an external service.

    createTask(id: string, title: string): Promise<any[]> {
        return Promise.all([this.mongo.post(id, title), this.postgres.post(id, title)]);
    }

    deleteTask(taskId: string): Promise<any[]> {
        return Promise.all([this.mongo.delete(taskId), this.postgres.delete(taskId)]);
    }

    getTasks(): Promise<any[]> {
        return this.mongo.get().catch(err => this.postgres.get());
    }

    updateTask(taskId: string, status: boolean): Promise<any[]> {
        return Promise.all([this.mongo.update(taskId, status), this.postgres.update(taskId, status)])
    }
}