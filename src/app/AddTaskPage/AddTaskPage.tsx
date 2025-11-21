// components/CreateTask/CreateTask.tsx
import React, { useState } from 'react';
import { useCreateTaskMutation } from '../../api/taskApi';

const CreateTask = () => {
    const [name, setName] = useState('');
    const [info, setInfo] = useState('');
    const [isImportant, setIsImportant] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    const [createTask, { isLoading, error }] = useCreateTaskMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            alert('Введите название задачи');
            return;
        }

        try {
            await createTask({
                name: name.trim(),
                info: info.trim(),
                isImportant,
                isCompleted,
            }).unwrap();

            // Очищаем форму после успешного создания
            setName('');
            setInfo('');
            setIsImportant(false);
            setIsCompleted(false);

            alert('Задача успешно создана!');
        } catch (err) {
            console.error('Failed to create task:', err);
            alert('Ошибка при создании задачи');
        }
    };

    const resetForm = () => {
        setName('');
        setInfo('');
        setIsImportant(false);
        setIsCompleted(false);
    };

    return (
        <form onSubmit={handleSubmit} className="create-task-form">
            <h3>Создать новую задачу</h3>

            <div className="form-group">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label>Название задачи *</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Введите название задачи"
                    required
                />
            </div>

            <div className="form-group">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label>Описание</label>
                <textarea
                    value={info}
                    onChange={(e) => setInfo(e.target.value)}
                    placeholder="Введите описание задачи"
                    rows={3}
                />
            </div>

            <div className="checkboxes">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={isImportant}
                        onChange={(e) => setIsImportant(e.target.checked)}
                    />
                    Важная задача
                </label>

                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={isCompleted}
                        onChange={(e) => setIsCompleted(e.target.checked)}
                    />
                    Выполнена
                </label>
            </div>

            <div className="form-actions">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="btn primary"
                >
                    {isLoading ? 'Создание...' : 'Создать задачу'}
                </button>

                <button
                    type="button"
                    onClick={resetForm}
                    className="btn secondary"
                >
                    Очистить
                </button>
            </div>

            {error && (
                <div className="error-message">
                    Ошибка при создании задачи:
                    {' '}
                    {JSON.stringify(error)}
                </div>
            )}
        </form>
    );
};
export default CreateTask;
