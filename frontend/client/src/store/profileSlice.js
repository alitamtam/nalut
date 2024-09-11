// client/src/store/profileSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
  profile: null,
  status: "idle",
  error: null,
};

// Thunks
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (userId) => {
    const response = await axios.get(`/api/profiles/${userId}`);
    return response.data;
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async ({ userId, bio, image }) => {
    const response = await axios.put(`/api/profiles/${userId}`, { bio, image });
    return response.data;
  }
);

// Slice
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      });
  },
});

export default profileSlice.reducer;
