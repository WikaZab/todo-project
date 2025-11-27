import React, { useCallback, useState } from 'react';
import { useCreateTaskMutation } from 'api/tasksApi';
import TaskForm from 'components/TaskForm/TaskForm';
import { CreateTaskRequest } from 'types/TodoListTypes';
import { useNavigate } from 'react-router-dom';
import * as cls from 'app/AddTaskPage/AddTask.module.scss';

const CreateTask = () => {
    const navigate = useNavigate();
    const [createTask, { isLoading }] = useCreateTaskMutation();
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleSubmit = useCallback(async (newTask: CreateTaskRequest) => {
        try {
            await createTask(newTask).unwrap();
            setMessage({ type: 'success', text: 'Задача успешно создана!' });
            setTimeout(() => navigate(-1), 1500);
        } catch (error) {
            console.error('Ошибка при создании задачи:', error);
            setMessage({ type: 'error', text: 'Ошибка при создании задачи =(' });
        }
    }, [createTask, navigate]);

    const handleCancel = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return (
        <div className={cls.message}>
            {message && (
                <div className={cls.messageText}>
                    {message.text}
                </div>
            )}
            <TaskForm onSubmit={handleSubmit} onCancel={handleCancel} isLoading={isLoading} />
        </div>
    );
};
export default CreateTask;
