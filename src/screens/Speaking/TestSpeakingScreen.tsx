import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Button, SafeAreaView, Text} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {RootStackParamList} from '../../../App';
import AppBar from '../../components/AppBar/AppBar';
import AppText from '../../components/AppText/AppText';
import AppColors from '../../styles/AppColors';
import {unit16} from '../../utils/appUnit';
import {addTracks, setupPlayer} from '../../utils/trackPlayerService';

type ScreenProps = RouteProp<RootStackParamList, 'AudioDetailScreen'>;

const TestSpeakingScreen = () => {
  const {params} = useRoute<ScreenProps>();
  const [sentenceDurations, setSentenceDurations] = useState<number[]>([]);

  const calculateSentenceDurations = async (
    transcript: string[],
    audioFilePath: string,
  ) => {
    return new Promise<number[]>(resolve => {
      const sentences = transcript; // Assuming sentences are separated by periods

      const durations: number[] = [];
      let currentIndex = 0;

      const playNextSentence = () => {
        if (currentIndex < sentences.length) {
          const sentence = sentences[currentIndex];
          const sentenceDuration = sentence.trim().split(' ').length * 1000; // Adjust based on your requirements

          durations.push(sentenceDuration);

          TrackPlayer.setupPlayer().then(() => {
            TrackPlayer.add({
              id: String(currentIndex),
              url: audioFilePath,
              title: `Sentence ${currentIndex + 1}`,
              artist: '',
            }).then(() => {
              TrackPlayer.play();

              setTimeout(() => {
                TrackPlayer.pause();
                currentIndex++;
                playNextSentence();
              }, sentenceDuration);
            });
          });
        } else {
          resolve(durations);
        }
      };

      playNextSentence();
    });
  };

  const handleButtonPress = async () => {
    const transcript = params.audio.detail.transcriptItems.map(
      sentence => sentence.speech,
    );
    const audioFilePath = params.audio.detail.audioLink;

    const durations = await calculateSentenceDurations(
      transcript,
      audioFilePath,
    );

    setSentenceDurations(durations);
  };

  const mp3 = {
    url: params.audio.detail.audioLink,
    title: params.audio.title,
    artist: 'deadmau5', // Load artwork from the app bundle
    duration: 1000,
  };

  useEffect(() => {
    // Initialize the Track Player
    async function setup() {
      let isSetup = await setupPlayer();

      const queue = await TrackPlayer.getQueue();
      if (isSetup && queue.length <= 0) {
        await addTracks([mp3]);
      }
    }

    setup();

    // Clean up resources on unmount
    return () => {
      TrackPlayer.reset();
    };
  }, []);

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
      <AppText>Okeeee</AppText>
      <Button title="Start Recognition" onPress={handleButtonPress} />

      {sentenceDurations.map((duration, index) => (
        <Text key={index}>{`Sentence ${
          index + 1
        } Duration: ${duration} milliseconds`}</Text>
      ))}
    </SafeAreaView>
  );
};

export default TestSpeakingScreen;
