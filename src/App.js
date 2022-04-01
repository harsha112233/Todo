import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { RiTodoLine } from "react-icons/ri";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import React, { useReducer,useEffect } from "react";
import { reducer } from "./reducer";

const initialState = {
  txtInput: "",
  data: getLocalItem(),
  err: false,
  updatebtn: false,
  addbtn: true,
  indvalue: "",
  alredyvalue: false,
  disableInput: false
};

function getLocalItem(){
  let list=localStorage.getItem('lists')

  if(list){
    return JSON.parse(localStorage.getItem('lists'))
  }
  else{
    return []
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(()=>{
    localStorage.setItem("lists",JSON.stringify(state.data))
  })
  return (
    <div>
      <div className="container">
        <div
          className="row mt-5 d-flex justify-content-center align-items-center"
        // style={{ maxHeight: "300px" }}
        >
          <div className="col-6 ">
            {state.err ? (
              <div
                class="alert alert-warning alert-dismissible fade show"
                role="alert"
              >
                <span>Please enter something..!</span>
                <button type="button" class="btn-close" onClick={() => dispatch({ type: "closealert" })} data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
            ) : null}
            {
              state.alredyvalue && <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <span>Already exits..!</span>
                <button type="button" class="btn-close" onClick={() => dispatch({ type: "closealready" })} data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
            }
            <h1 className="text-center">
              <RiTodoLine className="text-warning fs-2 me-2" />
              Todo List
            </h1>
            <div className="input-group">
              <input type="text" onChange={(e) => dispatch({ type: "gettaskvalue", payload: e.target.value })}
                value={state.txtInput}
                className="form-control shadow-none"
                placeholder="Write something here.."
                disabled={state.disableInput}
              />
              {state.addbtn ? (
                <button
                  onClick={() => dispatch({ type: "additems" })}
                  className="btn btn-warning shadow-none"
                >
                  Add Task
                </button>
              ) : null}
              {state.updatebtn ? (
                <button
                  onClick={() => dispatch({ type: "updateTask" })}
                  className="btn btn-success shadow-none"
                >
                  Update
                </button>
              ) : null}
            </div>

            {state.data.map((value, ind) => {
              return (
                <div
                  key={ind}
                  className="task-list bg-dark text-white mt-3 p-2 rounded"
                >
                  <div
                    className="ps-2"
                    style={{ wordBreak: "break-all", width: "450px" }}
                  >
                    <span>{value}</span>
                  </div>
                  <div className="">
                    <span
                      className="me-3 text-warning "
                      onClick={() =>
                        dispatch({
                          type: "editTask",
                          payvalue: { val: value, index: ind },
                        })
                      }
                    >
                      <MdModeEdit />
                    </span>
                    <span
                      className="text-info"
                      onClick={() =>
                        dispatch({ type: "removeTask", payind: ind })
                      }
                    >
                      <MdDelete />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

// const [data, setdata] = useState([]);
// const [txtInput, settxtInput] = useState("");
// const [err,seterr]=useState(false);
// const [btnerr, setbtnerr] = useState(false);
// const [addbtn, setaddbtn] = useState(true);
// const [indvalue, setindvalue] = useState();

// const changeHandler = () => {
//   if (state.txtInput) {
//     if (!data.includes(state.txtInput)) {
//       setdata([...data, state.txtInput]);
//     } else {
//       alert("Already exits");
//     }
//   } else {
//     return { err: true };
//   }
// };

// const removeTask = (ind) => {
//   data.splice(ind, 1);
//   setdata([...data]);
//   // settxtInput("")
// };

// const editTask = (value, ind) => {
//   //  settxtInput(value)
//   setbtnerr(true);
//   setaddbtn(false);
//   setindvalue(ind);
// };

// const updatedata = () => {
//   setaddbtn(true);
//   setbtnerr(false);
//   // settxtInput(txtInput)
//   // data.splice(indvalue,1,txtInput)
//   setdata([...data]);
//   // settxtInput("")
// };
