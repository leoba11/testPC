import React, {useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import {Button} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { DataGrid, ColDef, ValueGetterParams } from '@material-ui/data-grid';

import axios from "axios";
import {useHistory} from "react-router-dom";

interface Column {
    id: "username" | "promotionType" | "phoneNumber" | "date" | "hour" | "action";
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
    {
        id: "action",
        label: "Acción",
        minWidth: 170,
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

const ReportTable: React.FunctionComponent = () => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState([]);


    const history = useHistory();

    useEffect( () => {
         axios.get("http://localhost:8080/api/reportUsers").then(res => {
            const result  = res.data.reporUsers;
            setRows(result);
        })
    }, [])

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const deleteR = async (id: any) => {
        await axios.delete(`http://localhost:8080/api/reportUsers/${id}`);

         await axios.get("http://localhost:8080/api/reportUsers").then(res => {
            const result  = res.data.reporUsers;
            setRows(result);
        });
    }

    return (
        <div>
            <Paper className={classes.root}>
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
                            {rows
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
                                                        { column.id === "action"
                                                            ?
                                                            <div>
                                                                <Button onClick={() => { history.push("/edit", row) } }><EditIcon/></Button>
                                                                <Button onClick={ () => {// @ts-ignore
                                                                    deleteR(row._id)} }><DeleteIcon/></Button>
                                                            </div>
                                                            : value }
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
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
};

export default ReportTable;
