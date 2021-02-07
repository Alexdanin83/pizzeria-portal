import React from 'react';
import styles from './Kitchen.module.scss';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class Kitchen extends React.Component {
  static propTypes = {
    fetchTables: PropTypes.func,
    loading: PropTypes.shape({
      active: PropTypes.bool,
      error: PropTypes.oneOfType([PropTypes.bool,PropTypes.string]),
    }),
  
    tablesOrdered: PropTypes.any,
    changedTableStatus: PropTypes.func,
  }
  componentDidMount(){
    const { fetchTables } = this.props;
    fetchTables();
  }
  clickCheckbox(row){
    row.status = 'prepared';
    console.log(row);
    const { changedTableStatus } = this.props;
    changedTableStatus(row);
  }
  renderActions(row)  {
    const status = row.status;
    if (status==='ordered') {
      return (
        <FormControlLabel
          control={<Checkbox checked={false} onChange={() => {this.clickCheckbox(row); }} name="checkBox" />}
          label="ordered/prepared"
        />
      );
    }
    else return (  <p>Nie znany status</p>);

  }
  render() {
    const { loading: { active, error }, tablesOrdered } = this.props;
    console.log(tablesOrdered);
    if(active || !tablesOrdered.length){
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
              {tablesOrdered.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>
                    {this.renderActions(row)}
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
    }
  }
}
export default Kitchen;
