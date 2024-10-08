import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  role: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  token: null,
  role: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string; userRole: string }>) => {
      state.token = action.payload.token;
      state.role = action.payload.userRole;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.isLoggedIn = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
