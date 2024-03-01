import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {WebView} from 'react-native-webview';
import {RootStackParamList, NavigationRef} from '../../../../../App';
import AppColors from '../../../../styles/AppColors';
import {unit16} from '../../../../utils/appUnit';

let paddingDefault = 20;

type NewsScreenProps = RouteProp<RootStackParamList, 'NewsScreen'>;
const NewsScreen: React.FC = () => {
  const {params} = useRoute<NewsScreenProps>();
  const {top, bottom} = useSafeAreaInsets();

  useEffect(() => {
    StatusBar.setBarStyle(Platform.OS === 'ios' ? 'dark-content' : 'default');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Icon
        style={styles.icon}
        name={'arrow-left'}
        onPress={() => NavigationRef.current?.goBack()}
      />

      <ScrollView
        contentContainerStyle={[
          styles.scrollViewWrap,
          {
            paddingBottom: bottom,
            paddingTop: Platform.OS === 'ios' ? paddingDefault : top,
          },
        ]}>
        <WebView
          style={styles.webview}
          onShouldStartLoadWithRequest={() => true}
          originWhitelist={['*']}
          source={{uri: params.new.url}}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  icon: {
    fontSize: unit16,
    paddingLeft: 20,
  },
  scrollViewWrap: {
    backgroundColor: AppColors.white,
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default NewsScreen;
