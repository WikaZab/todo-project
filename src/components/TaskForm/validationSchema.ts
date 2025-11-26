import * as yup from 'yup';

export const taskFormSchema = yup.object({
    name: yup
        .string()
        .required('Название задачи обязательно для заполнения')
        .min(2, 'Название должно содержать минимум 2 символа')
        .max(50, 'Название не должно превышать 25 символов'),

    info: yup
        .string()
        .required('Описание задачи обязательно для заполнения')
        .min(2, 'Описание должно содержать минимум 2 символов')
        .max(100, 'Описание не должно превышать 50 символов'),

    isImportant: yup
        .boolean()
        .default(false),
    isCompleted: yup
        .boolean()
        .default(false),
});
