import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface roles {
  name: string;
  id: number;
  parentID: number;
}

const initial: { roles: roles[] | {}; rolesLoading: boolean } = {
  roles: {},
  rolesLoading: true,
};

export const getRoles = createAsyncThunk("roles/getRoles", async () => {
  let response;
  try {
    console.log("top");
    response = await axios.get(
      "http://127.0.0.1:5001/employee-managment-a84ff/us-central1/app/getRoles"
    );
  } catch (err) {
    console.log(err);
  }
  const ans = Object.values(response.data.data);
  return ans;
});

const RoleSlice = createSlice({
  name: "role",
  initialState: initial,
  reducers: {
    setRolesLoading: (state, action) => {
      state.rolesLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRoles.pending, (state) => {
      console.log("pending...");
      state.rolesLoading = true;
    });
    builder.addCase(getRoles.fulfilled, (state, action) => {
        state.roles = action.payload;
        state.rolesLoading = false;
      console.log("roles from redux: ", state.roles);
    });
  },
});

export default RoleSlice.reducer;
export const { setRolesLoading } = RoleSlice.actions;
