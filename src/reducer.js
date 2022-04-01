
export const reducer = (state, action) => {
    switch (action.type) {
      case "gettaskvalue": 
      {
        const newvalue = action.payload;
        return { ...state,txtInput: newvalue };
      }
      case "additems":
      if (state.txtInput) {
        if (!state.data.includes(state.txtInput)) {
          return {...state,data:[...state.data,state.txtInput],txtInput:""}
        } else {
           return{...state,disableInput:true,alredyvalue:!state.alredyvalue}
        }
      } 
      else {
        return {...state,err:true };
      };
  
      case "closealert":
        return{...state,err:false};
      
      case "closealready":
        return{...state,alredyvalue:false,disableInput:false}
  
      case "removeTask":
        const remo=state.data.filter((el,ind)=>ind!==action.payind)
        return{...state,data:remo};
  
      case "editTask":
          console.log()
       return{...state,updatebtn:true,addbtn:false,indvalue:action.payvalue.index,txtInput:action.payvalue.val};
  
      case "updateTask":
        state.data.splice(state.indvalue,1,state.txtInput)
        return {...state,addbtn:true,updatebtn:false,data:state.data,txtInput:""}
       default:
        return state;
    }
  };