import { combineReducers } from 'redux';
import traveldataReducer from './settraveldata';
import initialdataReducer from './sendinitialdata';
import finaldataReducer from './sendfinaldata';
import saveuserReducer from './saveuser'
import setauthReducer from './setauth'

const rootReducer = combineReducers({
    traveldataReducer:traveldataReducer,
    initialdataReducer:initialdataReducer,
    finaldataReducer: finaldataReducer,
    saveuserReducer:saveuserReducer,
    setauthReducer:setauthReducer
  })
  
  export default rootReducer