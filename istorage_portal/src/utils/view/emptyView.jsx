import { Box } from '@mui/material';

const EmptyView = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
            }}
        >
            <h1>Chưa có hồ sơ, văn bản trong giỏ hàng</h1>
        </Box>
    );
};

export default EmptyView;
