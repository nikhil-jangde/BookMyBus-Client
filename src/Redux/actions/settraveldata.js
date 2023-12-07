import { SET_TRAVELDATA,UPDATE_TRAVELDATA,DELETE_TRAVELDATA } from "./actions"


export const settraveldata = (traveldata) => {
    return {
        type:SET_TRAVELDATA,
        payload :traveldata
    }
  }
  

  export const updatetraveldata = (traveldata) => {
    return {
        type:UPDATE_TRAVELDATA,
        payload : traveldata
    }
  }


export const deleteTraveldata = () => ({
  type: DELETE_TRAVELDATA,
});

