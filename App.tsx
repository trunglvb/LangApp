import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import VerifyOTPScreen from './src/screens/Auth/VerifyOTPScreen/VerifyOTPScreen';
import {LogBox, StatusBar} from 'react-native';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import useAuth from './src/hooks/useAuth';
import {BookModel} from './src/model/BookModel';
import {NewsModel} from './src/model/NewsModel';
import {PodcastModel} from './src/model/PodcastModel';
import {VocabListModel} from './src/model/VocabListModel';
import {IGameModel} from './src/model/Game';
import {PodcastLevel} from './src/model/enum/PodcastLevel';
import {addOnUnAuthorizeListener, setAccessToken} from './src/network/client';
import FirstPageScreen from './src/screens/Auth/FirstPageScreen/FirstPageScreen';
import LoginScreen from './src/screens/Auth/LoginScreen/LoginScreen';
import RegisterScreen from './src/screens/Auth/RegisterScreen/RegisterScreen';
import BookDetailScreen from './src/screens/Books/BookDetailScreen/BookDetailScreen';
import BookListScreen from './src/screens/Books/BookListScreen/BookListScreen';
import BookScreenWrapper from './src/screens/Books/BookScreen/BookScreenWrapper';
import UploadBookScreen from './src/screens/Books/UploadBookScreen/UploadBookScreen';
import HomeScreen from './src/screens/Home/HomeScreen';
import ListenScreen from './src/screens/Listening/ListenScreen/ListenScreen';
import TopicScreen from './src/screens/Listening/TopicScreen/TopicScreen';
import TopicsListScreen from './src/screens/Listening/TopicsListScreen/TopicsListScreen';
import GeneralReadingScreen from './src/screens/Reading/GeneralReadingScreen';
import ListNewsScreen from './src/screens/Reading/News/ListNewsScreen';
import NewsScreen from './src/screens/Reading/News/NewsScreen/NewsScreen';
import AudioDetailScreen, {
  SentenceWithDuration,
} from './src/screens/Speaking/AudioDetailScreen';
import RecentAudioScreen from './src/screens/Speaking/RecentAudioScreen';
import SpeakingScreen from './src/screens/Speaking/SpeakingScreen';
import TestSpeakingScreen from './src/screens/Speaking/TestSpeakingScreen';
import VideoDetailScreen from './src/screens/Video/VideoDetailScreen/VideoDetailScreen';
import VideoListScreen from './src/screens/Video/VideoListScreen/VideoListScreen';
import VideoScreen from './src/screens/Video/VideoScreen/VideoScreen';
import VerifyEmailScreen from './src/screens/Auth/VerifyEmailScreen/VerifyEmailScreen';
import GeneralVocabScreen from './src/screens/Vocab/GeneralVocabScreen/GeneralVocabScreen';
import VocabListDetailScreen from './src/screens/Vocab/VocabListDetailScreen/VocabListDetailScreen';
import VocabDetailsItemScreen from './src/screens/Vocab/VocabListDetailScreen/VocabDetailsItemScreen';
import VocabScreen from './src/screens/Vocab/VocabScreen/VocabScreen';
import AppColors from './src/styles/AppColors';
import ForgotPasswordScreen from './src/screens/Auth/ForgotPasswordScreen/ForgotPasswordScreen';
import ResetPasswordScreen from './src/screens/Auth/ResetPasswordScreen/ResetPasswordScreen';
import DictionaryScreen from './src/screens/Dictionary';
import ViEngDictionaryScreen from './src/screens/Dictionary/ViEnDictionaryScreen';
import EnEnDictionaryScreen from './src/screens/Dictionary/EnEnDictionaryScreen';
import TextTranslationScreen from './src/screens/Dictionary/TextTranslationScreen';
import DocumentScreen from './src/screens/Documents';
import IPAScreen from './src/screens/Documents/IPA';
import CommunicationScreen from './src/screens/Documents/Communication';
import GrammarScreen from './src/screens/Documents/Grammar';
import VerbScreen from './src/screens/Documents/Verbs';
import CorrectWordScreen from './src/screens/Game/CorrectWord';
import WordMatchScreen from './src/screens/Game/WordMatch';
import GameScreen from './src/screens/Game';
import PlayCorrectWordScreen from './src/screens/Game/CorrectWord/PlayCorrectWordScreen';
import PlayWordMatchScreen from './src/screens/Game/WordMatch/PlayWordMatchScreen';

