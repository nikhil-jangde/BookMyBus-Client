import { SEND_INITIALDATA} from "./actions"


export const sendinitialdata = (filteredbus) => {
    return {
        type:SEND_INITIALDATA,
        payload :filteredbus
    }
  }
 
