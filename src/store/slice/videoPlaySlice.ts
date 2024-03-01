import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface VideoPlaysType {
  isPause: boolean;
}

const initState: VideoPlaysType = {
  isPause: false,
};

const videoPlaySlice = createSlice({
  name: 'setting_config',
  initialState: initState,
  reducers: {
    setIsPause: (state, action: PayloadAction<boolean>) => {
      state.isPause = action.payload;
    },
  },
});

export const {setIsPause} = videoPlaySlice.actions;

export default videoPlaySlice;
