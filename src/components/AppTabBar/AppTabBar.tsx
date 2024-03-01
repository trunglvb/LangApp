/* eslint-disable react-native/no-inline-styles */
import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs/lib/typescript/src/types';
import React from 'react';
import {Animated, StyleProp, View, ViewProps, ViewStyle} from 'react-native';
import AppColors from '../../styles/AppColors';
import AppStyles from '../../styles/AppStyles';
import {
  unit14,
  unit16,
  unit2,
  unit24,
  unit30,
  unit8,
} from '../../utils/appUnit';
import AppText from '../AppText/AppText';
import PressView from '../PressView/PressView';

interface AppTabBarProps extends ViewProps, MaterialTopTabBarProps {
  tabContentStyle?: StyleProp<ViewStyle>;
}

const AppTabBar: React.FC<AppTabBarProps> = props => {
  const {state, descriptors, navigation, tabContentStyle} = props;
  return (
    <View
      style={[
        AppStyles.alignRow,
        {
          backgroundColor: AppColors.white,
          justifyContent: 'space-around',
          paddingHorizontal: unit16,
        },
      ]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            // @ts-ignore
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <PressView
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              {
                alignItems: 'center',
              },
              tabContentStyle,
            ]}>
            <AppText
              fontType={'semiBold'}
              style={{
                color: isFocused ? AppColors.purple : AppColors.dark_grey,
                fontSize: unit14,
                fontWeight: '600',
              }}>
              {label}
            </AppText>

            {isFocused ? (
              <Animated.View
                style={{
                  width: unit30,
                  height: unit2,
                  backgroundColor: AppColors.purple,
                  marginTop: unit8,
                  borderRadius: unit2,
                }}
              />
            ) : (
              <View
                style={{
                  height: unit2,
                  marginTop: unit8,
                  width: unit24,
                }}
              />
            )}
          </PressView>
        );
      })}
    </View>
  );
};

export default AppTabBar;
