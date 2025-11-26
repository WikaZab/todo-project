import TaskList from 'app/TodoListPage/TodoList/TodoList';
import { HeaderCalendar } from 'components/HeaderTodo/HeaderTodo';
import React, { memo, useState } from 'react';
import { FilterTasks } from 'components/FilterTasks/FilterTasks';
import { TaskFilter } from 'types/TodoListTypes';
import * as cls from 'app/TodoListPage/TodoListPage.module.scss';

const TodoListPage = () => {
    const [filters, setFilters] = useState<TaskFilter>({});
    return (
        <div>
            <div className={cls.app}>
                <header className={cls.header}>
                    <div className={cls.title}>
                        <h1>TODO List</h1>
                    </div>
                    <div>
                        <HeaderCalendar />
                    </div>
                </header>
                <main className={cls.main}>
                    <div className={cls.filtersSection}>
                        <FilterTasks setFilters={setFilters} />
                    </div>
                    <div className={cls.sectionTasks}>
                        <TaskList filters={filters} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default memo(TodoListPage);
