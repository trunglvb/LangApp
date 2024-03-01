/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
import Slider from '@react-native-community/slider';
import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {RootStackParamList} from '../../../../App';
import AppBar from '../../../components/AppBar/AppBar';
import AppImage from '../../../components/AppImage/AppImage';
import AppText from '../../../components/AppText/AppText';
import PressView from '../../../components/PressView/PressView';
import AppColors from '../../../styles/AppColors';
import AppStyles from '../../../styles/AppStyles';
import {unit14, unit16, unit20} from '../../../utils/appUnit';
import {addTracks, setupPlayer} from '../../../utils/trackPlayerService';
import styles from './styles';

type ListenScreenProps = RouteProp<RootStackParamList, 'ListenScreen'>;

const ListenScreen: React.FC = () => {
  const {params} = useRoute<ListenScreenProps>();
  const playbackState = usePlaybackState();
  const progress = useProgress();

  const mp3 = {
    url: params.lesson.detail.audioLink,
    title: params.lesson.title,
    artist: 'deadmau5',
    artwork: require('../../../assets/images/game-logo.png'), // Load artwork from the app bundle
    duration: 1000,
  };

  const togglePlayback = async (playbackState: State) => {
    const currentTrack = await TrackPlayer.getCurrentTrack();

    if (currentTrack !== null) {
      if (playbackState !== State.Playing) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  useEffect(() => {
    async function setup() {
      let isSetup = await setupPlayer();

      const queue = await TrackPlayer.getQueue();
      if (isSetup && queue.length <= 0) {
        await addTracks([mp3]);
      }
    }

    setup();

    return () => {
      TrackPlayer.reset();
    };
  }, []);

  return (
    <SafeAreaView style={AppStyles.lightGreyContainer}>
      <AppBar
        leftIcon={<Icon style={AppStyles.appBarIcon} name={'arrow-left'} />}
        title={params?.lesson?.title ?? ''}
        titleStyle={{
          fontSize: unit16,
        }}
        containerStyle={{
          borderBottomWidth: 1,
          borderBottomColor: AppColors.light_grey2,
          backgroundColor: AppColors.light_grey,
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContentStyle}
        style={styles.scrollViewStyle}>
        <AppImage
          resizeMode={'contain'}
          source={{uri: params?.lesson?.coverImage}}
          style={styles.coverImage}
        />
        {params.lesson.detail.transcriptItems.map((paragraph, index) => {
          if (paragraph.speech.includes('=')) {
            return null;
          }
          return (
            <ParagraphView
              key={paragraph.speech + Math.floor(Math.random() * 100)}
              paragraph={paragraph}
              index={index}
            />
          );
        })}
      </ScrollView>
      <View style={styles.sliderWrapper}>
        <Slider
          style={{}}
          value={progress.position}
          minimumValue={0}
          maximumValue={progress.duration}
          thumbTintColor={AppColors.purple}
          minimumTrackTintColor={AppColors.purple}
          maximumTrackTintColor={'#FFF'}
          onSlidingComplete={async value => {
            await TrackPlayer.seekTo(value);
          }}
        />
        <View style={styles.timeRow}>
          <AppText>
            {new Date(progress.position * 1000).toISOString().substring(14, 19)}
          </AppText>
          <AppText>
            {new Date((progress.duration - progress.position) * 1000)
              .toISOString()
              .substring(14, 19)}
          </AppText>
        </View>

        <View style={styles.buttonGroup}>
          <PressView
            style={styles.navButton}
            onPress={() => {
              TrackPlayer.seekTo(
                progress.position > 10 ? progress.position - 10 : 0,
              );
            }}>
            <Icon size={20} color={AppColors.white} name={'backward'} />
          </PressView>
          <PressView
            onPress={async () => {
              await togglePlayback(playbackState);
            }}
            style={styles.playButton}>
            <Icon
              size={20}
              color={AppColors.white}
              name={playbackState === State.Playing ? 'pause' : 'play'}
            />
          </PressView>
          <PressView
            style={styles.navButton}
            onPress={() => {
              TrackPlayer.seekTo(progress.position + 10);
            }}>
            <Icon size={20} color={AppColors.white} name={'forward'} />
          </PressView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ListenScreen;

interface ParagraphViewProps {
  paragraph: {
    person: string;
    speech: string;
  };
  index: number;
}

const ParagraphView: React.FC<ParagraphViewProps> = ({paragraph, index}) => {
  return (
    <View>
      <AppText
        fontType={index === 0 ? 'medium' : 'regular'}
        style={{
          fontSize: unit14,
          lineHeight: unit16,
          marginTop: unit20,
        }}>
        {paragraph?.person ? (
          <AppText style={{fontWeight: 'bold'}}>
            {paragraph.speech.split(':')[0]}
            <AppText style={{fontWeight: 'normal'}}>
              :{paragraph.speech.split(':')[1]}
            </AppText>
          </AppText>
        ) : (
          paragraph?.speech
        )}
      </AppText>
    </View>
  );
};
