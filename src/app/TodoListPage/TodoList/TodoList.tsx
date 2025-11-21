// components/TaskList.tsx
import React from 'react';
import { useGetTasksQuery } from 'api/taskApi';
import { Task } from 'types/TodoListTypes';

const TaskList: React.FC = () => {
    const { data: tasks, error, isLoading } = useGetTasksQuery();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
                <span className="ml-2">Загрузка задач...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                Ошибка при загрузке задач:
                {' '}
                {'status' in error ? error.status : 'Неизвестная ошибка'}
            </div>
        );
    }

    if (!tasks || tasks.length === 0) {
        return (
            <div className="text-center p-8 text-gray-500">
                Задачи не найдены
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {tasks.map((task: Task) => (
                <div
                    key={task.id}
                    className={`p-4 border rounded-lg shadow-sm ${
                        task.isCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                    } ${
                        task.isImportant ? 'border-l-4 border-l-yellow-400' : ''
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                checked={task.isCompleted}
                                readOnly
                                className="h-4 w-4 text-blue-600 rounded"
                            />
                            <div>
                                <h3 className={`font-medium ${
                                    task.isCompleted ? 'line-through text-gray-500' : 'text-gray-900'
                                } ${
                                    task.isImportant ? 'text-yellow-700' : ''
                                }`}
                                >
                                    {task.name}
                                </h3>
                                {task.info && (
                                    <p className="text-sm text-gray-600 mt-1">{task.info}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            {task.isImportant && (
                                <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                                    Важная
                                </span>
                            )}
                            <span className={`px-2 py-1 text-xs rounded-full ${
                                task.isCompleted
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-blue-100 text-blue-800'
                            }`}
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
