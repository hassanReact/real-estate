import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserType {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    avatarUrl: string | null,
    createdAt:string,
    isAdmin: boolean
}

interface AuthState {
  user: UserType | null;
  loader: boolean;
  isAdmin: boolean;
}

const initialState: AuthState = {
  user: null,
  loader: true,
  isAdmin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setupDetials: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
      state.loader = false;
    },
    removeSetupDetails: (state) => {
      state.user = null;
      state.loader = false;
    },
  },
});

export default authSlice;

export const { setupDetials, removeSetupDetails } = authSlice.actions;