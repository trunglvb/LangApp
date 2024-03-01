import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {NavigationRef} from '../../../App';
import AppBar from '../../components/AppBar/AppBar';
import AppImage from '../../components/AppImage/AppImage';
import AppText from '../../components/AppText/AppText';
import ErrorView from '../../components/ErrorView/ErrorView';
import AppLoading from '../../components/Loading/AppLoading';
import PressView from '../../components/PressView/PressView';
import useScreenState from '../../hooks/useScreenState';
import {PodcastModel} from '../../model/PodcastModel';
import {PodcastLevel} from '../../model/enum/PodcastLevel';
import {
  getPodcastsByLevel,
  getRecentPodcast,
} from '../../network/services/podcast.apis';
import AppColors from '../../styles/AppColors';
import ApiHelper from '../../utils/ApiHelper';
import {
  dimension,
  unit14,
  unit16,
  unit18,
  unit20,
  unit30,
  unit5,
} from '../../utils/appUnit';

const RecentAudioScreen: React.FunctionComponent = () => {
  const [recentAudios, setRecentAudios] = useState<PodcastModel[]>([]);

  const {isLoading, setLoading, error, setError} = useScreenState();

  const [topicData, setTopicData] = useState<PodcastModel[]>([]);

  const fetchTopicData = async () => {
    // const level = PodcastLevel.A2;
    try {
      setLoading(true);
      const res = await getRecentPodcast();
      if (ApiHelper.isSuccess(res)) {
        setTopicData(res?.data?.data?.recentPodcasts);
      }
      setError(undefined);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopicData();
  }, []);

  if (isLoading) {
    return <AppLoading />;
  }

  if (error) {
    return <ErrorView onRefresh={fetchTopicData} />;
  }
  return (
    <SafeAreaView
      style={{
        backgroundColor: AppColors.light_grey,
        flex: 1,
      }}>
      <AppBar
        leftIcon={
          <Icon
            style={{
              fontSize: unit16,
            }}
            name={'arrow-left'}
          />
        }
        title={'Recent Audio'}
      />
      {/* <FlatList
        data={topicData}
        style={styles.flatListStyle}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContentStyle}
        renderItem={({item, index}) => <RecentAudioItem item={item} />}
      /> */}

      {/* Demo */}
      <View style={styles.flatListContentStyle}>
        {topicData && topicData.length > 0 && topicData[0] && (
          <RecentAudioItem item={topicData[0]} />
        )}
      </View>
    </SafeAreaView>
  );
};

interface RecentAudioItemProps {
  item: PodcastModel;
}

const RecentAudioItem: React.FC<RecentAudioItemProps> = ({item}) => {
  return (
    <PressView
      onPress={() => {
        NavigationRef.current?.navigate('AudioDetailScreen', {
          audio: item,
        });
      }}
      style={styles.itemWrapper}>
      <AppImage
        resizeMode={'cover'}
        style={styles.itemImage}
        source={{uri: item?.coverImage}}
      />
      <View style={styles.itemTextWrapper}>
        <AppText style={styles.itemTitle} fontType={'bold'}>
          {item.title}
        </AppText>
        <AppText style={styles.itemDesc}>{item?.description}</AppText>
      </View>
    </PressView>
  );
};

export default RecentAudioScreen;

const styles = StyleSheet.create({
  flatListStyle: {
    backgroundColor: AppColors.light_grey,
  },
  flatListContentStyle: {
    paddingHorizontal: unit16,
    paddingVertical: unit30,
  },
  itemWrapper: {
    width: '100%',
    flexDirection: 'row',
    // marginRight: unit16,
    backgroundColor: AppColors.white,
    marginBottom: unit20,
    position: 'relative',
    shadowColor: AppColors.dark_grey,
    borderRadius: unit16,
    shadowOffset: {
      width: 0.5,
      height: 0.5,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  itemImage: {
    // opacity: 0.7,
    minWidth: 125,
    maxWidth: dimension.width / 3 - 16 * 2,
    height: '100%',
    borderRadius: unit16,
  },
  itemTextWrapper: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  itemTitle: {
    fontSize: unit18,
    color: AppColors.black,
  },
  itemDesc: {
    fontSize: unit14,
    color: AppColors.dark_grey,
    marginTop: unit5,
    lineHeight: unit20,
  },
});
