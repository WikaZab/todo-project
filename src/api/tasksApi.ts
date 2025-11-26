import { createApi } from '@reduxjs/toolkit/query/react';
import {
    CreateTaskRequest, Task, TaskFilter, UpdateTaskRequest,
} from 'types/TodoListTypes';
import { axiosBaseQuery } from 'api/apiAxios';

export const tasksApi = createApi({
    reducerPath: 'taskApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Task'],
    endpoints: (builder) => ({
        getTasks: builder.query<Task[], void>({
            query: () => ({
                url: '/tasks',
                method: 'GET',
            }),
            providesTags: ['Task'],
        }),
        getTaskById: builder.query<Task, number>({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: 'GET',
            }),
            providesTags: ['Task'],
        }),

        getTasksWithFilters: builder.query<Task[], TaskFilter>({
            query: (filters) => ({
                url: '/tasks',
                method: 'GET',
                params: {
                    ...(filters.isImportant !== undefined && { isImportant: filters.isImportant }),
                    ...(filters.isCompleted !== undefined && { isCompleted: filters.isCompleted }),
                    ...(filters.name_like && { name_like: filters.name_like }),
                    _t: Date.now(), // Добавляем timestamp для избежания кеширования
                },
            }),
            providesTags: ['Task'],
        }),

        createTask: builder.mutation<Task, CreateTaskRequest>({
            query: (newTask) => ({
                url: '/tasks',
                method: 'POST',
                data: newTask,
            }),
            invalidatesTags: ['Task'],
        }),

        updateTask: builder.mutation<Task, UpdateTaskRequest>({
            query: ({ id, ...changes }) => ({
                url: `/tasks/${id}`,
                method: 'PATCH',
                data: changes,
            }),
            invalidatesTags: ['Task'],
        }),

        deleteTask: builder.mutation<void, number>({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Task'],
        }),
    }),
});

export const {
    useGetTasksQuery,
    useGetTaskByIdQuery,
    useGetTasksWithFiltersQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
} = tasksApi;
