import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {useForm} from 'react-hook-form';
import {SafeAreaView, View} from 'react-native';
import {RootStackParamList} from '../../../../App';
import AppText from '../../../components/AppText/AppText';
import BackButton from '../../../components/BackButton/BackButton';
import CustomTextInput from '../../../components/CustomTextInput/CustomTextInput';
import LinearButton from '../../../components/LinearButton/LinearButton';
import AppLoading from '../../../components/Loading/AppLoading';
import useAuth from '../../../hooks/useAuth';
import useScreenState from '../../../hooks/useScreenState';
import {setAccessToken} from '../../../network/client';
import {resetPassword} from '../../../network/services/auth.apis';
import AppColors from '../../../styles/AppColors';
import AppStyles from '../../../styles/AppStyles';
import ApiHelper from '../../../utils/ApiHelper';
import AppUtils from '../../../utils/AppUtils';
import {showToastError} from '../../../utils/Toaster';
import {sleep} from '../../../utils/Utils';
import {unit15} from '../../../utils/appUnit';
import styles from './styles';

type ResetPassScreenProps = RouteProp<
  RootStackParamList,
  'ResetPasswordScreen'
>;
const ResetPasswordScreen: React.FC = () => {
  const {signIn} = useAuth();
  const {params} = useRoute<ResetPassScreenProps>();
  const {control, handleSubmit, watch} = useForm();
  const {isLoading, setLoading, mounted} = useScreenState();
  const pwd = watch('password');

  const resetPassHandler = async (data: any) => {
    const email = params.email;
    const newPassword = data?.password;
    try {
      setLoading(true);
      const res = await resetPassword(email, newPassword);
      const resData = res.data;
      await sleep(1000);
      if (ApiHelper.isSuccess(res)) {
        if (mounted) {
          setAccessToken(resData.data?.token);
          signIn({
            user: resData?.data?.user,
          });
        }
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
          Reset Password
        </AppText>
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
        <CustomTextInput
          inputContainerStyle={{
            marginTop: unit15,
          }}
          name={'re-password'}
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
            validate: (value: any) => {
              return value === pwd || 'Password not match, please re-enter';
            },
          }}
          placeholder={'Re-Password'}
        />
        <LinearButton
          onPress={handleSubmit(resetPassHandler)}
          linearStyle={styles.button}
          titleStyle={styles.buttonText}
          linearColors={[
            AppColors.purple_gradient_1,
            AppColors.purple_gradient_2,
          ]}
          buttonTitle={'Reset'}
        />
      </View>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;
