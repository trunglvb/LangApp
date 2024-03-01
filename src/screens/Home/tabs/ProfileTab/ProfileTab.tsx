/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {IC_LOGOUT, IC_USER, IMG_ROBERT} from '../../../../assets/path';
import AppText from '../../../../components/AppText/AppText';
import useAuth from '../../../../hooks/useAuth';
import AppColors from '../../../../styles/AppColors';
import {unit100, unit20, unit40} from '../../../../utils/appUnit';
import ProfileOptionItem from './components/ProfileOptionItem';
import styles from './styles';

const ProfileTab: React.FunctionComponent = () => {
  const {authData, signOut} = useAuth();
  const user = authData.user;

  const PROFILE_OPTIONS = [
    // {
    //   optionTitle: 'View my profile',
    //   rightIcon: IC_RIGHT,
    //   leftIcon: IC_USER,
    //   onPress: () => NavigationRef.current?.navigate('NotImplementedScreen'),
    // },
    // {
    //   optionTitle: 'Change Theme',
    //   rightIcon: IC_RIGHT,
    //   leftIcon: IC_USER,
    //   onPress: () => NavigationRef.current?.navigate('NotImplementedScreen'),
    // },
    {
      optionTitle: 'Sign out',
      rightIcon: IC_LOGOUT,
      leftIcon: IC_USER,
      onPress: () => signOut(),
    },
  ];

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
      }}
      style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image style={styles.avatarImage} source={IMG_ROBERT} />
        <View style={styles.accountVerified}>
          <AppText fontType={'medium'} style={styles.verified}>
            Verified
          </AppText>
        </View>
      </View>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View>
          <AppText fontType={'bold'} style={styles.profileName}>
            {user?.fullName}
          </AppText>
          <AppText fontType={'regular'} style={styles.profileInfo}>
            {user?.email}
          </AppText>
        </View>

        <View
          style={{
            paddingHorizontal: unit20,
            backgroundColor: AppColors.white,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.27,
            shadowRadius: 1.5,

            elevation: 3,
            marginTop: unit40,
            borderRadius: unit20,
            marginBottom: unit100,
          }}>
          {PROFILE_OPTIONS.map((item, index) => {
            const arrayLength = PROFILE_OPTIONS.length;
            return (
              <View key={index}>
                <ProfileOptionItem
                  optionTitle={item.optionTitle}
                  onPress={item.onPress}
                  leftIcon={item.leftIcon}
                  rightIcon={item.rightIcon}
                />
                {index < arrayLength - 1 && (
                  <View
                    style={{
                      width: '100%',
                      height: StyleSheet.hairlineWidth,
                      backgroundColor: AppColors.grey,
                    }}
                  />
                )}
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileTab;
