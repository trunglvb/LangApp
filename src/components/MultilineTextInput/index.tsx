import * as React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
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
  unit15,
  unit8,
} from '../../utils/appUnit';

interface CustomTextInputProps extends TextInputProps {
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextInputProps>;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  icon?: boolean;
  onPressIcon?: any;
}

const width = dimension.width;

const MultilineTextInput: React.FC<CustomTextInputProps> = props => {
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
    <>
      <View style={[styles.inputContainer, inputContainerStyle]}>
        <TextInput
          {...props}
          value={value}
          style={[styles.input, inputStyle]}
          autoCapitalize={autoCapitalize}
          placeholderTextColor={AppColors.grey}
          multiline
        />
      </View>
    </>
  );
};

export default MultilineTextInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: AppColors.white,
    paddingHorizontal: unit15,
    borderWidth: 1,
    borderColor: AppColors.light_grey2,
    elevation: 1,
    borderRadius: unit8,
  },
  input: {
    paddingTop: unit10,
    paddingBottom: unit10,
    color: AppColors.black,
    fontSize: fontSize16,
    fontWeight: fontWeight500,
    width: width - APP_PADDING * 2,
    includeFontPadding: false,
    minHeight: 200,
    maxHeight: 350,
    textAlignVertical: 'top',
  },
});
