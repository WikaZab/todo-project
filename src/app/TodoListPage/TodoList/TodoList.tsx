import React, { memo, useCallback } from 'react';
import { useDeleteTaskMutation, useGetTasksWithFiltersQuery, useUpdateTaskMutation } from 'api/tasksApi';
import { Task, TaskFilter } from 'types/TodoListTypes';
import * as cls from 'app/TodoListPage/TodoList/TodoList.module.scss';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from 'components/assets/delete.svg';
import EditIcon from 'components/assets/edit.svg';
import { Loader } from 'components/Loader/Loader';

interface TaskListProps {
    filters: TaskFilter;
}

const TaskList: React.FC<TaskListProps> = ({ filters }) => {
    const navigate = useNavigate();
    const { data: filteredTasks, error: Error, isLoading } = useGetTasksWithFiltersQuery(filters);
    const [updateTask] = useUpdateTaskMutation();
    const [deleteTask] = useDeleteTaskMutation();

    // Обработчик изменения статуса задачи
    const handleToggleComplete = useCallback(async (task: Task) => {
        try {
            await updateTask({
                id: task.id,
                isCompleted: !task.isCompleted,
            }).unwrap();
        } catch (error) {
            console.error('Ошибка при обновлении задачи:', error);
        }
    }, [updateTask]);

    // Обработчик удаления задачи
    const handleDeleteTask = useCallback(async (taskId: number) => {
        try {
            await deleteTask(taskId).unwrap();
        } catch (error) {
            console.error('Ошибка при удалении задачи:', error);
        }
    }, [deleteTask]);

    // Обработчик редактирования задачи
    const handleEditTask = (task: Task) => {
        navigate(`/tasks/edit/${task.id}`);
    };

    if (isLoading) {
        return <Loader textLoader="Загрузка задач..." />;
    }

    if (Error) {
        return (
            <div className={cls.errorContainer}>
                Ошибка при загрузке задач:
                {'status' in Error ? Error.status : 'Неизвестная ошибка'}
            </div>
        );
    }

    if (!filteredTasks || filteredTasks.length === 0) {
        return (
            <div className={cls.emptyContainer}>
                Задачи не найдены
            </div>
        );
    }

    return (
        <div className={cls.tasksContainer}>
            {filteredTasks.map((task: Task) => (
                <div
                    key={task.id}
                    className={`
        ${cls.taskItem}
        ${task.isCompleted ? cls.completed : ''}
        ${task.isImportant ? cls.important : ''}
    `}
                >
                    <div className={cls.taskContent}>
                        <div className={cls.taskMain}>
                            <input
                                type="checkbox"
                                checked={task.isCompleted}
                                onChange={() => handleToggleComplete(task)}
                                className={cls.checkbox}
                            />
                            <div className={cls.taskTextContainer}>
                                {' '}
                                {/* Добавлен контейнер для текста */}
                                <h3 className={`
                    ${cls.taskName}
                    ${task.isCompleted ? cls.completedText : ''}
                    ${task.isImportant ? cls.importantText : ''}
                `}
                                >
                                    {task.name}
                                </h3>
                                {task.info && (
                                    <p className={cls.taskInfo}>{task.info}</p>
                                )}
                            </div>
                        </div>
                        <div className={cls.taskBadges}>
                            <span className={`
                ${cls.statusBadge}
                ${task.isCompleted ? cls.completedBadge : cls.activeBadge}
            `}
                            >
                                {task.isCompleted ? 'Завершена' : 'Активна'}
                            </span>
                            <div className={cls.taskActions}>
                                <button
                                    type="button"
                                    onClick={() => handleEditTask(task)}
                                    className={cls.editButton}
                                    title="Редактировать задачу"
                                >
                                    <EditIcon />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleDeleteTask(task.id)}
                                    className={cls.deleteButton}
                                    title="Удалить задачу"
                                >
                                    <DeleteIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default memo(TaskList);
