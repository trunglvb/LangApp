import {StackActions} from '@react-navigation/native';
import React from 'react';
import {useForm} from 'react-hook-form';
import {SafeAreaView, View} from 'react-native';
import {NavigationRef} from '../../../../App';
import AppText from '../../../components/AppText/AppText';
import BackButton from '../../../components/BackButton/BackButton';
import CustomTextInput from '../../../components/CustomTextInput/CustomTextInput';
import LinearButton from '../../../components/LinearButton/LinearButton';
import AppLoading from '../../../components/Loading/AppLoading';
import useScreenState from '../../../hooks/useScreenState';
import {signUpAPI} from '../../../network/services/auth.apis';
import AppColors from '../../../styles/AppColors';
import AppStyles from '../../../styles/AppStyles';
import ApiHelper from '../../../utils/ApiHelper';
import AppUtils from '../../../utils/AppUtils';
import {showToastError, showToastErrorMessage} from '../../../utils/Toaster';
import {sleep} from '../../../utils/Utils';
import {unit15, unit40} from '../../../utils/appUnit';
import styles from './styles';

const RegisterScreen: React.FC = () => {
  const {control, handleSubmit} = useForm();
  const {isLoading, setLoading, mounted} = useScreenState();
  // const inset = useSafeAreaInsets();
  const signUpHandler = async (data: any) => {
    try {
      setLoading(true);
      const res = await signUpAPI(data.fullName, data.email, data.password);
      const resData = res.data;
      await sleep(1000);
      if (ApiHelper.isSuccess(res)) {
        if (mounted) {
          NavigationRef.current?.dispatch(
            StackActions.replace('VerifyEmailScreen', {
              userId: resData?.data?.user?._id,
            }),
          );
        }
      } else {
        showToastErrorMessage(res.data?.message);
      }
    } catch (e) {
      showToastError(e);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView style={AppStyles.container}>
      <View style={AppStyles.viewContainer}>
        <BackButton />
        <AppText fontType={'bold'} style={styles.logo}>
          Sign up
        </AppText>
        <CustomTextInput
          inputContainerStyle={{
            marginTop: unit40,
          }}
          name={'fullName'}
          control={control}
          rules={{
            required: 'Full name must be required',
          }}
          placeholder={'Full name'}
        />
        <CustomTextInput
          inputContainerStyle={{
            marginTop: unit15,
          }}
          name={'email'}
          control={control}
          autoCapitalize={'none'}
          keyboardType={'email-address'}
          rules={{
            required: 'E-mail address must be required',
            pattern: {
              value: AppUtils.EMAIL_REGEX,
              message: 'E-mail address is invalid',
            },
          }}
          placeholder={'E-mail address'}
        />
        <CustomTextInput
          inputContainerStyle={{
            marginTop: unit15,
          }}
          name={'password'}
          autoCapitalize={'none'}
          control={control}
          secureTextEntry
          rules={{
            required: 'Password must be required',
            pattern: {
              value: AppUtils.PASS_REGEX,
              message:
                'Password is invalid, 8-24 characters, at least 1 number and 1 special character',
            },
          }}
          placeholder={'Password'}
        />
        <LinearButton
          onPress={handleSubmit(signUpHandler)}
          linearStyle={styles.button}
          titleStyle={styles.buttonText}
          linearColors={[
            AppColors.purple_gradient_1,
            AppColors.purple_gradient_2,
          ]}
          buttonTitle={'Sign up'}
        />
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
