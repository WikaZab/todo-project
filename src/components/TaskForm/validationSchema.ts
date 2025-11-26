import * as yup from 'yup';
import { CreateTaskRequest } from 'types/TodoListTypes';

export const taskFormSchema = yup.object({
    name: yup
        .string()
        .required('Название задачи обязательно для заполнения')
        .min(2, 'Название должно содержать минимум 2 символа')
        .max(25, 'Название не должно превышать 25 символов'),

    info: yup
        .string()
        .required('Описание задачи обязательно для заполнения')
        .min(2, 'Описание должно содержать минимум 2 символов')
        .max(50, 'Описание не должно превышать 50 символов'),

    isImportant: yup
        .boolean()
        .default(false),
    isCompleted: yup
        .boolean()
        .default(false),
});
// Типы
export type TaskFormData = yup.InferType<typeof taskFormSchema>;
// Утилита для санитизации данных перед отправкой
export const sanitizeTaskData = (data: TaskFormData): CreateTaskRequest => ({
    ...data,
    name: data.name.trim(),
    info: data.info.trim(),
});
