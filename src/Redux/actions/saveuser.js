import {SAVE_USER} from "./actions"


export const saveuser = (userData) => {
    return {
        type:SAVE_USER,
        payload :userData
    }
  }
 
