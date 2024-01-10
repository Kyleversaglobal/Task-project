import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  loading: boolean;
  user: null | User;
  error: null | string;
}

interface User {}

const initialState: UserState = {
  loading: false,
  user: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
