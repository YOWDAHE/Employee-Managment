import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface t {
  value: string;
  id: number;
  description: string;
  children: t[];
}

interface o {
  Tree: t;
  isLoading: boolean;
}

const initial: o = {
  Tree: {},
  isLoading: true,
};

//fetch the tree
export const fetchTree = createAsyncThunk("tree/fetchTree", async () => {
  const Ans = await axios.get(
    "http://127.0.0.1:5001/employee-managment-a84ff/us-central1/app/getTree"
  );
  const treeData = Ans.data.data;
  4;
  console.log("tree accesed");
  return treeData;
});


//update the tree
export const updateTree = createAsyncThunk("tree/updateTree", async (data) => {
  try {
    const responce = axios.post(
      "http://127.0.0.1:5001/employee-managment-a84ff/us-central1/app/makeTree",
      data
    );
    console.log("tree updated!");
    const responce2 = axios.post(
      "http://127.0.0.1:5001/employee-managment-a84ff/us-central1/app/makeRoles",
      data
    );
  } catch (err) {
    console.log(err);
  }
});

const TreeSlice = createSlice({
  name: "tree",
  initialState: initial,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchTree.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTree.fulfilled, (state, action) => {
      state.Tree = action.payload;
      state.isLoading = false;
    });
    builder.addCase(updateTree.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateTree.fulfilled, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default TreeSlice.reducer;
export const { setLoading } = TreeSlice.actions;
