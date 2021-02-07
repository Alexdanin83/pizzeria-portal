import React from 'react';
//import PropTypes from 'prop-types';
import styles from './Tables.module.scss';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const tableData = [
  {
    hour: '12:00',
    tables: [
      { id: 1, status: 'booked' },
      { id: 2, status: 'booked' },
      { id: 3, status: 'free' },
    ],
  },
  {
    hour: '12:30',
    tables: [
      { id: 1, status: 'booked' },
      { id: 2, status: 'booked' },
      { id: 3, status: 'free' },
    ],
  },
  {
    hour: '13:00',
    tables: [
      { id: 1, status: 'booked' },
      { id: 2, status: 'event' },
      { id: 3, status: 'free' },
    ],
  },
  {
    hour: '13:30',
    tables: [
      { id: 1, status: 'free' },
      { id: 2, status: 'booked' },
      { id: 3, status: 'free' },
    ],
  },
];

const renderActions = (status) => {
  switch (status) {
    case 'free':
      return (
        <div className={styles.cellPosition}>
          <div className={styles.cellPosition}>
            <h2>Free</h2>
          </div>
          <div className={`${styles.cellPosition} + ${styles.links}`}>
            <Button
              component={Link}
              variant='contained'
              color='primary'
              size="small"
              to={`${process.env.PUBLIC_URL}/tables/booking/new`}>
            New Booking
            </Button>
          </div>
          <div className={`${styles.cellPosition} + ${styles.links}`}>
            <Button
              component={Link}
              variant='contained'
              color='secondary'
              size="small"
              to={`${process.env.PUBLIC_URL}/tables/events/new`}>
            New Events
            </Button>
          </div>
        </div>
      );
    case 'booked':
      return (
        <div className={styles.cellPosition}>
          <div className={styles.cellPosition}>
            <h2>Booked</h2>
          </div>
          <div className={`${styles.cellPosition} + ${styles.links}`}>
            <Button
              component={Link}
              variant='contained'
              size="small"
              color='primary'
              to={`${process.env.PUBLIC_URL}/tables/booking/:id`}>
            Booked
            </Button>
          </div>

        </div>
      );
    case 'event':
      return (
        <div className={styles.cellPosition}>
          <div className={styles.cellPosition}>
            <h2>Events</h2>
          </div>
          <div className={`${styles.cellPosition} + ${styles.links}`}>
            <Button
              component={Link}
              variant='contained'
              size="small"
              to={`${process.env.PUBLIC_URL}/tables/events/:id`}>
            Events
            </Button>
          </div>

        </div>
      );
    default:
      return null;
  }
};

const Tables = () => {
  return (
    <Paper className={styles.component}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell className={styles.celCenter}>Table 1</TableCell>
            <TableCell className={styles.celCenter}>Table 2</TableCell>
            <TableCell className={styles.celCenter}>Table 3</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((table) => (
            <TableRow key={table.hour}>
              <TableCell component='th' scope='row'>
                {table.hour}
              </TableCell>
              {table.tables.map((mapTable) => (
                <TableCell key={mapTable.id}>
                  {renderActions(mapTable.status)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default Tables;
