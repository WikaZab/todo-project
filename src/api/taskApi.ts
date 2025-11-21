// api/taskApi.ts
import { createApi } from '@reduxjs/toolkit/query/react'; // Убрали fetchBaseQuery
import { axiosBaseQuery } from './api';
import {
    CreateTaskRequest, Task, TaskFilter, UpdateTaskRequest,
} from '../types/TodoListTypes';

export const taskApi = createApi({
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

        getTasksWithFilters: builder.query<Task[], TaskFilter>({
            query: (filters) => ({
                url: '/tasks',
                method: 'GET', // Явно указываем метод
                params: filters,
            }),
            providesTags: ['Task'],
        }),

        createTask: builder.mutation<Task, CreateTaskRequest>({
            query: (newTask) => ({
                url: '/tasks',
                method: 'POST',
                data: newTask, // Используем data вместо body
            }),
            invalidatesTags: ['Task'],
        }),

        updateTask: builder.mutation<Task, UpdateTaskRequest>({
            query: ({ id, ...changes }) => ({
                url: `/tasks/${id}`,
                method: 'PATCH',
                data: changes, // Используем data вместо body
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
    useGetTasksWithFiltersQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
} = taskApi;
