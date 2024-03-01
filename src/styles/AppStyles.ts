import {Platform, StatusBar, StyleSheet} from 'react-native';
import {unit16, unit18, unit20, unit24, unit28, unit35} from '../utils/appUnit';
import AppColors from './AppColors';

export const APP_PADDING = unit35;
const AppStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  viewContainer: {
    flex: 1,
    paddingHorizontal: unit35,
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight || 0 + unit20 : 0,
  },
  alignRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon18: {
    width: unit18,
    height: unit18,
  },
  icon24: {
    width: unit24,
    height: unit24,
  },
  icon28: {
    width: unit28,
    height: unit28,
  },
  lightGreyContainer: {
    flex: 1,
    backgroundColor: AppColors.light_grey,
  },
  appBarIcon: {
    fontSize: unit16,
  },
});

export default AppStyles;
