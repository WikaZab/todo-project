import React, { memo, useCallback, useState } from 'react';
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

    // Храним состояния загрузки для каждой задачи
    const [updatingTasks, setUpdatingTasks] = useState<Record<number, boolean>>({});
    const [deletingTasks, setDeletingTasks] = useState<Record<number, boolean>>({});

    // Обработчик изменения статуса задачи
    const handleToggleComplete = useCallback(async (task: Task) => {
        setUpdatingTasks((prev) => ({ ...prev, [task.id]: true }));
        try {
            await updateTask({
                id: task.id,
                isCompleted: !task.isCompleted,
            }).unwrap();
        } catch (error) {
            console.error('Ошибка при обновлении задачи:', error);
        } finally {
            setUpdatingTasks((prev) => ({ ...prev, [task.id]: false }));
        }
    }, [updateTask]);

    // Обработчик удаления задачи
    const handleDeleteTask = useCallback(async (taskId: number) => {
        if (deletingTasks[taskId]) {
            return;
        }
        setDeletingTasks((prev) => ({ ...prev, [taskId]: true }));

        try {
            await deleteTask(taskId).unwrap();
        } catch (error) {
            console.error('Ошибка при удалении задачи:', error);
        } finally {
            setTimeout(() => {
                setDeletingTasks((prev) => ({ ...prev, [taskId]: false }));
            }, 0);
        }
    }, [deletingTasks, deleteTask]);

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
                                disabled={updatingTasks[task.id]}
                                className={cls.checkbox}
                            />
                            <div className={cls.taskTextContainer}>
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
                                    disabled={updatingTasks[task.id] || deletingTasks[task.id]}
                                    type="button"
                                    onClick={() => handleEditTask(task)}
                                    className={cls.editButton}
                                    title="Редактировать задачу"
                                >
                                    <EditIcon />
                                </button>
                                <button
                                    disabled={deletingTasks[task.id] || updatingTasks[task.id]}
                                    type="button"
                                    onClick={() => handleDeleteTask(task.id)}
                                    className={cls.deleteButton}
                                    title="Удалить задачу"
                                >
                                    {deletingTasks[task.id] ? (
                                        <Loader />
                                    ) : (
                                        <DeleteIcon />
                                    )}
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
