import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type ThemeType = 'dark' | 'light';

interface SettingType {
  theme: ThemeType;
}

const initSettingState: SettingType = {
  theme: 'light',
};

const settingSlice = createSlice({
  name: 'setting_config',
  initialState: initSettingState,
  reducers: {
    setTheme: (state, payload: PayloadAction<ThemeType>) => {
      state.theme = payload.payload;
    },
  },
});

export const {setTheme} = settingSlice.actions;

export default settingSlice;
