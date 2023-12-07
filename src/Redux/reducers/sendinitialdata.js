import initialState from './initialState.json';
import { SEND_INITIALDATA } from '../actions/actions';

const initialdataReducer = (state = initialState.initialdata, action) => {
  switch (action.type) {
    case SEND_INITIALDATA:
      return { ...action.payload }; 
    default:
      return state;
  }
};

export default initialdataReducer;
