import { createSlice } from "@reduxjs/toolkit";

export const GenerateSlices = createSlice({
  name: "slot",
  initialState: {
    slot: null,
    total: "null",
  },
  reducers: {
    addSlot: (state, action) => {
      state.slot = action.payload;
    },
    totalSlot: (state, action) => {
      state.total = action.payload;
    },
  },
});
export const { addSlot, totalSlot } = GenerateSlices.actions;
export const SelectedSlot = (state) => state.slot.slot;
export const TotalSlots = (state) => state.slot.total;
export default GenerateSlices.reducer;
