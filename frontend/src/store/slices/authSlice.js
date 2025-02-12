import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to log in
export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // 1) Hit /login
      const baseUrl = import.meta.env.VITE_API_BASE_URL; // "https://0fa0-...ngrok-free.app"

      const resp = await fetch(`${baseUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // crucial for cross-site cookies
      });
      const data = await resp.json();
      if (!resp.ok) {
        // e.g. 400 invalid password
        throw new Error(data.message || "Login failed");
      }

      // 2) Fetch /profile to get user info
      const profileResp = await fetch(`${baseUrl}/api/auth/profile`, {
        credentials: "include",
      });
      if (!profileResp.ok) {
        throw new Error("Failed to fetch profile");
      }
      const userData = await profileResp.json();
      return userData;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Async thunk to log out
export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
  });
  return null; // payload
});

// Fetch user profile from cookie-based session
export const fetchUserProfileThunk = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { rejectWithValue }) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    try {
      const resp = await fetch(`${API_BASE_URL}/api/auth/profile`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // important to include session cookie
      });
      
      if (!resp.ok) {
        if (resp.status === 401) {
          // Silently handle "unauthorized" => user is simply not logged in
          return null; 
        }
        // For other errors (e.g. 500) we throw an error
        throw new Error("Failed to fetch profile");
      }

      const userData = await resp.json();
      return userData; // => action.payload in fulfilled
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // userData from above
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      })

      // LOGOUT
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
      })

      // FETCH PROFILE
      .addCase(fetchUserProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfileThunk.rejected, (state, action) => {
        state.loading = false;
        // If fetch fails (e.g. not logged in), we can set user to null
        state.user = null;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
