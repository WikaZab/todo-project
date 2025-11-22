import { Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React from 'react';
import { useNavigate } from 'react-router';
import { ViewType } from 'app/TodoListPage/TodoListPage';
import * as cls from 'app/HeaderTodo/HeaderTodo.module.scss';
import CalendarIcon from 'components/assets/calendar.svg';
import ListIcon from 'components/assets/list.svg';

interface HeaderCalendarProps {
    view: ViewType;
    handleViewMode: (props:ViewType) => void;
}

export const HeaderCalendar = (props: HeaderCalendarProps) => {
    const {
        view,
        handleViewMode,
    } = props;
    const navigate = useNavigate();

    return (
        <div className={cls.header_wrapper}>

            <Space>
                {/* Переключатель режимов */}
                <Button.Group>
                    <Button
                        type={view === 'calendar' ? 'primary' : 'default'}
                        onClick={() => handleViewMode('calendar')}
                    >
                        <CalendarIcon />
                    </Button>
                    <Button
                        type={view === 'list' ? 'primary' : 'default'}
                        onClick={() => handleViewMode('list')}
                    >
                        <ListIcon />
                    </Button>
                </Button.Group>

                {/* Кнопка добавления задачи */}
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => navigate('/add')}
                    size="middle"
                >
                    Добавить задачу
                </Button>
            </Space>
        </div>
    );
};
