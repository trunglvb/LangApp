import {
  MaterialTopTabBarProps,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import React, {useEffect} from 'react';
import {Platform, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppBar from '../../../../components/AppBar/AppBar';
import AppTabBar from '../../../../components/AppTabBar/AppTabBar';
import AppColors from '../../../../styles/AppColors';
import {fontSize12, unit16} from '../../../../utils/appUnit';
import AllTab from './tabs/AllTab';
import BBCTab from './tabs/BBCTab';
import EntertainmentTab from './tabs/Entertainment';
import HealthyTab from './tabs/HealthyTab';
import SportTab from './tabs/SportTab';

const Tab = createMaterialTopTabNavigator<NewsTabParamList>();

export type NewsTabParamList = {
  All: undefined;
  Healthy: undefined;
  Sport: undefined;
  Entertainment: undefined;
  BBC: undefined;
};

const ListNewsScreen: React.FunctionComponent = () => {
  useEffect(() => {
    StatusBar.setBarStyle(Platform.OS === 'ios' ? 'dark-content' : 'default');
  }, []);

  const renderAppTabBar = (props: MaterialTopTabBarProps) => (
    <AppTabBar {...props} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <AppBar
        leftIcon={
          <Icon
            style={{
              fontSize: unit16,
            }}
            name={'arrow-left'}
          />
        }
        containerStyle={{
          backgroundColor: AppColors.white,
        }}
        title={'News'}
      />
      <Tab.Navigator
        tabBar={props => renderAppTabBar(props)}
        screenOptions={{
          tabBarActiveTintColor: AppColors.black,
          tabBarInactiveTintColor: AppColors.dark_grey,
          tabBarStyle: [
            {
              backgroundColor: AppColors.white,
            },
          ],
          tabBarLabelStyle: {
            textTransform: 'none',
            fontSize: fontSize12,
          },
        }}>
        <Tab.Screen options={{}} name="All" component={AllTab} />
        <Tab.Screen options={{}} name="Healthy" component={HealthyTab} />
        <Tab.Screen options={{}} name="Sport" component={SportTab} />
        <Tab.Screen
          options={{}}
          name="Entertainment"
          component={EntertainmentTab}
        />
        <Tab.Screen options={{}} name="BBC" component={BBCTab} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    flex: 1,
  },
});
export default ListNewsScreen;
