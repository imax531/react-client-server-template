import React, { FC } from 'react';
import { Checkbox } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ITaskDTO } from '../../shared/ITaskDTO';

interface TaskSubListProps {
  tasks: ITaskDTO[];
  status;
  onDelete;
  onCheckboxClick;
}

export const TaskSubList: FC<TaskSubListProps> = ({ tasks, status, onDelete, onCheckboxClick }) => (
  <>
    {tasks
      .filter((_) => _.status === status)
      .map((task) => (
        <div key={task.taskid} className='checkbox-cont'>
          <DeleteOutlined className='delete-button' onClick={() => onDelete(task.taskid)} />
          <Checkbox onClick={onCheckboxClick(task)} checked={task.status} className={task.status && 'checked'}>
            {task.title}
          </Checkbox>
        </div>
      ))}
  </>
);
