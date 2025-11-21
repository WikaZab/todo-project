export interface Task {
    id: number;
    name: string;
    info: string;
    isImportant: boolean;
    isCompleted: boolean;
}

export type CreateTaskRequest = Omit<Task, 'id'>;
export type UpdateTaskRequest = Partial<Omit<Task, 'id'>> & { id: number };

export type TaskFilter = {
    isCompleted?: boolean;
    isImportant?: boolean;
};
