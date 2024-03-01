import {StyleSheet} from 'react-native';
import AppColors from '../../../styles/AppColors';
import {
  fontSize14,
  fontSize15,
  fontSize28,
  fontWeight700,
  unit15,
  unit16,
  unit19,
  unit25,
} from '../../../utils/appUnit';

const styles = StyleSheet.create({
  appTitle: {
    fontSize: fontSize28,
    color: AppColors.black,
    textAlign: 'center',
  },
  appSlogan: {
    fontSize: fontSize14,
    color: AppColors.dark_grey,
    textAlign: 'center',
    marginTop: unit19,
  },
  button: {
    paddingVertical: unit15,
    borderRadius: unit16,
    marginTop: unit25,
  },
  buttonText: {
    fontSize: fontSize15,
    fontWeight: fontWeight700,
  },
});

export default styles;
