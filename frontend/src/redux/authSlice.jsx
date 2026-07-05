import { createSlice } from "@reduxjs/toolkit";

const AUTH_KEY = "medpulse_auth";

const loadPersisted = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(AUTH_KEY));
    return saved && saved.token ? saved : null;
  } catch {
    return null;
  }
};

const emptyState = {
  isLoggedIn: false,
  user: null,
  role: null,
  token: null,
};

// Rehydrate from localStorage so a page refresh keeps the session (and the JWT).
const initialState = loadPersisted() || emptyState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.id; // store id/email
      state.role = action.payload.role; // ⭐ IMPORTANT
      state.token = action.payload.token || null; // JWT for API calls

      localStorage.setItem(
        AUTH_KEY,
        JSON.stringify({
          isLoggedIn: true,
          user: state.user,
          role: state.role,
          token: state.token,
        })
      );
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.role = null;
      state.token = null;

      localStorage.removeItem(AUTH_KEY);
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;