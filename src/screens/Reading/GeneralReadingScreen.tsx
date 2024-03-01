import React, {useEffect} from 'react';
import {
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {NavigationRef} from '../../../App';
import AppBar from '../../components/AppBar/AppBar';
import PressView from '../../components/PressView/PressView';
import AppColors from '../../styles/AppColors';
import {unit150, unit16, unit20, unit30} from '../../utils/appUnit';

const GeneralReadingScreen: React.FC = () => {
  useEffect(() => {
    StatusBar.setBarStyle(Platform.OS === 'ios' ? 'dark-content' : 'default');
  }, []);

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
        containerStyle={styles.appbarWrap}
        title={'Reading'}
      />
      <ScrollView style={styles.flex} contentContainerStyle={styles.scrollView}>
        <PressView
          onPress={() => {
            NavigationRef?.current?.navigate('ListNewsScreen');
          }}
          style={styles.pressWrap}>
          <ImageBackground
            style={styles.pressImage}
            imageStyle={{
              borderRadius: unit16,
            }}
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6iXjAC0-gKrl4F6qrP0dw_-o66dQAqGcT_w&usqp=CAU',
            }}
          />
        </PressView>
      </ScrollView>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    backgroundColor: AppColors.white,
    flex: 1,
  },
  appbarWrap: {
    borderBottomWidth: 1,
    borderBottomColor: AppColors.light_grey2,
    backgroundColor: AppColors.white,
  },
  scrollView: {
    paddingTop: unit30,
    paddingHorizontal: unit20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1,
  },
  pressWrap: {
    width: '100%',
    borderRadius: unit16,
  },
  pressImage: {
    width: '100%',
    height: unit150,
  },
});

export default GeneralReadingScreen;
