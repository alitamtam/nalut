// client/src/store/profileSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosConfig"; // Import the axios instance
// Initial state
const initialState = {
  profile: null,
  profiles: [], // Added if you need to store multiple profiles
  status: "idle",
  error: null,
};

// Thunks
const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (userId) => {
    const response = await api.get(`/api/profiles/${userId}`);
    return response.data;
  }
);

const fetchProfiles = createAsyncThunk("profile/fetchProfiles", async () => {
  const response = await api.get("/api/profiles"); // Use the axios instance
  return response.data;
});

const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async ({ userId, bio, image }) => {
    const response = await api.put(`/api/profiles/${userId}`, { bio, image });
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
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.profiles = action.payload;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      });
  },
});

// Export the slice's reducer and the thunks in a single object to avoid duplication
export default profileSlice.reducer;
export const profileActions = { fetchProfile, fetchProfiles, updateProfile };
