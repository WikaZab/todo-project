import React from 'react';
import { useDeleteTaskMutation, useGetTasksQuery, useUpdateTaskMutation } from 'api/taskApi';
import { Task } from 'types/TodoListTypes';
import * as cls from 'app/TodoListPage/TodoList/TodoList.module.scss';
import { useNavigate } from 'react-router';
import DeleteIcon from 'components/assets/delete.svg';
import EditIcon from 'components/assets/edit.svg';
import { Loader } from 'components/Loader/Loader';

const TaskList: React.FC = () => {
    const { data: tasks, error: getTaskError, isLoading } = useGetTasksQuery();
    const [updateTask] = useUpdateTaskMutation();
    const [deleteTask] = useDeleteTaskMutation();
    const navigate = useNavigate();

    // Обработчик изменения статуса задачи
    const handleToggleComplete = async (task: Task) => {
        try {
            await updateTask({
                id: task.id,
                isCompleted: !task.isCompleted,
            }).unwrap();
        } catch (error) {
            console.error('Ошибка при обновлении задачи:', error);
        }
    };

    // Обработчик удаления задачи
    const handleDeleteTask = async (taskId: number) => {
        try {
            await deleteTask(taskId).unwrap();
        } catch (error) {
            console.error('Ошибка при удалении задачи:', error);
        }
    };

    // Обработчик редактирования задачи
    const handleEditTask = (task: Task) => {
        console.log('Редактирование задачи:', task);
        navigate(`/edit/${task.id}`); // ______________________________________________________________________________ заменить пути на константы
    };

    if (isLoading) {
        return (
            <Loader textLoader="Звгрузка задач..." />
        );
    }

    if (getTaskError) {
        return (
            <div className={cls.errorContainer}>
                Ошибка при загрузке задач:
                {'status' in getTaskError ? getTaskError.status : 'Неизвестная ошибка'}
            </div>
        );
    }

    if (!tasks || tasks.length === 0) {
        return (
            <div className={cls.emptyContainer}>
                Задачи не найдены
            </div>
        );
    }

    return (
        <div className={cls.tasksContainer}>
            {tasks.map((task: Task) => (
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
                            <div>
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
                            {/* Кнопки действий */}
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

export default TaskList;
