import React from 'react';
import styles from './Order.module.scss';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Order extends React.Component {
  static propTypes = {
    fetchTables: PropTypes.func,
    loading: PropTypes.shape({
      active: PropTypes.bool,
      error: PropTypes.oneOfType([PropTypes.bool,PropTypes.string]),
    }),

    tablesThinking: PropTypes.any,
    changedTableStatus: PropTypes.func,
  }
  componentDidMount(){
    const { fetchTables } = this.props;
    fetchTables();
  }
  tableChangeStatus(row){
    row.status = 'ordered';
    row.order = document.getElementById(row.id).value;
    //console.log(document.getElementById(row.id).value);

    console.log('tableChangeStatus',row);
    const { changedTableStatus } = this.props;
    changedTableStatus(row);
  }
  renderActions(row)  {
    const status = row.status;
    if ((status==='free') || (status==='thinking')) {
      return (
        <Button onClick={() => {this.tableChangeStatus(row); }}> Zamów </Button>
      );
    }
    else return (  <p>Nie znany status</p>);

  }
  render() {
    const { loading: { active, error }, tablesThinking } = this.props;
    console.log(tablesThinking);
    if(active || !tablesThinking.length){
      return (
        <Paper className={styles.component}>
          <p>Loading...</p>
        </Paper>
      );
    } else if(error) {
      return (
        <Paper className={styles.component}>
          <p>Error! Details:</p>
          <pre>{error}</pre>
        </Paper>
      );
    } else {
      return (
        <Paper className={styles.component}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Table</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Order</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tablesThinking.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>
                    {this.renderActions(row)}
                  </TableCell>
                  <TableCell>
                    <TextField
                      required
                      id={row.id}
                      label="Required"
                      defaultValue= {row.order}
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      );
    }
  }
}
export default Order;
