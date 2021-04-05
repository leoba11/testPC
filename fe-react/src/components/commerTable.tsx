import React, {useEffect, useState} from "react";

import axios from "axios";
import {CSVLink} from "react-csv";

import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

interface Column {
    id: "username" | "promotionType" | "phoneNumber" | "date" | "hour" ;
    label: string;
    minWidth?: number;
    align?: "right";
}

const columns: Column[] = [
    { id: "username", label: "Usuario", minWidth: 170 },
    { id: "promotionType", label: "Tipo de Promoción", minWidth: 100 },
    {
        id: "phoneNumber",
        label: "Número de Telefono",
        minWidth: 170,
        align: "right",
    },
    {
        id: "date",
        label: "Fecha",
        minWidth: 170,
        align: "right",
    },
    {
        id: "hour",
        label: "Hora",
        minWidth: 170,
        align: "right",
    },
];

const useStyles = makeStyles({
    root: {
        width: "100%",
    },
    container: {
        maxHeight: 440,
    },
});

const CommerTable = () => {

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8080/api/reportUsers").then(res => {
            const result = res.data.reporUsers;
            setData(result)
        })
    },[]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const headers = [
        {label: 'Usuario', key: 'username'},
        {label: 'Tipo de promoción', key: 'promotionType'},
        {label: 'Número de Telefono', key: 'phoneNumber'},
        {label: 'Fecha', key: 'date'},
        {label: 'Hora', key: 'hour'}
    ];

    const csvReport = {
        filename: 'Report.csv',
        headers: headers,
        data: data
    };

    return(
        <div>
            <Paper className={classes.root}>
                <Button> <CSVLink {...csvReport}> Exportar info</CSVLink> </Button>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        // @ts-ignore
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                            {columns.map((column) => {
                                                // @ts-ignore
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        { value }
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    )
}

export default CommerTable
