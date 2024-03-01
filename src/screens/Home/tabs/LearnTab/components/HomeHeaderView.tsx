/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AppText from '../../../../../components/AppText/AppText';
import useAuth from '../../../../../hooks/useAuth';
import AppColors from '../../../../../styles/AppColors';
import {
  fontSize20,
  fontSize28,
  unit12,
  unit20,
  unit25,
  unit30,
  unit39,
  unit40,
} from '../../../../../utils/appUnit';

const HomeHeaderView: React.FunctionComponent = () => {
  const {authData} = useAuth();
  const user = authData.user;
  const inset = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: inset.top + unit20,
        paddingHorizontal: unit30,
        backgroundColor: AppColors.white,
        paddingBottom: unit40,
        borderBottomLeftRadius: unit30,
        borderBottomRightRadius: unit30,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View>
          <AppText
            style={{
              fontSize: fontSize20,
              color: AppColors.black,
            }}
            fontType={'medium'}>
            Hi {user?.fullName},
          </AppText>
          <AppText
            style={{
              fontSize: unit20,
              color: AppColors.purple,
              marginTop: 8,
            }}
            fontType={'bold'}>
            Continue to English!
          </AppText>
        </View>
        <Image
          style={{
            width: 50,
            aspectRatio: 1,
            borderRadius: 1000,
          }}
          source={{
            uri: user?.avatar,
          }}
        />
      </View>
    </View>
  );
};

export default HomeHeaderView;
