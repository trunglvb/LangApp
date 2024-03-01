/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-catch-shadow */
/* eslint-disable @typescript-eslint/no-shadow */
import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {NavigationRef, RootStackParamList} from '../../../../App';
import AppBar from '../../../components/AppBar/AppBar';
import AppImage from '../../../components/AppImage/AppImage';
import AppText from '../../../components/AppText/AppText';
import ErrorView from '../../../components/ErrorView/ErrorView';
import AppLoading from '../../../components/Loading/AppLoading';
import PressView from '../../../components/PressView/PressView';
import useScreenState from '../../../hooks/useScreenState';
import {PodcastModel} from '../../../model/PodcastModel';
import {PodcastLevel} from '../../../model/enum/PodcastLevel';
import {getPodcastsByLevel} from '../../../network/services/podcast.apis';
import AppStyles from '../../../styles/AppStyles';
import ApiHelper from '../../../utils/ApiHelper';
import styles from './styles';
import AppColors from '../../../styles/AppColors';

type ScreenProps = RouteProp<RootStackParamList, 'TopicScreen'>;
const TopicScreen: React.FC = () => {
  const route = useRoute<ScreenProps>();
  const params = route.params;
  const {isLoading, setLoading, error, setError} = useScreenState();

  const [topicData, setTopicData] = useState<PodcastModel[]>([]);

  const fetchTopicData = async () => {
    const level =
      params.topic.id === 1 ? PodcastLevel.A2 : params?.topic?.level;
    try {
      setLoading(true);
      const res = await getPodcastsByLevel(level);
      if (ApiHelper.isSuccess(res)) {
        setTopicData(res?.data?.data?.podcasts);
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
    <SafeAreaView style={AppStyles.lightGreyContainer}>
      <AppBar
        leftIcon={<Icon style={AppStyles.appBarIcon} name={'arrow-left'} />}
        title={params?.topic?.title}
        containerStyle={{
          borderBottomWidth: 1,
          borderBottomColor: AppColors.light_grey2,
          backgroundColor: AppColors.light_grey,
        }}
      />
      <FlatList
        data={topicData}
        style={styles.flatListStyle}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContentStyle}
        renderItem={({item}) => <ListeningItem item={item} />}
      />
    </SafeAreaView>
  );
};

export default TopicScreen;

interface ListeningItemProps {
  item: PodcastModel;
}

const ListeningItem: React.FC<ListeningItemProps> = ({item}) => {
  return (
    <PressView
      onPress={() => {
        NavigationRef?.current?.navigate('ListenScreen', {
          lesson: item,
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
