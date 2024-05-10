import React from 'react';
import { Grid, List, ListItem, ListItemText, Checkbox, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { removeDocFromCart, removeFileFromCart } from 'src/service/actions/cartAction';
import EmptyView from 'src/utils/view/emptyView';
import ConfirmCart from 'src/components/Modal/ConfirmCart';
import { useState } from 'react';
import { Typography } from 'antd';
import { notifySuccess } from 'src/custom/Function';
const GioTaiLieu = () => {
    const dispatch = useDispatch();
    const [openOrder, setOpenOrder] = useState(false);
    const [checked, setChecked] = useState({})

    const cart = useSelector((state) => state.cart.cart);

    const handleRemoveFileFromCart = (file) => {
        dispatch(removeFileFromCart(file))
        notifySuccess('Xoá hồ sơ thành công!')

    }

    const handleRemoveDocFromCart = (doc, file) => {
        dispatch(removeDocFromCart(doc, file))
        notifySuccess('Xoá văn bản thành công!')
    }

    const handleOpenOrder = () => {
        setOpenOrder(true)
    }

    const handleCheckParentBox = (id) => {
        if (!checked[id]) {
            checked[id] = []
        }
        const fileInCart = cart.find((file) => file.id === id)
        if (checked[id].length === fileInCart.docs.length) {
            setChecked({ ...checked, [id]: [] })
        } else {
            setChecked({ ...checked, [id]: fileInCart.docs.map((doc) => doc.id) })
        }
    }

    const handleCheckChildBox = (id, docId) => {
        const checkedDoc = checked[id]
        if (checkedDoc.includes(docId)) {
            setChecked({ ...checked, [id]: checkedDoc.filter((doc) => doc !== docId) })
        } else {
            setChecked({ ...checked, [id]: [...checkedDoc, docId] })
        }
    }

    return (
        <div>
            <Grid container
                direction="column"
                justifyContent="center"
                alignItems="center">
                <Grid item sx={{
                    width: '80%',
                    maxWidth: '800px !important',
                    padding: '10px',
                }}>
                    {cart.length === 0 ? <EmptyView /> :
                        <div>
                            <Typography.Title level={3} className='mt-[20px]'>Giỏ tài liệu</Typography.Title>
                            <List>
                                {cart.map((file) => (
                                    <ListItem sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        backgroundColor: '#ccc',
                                        marginTop: '10px',
                                        borderRadius: '10px',
                                        boxShadow: '0 0 20px #ccc',
                                        width: '100%',
                                    }}>
                                        <div className='flex items-center justify-between w-full'>
                                            <div className='flex items-center'>
                                                <Checkbox
                                                    checked={checked[file.id]?.length === file.docs.length}
                                                    onClick={() => handleCheckParentBox(file.id)}
                                                />
                                                <ListItemText primary={file.data.title} />
                                            </div>
                                            <div>
                                                <Button
                                                    onClick={() => handleRemoveFileFromCart(file.data)}
                                                    sx={{
                                                        paddingLeft: '10px',
                                                    }}>Xoá</Button>
                                            </div>
                                        </div>
                                        {file.docs.length === 0 ? <p className='ml-[10%] text-[14px]'> Không có văn bản</p> :
                                            <List sx={{
                                                width: '100%',
                                                marginLeft: '10px',
                                            }}>
                                                {file.docs.map((doc) => (
                                                    <div className='flex items-center justify-between w-full'>
                                                        <div className='flex items-center'>
                                                            <Checkbox
                                                                checked={checked[file.id]?.includes(doc.id)}
                                                                onClick={() => handleCheckChildBox(file.id, doc.id)} />
                                                            <ListItem key={doc.doc_name}>
                                                                <ListItemText primary={doc.doc_name} />
                                                            </ListItem>
                                                        </div>
                                                        <div>
                                                            <Button
                                                                onClick={() => handleRemoveDocFromCart(doc, file.data)}
                                                                sx={{
                                                                    fontSize: '12px',
                                                                }}>xoá</Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </List>
                                        }
                                    </ListItem>
                                ))}
                            </List>
                            <div className='flex justify-end'>
                                <Button onClick={handleOpenOrder}>Tạo phiếu tin</Button>
                            </div>

                        </div>
                    }
                </Grid>
            </Grid>
            <ConfirmCart
                open={openOrder}
                setOpen={setOpenOrder}
            />
        </div>

    );
};

export default GioTaiLieu;
