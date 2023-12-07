
import { SETAUTH } from "../actions/actions";
const initialState = {
    isDivVisible: false,
  };
  
  const setauthReducer = (state = initialState, action) => {
    switch (action.type) {
      case SETAUTH:
        return {
          ...state,
          isDivVisible: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default setauthReducer;