export type RootStackParamList = {
  //Un-Auth
  SplashScreen: undefined;
  FirstPageScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  VerifyEmailScreen: {
    userId: string;
  };
  ForgotPasswordScreen: {
    email?: string;
  };
  //Auth
  HomeScreen: undefined;
  NotImplementedScreen: undefined;
  ResetPasswordScreen: {
    email: string;
  };
  VerifyOTPScreen: {
    email: string;
  };
  GeneralVocabScreen: undefined;
  VocabListDetailScreen: {
    vocabList: VocabListModel;
  };
  VocabDetailsItemScreen: {
    vocabList: VocabListModel;
  };
  VocabScreen: {
    vocabList: VocabListModel;
  };
  TopicsListScreen: undefined;
  TopicScreen: {
    topic: {
      id: number;
      title: string;
      level: PodcastLevel;
      imageUri: string;
      desc: string;
    };
  };
  ListenScreen: {
    topicId?: string;
    lesson: PodcastModel;
  };
  GeneralReadingScreen: undefined;
  ListNewsScreen: undefined;
  NewsScreen: {
    new: NewsModel;
  };

  //Books
  BookListScreen: undefined;
  BookDetailScreen: {
    bookId: string;
  };
  BookScreen: {
    book: BookModel;
  };
  UploadBookScreen: undefined;

  //Speaking
  RecentAudioScreen: undefined;
  AudioDetailScreen: {
    audio: PodcastModel;
  };
  SpeakingScreen: {
    transcriptData: SentenceWithDuration[];
    audio: string;
  };
  TestSpeakingScreen: {
    audio: PodcastModel;
  };

  //Videos
  VideoListScreen: undefined;
  VideoDetailScreen: {
    videoId: string | undefined;
    videoTitle: string | undefined;
    videoDescription: string | undefined;
  };
  VideoScreen: undefined;

  //Dictionary
  DictionaryScreen: undefined;
  ViEngDictionaryScreen: undefined;
  EnEnDictionaryScreen: undefined;
  TextTranslationScreen: undefined;

  //Document
  DocumentScreen: undefined;
  IPAScreen: undefined;
  CommunicationScreen: undefined;
  GrammarScreen: undefined;
  VerbScreen: undefined;

  //Game
  GameScreen: undefined;
  CorrectWordScreen: undefined;
  PlayCorrectWordScreen: IGameModel;
  WordMatchScreen: undefined;
  PlayWordMatchScreen: IGameModel;
};

export const RootStack = createNativeStackNavigator<RootStackParamList>();
export const NavigationRef =
  React.createRef<NavigationContainerRef<RootStackParamList>>();

