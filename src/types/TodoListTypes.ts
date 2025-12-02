export interface Task {
    id: number;
    name: string;
    info?: string;
    isImportant?: boolean;
    isCompleted?: boolean;
}

export interface CreateTaskRequest {
    name: string;
    info?: string;
    isImportant?: boolean;
    isCompleted?: boolean;
}

export interface UpdateTaskRequest {
    id: number;
    name?: string;
    info?: string;
    isImportant?: boolean;
    isCompleted?: boolean;
}

export type TaskFilter = {
    isCompleted?: boolean;
    isImportant?: boolean;
    name_like?: string;
};
