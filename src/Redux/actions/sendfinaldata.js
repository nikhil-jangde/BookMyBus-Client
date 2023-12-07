import { SEND_FINALDATA} from "./actions"


export const sendfinaldata = (finaldetails) => {
    return {
        type:SEND_FINALDATA,
        payload :finaldetails
    }
  }
 
