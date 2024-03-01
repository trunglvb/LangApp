/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useMemo, useState} from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppBar from '../../../components/AppBar/AppBar';
import AppText from '../../../components/AppText/AppText';
import ErrorView from '../../../components/ErrorView/ErrorView';
import AppLoading from '../../../components/Loading/AppLoading';
import useScreenState from '../../../hooks/useScreenState';
import {getAllVocabLists} from '../../../network/services/vocab.apis';
import AppColors from '../../../styles/AppColors';
import ApiHelper from '../../../utils/ApiHelper';
import {showToastError} from '../../../utils/Toaster';
import {sleep} from '../../../utils/Utils';
import useAuth from '../../../hooks/useAuth';
import {VOCAB_IMAGE} from '../../../assets/path';
import {
  fontSize16,
  unit16,
  unit20,
  unit24,
  unit25,
} from '../../../utils/appUnit';
import HorizontalListView from './HorizontalListView';
import {useAppDispatch} from '../../../store/store';
import {setIsPause} from '../../../store/slice/videoPlaySlice';
import {getUserDetails} from '../../../network/services/auth.apis';
import {setVocabsUser} from '../../../store/slice/authSlice';
import {useIsFocused} from '@react-navigation/native';

const GeneralVocabScreen: React.FC = () => {
  const [listData, setListData] = useState<any[]>([]);
  const isFocus = useIsFocused();
  const {error, setError, isLoading, setLoading} = useScreenState();
  const [myVocabs, setMyVocabs] = useState([]);
  const dispatch = useAppDispatch();
  const {authData} = useAuth();

  const toeicData = React.useMemo(() => {
    return listData?.filter(item => item?.topicTitle?.includes('TOEIC'));
  }, [listData]);
  const ieltsData = React.useMemo(() => {
    return listData?.filter(item => item?.topicTitle?.includes('IELTS'));
  }, [listData]);

  const myVocabData = useMemo(() => {
    return [
      {
        topicTitle: 'MY VOCABBULARY',
        wordList: myVocabs,
      },
    ];
  }, [myVocabs]);

  async function fetchAllVocabLists() {
    try {
      setLoading(true);
      const res = await getAllVocabLists();
      await sleep(1000);
      if (ApiHelper.isSuccess(res)) {
        setListData(res.data.data);
      }
      setError(undefined);
    } catch (e) {
      setError(e);
      showToastError(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllVocabLists().finally(() => {});
    dispatch(setIsPause(false));
    getUserDetails(authData?.user?._id as string).then(res => {
      setMyVocabs(res?.data.vocabs);
      dispatch(setVocabsUser(res?.data.vocabs));
    });
  }, [isFocus]);

  if (isLoading) {
    return <AppLoading />;
  }

  if (error) {
    return <ErrorView />;
  }

  const renderRightAppBarButton: () => React.ReactNode = () => {
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppBar
        leftIcon={
          <Icon
            style={{
              fontSize: unit16,
            }}
            name={'arrow-left'}
          />
        }
        title={'Vocabulary'}
        containerStyle={{
          borderBottomWidth: 1,
          borderBottomColor: AppColors.light_grey2,
          backgroundColor: AppColors.light_grey,
        }}
        rightIcon={renderRightAppBarButton()}
      />
      <ScrollView
        overScrollMode={'never'}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={fetchAllVocabLists}
          />
        }
        contentContainerStyle={[
          {
            backgroundColor: AppColors.light_grey,
            paddingBottom: unit24,
          },
        ]}
        showsVerticalScrollIndicator={false}>
        <AppText fontType={'bold'} style={styles.listTitle}>
          TOEIC Vocabulary
        </AppText>
        <HorizontalListView list={toeicData} />

        <AppText fontType={'bold'} style={styles.listTitle}>
          IELTS Vocabulary
        </AppText>
        <HorizontalListView list={ieltsData} />

        <AppText fontType={'bold'} style={styles.listTitle}>
          My Vocabulary
        </AppText>
        <HorizontalListView list={myVocabData} sourceImage={VOCAB_IMAGE} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default GeneralVocabScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.light_grey,
    flex: 1,
  },
  listTitle: {
    marginStart: unit20,
    fontSize: fontSize16,
    marginTop: unit25,
    marginBottom: unit16,
  },
});
