import React from 'react';
import {Image, ImageSourcePropType, Platform, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  IC_LEARN,
  IC_NOTIFICATION,
  IC_PRACTICE,
  IC_PROFILE,
} from '../../assets/path';
import styles from './styles';
import AppColors from '../../styles/AppColors';
import {unit65} from '../../utils/appUnit';
import ChatGPTTab from './tabs/ChatGPTTab/ChatGPTTab';
import LearnTab from './tabs/LearnTab/LearnTab';
import AnalyticsTab from './tabs/AnalyticsTab/Analytics';
import ProfileTab from './tabs/ProfileTab/ProfileTab';
import AppStyles from '../../styles/AppStyles';

export type HomeScreenParamList = {
  LearnTab: undefined;
  ChatGPTTab: undefined;
  // AnalyticsTab: undefined;
  ProfileTab: undefined;
};

const Tab = createBottomTabNavigator<HomeScreenParamList>();

const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        lazy: false,
        tabBarActiveTintColor: AppColors.purple,
        tabBarInactiveTintColor: AppColors.grey,
        tabBarStyle: [
          styles.tabBarStyle,
          {
            height: unit65 + (Platform.OS === 'ios' ? insets.bottom : 0),
            backgroundColor: AppColors.white,
            borderTopWidth: StyleSheet.hairlineWidth,
            borderTopColor: AppColors.grey,
          },
        ],
        tabBarLabelStyle: styles.tabBarLabelStyle,
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Learn',
          tabBarIcon: ({focused}) => {
            return getIcon(focused, IC_LEARN);
          },
        }}
        name="LearnTab"
        component={LearnTab}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Chat GPT',
          tabBarIcon: ({focused}) => {
            return getIcon(focused, IC_PRACTICE);
          },
          tabBarHideOnKeyboard: !(Platform.OS === 'ios'),
        }}
        name="ChatGPTTab"
        component={ChatGPTTab}
      />
      {/* <Tab.Screen
        options={{
          tabBarLabel: 'Analytics',
          tabBarIcon: ({focused}) => {
            return getIcon(focused, IC_NOTIFICATION);
          },
        }}
        name="AnalyticsTab"
        component={AnalyticsTab}
      /> */}
      <Tab.Screen
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused}) => {
            return getIcon(focused, IC_PROFILE);
          },
        }}
        name="ProfileTab"
        component={ProfileTab}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;

function getIcon(focus: boolean, source: ImageSourcePropType) {
  return (
    <Image
      style={[
        AppStyles.icon28,
        {
          tintColor: focus ? AppColors.purple : AppColors.grey,
        },
      ]}
      source={source}
    />
  );
}
