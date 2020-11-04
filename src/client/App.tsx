import React, { useState, useEffect, FC } from 'react';
import { Typography, Layout, message } from 'antd';
import { TaskList } from './components/TaskList';
import { ITaskDTO } from '../shared/ITaskDTO';
import * as taskService from './services/tasks.service';

const { Title } = Typography;
const { Header } = Layout;

export const App: FC = () => {
  const [tasks, setTasks] = useState<ITaskDTO[]>([]);

  const refreshTasks: () => Promise<void> = () => {
    return taskService.getTasks()
      .then(setTasks)
      .catch((err) => message.error(err.message));
  };

  useEffect(() => {
    refreshTasks();
  }, []);

  const onCheckboxClick: (task: ITaskDTO) => () => Promise<void> = (task: ITaskDTO) => () => {
    return taskService.updatedTaskStatus(task)
      .then(refreshTasks)
      .catch((err) => message.error(err.message));
  };

  const onAddNewTask: (title: string) => Promise<void> = (title) => {
    return taskService.addNewTask(title)
      .then(refreshTasks)
      .catch((err) => message.error(err.message));
  };

  const onDelete: (taskid: string) => Promise<void> = (taskid) => {
    return taskService.deleteTask(taskid)
      .then(refreshTasks)
      .catch((err) => message.error(err.message));
  };

  return (
    <Layout className='layout'>
      <Header>
        <Title className='title'>Shared todo list</Title>
      </Header>
      <div className='center-content'>
        <Layout.Content className='center-content-main'>
          <TaskList tasks={tasks} onCheckboxClick={onCheckboxClick} onAddNewTask={onAddNewTask} onDelete={onDelete} />
        </Layout.Content>
      </div>
    </Layout>
  );
};
