import Axios from 'axios';
import { api } from '../settings';
/* selectors */
export const getAll = ({tables}) => tables.data;


//filter(table => table.data.status === 'ordered');
//for kitchen
export const getAllOrdered = ({tables}) => {
  //convertujemy object do array, bo filter działa tylko dla array
  const arr = Object.values(tables.data);
  return arr.filter(table=>table.status==='ordered');
};
//for waiter
export const getAllThinking = ({tables}) => {
  //convertujemy object do array, bo filter działa tylko dla array
  const arr = Object.values(tables.data);
  return arr.filter(table=> (table.status==='free' || table.status==='thinking'));
};


export const getLoadingState = ({tables}) => tables.loading;

/* action name creator */
const reducerName = 'tables';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const FETCH_CHANGE_STATUS = createActionName('FETCH_CHANGE_STATUS');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const fetchChangeStatus = payload => ({ payload, type: FETCH_CHANGE_STATUS });

/* thunk creators */
export const fetchFromAPI = () => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());

    Axios
      .get(`${api.url}/api/${api.tables}`)
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};
export const fetchChangeStatusToAPI = (row) => {
  console.log(`${api.url}/api/${api.tables}/${row.id}`,row.status);
  return (dispatch) => {
    Axios
      .put(`${api.url}/api/${api.tables}/${row.id}`, row)
      .then(res => {
        dispatch(fetchChangeStatus(res.data));
        console.log('res.data');
        console.log(res.data);

      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

/* reducer */
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case FETCH_CHANGE_STATUS: {
      console.log('action.payload');
      console.log(action.payload);
      console.log('statePart.data');
      console.log(statePart.data);

      return {
        ...statePart,
        data: statePart.data.map((item)=>{

          if (item.id === action.payload.id) {
            console.log('action.payload',action.payload);
            return action.payload;
          }
          else {
            console.log('item ',item);
            return item;

          }


        }),
      };

    }

    default:
      return statePart;
  }
}
