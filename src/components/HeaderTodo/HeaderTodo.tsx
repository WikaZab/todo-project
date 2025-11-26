import { Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React from 'react';
import { useNavigate } from 'react-router';
import * as cls from 'components/HeaderTodo/HeaderTodo.module.scss';

export const HeaderCalendar = () => {
    const navigate = useNavigate();

    return (
        <div className={cls.headerWrapper}>
            <Space>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => navigate('/tasks/add')}
                    size="middle"
                >
                    Добавить задачу
                </Button>
            </Space>
        </div>
    );
};
