/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, SafeAreaView, StatusBar, View} from 'react-native';
import AppStyles from '../../styles/AppStyles';
import AppColors from '../../styles/AppColors';
import {unit200, unit25, unit300} from '../../utils/appUnit';
import {SPLASH_LOGO} from '../../assets/path';
import AppText from '../../components/AppText/AppText';

const SplashScreen: React.FC = () => {
  return (
    <SafeAreaView
      style={[
        AppStyles.container,
        {
          backgroundColor: AppColors.purple_gradient_1,
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}>
      <StatusBar
        translucent
        backgroundColor={AppColors.transparent}
        barStyle={'light-content'}
      />
      <View
        style={{
          flexDirection: 'column',
        }}>
        <Image
          resizeMode="contain"
          source={SPLASH_LOGO}
          style={{
            width: unit300,
            height: unit200,
          }}
        />
        <AppText
          fontType="semiBold"
          style={{
            color: AppColors.white,
            fontSize: unit25,
            textAlign: 'center',
          }}>
          LangApp
        </AppText>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
