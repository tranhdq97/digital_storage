import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import EditIcon from '@mui/icons-material/Edit';
import { TextField, ListItem, ListItemText, List } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
const style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 800,
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ConfirmCart = ({
    open,
    setOpen
 }) => {
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const cart = useSelector((state) => state.cart.cart);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Xác nhận thông tin
                    </Typography>
                    <Typography id="modal-modal-description" sx={{
                        mt: 2,
                        width: '100%',
                    }}>
                        <div className='flex items-center mt-[12px] justify-between'>
                            <p className='mr-[24px] font-bold'>Họ và tên</p>
                            <TextField id="my-input" aria-describedby="my-helper-text" sx={{
                                width: '80%',
                            }} />
                        </div>
                        <div className='flex items-center mt-[12px] justify-between'>
                            <p className='mr-[24px] font-bold'>Cơ quan</p>
                            <TextField id="my-input" aria-describedby="my-helper-text" sx={{
                                width: '80%',
                            }} />
                        </div>
                    </Typography>
                    <List sx={{
                        width: '100%',
                    }}>
                        {cart.map((cartItem) => (
                            <ListItem sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                backgroundColor: '#1976d2',
                                marginTop: '10px',
                                borderRadius: '10px',
                                boxShadow: '0 0 5px #ccc',
                                width: '100%',
                            }}>
                                <div className='flex items-center justify-between w-full'>
                                    <div className='flex items-center'>
                                        <ListItemText primary={cartItem.data.title} sx={{
                                            color: '#fff',
                                        }} />
                                    </div>
                                </div>
                                {cartItem.docs.length === 0 ? <p className='ml-[10%] text-[14px] text-white'> Không có văn bản</p> :
                                    <List sx={{
                                        width: '100%',
                                        marginLeft: '10px',
                                    }}>
                                        {cartItem.docs.map((doc) => (
                                            <div className='flex items-center justify-between w-full'>
                                                <div className='flex items-center'>
                                                    <ListItem key={doc.doc_name} sx={{
                                                        color: '#fff',
                                                    }}>
                                                        <ListItemText primary={doc.doc_name} />
                                                    </ListItem>
                                                </div>

                                            </div>
                                        ))}
                                    </List>
                                }
                            </ListItem>
                        ))}
                    </List>
                    <div className='mt-[40px]'>
                        <Button onClick={handleClose}>Huỷ</Button>
                        <Button onClick={handleClose}>Gửi</Button>
                    </div>

                </Box>
            </Modal>
        </div>
    );
}

export default ConfirmCart;
