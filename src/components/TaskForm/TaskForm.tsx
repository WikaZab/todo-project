import React, { useMemo } from 'react';
import { CreateTaskRequest } from 'types/TodoListTypes';
import * as cls from 'components/TaskForm/TaskForm.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { taskFormSchema } from 'components/TaskForm/validationSchema';

export interface TaskFormProps {
    initialData?: CreateTaskRequest;
    onSubmit: (data: CreateTaskRequest) => void;
    onCancel?: () => void;
    isLoading?: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({
    initialData, onSubmit, onCancel, isLoading,
}) => {
    const {
        register, handleSubmit, reset, watch,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(taskFormSchema),
        defaultValues: initialData || {
            name: '',
            info: '',
            isImportant: false,
            isCompleted: false,
        },
    });
    const nameValue = watch('name') || '';
    const infoValue = watch('info') || '';
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
                            placeholder="Введите название задачи"
                            maxLength={25}
                        />
                    </label>
                    <div className={cls.fieldInfo}>
                        <span className={cls.charCount}>
                            {nameValue.length}
                            /50 символов
                        </span>
                        {errors.name && (
                            <span className={cls.errorMessage}>{errors.name.message}</span>
                        )}
                    </div>
                </div>

                {/* Поле Info */}
                <div className={cls.formGroup}>
                    <label>
                        Info:
                        <textarea
                            placeholder="Опишите задачу"
                            rows={4}
                            maxLength={50}
                            {...register('info')}
                            className={cls.formInput}
                        />
                    </label>
                    <div className={cls.fieldInfo}>
                        <span className={cls.charCount}>
                            {infoValue.length}
                            /50 символов
                        </span>
                        {errors.info && (
                            <span className={cls.errorMessage}>{errors.info.message}</span>
                        )}
                    </div>
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
                    {errors.isImportant && (
                        <span className={cls.errorMessage}>{errors.isImportant.message}</span>
                    )}
                </div>
                {initialData && (
                    <div className={cls.formGroup}>
                        <label className={cls.checkboxLabel}>
                            <input
                                type="checkbox"
                                {...register('isCompleted')}
                            />
                            Выполнено
                        </label>
                        {errors.isCompleted && (
                            <span className={cls.errorMessage}>{errors.isCompleted.message}</span>
                        )}
                    </div>
                )}

                {/* Кнопки */}
                <div className={cls.buttonGroup}>
                    <button
                        type="submit"
                        className={cls.btnPrimary}
                        disabled={isLoading}
                    >
                        {buttonText}
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className={cls.btnSecondary}
                        disabled={isLoading}
                    >
                        Отменить
                    </button>
                </div>
                <div className={cls.formInfo}>
                    {!isValid && (
                        <p className={cls.validationInfo}>
                            Исправьте ошибки в форме перед отправкой
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
};

export default TaskForm;
