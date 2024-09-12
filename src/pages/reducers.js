// reducers.js
import { SET_TABLE_DATA } from "./actions";

const initialState = {
  tableData: [{ col: 1, article: "", id: "", name: "" }],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TABLE_DATA:
      return {
        ...state,
        tableData: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
