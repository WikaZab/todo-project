import React, { useState, useEffect, useMemo } from 'react';
import { CreateTaskRequest, Task } from 'types/TodoListTypes';
import * as cls from 'components/TaskForm/TaskForm.module.scss';
import { useForm } from 'react-hook-form';

export interface TaskFormProps {
    // Данные задачи (для редактирования) или пустая форма (для создания)
    initialData?: CreateTaskRequest;

    // Обработчики
    onSubmit: (data: CreateTaskRequest) => void;
    onCancel?: () => void;
    isLoading?: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({
    initialData, onSubmit, onCancel, isLoading,
}) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: initialData || {
            name: '',
            info: '',
            isImportant: false,
            isCompleted: false,
        },
    });
    const buttonText = useMemo(() => {
        if (isLoading) {
            return initialData ? 'Обновление...' : 'Отправление...';
        }
        return initialData ? 'Обновить' : 'Отправить';
    }, [isLoading, initialData]);
    const handleFormSubmit = (data: CreateTaskRequest) => {
        console.log('Отправленные данные:', data);
        if (onSubmit) onSubmit(data);
    };
    const handleCancel = () => {
        reset();
        if (onCancel) onCancel();
    };

    return (
        <div className={cls.formContainer}>
            <h2>{initialData ? 'Редактировать задачу' : 'Новая задача'}</h2>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                {/* Поле Название */}
                <div className={cls.formGroup}>
                    <label>
                        Название:
                        <input
                            type="text"
                            {...register('name')}
                            className={cls.formInput}
                        />
                    </label>
                </div>

                {/* Поле Info */}
                <div className={cls.formGroup}>
                    <label>
                        Info:
                        <input
                            type="text"
                            {...register('info')}
                            className={cls.formInput}
                        />
                    </label>
                </div>

                {/* Чекбоксы */}
                <div className={cls.formGroup}>
                    <label className={cls.checkboxLabel}>
                        <input
                            type="checkbox"
                            disabled={initialData?.isCompleted}
                            {...register('isImportant')}
                        />
                        Пометить как важное
                    </label>
                </div>

                <div className={cls.formGroup}>
                    <label className={cls.checkboxLabel}>
                        <input
                            type="checkbox"
                            {...register('isCompleted')}
                        />
                        Выполнено
                    </label>
                </div>

                {/* Кнопки */}
                <div className={cls.buttonGroup}>
                    <button type="submit" className={cls.btnPrimary}>
                        {buttonText}
                    </button>
                    <button type="button" onClick={handleCancel} className={cls.btnSecondary}>
                        Отменить
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TaskForm;
