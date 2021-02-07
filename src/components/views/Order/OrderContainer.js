import { connect } from 'react-redux';
import Order from './Order';
import { getAllThinking, fetchFromAPI, getLoadingState, fetchChangeStatusToAPI   } from '../../../redux/tablesRedux';



const mapStateToProps = (state) => ({

  tablesThinking: getAllThinking(state),
  loading: getLoadingState(state),

});


const mapDispatchToProps = (dispatch) => ({
  fetchTables: () => dispatch(fetchFromAPI()),
  changedTableStatus: (row) => dispatch(fetchChangeStatusToAPI(row)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Order);
