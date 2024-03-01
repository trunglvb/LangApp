import {RouteProp, StackActions, useRoute} from '@react-navigation/native';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {SafeAreaView, View} from 'react-native';
import {NavigationRef, RootStackParamList} from '../../../../App';
import AppText from '../../../components/AppText/AppText';
import BackButton from '../../../components/BackButton/BackButton';
import CustomTextInput from '../../../components/CustomTextInput/CustomTextInput';
import LinearButton from '../../../components/LinearButton/LinearButton';
import AppLoading from '../../../components/Loading/AppLoading';
import useScreenState from '../../../hooks/useScreenState';
import {verifyOTPResetPass} from '../../../network/services/auth.apis';
import AppColors from '../../../styles/AppColors';
import AppStyles from '../../../styles/AppStyles';
import ApiHelper from '../../../utils/ApiHelper';
import {showToastError} from '../../../utils/Toaster';
import {sleep} from '../../../utils/Utils';
import {unit40} from '../../../utils/appUnit';
import styles from './styles';

type VerifyScreenProps = RouteProp<RootStackParamList, 'VerifyOTPScreen'>;
const VerifyOTPScreen: React.FunctionComponent = () => {
  const {params} = useRoute<VerifyScreenProps>();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const {control, handleSubmit, watch} = useForm();
  const {isLoading, setLoading, mounted} = useScreenState();
  const verifyOTPHandler = async (data: any) => {
    const email = params.email;
    const otp = data?.otp;
    try {
      setLoading(true);
      const res = await verifyOTPResetPass(email, otp);
      const resData = res.data;
      await sleep(1000);
      if (ApiHelper.isSuccess(res)) {
        if (mounted) {
          NavigationRef.current?.dispatch(
            StackActions.replace('ResetPasswordScreen', {
              email: resData?.data?.user?.email,
            }),
          );
        }
      }
    } catch (e) {
      showToastError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const subscription = watch(value => {
      if (value.otp.length >= 4) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  if (isLoading) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView style={AppStyles.container}>
      <View style={AppStyles.viewContainer}>
        <BackButton />
        <AppText style={styles.logo} fontType={'bold'}>
          Verify OTP
        </AppText>
        <CustomTextInput
          inputContainerStyle={{
            marginTop: unit40,
          }}
          inputStyle={{
            textAlign: 'center',
          }}
          name={'otp'}
          control={control}
          maxLength={4}
          placeholder={'OTP Code'}
        />
        <LinearButton
          disabled={isDisabled}
          onPress={handleSubmit(verifyOTPHandler)}
          linearStyle={[styles.button]}
          titleStyle={[
            styles.buttonText,
            {
              color: isDisabled ? AppColors.grey : AppColors.white,
            },
          ]}
          linearColors={
            isDisabled
              ? [AppColors.light_grey2, AppColors.light_grey2]
              : [AppColors.purple_gradient_1, AppColors.purple_gradient_2]
          }
          buttonTitle={'Verify'}
        />
      </View>
    </SafeAreaView>
  );
};

export default VerifyOTPScreen;
