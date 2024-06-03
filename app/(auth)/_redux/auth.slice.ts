import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userId: "",
  name: "",
  isLogedInStatus: false,
  role: "",
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logedin: (state, data) => {
      (state.name = data.payload.name), (state.isLogedInStatus = true);
      state.userId = data.payload.id;
      state.role = data?.payload?.role;
    },
    logedOut: (state) => {
      (state.name = ""),
        (state.userId = ""),
        (state.role = ""),
        (state.isLogedInStatus = false);
    },
  },
});

export default authSlice.reducer;
export const { logedOut, logedin } = authSlice.actions;
