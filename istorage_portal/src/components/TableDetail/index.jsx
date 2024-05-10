import { Container, Table, TableHead, TableRow, TableCell, Button } from "@mui/material"

const TableDetail = ({
    headText,
    data,
    handleBorrow
}) => {

    return (
        <Container maxWidth="md" sx={{
            mt: 20
        }}>
            <Table sx={{
                width: '100%',
            }}>
                <TableHead sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                }}>
                    <p>{headText}</p>
                    <Button onClick={handleBorrow}>Mượn</Button>
                </TableHead>
                {
                    data.map((item, index) => {
                        return (
                            <TableRow key={index}>
                                <TableCell variant="head">{item.title}</TableCell>
                                <TableCell>{item.value}</TableCell>
                            </TableRow>
                        )
                    })
                }
            </Table>
        </Container>
    )
}

export default TableDetail
