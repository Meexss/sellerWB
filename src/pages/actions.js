// actions.js
export const SET_TABLE_DATA = "SET_TABLE_DATA";

export const setTableData = (tableData) => ({
  type: SET_TABLE_DATA,
  payload: tableData,
});
