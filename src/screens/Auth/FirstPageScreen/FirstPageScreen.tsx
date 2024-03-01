/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {ImageBackground, View} from 'react-native';
import {NavigationRef} from '../../../../App';
import {IMG_ILLUSTRATION} from '../../../assets/path';
import AppText from '../../../components/AppText/AppText';
import LinearButton from '../../../components/LinearButton/LinearButton';
import AppColors from '../../../styles/AppColors';
import AppStyles from '../../../styles/AppStyles';
import {dimension, unit20} from '../../../utils/appUnit';
import styles from './styles';

const FirstPageScreen: React.FunctionComponent = () => {
  const width = dimension.width;
  const height = dimension.height;

  return (
    <View style={AppStyles.container}>
      <ImageBackground
        style={{
          width: width,
          height: (3 * height) / 5,
        }}
        source={IMG_ILLUSTRATION}
      />
      <View style={AppStyles.viewContainer}>
        <AppText style={styles.appTitle} fontType={'medium'}>
          LangApp
        </AppText>
        <AppText style={styles.appSlogan} fontType={'medium'}>
          Are you ready to learn languages easily in the funniest way?
        </AppText>
        <LinearButton
          onPress={() => NavigationRef.current?.navigate('LoginScreen')}
          linearStyle={styles.button}
          titleStyle={styles.buttonText}
          linearColors={[
            AppColors.purple_gradient_1,
            AppColors.purple_gradient_2,
          ]}
          buttonTitle={'Login'}
        />
        <LinearButton
          onPress={() => NavigationRef.current?.navigate('RegisterScreen')}
          linearStyle={[
            styles.button,
            {
              borderColor: AppColors.purple,
              borderWidth: 1.2,
              marginTop: unit20,
            },
          ]}
          titleStyle={[
            styles.buttonText,
            {
              color: AppColors.purple,
            },
          ]}
          linearColors={[AppColors.white, AppColors.white]}
          buttonTitle={'Sign up'}
        />
      </View>
    </View>
  );
};

export default FirstPageScreen;
