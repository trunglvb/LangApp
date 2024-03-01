import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {Platform, SafeAreaView, ScrollView, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {NavigationRef, RootStackParamList} from '../../../App';
import AppBar from '../../components/AppBar/AppBar';
import AppImage from '../../components/AppImage/AppImage';
import AppText from '../../components/AppText/AppText';
import PressView from '../../components/PressView/PressView';
import AppColors from '../../styles/AppColors';
import {unit14, unit16, unit20, unit24, unit30} from '../../utils/appUnit';
import jsonTranscriptData from '../Speaking/transcripts/a_request_from_your_boss.json';

const persons = [
  '', // empty for the first sentence
  'Susanne',
  'Mario',
  'Susanne',
  'Mario',
  'Susanne',
  'Mario',
  'Susanne',
  'Mario',
  'Susanne',
  'Mario',
  'Susanne',
  'Mario',
  'Susanne',
  '',
];

type AudioDetailScreenProps = RouteProp<
  RootStackParamList,
  'AudioDetailScreen'
>;

const AudioDetailScreen: React.FunctionComponent = () => {
  const {params} = useRoute<AudioDetailScreenProps>();

  const [transcriptData, setTranscriptData] = useState<SentenceWithDuration[]>(
    [],
  );

  useLayoutEffect(() => {
    const sentencesWithPerson = jsonTranscriptData.map((sentence, index) => {
      return {...sentence, person: persons[index]};
    });

    const objTranscriptData = sentencesWithPerson.map((sentence, index) => {
      return {
        sentence:
          sentence.person !== ''
            ? `${sentence.person}: ${sentence.sentence}`
            : sentence.sentence,
        in: sentence.in,
        out: sentence.out,
      };
    });
    setTranscriptData(objTranscriptData);
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
        title={params.audio.title}
      />
      <ScrollView
        overScrollMode={'never'}
        contentContainerStyle={[
          {
            backgroundColor: AppColors.light_grey,
            paddingBottom: unit24,
            paddingHorizontal: 16,
          },
        ]}
        showsVerticalScrollIndicator={false}>
        <AppImage
          resizeMode={'contain'}
          source={{uri: params.audio.coverImage}}
          style={{
            width: '100%',
            height: 250,
            borderRadius: unit16,
          }}
        />
        <View>
          {transcriptData?.map((speech, index) => {
            return (
              <SpeechView key={index} speech={speech.sentence} index={index} />
            );
          })}
        </View>
        <PressView
          onPress={() => {
            NavigationRef.current?.navigate('SpeakingScreen', {
              transcriptData: transcriptData,
              audio: params.audio.detail.audioLink,
            });
          }}
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
            marginTop: unit30,
          }}>
          <AppText
            fontType="medium"
            style={{
              color: AppColors.white,
              fontSize: 18,
            }}>
            Get Started
          </AppText>
        </PressView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AudioDetailScreen;

interface SpeechViewProps {
  speech: string;
  index: number;
}

const SpeechView: React.FC<SpeechViewProps> = ({speech, index}) => {
  return (
    <View>
      <AppText
        fontType={index === 0 ? 'medium' : 'regular'}
        style={{
          fontSize: unit14,
          lineHeight: unit16,
          marginTop: unit20,
        }}>
        {speech}
      </AppText>
    </View>
  );
};

export interface SentenceWithDuration {
  sentence: string;
  in: number;
  out: number;
}
