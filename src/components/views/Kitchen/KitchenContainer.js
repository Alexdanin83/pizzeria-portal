import { connect } from 'react-redux';
import Kitchen from './Kitchen';
import { getAllOrdered, fetchFromAPI, getLoadingState, fetchChangeStatusToAPI   } from '../../../redux/tablesRedux';



const mapStateToProps = (state) => ({

  tablesOrdered: getAllOrdered(state),
  loading: getLoadingState(state),

});


const mapDispatchToProps = (dispatch) => ({
  fetchTables: () => dispatch(fetchFromAPI()),
  changedTableStatus: (row) => dispatch(fetchChangeStatusToAPI(row)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Kitchen);
