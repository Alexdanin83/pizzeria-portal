import React from 'react';
import styles from './Kitchen.module.scss';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

import FormControlLabel from '@material-ui/core/FormControlLabel';


const demoContent = [
  {id: '1', table: 3, status: 'prepared', order: null},
  {id: '2', table: 2, status: 'unprepared', order: null},
  {id: '3', table: 2, status: 'prepared', order: 123},

];



const renderActions = status => {
  switch (status) {
    case 'prepared':
      return (
        <FormControlLabel
          control={<Checkbox checked={true} name="checkedB" />}
          label="prepared"
        />
      );
    case 'unprepared':
      return (
        <FormControlLabel
          control={<Checkbox checked={false} name="checkedA" />}
          label="unprepared"
        />
      );
    default:
      return null;
  }
};

const Kitchen = () => (
  <Paper className={styles.component}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>id</TableCell>
          <TableCell>Table</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Order</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {demoContent.map(row => (
          <TableRow key={row.id}>
            <TableCell component="th" scope="row">
              {row.id}
            </TableCell>
            <TableCell>
              {row.table}
            </TableCell>
            <TableCell>
              {renderActions(row.status)}
            </TableCell>
            <TableCell>
              {row.order}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);

export default Kitchen;
