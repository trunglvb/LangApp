import React, {useEffect} from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {NavigationRef} from '../../../App';
import AppColors from '../../styles/AppColors';
import {fontSize20, unit16, unit25, unit35} from '../../utils/appUnit';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import AppBar from '../../components/AppBar/AppBar';
import AppText from '../../components/AppText/AppText';
import {DICTIONARY_ITEMS} from '../../utils/Utils';
import LearnItem from '../Home/tabs/LearnTab/components/LearnItem';

//  type ScreenProps = RouteProp<RootStackParamList, 'DictionaryScreen'>;

const DictionaryScreen: React.FC = () => {
  // const {params} = useRoute<ScreenProps>();
  useEffect(() => {
    StatusBar.setBarStyle(Platform.OS === 'ios' ? 'dark-content' : 'default');
  }, []);

  const handleNavigate = (item: string) => {
    switch (item) {
      case 'Vi-En Dictionary': {
        NavigationRef?.current?.navigate('ViEngDictionaryScreen');
        break;
      }
      case 'En-En Dictionary': {
        NavigationRef?.current?.navigate('EnEnDictionaryScreen');
        break;
      }
      case 'Text Translation': {
        NavigationRef?.current?.navigate('TextTranslationScreen');
        break;
      }
      default:
        break;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <AppBar
        leftIcon={
          <FontAwesome
            style={{
              fontSize: unit16,
            }}
            name={'arrow-left'}
          />
        }
        containerStyle={styles.appbarWrap}
        title={'Dictionary'}
      />
      <View style={styles.wrap}>
        <View style={{marginTop: unit25}}>
          {DICTIONARY_ITEMS.map(item => {
            return (
              <LearnItem
                onPress={() => handleNavigate(item.name)}
                key={JSON.stringify(item.id)}
                id={item.id}
                name={item.name}
                icon={item.icon}
              />
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};
export const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.light_grey,
    flex: 1,
  },
  appbarWrap: {
    borderBottomWidth: 1,
    borderBottomColor: AppColors.light_grey2,
    backgroundColor: AppColors.light_grey,
  },
  wrap: {
    flex: 1,
    backgroundColor: AppColors.light_grey,
  },
});
export default DictionaryScreen;
