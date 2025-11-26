import React from 'react';
import { TaskFilter } from 'types/TodoListTypes';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as cls from 'components/FilterTasks/FilterTasks.module.scss';

interface TaskFiltersProps {
    setFilters: (filters: TaskFilter) => void;
}

interface FilterFormValues {
    name_like?: string;
    isImportant?: string;
    isCompleted?: string;
}

export const FilterTasks: React.FC<TaskFiltersProps> = ({ setFilters }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const {
        register, handleSubmit, reset,
    } = useForm<FilterFormValues>({
        defaultValues: {
            name_like: searchParams.get('search') || '',
            isImportant: searchParams.get('isImportant') || '',
            isCompleted: searchParams.get('isCompleted') || '',
        },
    });

    const onSubmit = (data: FilterFormValues) => {
        const newFilters: TaskFilter = {};
        const newSearchParams = new URLSearchParams();

        if (data.name_like && data.name_like.trim() !== '') {
            newFilters.name_like = data.name_like;
            newSearchParams.set('search', data.name_like);
        }

        if (data.isImportant && data.isImportant !== '') {
            newFilters.isImportant = data.isImportant === 'true';
            newSearchParams.set('isImportant', data.isImportant);
        }

        if (data.isCompleted && data.isCompleted !== '') {
            newFilters.isCompleted = data.isCompleted === 'true';
            newSearchParams.set('isCompleted', data.isCompleted);
        }

        setFilters(newFilters);
        setSearchParams(newSearchParams);
    };

    const clearFilters = () => {
        reset({
            name_like: '',
            isImportant: '',
            isCompleted: '',
        });
        setSearchParams(new URLSearchParams());
        setFilters({});
    };

    return (
        <div className={cls.container}>
            <h3>Фильтры</h3>
            <form
                onChange={handleSubmit(onSubmit)}
                className={cls.formFilter}
            >
                {/* Поиск */}
                <div className={cls.search}>
                    <input
                        type="text"
                        placeholder="Поиск по названию..."
                        {...register('name_like')}
                    />
                </div>
                {/* Важность */}
                <div className={cls.select}>
                    <select
                        {...register('isImportant')}
                    >
                        <option value="">Все по важности</option>
                        <option value="true">Важные</option>
                        <option value="false">Неважные</option>
                    </select>
                </div>

                {/* Статус */}
                <div className={cls.select}>
                    <select
                        {...register('isCompleted')}
                    >
                        <option value="">Все по готовности</option>
                        <option value="true">Выполненные</option>
                        <option value="false">Невыполненные</option>
                    </select>
                </div>

                {/* Кнопка сброса */}
                <button
                    type="button"
                    onClick={clearFilters}
                    className={cls.btnClear}
                >
                    Сбросить
                </button>
            </form>
        </div>
    );
};
