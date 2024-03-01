import React from 'react';
import {ScrollView, View} from 'react-native';
import {NavigationRef} from '../../../../../App';
import AppText from '../../../../components/AppText/AppText';
import AppColors from '../../../../styles/AppColors';
import {LEARN_ITEMS} from '../../../../utils/Utils';
import {fontSize20, unit25, unit35, unit50} from '../../../../utils/appUnit';
import HomeHeaderView from './components/HomeHeaderView';
import LearnItem from './components/LearnItem';

const LearnTab: React.FunctionComponent = () => {
  // const { signOut } = useAuth();
  // const inset = useSafeAreaInsets();

  const handleNavigate = (item: string) => {
    switch (item) {
      case 'Reading': {
        NavigationRef?.current?.navigate('GeneralReadingScreen');
        break;
      }
      case 'Listening': {
        NavigationRef?.current?.navigate('TopicsListScreen');
        break;
      }
      // case 'Speaking': {
      //   NavigationRef?.current?.navigate('RecentAudioScreen');
      //   break;
      // }
      case 'Vocabulary': {
        NavigationRef?.current?.navigate('GeneralVocabScreen');
        break;
      }
      case 'Books': {
        NavigationRef?.current?.navigate('BookListScreen');
        break;
      }
      case 'Videos': {
        NavigationRef?.current?.navigate('VideoListScreen');
        break;
      }
      case 'Dictionary': {
        NavigationRef?.current?.navigate('DictionaryScreen');
        break;
      }
      case 'Documents': {
        NavigationRef?.current?.navigate('DocumentScreen');
        break;
      }
      case 'Games': {
        NavigationRef?.current?.navigate('GameScreen');
        break;
      }
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      overScrollMode={'never'}
      style={{
        flex: 1,
        backgroundColor: AppColors.light_grey,
      }}>
      <HomeHeaderView />

      <AppText
        style={{
          fontSize: fontSize20,
          color: AppColors.black,
          marginStart: unit25,
          marginTop: unit35,
        }}
        fontType={'bold'}>
        Your Lessons
      </AppText>

      <View style={{marginTop: unit25, marginBottom: unit50}}>
        {LEARN_ITEMS.map(item => {
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
    </ScrollView>
  );
};

export default LearnTab;
