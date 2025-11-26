import React, { memo, Suspense, useCallback } from 'react';
import { EditTaskPageAsync } from 'app/EditTaskPage/EditTaskPage.async';
import { AddTaskPageAsync } from 'app/AddTaskPage/AddTaskPage.async';
import { TodoListPageAsync } from 'app/TodoListPage/TodoListPage.async';
import NotFoundPage from 'app/NotFoundPage/NotFoundPage';
import {
    Navigate, Route, RouteProps, Routes,
} from 'react-router-dom';
import { Loader } from 'components/Loader/Loader';

export enum AppRoutes {
    TODOLIST = 'todolist',
    MAIN = 'main',
    ADD = 'add',
    EDIT = 'edit',
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.TODOLIST]: '/tasks',
    [AppRoutes.ADD]: '/tasks/add',
    [AppRoutes.NOT_FOUND]: '*',
    [AppRoutes.EDIT]: '/tasks/edit/', // +id
};

interface AppRouteProps extends RouteProps {
    path: string;
}

export const routeConfig: AppRouteProps[] = [
    {
        path: RoutePath.main,
        element: <Navigate to="/tasks" replace />,
    },
    {
        path: RoutePath.todolist,
        element: <TodoListPageAsync />,
    },
    {
        path: RoutePath.add,
        element: <AddTaskPageAsync />,
    },
    {
        path: `${RoutePath.edit}:id`,
        element: <EditTaskPageAsync />,
    },
    {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
];

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRouteProps) => {
        const element = (
            <Suspense fallback={<Loader />}>
                {route.element}
            </Suspense>
        );
        return (
            <Route
                key={route.path}
                path={route.path}
                element={element}
            />
        );
    }, []);

    return (
        <Routes>
            {routeConfig.map(renderWithWrapper)}
        </Routes>
    );
};

export default memo(AppRouter);
