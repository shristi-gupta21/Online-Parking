import { createSlice } from "@reduxjs/toolkit";
export const userSlices = createSlice({
  name: "user",
  initialState: {
    users: [],
    edit: null,
    search: "",
  },
  reducers: {
    addUser(state, action) {
      state.users.splice(state.users.length, 0, action.payload);
    },
    removeUser: (state, action) => {
      state.users.splice(action.payload.index, 1);
    },
    updateUser: (state, action) => {
      console.log("action", action.payload);

      state.edit = action.payload.index;
    },
    addNewUpdatedData: (state, action) => {
      state.users = action.payload;
    },
    searchUser: (state, action) => {
      console.log(action.payload);
      state.search = action.payload;
    },
  },
});

export const {
  addUser,
  removeUser,
  updateUser,
  addNewUpdatedData,
  searchUser,
} = userSlices.actions;
export const UserData = (state) => state.user?.users;
export const UpdateUsers = (state) => state.user?.edit;
export const SearchUsers = (state) => state.user?.search;
export default userSlices.reducer;
