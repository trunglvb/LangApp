/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FlatList, SafeAreaView, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {NavigationRef} from '../../../../App';
import AppBar from '../../../components/AppBar/AppBar';
import AppImage from '../../../components/AppImage/AppImage';
import AppText from '../../../components/AppText/AppText';
import PressView from '../../../components/PressView/PressView';
import {PodcastLevel} from '../../../model/enum/PodcastLevel';
import AppColors from '../../../styles/AppColors';
import {LISTEN_LEVEL_LIST} from '../../../utils/StaticData';
import {unit16} from '../../../utils/appUnit';
import styles from './styles';

const TopicsListScreen: React.FC = () => {
  return (
    <SafeAreaView style={stylesComp.container}>
      <AppBar
        leftIcon={
          <Icon
            style={{
              fontSize: unit16,
            }}
            name={'arrow-left'}
          />
        }
        title={'Listening'}
        containerStyle={{
          borderBottomWidth: 1,
          borderBottomColor: AppColors.light_grey2,
          backgroundColor: AppColors.light_grey,
        }}
      />
      <FlatList
        data={LISTEN_LEVEL_LIST}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        ListHeaderComponent={
          <AppText fontType={'bold'} style={styles.titleStyle}>
            Levels
          </AppText>
        }
        renderItem={({item}) => <TopicsListItem key={item.id} item={item} />}
      />
    </SafeAreaView>
  );
};

export default TopicsListScreen;

interface TopicsListItemProps {
  item: {
    id: number;
    title: string;
    level: PodcastLevel;
    imageUri: string;
    desc: string;
  };
}

const TopicsListItem: React.FC<TopicsListItemProps> = ({item}) => {
  return (
    <PressView
      onPress={() => {
        NavigationRef?.current?.navigate('TopicScreen', {
          topic: item,
        });
      }}
      style={styles.itemWrapper}>
      <AppImage
        resizeMode={'cover'}
        style={styles.itemImage}
        source={{uri: item.imageUri}}
      />
      <View style={styles.textWrapper}>
        <AppText style={styles.itemTitle} fontType={'bold'}>
          {item.title}
        </AppText>
        <AppText style={styles.itemDesc}>{item.desc}</AppText>
      </View>
    </PressView>
  );
};

export const stylesComp = StyleSheet.create({
  container: {
    backgroundColor: AppColors.light_grey,
    flex: 1,
  },
});
