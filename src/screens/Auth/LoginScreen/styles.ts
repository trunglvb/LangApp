import {Platform, StatusBar, StyleSheet} from 'react-native';
import AppColors from '../../../styles/AppColors';
import {
  fontSize14,
  fontSize15,
  fontSize28,
  fontWeight700,
  unit15,
  unit16,
  unit20,
  unit25,
  unit34,
  unit35,
  unit36,
} from '../../../utils/appUnit';

const styles = StyleSheet.create({
  logInSafeAreaContainer: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  logInContainer: {
    flex: 1,
    paddingHorizontal: unit35,
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight || 0 + unit20 : 0,
  },
  logInLogo: {
    color: AppColors.black,
    fontSize: fontSize28,
    marginTop: unit34,
  },
  logInButton: {
    paddingVertical: unit15,
    borderRadius: unit16,
    marginTop: unit25,
  },
  logInButtonText: {
    fontSize: fontSize15,
    fontWeight: fontWeight700,
    color: AppColors.white,
  },
  forgotPass: {
    color: AppColors.dark_grey,
    fontSize: fontSize14,
    textAlign: 'center',

    marginTop: unit36,
  },
});

export default styles;
