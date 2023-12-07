// traveldataReducer.js
import initialState from './initialState.json';
import { SET_TRAVELDATA, UPDATE_TRAVELDATA, DELETE_TRAVELDATA } from '../actions/actions';

const traveldataReducer = (state = initialState.traveldata, action) => {
  switch (action.type) {
    case SET_TRAVELDATA:
      return { ...action.payload };
    case UPDATE_TRAVELDATA:
      return { ...action.payload };
    case DELETE_TRAVELDATA:
      return {}; // Set the state to an empty object to delete the data
    default:
      return state;
  }
};

export default traveldataReducer;
