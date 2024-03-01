import * as React from 'react';
import {
  ImageStyle,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {NavigationRef} from '../../../App';
import {IC_LEFT} from '../../assets/path';
import AppColors from '../../styles/AppColors';
import AppStyles from '../../styles/AppStyles';
import {unit14, unit25, unit44} from '../../utils/appUnit';
import IconButton from '../IconButton/IconButton';

export type ButtonSizeProps = 'small' | 'medium' | 'large';

interface BackButtonProps extends PressableProps {
  btnStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ImageStyle>;
  btnSize?: ButtonSizeProps;
}

const BackButton: React.FunctionComponent<BackButtonProps> = props => {
  const {btnStyle, iconStyle, btnSize} = props;
  const size = btnSize === 'small' ? 0.7 : btnSize === 'medium' ? 0.9 : 1;
  return (
    <IconButton
      onPress={() => NavigationRef.current?.goBack()}
      containerStyle={[
        styles.backButtonContainer,
        {
          width: unit44 * size,
          height: unit44 * size,
        },
        btnStyle,
      ]}
      iconStyle={[
        AppStyles.icon24,
        {
          tintColor: AppColors.black,
        },
        iconStyle,
      ]}
      icon={IC_LEFT}
    />
  );
};

const styles = StyleSheet.create({
  backButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderRadius: unit14,
    borderColor: AppColors.light_grey2,

    marginTop: unit25,
  },
});

export default BackButton;
