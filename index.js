import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import EntryPoint from './EntryPoint';
import TrackPlayer from 'react-native-track-player';
import {playbackService} from './src/utils/trackPlayerService';

AppRegistry.registerComponent(appName, () => EntryPoint);
TrackPlayer.registerPlaybackService(() => playbackService);
