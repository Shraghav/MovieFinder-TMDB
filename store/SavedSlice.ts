import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SavedState {
  savedIds: string[];
}

const initialState: SavedState = {
  savedIds: [],
};

const savedSlice = createSlice({
  name: "saved",
  initialState,
  reducers: {
    // Set the whole list (used on app launch)
    setSavedMovies: (state, action: PayloadAction<string[]>) => {
      state.savedIds = action.payload;
    },
    // Add or remove a single ID (used when clicking the button)
    toggleSavedId: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.savedIds.includes(id)) {
        state.savedIds = state.savedIds.filter((savedId) => savedId !== id);
      } else {
        state.savedIds.push(id);
      }
    },
  },
});

export const { setSavedMovies, toggleSavedId } = savedSlice.actions;
export default savedSlice.reducer;
