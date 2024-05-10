import { useState } from 'react';
import { Button, Popconfirm } from 'antd';

export const PopupConfirm = ({onAccept, onDecline}) => {
    const [open, setOpen] = useState(false);
    const showPopconfirm = () => {
        setOpen(true);
    };

    const handleOk = () => {
        onAccept();
    };

    const handleCancel = () => {
        onDecline();
        setOpen(false);
    };

    return (
        <Popconfirm
            title="Title"
            description="Open Popconfirm with async logic"
            open={open}
            onConfirm={handleOk}
            onCancel={handleCancel}
        >
            <Button type="primary" onClick={showPopconfirm}>
                Open Popconfirm with async logic
            </Button>
        </Popconfirm>
    );
}
