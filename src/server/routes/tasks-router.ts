import bodyParser from 'body-parser';
import { Router } from 'express';
import { v4 } from 'uuid';
import { DB } from '../db/db';

export function tasksRouter(db: DB) {
    const router = Router();
    router.use(bodyParser.json());

    router.get('/tasks', (req, res) => {
        db.getTasks()
            .then(result => res.send(result))
            .catch(err => res.status(500).send(err));
    });

    router.post('/tasks', (req, res) => {
        db.createTask(v4(), req.body.title)
            .then(() => res.send('ok'))
            .catch(err => res.status(500).send(err));
    });

    router.put('/tasks', (req, res) => {
        db.updateTask(req.body.taskid, req.body.status)
            .then(() => res.send('ok'))
            .catch(err => res.status(500).send(err));
    })

    router.delete('/tasks', (req, res) => {
        db.deleteTask(req.body.taskid)
            .then(() => res.send('ok'))
            .catch(err => res.status(500).send(err));
    })

    return router;
}
