import axios from 'axios';
import { ITaskDTO } from '../../shared/ITaskDTO';

export const getTasks: () => Promise<ITaskDTO[]> = () => {
    return axios.get('/tasks').then(res => res.data);
};

export const updatedTaskStatus: (task: ITaskDTO) => Promise<void> = (task: ITaskDTO) => {
    return axios.put('/tasks', { ...task, status: !task.status });
};

export const addNewTask: (title: string) => Promise<void> = (title) => {
    return axios.post('/tasks', { title });
};

export const deleteTask: (taskid: string) => Promise<void> = (taskid) => {
    return axios.delete('/tasks', { data: { taskid } });
};