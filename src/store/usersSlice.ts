import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserType } from "../types";

const initialState: {
  users: UserType[];
} = {
  users: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, { payload }: PayloadAction<UserType[]>) => {
      state.users = payload;
    },
  },
});

export default userSlice.reducer;
export const { setUsers } = userSlice.actions;
