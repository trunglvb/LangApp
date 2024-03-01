import * as React from 'react';
import {useMemo, useState} from 'react';
import {Controller} from 'react-hook-form';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import {IC_EYE, IC_EYE_SPLASH} from '../../assets/path';
import AppColors from '../../styles/AppColors';
import AppStyles, {APP_PADDING} from '../../styles/AppStyles';
import {
  dimension,
  fontSize12,
  fontSize16,
  fontWeight500,
  unit10,
  unit15,
  unit16,
  unit18,
  unit25,
  unit3,
} from '../../utils/appUnit';
import AppText from '../AppText/AppText';
import IconButton from '../IconButton/IconButton';

interface CustomTextInputProps extends TextInputProps {
  name: string;
  control: any;
  placeholder?: string | undefined;
  secureTextEntry?: boolean;
  rules?: any;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextInputProps>;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

const width = dimension.width;

const CustomTextInput: React.FC<CustomTextInputProps> = props => {
  const {
    name,
    control,
    placeholder,
    secureTextEntry,
    inputContainerStyle,
    inputStyle,
    autoCapitalize,
    rules = {},
  } = props;
  const [showPass, setShowPass] = useState<boolean>(false);
  const isNeedEyeIcon: boolean | undefined = useMemo(() => {
    return placeholder?.toLowerCase()?.includes('password');
  }, [placeholder]);

  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({field: {value, onChange, onBlur}, fieldState: {error}}) => {
          return (
            <>
              <View
                style={[
                  styles.inputContainer,
                  {
                    borderColor: error
                      ? AppColors.red
                      : isFocused
                      ? AppColors.dark_grey
                      : AppColors.light_grey2,
                  },
                  inputContainerStyle,
                ]}>
                <TextInput
                  {...props}
                  style={[styles.input, inputStyle]}
                  value={value}
                  onChangeText={onChange}
                  autoCapitalize={autoCapitalize}
                  onBlur={() => {
                    onBlur();
                    setIsFocused(false);
                  }}
                  onFocus={() => setIsFocused(true)}
                  secureTextEntry={!showPass && secureTextEntry}
                  placeholder={placeholder}
                  placeholderTextColor={AppColors.grey}
                />
                {isNeedEyeIcon && (
                  <IconButton
                    iconStyle={[
                      AppStyles.icon18,
                      {
                        tintColor: AppColors.grey,
                      },
                    ]}
                    onPress={() => setShowPass(!showPass)}
                    icon={!showPass ? IC_EYE : IC_EYE_SPLASH}
                  />
                )}
              </View>
              {error && (
                <AppText fontType={'regular'} style={styles.errorMess}>
                  {error.message || 'Error'}
                </AppText>
              )}
            </>
          );
        }}
      />
    </>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: AppColors.white,
    paddingHorizontal: unit25,
    borderWidth: 1,
    borderColor: AppColors.light_grey2,
    borderRadius: unit16,
  },
  input: {
    paddingVertical: unit15,
    color: AppColors.black,
    fontSize: fontSize16,
    fontWeight: fontWeight500,
    width: width - APP_PADDING * 2 - unit25 * 2 - unit18 - unit10,
    includeFontPadding: false,
  },
  errorMess: {
    color: AppColors.red,
    alignSelf: 'stretch',
    fontSize: fontSize12,
    marginTop: unit3,
  },
});
