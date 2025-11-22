import React, { useState, useEffect } from 'react';
import { Task } from 'types/TodoListTypes';
import * as cls from 'components/TaskForm/TaskForm.module.scss';

export interface TaskFormProps {
    // Данные задачи (для редактирования) или пустая форма (для создания)
    initialData?: Partial<Task>;

    // Флаги управления интерфейсом
    showCompletedCheckbox?: boolean;
    isEditing?: boolean;

    // Обработчики
    onSubmit: (data: Partial<Task>) => void;
    onCancel?: () => void;

    // Состояние загрузки
    isLoading?: boolean;

    // Дополнительные классы
    className?: string;
}

const TaskForm: React.FC<TaskFormProps> = ({
    initialData,
    showCompletedCheckbox = true,
    isEditing = false,
    onSubmit,
    onCancel,
    isLoading = false,
    className = '',
}) => {
    const [formData, setFormData] = useState<Partial<Task>>({
        name: '',
        info: '',
        isImportant: false,
        isCompleted: false,
    });

    const [errors, setErrors] = useState<{ name?: string }>({});

    // Заполняем форму начальными данными
    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                info: initialData.info || '',
                isImportant: initialData.isImportant || false,
                isCompleted: initialData.isCompleted || false,
            });
        }
    }, [initialData]);

    // Обработчик изменения полей формы
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const { checked } = (e.target as HTMLInputElement);
            setFormData((prev) => ({
                ...prev,
                [name]: checked,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }

        // Очищаем ошибки при вводе
        if (name === 'name' && errors.name) {
            setErrors((prev) => ({ ...prev, name: undefined }));
        }
    };

    // Валидация формы
    const validateForm = (): boolean => {
        const newErrors: { name?: string } = {};

        if (!formData.name?.trim()) {
            newErrors.name = 'Название задачи обязательно';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Обработчик отправки формы
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        onSubmit(formData);
    };

    return (
        <div className={`${cls.formContainer} ${className}`}>
            <h1 className={cls.title}>
                {isEditing ? 'Редактирование задачи' : 'Создание новой задачи'}
            </h1>

            <form onSubmit={handleSubmit} className={cls.form}>
                <div className={cls.formGroup}>
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label htmlFor="name" className={cls.label}>
                        Название задачи *
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name || ''}
                        onChange={handleInputChange}
                        className={`${cls.input} ${errors.name ? cls.inputError : ''}`}
                        placeholder="Введите название задачи"
                        disabled={isLoading}
                    />
                    {errors.name && (
                        <span className={cls.errorText}>{errors.name}</span>
                    )}
                </div>

                <div className={cls.formGroup}>
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label htmlFor="info" className={cls.label}>
                        Описание задачи
                    </label>
                    <textarea
                        id="info"
                        name="info"
                        value={formData.info || ''}
                        onChange={handleInputChange}
                        className={cls.textarea}
                        placeholder="Введите описание задачи (необязательно)"
                        rows={4}
                        disabled={isLoading}
                    />
                </div>

                <div className={cls.checkboxGroup}>
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label className={cls.checkboxLabel}>
                        <input
                            type="checkbox"
                            name="isImportant"
                            checked={formData.isImportant || false}
                            onChange={handleInputChange}
                            className={cls.checkbox}
                            disabled={isLoading}
                        />
                        <span className={cls.checkboxText}>Важная задача</span>
                    </label>

                    {showCompletedCheckbox && (
                        // eslint-disable-next-line jsx-a11y/label-has-associated-control
                        <label className={cls.checkboxLabel}>
                            <input
                                type="checkbox"
                                name="isCompleted"
                                checked={formData.isCompleted || false}
                                onChange={handleInputChange}
                                className={cls.checkbox}
                                disabled={isLoading}
                            />
                            <span className={cls.checkboxText}>Задача завершена</span>
                        </label>
                    )}
                </div>

                <div className={cls.actions}>
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className={cls.cancelButton}
                            disabled={isLoading}
                        >
                            Отмена
                        </button>
                    )}
                    <button
                        type="submit"
                        className={cls.submitButton}
                        disabled={isLoading}
                    >
                        {/* eslint-disable-next-line no-nested-ternary */}
                        {isLoading
                            ? (isEditing ? 'Сохранение...' : 'Создание...')
                            : (isEditing ? 'Сохранить изменения' : 'Создать задачу')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TaskForm;
