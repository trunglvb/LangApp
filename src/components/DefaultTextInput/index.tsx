/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import AppColors from '../../styles/AppColors';
import {APP_PADDING} from '../../styles/AppStyles';
import {
  dimension,
  fontSize16,
  fontWeight500,
  unit10,
  unit13,
  unit15,
  unit18,
  unit20,
  unit25,
  unit8,
} from '../../utils/appUnit';
import {IC_SEARCH} from '../../assets/path';

interface CustomTextInputProps extends TextInputProps {
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextInputProps>;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  icon?: boolean;
  onPressIcon?: any;
  customWidth?: any;
}
const width = dimension.width;
const DefaultTextInput: React.FC<CustomTextInputProps> = props => {
  const {
    icon,
    inputContainerStyle,
    inputStyle,
    autoCapitalize,
    value,
    onPressIcon,
    ...rest
  } = props;

  return (
    <View style={[styles.inputContainer, inputContainerStyle]}>
      <TextInput
        {...rest}
        value={value}
        style={[styles.input, inputStyle]}
        autoCapitalize={autoCapitalize}
        placeholderTextColor={AppColors.grey}
      />
      {icon && (
        <TouchableOpacity onPress={onPressIcon}>
          <Image
            style={{
              width: unit20,
              height: unit20,
              aspectRatio: 1,
              tintColor: AppColors.black,
            }}
            source={IC_SEARCH}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default DefaultTextInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: AppColors.white,
    paddingHorizontal: unit15,
    borderWidth: 1,
    borderColor: AppColors.light_grey2,
    borderRadius: unit8,
  },
  input: {
    paddingVertical: unit13,
    color: AppColors.black,
    fontSize: fontSize16,
    fontWeight: 'normal',
    includeFontPadding: false,
    width: width - APP_PADDING * 2 - unit25 * 2 - unit18 - unit10,
  },
});
