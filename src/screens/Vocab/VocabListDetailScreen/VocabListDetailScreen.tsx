import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {SafeAreaView, ScrollView, View, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import VideoPlayer from 'react-native-video-player';
import {NavigationRef, RootStackParamList} from '../../../../App';
import AppBar from '../../../components/AppBar/AppBar';
import AppText from '../../../components/AppText/AppText';
import PressView from '../../../components/PressView/PressView';
import AppColors from '../../../styles/AppColors';
import {VocabListModel} from '../../../model/VocabListModel';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {
  dimension,
  fontSize16,
  fontSize20,
  unit10,
  unit12,
  unit15,
  unit16,
  unit20,
  unit24,
  unit30,
} from '../../../utils/appUnit';
import VocabItem from './VocabItem';
import {setIsPause} from '../../../store/slice/videoPlaySlice';

type ScreenProps = RouteProp<RootStackParamList, 'VocabListDetailScreen'>;
const VocabListDetailScreen: React.FC = () => {
  const {params} = useRoute<ScreenProps>();
  const isPause = useAppSelector(state => state.videoPlay.isPause);
  const dispatch = useAppDispatch();

  const handleNavigateToVocabScreen = () => {
    dispatch(setIsPause(true));
    NavigationRef.current?.navigate('VocabScreen', {
      vocabList: params?.vocabList ?? [],
    });
  };

  const handleNavigateToVocabDetailsScreen = (item: VocabListModel) => {
    dispatch(setIsPause(true));
    NavigationRef.current?.navigate('VocabDetailsItemScreen', {
      vocabList: item ?? [],
    });
  };
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
        titleStyle={{
          fontSize: unit16,
        }}
        title={
          params?.vocabList?.topicTitle?.split('-')[1]?.trim() ??
          'My Vocabulary'
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        {params?.vocabList?.videoSrc ? (
          <View>
            <VideoPlayer
              video={{uri: params.vocabList.videoSrc ?? ''}}
              videoWidth={dimension.width}
              videoHeight={350}
              autoplay={true}
              loop={false}
              paused={isPause}
            />
          </View>
        ) : null}

        <View
          style={{
            marginTop: params.vocabList.videoSrc ? unit30 : unit12,
          }}>
          {params.vocabList.videoSrc ? (
            <AppText
              fontType="semiBold"
              style={{
                marginLeft: unit24,
                marginBottom: unit20,
                fontSize: fontSize20,
              }}>
              Word List
            </AppText>
          ) : null}

          {params?.vocabList?.wordList?.map(word => {
            return (
              <VocabItem
                key={word.meaning}
                item={word}
                onPress={() => {
                  handleNavigateToVocabDetailsScreen({
                    _id: params?.vocabList?._id,
                    wordList: [word],
                    topicTitle: params?.vocabList?.topicTitle,
                    videoSrc: params?.vocabList?.videoSrc,
                  });
                }}
              />
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <PressView
          onPress={handleNavigateToVocabScreen}
          style={styles.buttonWrap}>
          <AppText fontType={'medium'} style={styles.buttonText}>
            Learn Now
          </AppText>
        </PressView>
      </View>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.light_grey,
    flex: 1,
  },
  content: {
    backgroundColor: AppColors.light_grey,
    borderTopLeftRadius: unit30,
    borderTopRightRadius: unit30,
    position: 'relative',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: unit20,
    bottom: 0,
    paddingTop: unit10,
    paddingBottom: unit20,
    backgroundColor: AppColors.light_grey,
  },
  buttonWrap: {
    backgroundColor: AppColors.purple_gradient_2,
    flex: 1,
    paddingVertical: unit15,
    borderRadius: unit12,
    shadowColor: AppColors.purple,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  buttonText: {
    textTransform: 'uppercase',
    fontSize: fontSize16,
    color: AppColors.white,
    textAlign: 'center',
  },
});

export default VocabListDetailScreen;
