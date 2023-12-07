// traveldataReducer.js
import initialState from './initialState.json';
import { SAVE_USER} from '../actions/actions';

const  saveuserReducer = (state = initialState.userData, action)  => {
  switch (action.type) {
    case SAVE_USER:
      return { ...action.payload }; 
    default:
      return state;
  }
};

export default saveuserReducer;
