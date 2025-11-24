// components/CreateTask/CreateTask.tsx
import React, { useState } from 'react';
import { useCreateTaskMutation } from 'api/taskApi';
import TaskForm from 'components/TaskForm/TaskForm';
import { CreateTaskRequest, Task } from 'types/TodoListTypes';
import { useNavigate } from 'react-router-dom';

const CreateTask = () => {
    const navigate = useNavigate();
    const [createTask, { isLoading }] = useCreateTaskMutation();

    const handleSubmit = async (newTask: CreateTaskRequest) => {
        try {
            await createTask(newTask).unwrap();

            navigate('/'); // Возвращаемся на главную страницу после успешного обновления
        } catch (error) {
            console.error('Ошибка при создании задачи:', error);
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <TaskForm onSubmit={handleSubmit} onCancel={handleCancel} isLoading={isLoading} />
    );
};
export default CreateTask;
