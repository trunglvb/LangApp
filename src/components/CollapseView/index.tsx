/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Image,
  LayoutAnimation,
  Platform,
  StyleSheet,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import AppColors from '../../styles/AppColors';
import {
  unit10,
  unit12,
  unit14,
  unit16,
  unit20,
  unit4,
  unit70,
  unit8,
} from '../../utils/appUnit';
import Icon from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import TrackPlayer, {usePlaybackState, State} from 'react-native-track-player';
import {addTracksIPA, setupPlayer} from '../../utils/trackPlayerService';
import PressView from '../PressView/PressView';
import {uShortAu} from '../../assets/path';
import AppText from '../AppText/AppText';

interface ICollapseViewItem {
  title: string;
  list: {
    phonetic: string;
    audioSrc: any;
    mouthShape: any;
    desc: string;
    examples: {
      word: string;
      phonetic: string;
    }[];
  }[];
}
interface ICollapseViewProps {
  item: ICollapseViewItem;
}

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const CollapseView = (props: ICollapseViewProps) => {
  const {item} = props;
  const [expanded, setExpanded] = useState(false);
  const [audio, setAudio] = useState<any>(uShortAu);
  const playbackState = usePlaybackState();

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
    const mp3 = {
      url: audio,
      title: 'Test',
      artist: 'deadmau5',
      artwork:
        'https://aten.edu.vn/wp-content/uploads/2022/10/hinh-anh-tieu-chi-cham-diem-thi-ielts-listening-so-3.png',
      duration: 1000,
    };
    async function setup() {
      let isSetup = await setupPlayer();

      const queue = await TrackPlayer.getQueue();
      if (isSetup && queue.length <= 0) {
        await addTracksIPA([mp3]);
      }
    }

    setup();

    return () => {
      TrackPlayer.reset();
    };
  }, [audio]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setExpanded(!expanded);
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: unit8,
          }}>
          <AppText style={{fontSize: unit14, fontWeight: '500'}}>
            {item?.title}
          </AppText>
          <Icon
            style={{
              fontSize: unit14,
              marginTop: 2,
            }}
            name={!expanded ? 'down' : 'up'}
          />
        </View>
      </TouchableOpacity>
      {expanded && (
        <View style={{marginTop: unit8}}>
          {item?.list?.map(listItem => (
            <View
              key={listItem?.phonetic}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                padding: unit4,
                borderColor: AppColors.light_grey2,
                borderRadius: unit8,
                marginBottom: unit8,
                shadowColor: AppColors.light_grey2,
                shadowOffset: {width: -2, height: 4},
                shadowOpacity: 0.2,
                shadowRadius: 3,
              }}>
              <View style={{flex: 1}}>
                <View style={[styles.flexRow, {marginBottom: unit8}]}>
                  <AppText
                    style={{
                      fontSize: unit16,
                      fontWeight: '500',
                    }}>{`/${listItem?.phonetic}/`}</AppText>
                  <PressView
                    onPress={() => {
                      setAudio(listItem?.audioSrc);

                      setTimeout(async () => {
                        await togglePlayback(playbackState);
                      }, 1000);
                    }}>
                    <Feather
                      name="volume-1"
                      style={{
                        fontSize: unit20,
                        color: AppColors.dark_grey,
                        marginLeft: unit14,
                        marginTop: 2,
                      }}
                    />
                  </PressView>
                </View>
                <AppText style={styles.textFontSize}>{listItem?.desc}</AppText>
                <AppText style={styles.exampleText}>Exmaple: </AppText>
                {listItem?.examples?.map(example => (
                  <View
                    style={[styles.flexRow, {marginBottom: unit4}]}
                    key={example.word}>
                    <View style={styles.flexRow}>
                      <AppText style={{fontSize: unit14}}>
                        {example.word}
                      </AppText>
                      <AppText
                        style={{marginLeft: unit8, color: AppColors.purple}}>
                        {example.phonetic}
                      </AppText>
                    </View>
                    <Feather
                      name="volume-1"
                      style={{
                        fontSize: unit14,
                        color: AppColors.dark_grey,
                        marginLeft: unit14,
                      }}
                    />
                  </View>
                ))}
              </View>
              <View style={{marginLeft: unit10}}>
                <Image
                  style={{
                    width: unit70,
                    height: unit70,
                    borderRadius: unit4,
                  }}
                  source={listItem?.mouthShape}
                />
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: AppColors.white,
    padding: unit12,
    paddingBottom: unit4,
    borderWidth: 1,
    borderRadius: unit8,
    borderColor: AppColors.light_grey2,
    shadowColor: AppColors.purple,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginBottom: unit8,
  },
  textFontSize: {
    fontSize: unit14,
  },
  exampleText: {
    fontSize: unit14,
    fontWeight: '600',
    textDecorationLine: 'underline',
    marginBottom: unit8,
    marginTop: unit8,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CollapseView;
