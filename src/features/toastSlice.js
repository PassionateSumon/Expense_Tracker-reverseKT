import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  toastText: "",
  type: "",
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setToast: (state, action) => {
      const { text, type } = action.payload;
      if (type === "success") {
        toast.success(text);
      } else if (type === "error") {
        toast.error(text);
      }
    },
  },
});

export const { setToast } = toastSlice.actions;
export default toastSlice.reducer;
