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
import PressView from '../../../components/PressView/PressView';
import useAuth from '../../../hooks/useAuth';
import useScreenState from '../../../hooks/useScreenState';
import {setAccessToken} from '../../../network/client';
import {logInAPI} from '../../../network/services/auth.apis';
import AppColors from '../../../styles/AppColors';
import ApiHelper from '../../../utils/ApiHelper';
import AppUtils from '../../../utils/AppUtils';
import {showToastError, showToastErrorMessage} from '../../../utils/Toaster';
import {unit15, unit40} from '../../../utils/appUnit';
import styles from './styles';

const LoginScreen: React.FC = () => {
  const {signIn, authData} = useAuth();
  const user = authData.user;
  const {isLoading, setLoading, mounted} = useScreenState();
  const {control, handleSubmit} = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const logInHandler = async (data: any) => {
    try {
      setLoading(true);
      const res = await logInAPI(data?.email, data?.password);
      if (ApiHelper.isSuccess(res)) {
        if (mounted) {
          setAccessToken(res.data.data.token);
          // const database = await openDatabase();
          signIn({
            user: res.data.data.user,
            // database,
          });
          NavigationRef.current?.dispatch(StackActions.replace('HomeScreen'));
        }
      } else {
        showToastErrorMessage(res.data.message);
      }
    } catch (e: any) {
      console.log(e?.data as any);
      showToastError(e);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView style={styles.logInSafeAreaContainer}>
      <View style={styles.logInContainer}>
        <BackButton />
        <AppText fontType={'bold'} style={styles.logInLogo}>
          Login
        </AppText>
        <CustomTextInput
          inputContainerStyle={{
            marginTop: unit40,
          }}
          name={'email'}
          control={control}
          autoCapitalize={'none'}
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
          onPress={handleSubmit(logInHandler)}
          linearStyle={styles.logInButton}
          titleStyle={styles.logInButtonText}
          linearColors={[
            AppColors.purple_gradient_1,
            AppColors.purple_gradient_2,
          ]}
          buttonTitle={'Login'}
        />

        <PressView
          onPress={() =>
            NavigationRef.current?.navigate('ForgotPasswordScreen', {
              email: user?.email,
            })
          }>
          <AppText style={styles.forgotPass} fontType={'medium'}>
            Forgot Password
          </AppText>
        </PressView>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
