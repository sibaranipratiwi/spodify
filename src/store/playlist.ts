import { createSlice } from "@reduxjs/toolkit";
import { IPlaylistState } from "../type/store";

const initialState: IPlaylistState = {
  tracks: [],
  selectTracks: [],
  form: {
    title: "",
    description: "",
  },
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setTracks: (state, action) => {
      state.tracks = action.payload;
    },
    addSelectedTracks: (state, action) => {
      state.selectTracks.push(action.payload);
    },
    substractSelectedTracks: (state, action) => {
      const index = state.selectTracks.indexOf(action.payload);
      state.selectTracks.splice(index, 1);
    },
    setFormTitle: (state, action) => {
      state.form.title = action.payload;
    },
    setFormDescription: (state, action) => {
      state.form.description = action.payload;
    },
    clearForm: (state) => {
      state.form = initialState.form;
    },
    clearSelectedTracks: (state) => {
      state.selectTracks = [];
    },
    clearState: () => initialState,
  },
});

export const {
  setTracks,
  addSelectedTracks,
  substractSelectedTracks,
  clearSelectedTracks,
  setFormTitle,
  setFormDescription,
  clearState,
} = playlistSlice.actions;

export default playlistSlice.reducer;