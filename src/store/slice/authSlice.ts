import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import UserModel from '../../model/UserModel';

export interface AuthState {
  user?: UserModel;
  token?: string;
  vocabsUser?: any;
}

const initAuthState: AuthState = {
  user: undefined,
  token: undefined,
  vocabsUser: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initAuthState,
  reducers: {
    signOut: () => {
      return initAuthState;
    },
    signIn: (state, payload: PayloadAction<AuthState>) => {
      return {
        ...payload.payload,
      };
    },
    setVocabsUser: (state, payload: any) => {
      state.vocabsUser = payload.payload;
    },
  },
});

export const {signIn, signOut, setVocabsUser} = authSlice.actions;

export default authSlice;
