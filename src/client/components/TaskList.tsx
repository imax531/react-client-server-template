import React, { FC, useState } from 'react';
import { Input } from 'antd';
import { TaskSubList } from './TaskSubList';
import { ITaskDTO } from '../../shared/ITaskDTO';

interface TaskListProps {
  tasks: ITaskDTO[];
  onCheckboxClick: (task: ITaskDTO) => () => Promise<void>;
  onAddNewTask: (title: string) => Promise<void>;
  onDelete: (taskid: string) => Promise<void>;
}

export const TaskList: FC<TaskListProps> = ({ tasks, onCheckboxClick, onAddNewTask, onDelete }) => {
  const [newTaskInput, setNewTaskInput] = useState('');

  const addTask = (e) => {
    if (e.key === 'Enter') {
      onAddNewTask(newTaskInput);
      setNewTaskInput('');
    }
  };

  return (
    <div className='task-container'>
      <TaskSubList status={false} tasks={tasks} onCheckboxClick={onCheckboxClick} onDelete={onDelete} />
      <Input
        onKeyDown={addTask}
        placeholder='Add new task...'
        bordered={false}
        value={newTaskInput}
        onChange={(e) => setNewTaskInput(e.target.value)}
        className='new-task-input'
      />
      <hr />
      <TaskSubList status={true} tasks={tasks} onCheckboxClick={onCheckboxClick} onDelete={onDelete} />
    </div>
  );
};
