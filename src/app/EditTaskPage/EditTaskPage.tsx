import React, { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetTaskByIdQuery, useUpdateTaskMutation } from 'api/tasksApi';
import { Task } from 'types/TodoListTypes';
import * as cls from 'app/EditTaskPage/EditTaskPage.module.scss';
import TaskForm from 'components/TaskForm/TaskForm';
import { Loader } from 'components/Loader/Loader';

const TaskEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const taskId = Number(id);

    const { data: task, error: getTaskError, isLoading } = useGetTaskByIdQuery(taskId);
    const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();

    const navigate = useNavigate();

    // Обработчик отправки формы
    const handleSubmit = useCallback(async (formData: Partial<Task>) => {
        if (!task) return;

        try {
            await updateTask({
                id: task.id,
                ...formData,
            }).unwrap();

            navigate(-1);
        } catch (error) {
            console.error('Ошибка обновления задачи:', error);
        }
    }, [updateTask, task, navigate]);

    // Обработчик отмены
    const handleCancel = useCallback(() => {
        navigate('/');
    }, [navigate]);

    if (isLoading) {
        return (
            <Loader textLoader="Загрузка задачи..." />
        );
    }

    if (getTaskError) {
        return (
            <div className={cls.errorContainer}>
                Ошибка при загрузке задачи:
                {'status' in getTaskError ? getTaskError.status : 'Неизвестная ошибка'}
            </div>
        );
    }

    if (!task) {
        return (
            <div className={cls.errorContainer}>
                Задача не найдена
            </div>
        );
    }

    return (
        <div className={cls.editContainer}>
            <TaskForm
                initialData={task}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                isLoading={isUpdating}
            />
        </div>
    );
};

export default (TaskEdit);
