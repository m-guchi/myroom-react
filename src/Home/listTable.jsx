import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    table: {
        // minWidth: 650,
      },
}));

export default function ListTable (props) {
    const classes = useStyles();
    console.log(props.listData)
    return (
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="simple dense table">
            <TableHead>
              <TableRow>
                <TableCell>時間</TableCell>
                <TableCell align="right">温度(℃)</TableCell>
                <TableCell align="right">湿度(%)</TableCell>
                <TableCell align="right">気圧(hPa)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.listData.map((row,key) => (
                <TableRow key={key}>
                  <TableCell component="th" scope="row">{row.time}</TableCell>
                  <TableCell align="right">{row.temp}</TableCell>
                  <TableCell align="right">{row.humid}</TableCell>
                  <TableCell align="right">{(row.press/100).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    );
}
