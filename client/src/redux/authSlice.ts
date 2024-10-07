import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  userRole: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  token: null,
  userRole: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string; userRole: string }>) => {
      state.token = action.payload.token;
      state.userRole = action.payload.userRole;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.token = null;
      state.userRole = null;
      state.isLoggedIn = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
