/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RootStackParamList} from '../../../../App';
import AppBar from '../../../components/AppBar/AppBar';
import AppImage from '../../../components/AppImage/AppImage';
import AppText from '../../../components/AppText/AppText';
import PressView from '../../../components/PressView/PressView';
import {VocabModel} from '../../../model/VocabListModel';
import AppColors from '../../../styles/AppColors';
import AppStyles from '../../../styles/AppStyles';
import {RootState, useAppSelector} from '../../../store/store';
import {
  dimension,
  fontSize16,
  fontSize18,
  unit10,
  unit12,
  unit15,
  unit16,
  unit20,
  unit200,
  unit25,
  unit30,
  unit35,
  unit50,
} from '../../../utils/appUnit';
import {addTracks, setupPlayer} from '../../../utils/trackPlayerService';
import {setIsPause} from '../../../store/slice/videoPlaySlice';
import {useAppDispatch} from '../../../store/store';
import {addMyWord} from '../../../network/services/vocab.apis';
import useAuth from '../../../hooks/useAuth';
import {deleteUserWord} from '../../../network/services/auth.apis';

const styleValue = {
  zero: 0,
};
type ScreenProps = RouteProp<RootStackParamList, 'VocabScreen'>;
const VocabScreen: React.FC = () => {
  const {params} = useRoute<ScreenProps>();
  const data: VocabModel[] = params.vocabList?.wordList ?? [];
  const insets = useSafeAreaInsets();
  const {authData} = useAuth();
  const vocabsUser = useAppSelector(
    (state: RootState) => state.auth.vocabsUser,
  );
  const [showMeaning, setShowMeaning] = useState(false);
  const [currentVocab, setCurrentVocab] = useState(0);
  const isCheckDefault = useMemo(() => {
    return (
      vocabsUser.filter((item: any) => item.word === data[currentVocab]?.word)
        .length > 0
    );
  }, [currentVocab]);
  const [isCheck, setIsCheck] = useState<boolean>(isCheckDefault);
  const playbackState = usePlaybackState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsCheck(isCheckDefault);
  }, [isCheckDefault]);
  useEffect(() => {
    return () => {
      dispatch(setIsPause(false));
    };
  }, []);

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

  console.log(' data[currentVocab]?._id', data[currentVocab]?._id);
  useEffect(() => {
    const mp3 = {
      url: data[currentVocab]?.audio ?? '',
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
        await addTracks([mp3]);
      }
    }

    setup();

    return () => {
      TrackPlayer.reset();
    };
  }, [currentVocab]);

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
        title={params?.vocabList?.topicTitle ?? 'My Vocabulary'}
      />
      <View style={styles.wrap}>
        <View
          style={[
            styles.content,
            {paddingBottom: showMeaning ? unit30 : styleValue.zero},
          ]}>
          <View
            style={[
              styles.wordWrap,
              {
                borderTopLeftRadius: unit25,
                borderTopRightRadius: unit25,
                borderBottomLeftRadius: showMeaning ? 0 : unit25,
                borderBottomRightRadius: showMeaning ? 0 : unit25,
              },
            ]}>
            {showMeaning ? (
              <>
                <AppImage
                  style={{
                    width: dimension.width - unit35 * 2,
                    height: unit200,
                    borderTopLeftRadius: unit25,
                    borderTopRightRadius: unit25,
                  }}
                  source={{uri: data[currentVocab]?.image}}
                />
                <View style={styles.wordMeaning}>
                  <AppText style={styles.meaningText} fontType={'bold'}>
                    {data[currentVocab]?.word}
                  </AppText>
                  <Feather
                    onPress={async () => {
                      await togglePlayback(playbackState);
                    }}
                    style={styles.volumnIcon}
                    name={
                      playbackState !== State.Playing ? 'volume-2' : 'volume-x'
                    }
                  />
                </View>
              </>
            ) : (
              <>
                <View style={styles.wordWrapDefault}>
                  <AppText style={styles.meaningTextDefault} fontType={'bold'}>
                    {data[currentVocab]?.word}
                  </AppText>
                  <Feather
                    onPress={async () => {
                      await togglePlayback(playbackState);
                    }}
                    style={styles.volumnIconDefault}
                    name={
                      playbackState !== State.Playing ? 'volume-2' : 'volume-x'
                    }
                  />
                </View>
                {showMeaning && (
                  <AppText
                    style={{
                      fontSize: fontSize18,
                      color: AppColors.white,
                      marginTop: unit10,
                    }}
                    fontType={'medium'}>
                    {data[currentVocab]?.meaning}
                  </AppText>
                )}
              </>
            )}
          </View>
          {showMeaning && (
            <View
              style={{
                paddingHorizontal: unit20,
              }}>
              <AppText
                style={{
                  fontSize: fontSize16,
                  color: AppColors.black,
                  marginTop: unit20,
                }}
                fontType={'medium'}>
                <AppText
                  style={{
                    fontSize: fontSize16,
                    color: AppColors.purple,
                    marginTop: unit20,
                  }}
                  fontType={'bold'}>
                  Meaning:{' '}
                </AppText>
                {data[currentVocab]?.meaning}
              </AppText>
            </View>
          )}
        </View>

        <View
          style={[
            AppStyles.alignRow,
            styles.absolute,
            {
              bottom: insets.bottom + unit20,
            },
          ]}>
          <PressView
            onPress={() => setShowMeaning(!showMeaning)}
            style={[
              styles.bottom,
              {
                backgroundColor: !showMeaning
                  ? AppColors.white
                  : AppColors.purple,
              },
            ]}>
            {!showMeaning ? (
              <Feather
                style={{
                  color: AppColors.dark_grey,
                }}
                size={unit30}
                name={'eye'}
              />
            ) : (
              <Feather
                style={{
                  color: AppColors.white,
                }}
                name={'eye-off'}
                size={unit30}
              />
            )}
          </PressView>
          <PressView
            onPress={() => {
              setIsCheck(!isCheck);
              if (!isCheck) {
                addMyWord({
                  topicId: params?.vocabList?._id,
                  userId: authData?.user?._id,
                  word: data[currentVocab]?.word,
                  meaning: data[currentVocab]?.meaning,
                  image: data[currentVocab]?.image,
                  audio: data[currentVocab]?.audio,
                  spell: data[currentVocab]?.spell,
                });
              } else {
                deleteUserWord(
                  authData.user?._id!,
                  vocabsUser.filter(
                    (item: any) => item.word === data[currentVocab]?.word,
                  )[0]?._id ?? '',
                );
              }
            }}
            style={[
              styles.bottom,
              {backgroundColor: !isCheck ? AppColors.white : AppColors.red},
            ]}>
            {!isCheck ? (
              <FontAwesome
                style={{
                  color: AppColors.dark_grey,
                }}
                size={unit30}
                name={'heart'}
              />
            ) : (
              <FontAwesome
                style={{
                  color: AppColors.white,
                }}
                name={'heart'}
                size={unit30}
              />
            )}
          </PressView>
          <PressView
            onPress={() => {
              setShowMeaning(false);
              setIsCheck(false);
              setCurrentVocab(prev => {
                if (prev < data.length) {
                  return prev + 1;
                } else {
                  return 0;
                }
              });
            }}
            style={styles.checkIcon}>
            <Icon
              style={{
                color: AppColors.white,
              }}
              name={'check'}
              size={unit30}
            />
          </PressView>
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
  wrap: {
    flex: 1,
    marginTop: unit20,
    backgroundColor: AppColors.light_grey,
    borderTopLeftRadius: unit30,
    borderTopRightRadius: unit30,
    alignItems: 'center',
    paddingTop: unit25,
    position: 'relative',
  },
  content: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.white,
    borderRadius: unit25,
    marginHorizontal: unit30,
    position: 'absolute',
    top: '15%',
  },
  wordWrap: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.purple,
    height: 300,
    // borderRadius: unit25,
    width: '100%',
  },
  wordMeaning: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
    marginTop: 20,
  },
  meaningText: {
    fontSize: 33,
    color: AppColors.white,
  },
  volumnIcon: {
    fontSize: unit25,
    color: AppColors.white,
    position: 'absolute',
    right: 20,
  },
  wordWrapDefault: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: dimension.width - unit35 * 2,
    flex: 1,
  },
  meaningTextDefault: {
    fontSize: 33,
    color: AppColors.white,
    textAlign: 'center',
  },
  volumnIconDefault: {
    fontSize: unit30,
    color: AppColors.white,
    marginTop: 20,
  },
  absolute: {
    position: 'absolute',
  },
  bottom: {
    width: unit50,
    height: unit50,
    borderRadius: unit12,
    marginEnd: unit15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    width: unit50,
    height: unit50,
    borderRadius: unit12,
    backgroundColor: AppColors.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default VocabScreen;