const App = () => {
  const {authData, signOut} = useAuth();
  const user = authData.user;

  useEffect(() => {
    addOnUnAuthorizeListener(() => {
      signOut();
    });
  }, []);

  useEffect(() => {
    setAccessToken(authData.token);
  }, [authData]);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor={AppColors.transparent}
      />
      <NavigationContainer ref={NavigationRef}>
        <RootStack.Navigator screenOptions={{headerShown: false}}>
          {user ? (
            <>
              <RootStack.Screen name={'HomeScreen'} component={HomeScreen} />
              <RootStack.Screen
                name={'GeneralVocabScreen'}
                component={GeneralVocabScreen}
              />
              <RootStack.Screen
                name={'VocabListDetailScreen'}
                component={VocabListDetailScreen}
              />
              <RootStack.Screen
                name={'VocabDetailsItemScreen'}
                component={VocabDetailsItemScreen}
              />
              <RootStack.Screen name={'VocabScreen'} component={VocabScreen} />
              <RootStack.Screen
                name={'TopicsListScreen'}
                component={TopicsListScreen}
              />
              <RootStack.Screen name={'TopicScreen'} component={TopicScreen} />
              <RootStack.Screen
                name={'ListenScreen'}
                component={ListenScreen}
              />
              <RootStack.Screen
                name={'GeneralReadingScreen'}
                component={GeneralReadingScreen}
              />
              <RootStack.Screen
                name={'ListNewsScreen'}
                component={ListNewsScreen}
              />
              <RootStack.Screen name={'NewsScreen'} component={NewsScreen} />
              <RootStack.Screen
                name={'BookListScreen'}
                component={BookListScreen}
              />
              <RootStack.Screen
                name={'BookDetailScreen'}
                component={BookDetailScreen}
              />
              <RootStack.Screen
                name={'BookScreen'}
                component={BookScreenWrapper}
              />
              <RootStack.Screen
                name={'UploadBookScreen'}
                component={UploadBookScreen}
              />
              <RootStack.Screen
                name={'RecentAudioScreen'}
                component={RecentAudioScreen}
              />
              <RootStack.Screen
                name={'AudioDetailScreen'}
                component={AudioDetailScreen}
              />
              <RootStack.Screen
                name={'SpeakingScreen'}
                component={SpeakingScreen}
                // component={TestScreen}
              />
              <RootStack.Screen
                name={'TestSpeakingScreen'}
                component={TestSpeakingScreen}
                // component={TestScreen}
              />
              <RootStack.Screen
                name={'VideoListScreen'}
                component={VideoListScreen}
              />
              <RootStack.Screen
                name={'VideoDetailScreen'}
                component={VideoDetailScreen}
              />
              <RootStack.Screen name={'VideoScreen'} component={VideoScreen} />
              <RootStack.Screen
                name={'DictionaryScreen'}
                component={DictionaryScreen}
              />
              <RootStack.Screen
                name={'ViEngDictionaryScreen'}
                component={ViEngDictionaryScreen}
              />
              <RootStack.Screen
                name={'EnEnDictionaryScreen'}
                component={EnEnDictionaryScreen}
              />
              <RootStack.Screen
                name={'TextTranslationScreen'}
                component={TextTranslationScreen}
              />
              <RootStack.Screen
                name={'DocumentScreen'}
                component={DocumentScreen}
              />
              <RootStack.Screen name={'IPAScreen'} component={IPAScreen} />
              <RootStack.Screen
                name={'CommunicationScreen'}
                component={CommunicationScreen}
              />
              <RootStack.Screen
                name={'GrammarScreen'}
                component={GrammarScreen}
              />
              <RootStack.Screen name={'VerbScreen'} component={VerbScreen} />
              <RootStack.Screen name={'GameScreen'} component={GameScreen} />
              <RootStack.Screen
                name={'CorrectWordScreen'}
                component={CorrectWordScreen}
              />
              <RootStack.Screen
                name={'PlayCorrectWordScreen'}
                component={PlayCorrectWordScreen}
              />
              <RootStack.Screen
                name={'WordMatchScreen'}
                component={WordMatchScreen}
              />
              <RootStack.Screen
                name={'PlayWordMatchScreen'}
                component={PlayWordMatchScreen}
              />
            </>
          ) : (
            <>
              <RootStack.Screen
                name={'FirstPageScreen'}
                component={FirstPageScreen}
              />
              <RootStack.Screen name={'LoginScreen'} component={LoginScreen} />

              <RootStack.Screen
                name={'RegisterScreen'}
                component={RegisterScreen}
              />
              <RootStack.Screen
                name={'VerifyEmailScreen'}
                component={VerifyEmailScreen}
              />
              <RootStack.Screen
                name={'ResetPasswordScreen'}
                component={ResetPasswordScreen}
              />
              <RootStack.Screen
                name={'VerifyOTPScreen'}
                component={VerifyOTPScreen}
              />
              <RootStack.Screen
                name={'ForgotPasswordScreen'}
                component={ForgotPasswordScreen}
              />
            </>
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;

LogBox.ignoreAllLogs();
