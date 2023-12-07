// traveldataReducer.js
import initialState from './initialState.json';
import { SEND_FINALDATA} from '../actions/actions';

const  finaldataReducer = (state = initialState.finaldata, action) => {
  switch (action.type) {
    case SEND_FINALDATA:
      return { ...action.payload }; 
    default:
      return state;
  }
};

export default finaldataReducer;
