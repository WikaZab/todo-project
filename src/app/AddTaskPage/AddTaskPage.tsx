import React from 'react';
import { useCreateTaskMutation } from 'api/tasksApi';
import TaskForm from 'components/TaskForm/TaskForm';
import { CreateTaskRequest } from 'types/TodoListTypes';
import { useNavigate } from 'react-router-dom';

const CreateTask = () => {
    const navigate = useNavigate();
    const [createTask, { isLoading }] = useCreateTaskMutation();

    const handleSubmit = async (newTask: CreateTaskRequest) => {
        try {
            await createTask(newTask).unwrap();

            navigate('/tasks');
        } catch (error) {
            console.error('Ошибка при создании задачи:', error);
        }
    };

    const handleCancel = () => {
        navigate('/tasks');
    };

    return (
        <TaskForm onSubmit={handleSubmit} onCancel={handleCancel} isLoading={isLoading} />
    );
};
export default CreateTask;
