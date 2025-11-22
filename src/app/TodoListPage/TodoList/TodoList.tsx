import React from 'react';
import { useGetTasksQuery } from 'api/taskApi';
import { Task } from 'types/TodoListTypes';
import * as cls from 'app/TodoListPage/TodoList/TodoList.module.scss';

const TaskList: React.FC = () => {
    const { data: tasks, error, isLoading } = useGetTasksQuery();

    if (isLoading) {
        return (
            <div className={cls.loadingContainer}>
                <div className={cls.spinner} />
                <span className={cls.loadingText}>Загрузка задач...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className={cls.errorContainer}>
                Ошибка при загрузке задач:
                {'status' in error ? error.status : 'Неизвестная ошибка'}
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
                        ${task.isImportant ? cls.important : ''}
                    `}
                >
                    <div className={cls.taskContent}>
                        <div className={cls.taskMain}>
                            <input
                                type="checkbox"
                                checked={task.isCompleted}
                                readOnly
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
                            {task.isImportant && (
                                <span className={cls.importantBadge}>
                                    Важная
                                </span>
                            )}
                            <span className={`
                                ${cls.statusBadge}
                                ${task.isCompleted ? cls.completedBadge : cls.activeBadge}
                            `}
                            >
                                {task.isCompleted ? 'Завершена' : 'Активна'}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
