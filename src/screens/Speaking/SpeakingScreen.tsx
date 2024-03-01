/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import Voice, {
  SpeechErrorEvent,
  SpeechRecognizedEvent,
  SpeechResultsEvent,
} from '@react-native-voice/voice';
import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Modal, Platform, SafeAreaView, View} from 'react-native';
import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {RootStackParamList} from '../../../App';
import AppBar from '../../components/AppBar/AppBar';
import AppText from '../../components/AppText/AppText';
import PressView from '../../components/PressView/PressView';
import AppColors from '../../styles/AppColors';
import {unit16} from '../../utils/appUnit';
import {addTracks, setupPlayer} from '../../utils/trackPlayerService';

const transparent = 'rgba(0,0,0,0.5)';

type SpeakingScreenProps = RouteProp<RootStackParamList, 'SpeakingScreen'>;

const SpeakingScreen: React.FC = () => {
  const {params} = useRoute<SpeakingScreenProps>();
  const [openModal, setOpenModal] = useState(false);
  const [isCorrectModal, setIsCorrectModal] = useState<'correct' | 'incorrect'>(
    'correct',
  );

  const playbackState = usePlaybackState();
  const progress = useProgress();
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  const [recognized, setRecognized] = useState('');
  const [volume, setVolume] = useState('');
  const [error, setError] = useState('');
  const [end, setEnd] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState<string[] | undefined>([]);
  const [partialResults, setPartialResults] = useState<string[] | undefined>(
    [],
  );

  const [currentSentence, setCurrentSentence] = useState<number>(0);

  const testText =
    "Don't bother waking me up at 4:00 a.m. I don't plan to go fishing tomorrow.";

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechRecognized = onSpeechRecognized;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

    return () => {
      Voice.destroy()
        .then(Voice.removeAllListeners)
        .finally(() => {});
    };
  }, []);

  const onSpeechStart = (e: any) => {
    setStarted('√');
  };

  const onSpeechRecognized = (e: SpeechRecognizedEvent) => {
    setRecognized('√');
  };

  const onSpeechEnd = (e: any) => {
    setEnd('√');
  };

  const onSpeechError = (e: SpeechErrorEvent) => {
    setError(JSON.stringify(e.error));
  };

  const onSpeechResults = (e: SpeechResultsEvent) => {
    setResults(e.value);
  };

  const onSpeechPartialResults = (e: SpeechResultsEvent) => {
    setPartialResults(e.value);
  };

  const onSpeechVolumeChanged = (e: any) => {
    setVolume(e.value);
  };

  const _startRecognizing = async () => {
    _clearState();
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  const _stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  function compareStrings(str1: string, str2: string) {
    const similarity = calculateSimilarity(str1, str2);
    return similarity > 0.6;
  }

  function calculateSimilarity(str1: string, str2: string) {
    const distance = levenshteinDistance(str1, str2);
    const maxLength = Math.max(str1.length, str2.length);
    const similarity = 1 - distance / maxLength;
    return similarity;
  }

  function levenshteinDistance(str1: string, str2: string) {
    const dp = [];
    for (let i = 0; i <= str1.length; i++) {
      dp[i] = [i];
    }
    for (let j = 1; j <= str2.length; j++) {
      dp[0][j] = j;
    }
    for (let i = 1; i <= str1.length; i++) {
      for (let j = 1; j <= str2.length; j++) {
        const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + cost,
        );
      }
    }
    return dp[str1.length][str2.length];
  }

  const compareResult = async () => {
    await _stopRecognizing();
    setStarted('');
    if (
      compareStrings(
        results![0],
        params.transcriptData[currentSentence].sentence,
      )
    ) {
      setIsCorrectModal('correct');
    } else {
      setIsCorrectModal('incorrect');
    }
    setOpenModal(true);
  };

  const _clearState = () => {
    setRecognized('');
    setVolume('');
    setError('');
    setEnd('');
    setStarted('');
    setResults([]);
    setPartialResults([]);
  };

  const mp3 = {
    url: params.audio ?? require('./test.mp3'),
    title: 'Test',
    artist: 'deadmau5',
    artwork:
      'https://aten.edu.vn/wp-content/uploads/2022/10/hinh-anh-tieu-chi-cham-diem-thi-ielts-listening-so-3.png',
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

    setup().then(async () => {
      await TrackPlayer.seekTo(params.transcriptData[currentSentence].in);
      await TrackPlayer.play();

      // Stop playback at the "seekTo" position
      setTimeout(async () => {
        await TrackPlayer.pause();
        await TrackPlayer.seekTo(params.transcriptData[currentSentence].out);
      }, (params.transcriptData[currentSentence].out - params.transcriptData[currentSentence].in) * 1000);
    });

    return () => {
      TrackPlayer.reset();
    };
  }, [currentSentence]);

  const renderIncorrectModal = () => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          padding: 15,
          width: '90%',
          height: 160,
          borderRadius: 10,
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            //   backgroundColor: 'red',
            flexDirection: 'row',
          }}>
          <Icon
            name="times-circle"
            style={{
              fontSize: 20,
              color: AppColors.red,
              marginRight: 15,
            }}
          />
          <AppText
            fontType="bold"
            style={{
              fontSize: 20,
              color: AppColors.red,
            }}>
            You'were close!
          </AppText>
        </View>
        <PressView
          onPress={() => setOpenModal(!openModal)}
          style={{
            backgroundColor: AppColors.red,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 12,
            borderRadius: 10,
            marginTop: 24,
          }}>
          <AppText
            fontType="medium"
            style={{
              color: AppColors.white,
              fontSize: 18,
            }}>
            Continue
          </AppText>
        </PressView>
      </View>
    );
  };

  const renderCorrectModal = () => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          padding: 15,
          width: '90%',
          height: 160,
          borderRadius: 10,
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            //   backgroundColor: 'red',
            flexDirection: 'row',
          }}>
          <Icon
            name="check-circle"
            style={{
              fontSize: 20,
              color: AppColors.green,
              marginRight: 15,
            }}
          />
          <AppText
            fontType="bold"
            style={{
              fontSize: 20,
              color: AppColors.green,
            }}>
            You're correct!
          </AppText>
        </View>
        <PressView
          onPress={() => {
            setOpenModal(!openModal);
            setCurrentSentence(pre => {
              if (pre < params.transcriptData.length - 2) {
                return pre + 1;
              }
              return pre;
            });
            setResults([]);
          }}
          style={{
            backgroundColor: AppColors.green,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 12,
            borderRadius: 10,
            marginTop: 24,
          }}>
          <AppText
            fontType="medium"
            style={{
              color: AppColors.white,
              fontSize: 18,
            }}>
            Continue
          </AppText>
        </PressView>
      </View>
    );
  };

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
        title={'Speaking'}
      />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        <View
          style={{
            alignItems: 'center',
            marginTop: 20,
          }}>
          <PressView
            onPress={async () => {
              await togglePlayback(playbackState);
            }}
            style={{
              backgroundColor: AppColors.white,
              padding: 12,
              borderRadius: 50,
              shadowColor: '#171717',
              shadowOffset: {width: -2, height: 4},
              shadowOpacity: 0.2,
              shadowRadius: 3,
            }}>
            <Feather
              name="volume-1"
              style={{
                fontSize: 30,
                color: AppColors.dark_grey,
              }}
            />
          </PressView>
          <AppText
            fontType="semiBold"
            style={{
              marginTop: 20,
              fontSize: 24,
              textAlign: 'center',
            }}>
            {params.transcriptData[currentSentence].sentence}
          </AppText>
        </View>
        {started == '' ? (
          <PressView
            onPress={async () => {
              //   setOpenModal(true);
              //   setIsCorrectModal('correct');
              await _startRecognizing();
              setStarted('v');
            }}
            style={{
              backgroundColor: AppColors.white,
              padding: 12,
              borderRadius: 100,
              shadowColor: '#171717',
              shadowOffset: {width: -1, height: 4},
              shadowOpacity: 0.1,
              shadowRadius: 3,
            }}>
            <View
              style={{
                backgroundColor: AppColors.purple_gradient_1,
                padding: 30,
                borderRadius: 100,
              }}>
              <Entypo
                name="mic"
                style={{
                  fontSize: 45,
                  color: AppColors.white,
                }}
              />
            </View>
          </PressView>
        ) : (
          <PressView
            onPress={async () => {
              await _stopRecognizing();
              setStarted('');
            }}
            style={{
              backgroundColor: AppColors.white,
              padding: 12,
              borderRadius: 100,
              shadowColor: '#171717',
              shadowOffset: {width: -1, height: 4},
              shadowOpacity: 0.1,
              shadowRadius: 3,
            }}>
            <View
              style={{
                backgroundColor: AppColors.purple_gradient_1,
                padding: 30,
                borderRadius: 100,
              }}>
              <Feather
                name="loader"
                style={{
                  fontSize: 45,
                  color: AppColors.white,
                }}
              />
            </View>
          </PressView>
        )}

        <View
          style={{
            minHeight: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AppText
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: AppColors.blue_gradient_1,
            }}>
            {results?.[0]}
          </AppText>
        </View>

        <PressView
          onPress={compareResult}
          disabled={!results || results.length <= 0}
          style={{
            paddingVertical: 15,
            borderRadius: 16,
            backgroundColor: AppColors.purple_gradient_1,
            width: '100%',
            alignItems: 'center',
            shadowColor: '#171717',
            shadowOffset: {width: -1, height: 4},
            shadowOpacity: 0.1,
            shadowRadius: 3,
            marginBottom: Platform.OS === 'android' ? 30 : 0,
          }}>
          <AppText
            fontType="medium"
            style={{
              color: AppColors.white,
              fontSize: 18,
            }}>
            Check it
          </AppText>
        </PressView>
      </View>
      <Modal
        visible={openModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setOpenModal(!openModal)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: transparent,
          }}>
          {isCorrectModal === 'correct'
            ? renderCorrectModal()
            : renderIncorrectModal()}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SpeakingScreen;
