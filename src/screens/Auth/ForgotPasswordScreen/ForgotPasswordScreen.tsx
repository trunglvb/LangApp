import {StackActions} from '@react-navigation/native';
import * as React from 'react';
import {useForm} from 'react-hook-form';
import {SafeAreaView, View} from 'react-native';
import {NavigationRef} from '../../../../App';
import AppText from '../../../components/AppText/AppText';
import BackButton from '../../../components/BackButton/BackButton';
import CustomTextInput from '../../../components/CustomTextInput/CustomTextInput';
import LinearButton from '../../../components/LinearButton/LinearButton';
import {forgotPassword} from '../../../network/services/auth.apis';
import AppColors from '../../../styles/AppColors';
import AppStyles from '../../../styles/AppStyles';
import ApiHelper from '../../../utils/ApiHelper';
import AppUtils from '../../../utils/AppUtils';
import {showToastError} from '../../../utils/Toaster';
import {unit40} from '../../../utils/appUnit';
import styles from './styles';

const ForgotPasswordScreen: React.FunctionComponent = () => {
  const {control, handleSubmit} = useForm({
    defaultValues: {
      email: 'trunglvb.hust@gmail.com',
    },
  });

  const forgotPasswordHandler = async (data: any) => {
    const email = data?.email;
    try {
      const res = await forgotPassword(email);
      if (ApiHelper.isSuccess(res)) {
        NavigationRef.current?.dispatch(
          StackActions.replace('VerifyOTPScreen', {
            email: email,
          }),
        );
      }
    } catch (e) {
      showToastError(e);
    }
  };

  return (
    <SafeAreaView style={AppStyles.container}>
      <View style={AppStyles.viewContainer}>
        <BackButton />
        <AppText style={styles.logo} fontType={'bold'}>
          Forgot Password
        </AppText>
        <CustomTextInput
          inputContainerStyle={{
            marginTop: unit40,
          }}
          name={'email'}
          control={control}
          autoCapitalize={'none'}
          rules={{
            required: 'Email must be required',
            pattern: {
              value: AppUtils.EMAIL_REGEX,
              message: 'Email is invalid',
            },
          }}
          placeholder={'E-mail address'}
        />
        <LinearButton
          onPress={handleSubmit(forgotPasswordHandler)}
          linearStyle={[styles.button]}
          titleStyle={[
            styles.buttonText,
            {
              color: AppColors.white,
            },
          ]}
          linearColors={[
            AppColors.purple_gradient_1,
            AppColors.purple_gradient_2,
          ]}
          buttonTitle={'Reset my password'}
        />
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
