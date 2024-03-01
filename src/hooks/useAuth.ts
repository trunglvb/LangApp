import {AuthState, signIn, signOut} from '../store/slice/authSlice';
import {useAppDispatch, useAppSelector} from '../store/store';

export default function useAuth() {
  const dispatch = useAppDispatch();
  const authData = useAppSelector(state => state.auth);
  return {
    signIn: (authData: AuthState) => {
      dispatch(signIn(authData));
    },
    signOut: () => {
      dispatch(signOut());
    },
    authData,
  };
}
