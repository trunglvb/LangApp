import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {Alert, SafeAreaView, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import YoutubePlayer from 'react-native-youtube-iframe';
import {RootStackParamList} from '../../../../App';
import AppBar from '../../../components/AppBar/AppBar';
import AppText from '../../../components/AppText/AppText';
import AppColors from '../../../styles/AppColors';
import {unit16} from '../../../utils/appUnit';

// GET https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=engVid&key=AIzaSyCRR7tnHHdAoqta-Oe-sZmN-nIvEV-XpBA HTTP/1.1

// Authorization: Bearer [YOUR_ACCESS_TOKEN]
// Accept: application/json

type ScreenProps = RouteProp<RootStackParamList, 'VideoDetailScreen'>;

const VideoDetailScreen: React.FunctionComponent = () => {
  const [playing, setPlaying] = useState(false);
  const {params} = useRoute<ScreenProps>();

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
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
        title={'Videos'}
      />
      <YoutubePlayer
        height={250}
        play={playing}
        videoId={params.videoId ?? 'iee2TATGMyI'}
        onChangeState={onStateChange}
      />
      <View
        style={{
          width: '100%',
          paddingHorizontal: 16,
        }}>
        <AppText
          fontType="bold"
          style={{
            fontSize: 20,
          }}>
          {params.videoTitle}
        </AppText>
        <AppText
          style={{
            fontSize: 16,
            lineHeight: 20,
            marginTop: 14,
          }}>
          {params.videoDescription}
        </AppText>
      </View>
      {/* <Button title={playing ? 'pause' : 'play'} onPress={togglePlaying} /> */}
    </SafeAreaView>
  );
};

export default VideoDetailScreen;
