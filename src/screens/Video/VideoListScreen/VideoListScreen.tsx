import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppBar from '../../../components/AppBar/AppBar';
import AppText from '../../../components/AppText/AppText';
import ListLoading from '../../../components/Loading/ListLoading';
import AppColors from '../../../styles/AppColors';
import {sleep} from '../../../utils/Utils';
import {
  fontSize20,
  unit14,
  unit16,
  unit20,
  unit24,
  unit25,
} from '../../../utils/appUnit';
import HorizontalVidListView from './HorizontalVidListView';

const VideoListScreen: React.FC = () => {
  const [engVidList, setEngVidList] = useState([]);
  const [lucyList, setLucyList] = useState([]);
  const [englishClass101List, setEnglishClass101List] = useState([]);
  const [engVidLoading, setEngVidLoading] = useState(false);
  const [lucyLoading, setLucyLoading] = useState(false);
  const [engClass101Loading, setEngCLass101Loading] = useState(false);

  const fetchData = () => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=engVid&type=video&key=${Config.YOUTUBE_API_KEY}`,
    )
      .then(async res => {
        setEngVidLoading(true);
        await sleep(3000);
        return res.json();
      })
      .then(data => {
        setEngVidList(data.items);
      })
      .catch(e => console.log(e))
      .finally(() => setEngVidLoading(false));
  };
  const fetchDataLucy = async () => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=English%20With%20Lucy&type=video&key=${Config.YOUTUBE_API_KEY}`,
    )
      .then(async res => {
        setLucyLoading(true);
        await sleep(3000);
        return res.json();
      })
      .then(data => {
        setLucyList(data.items);
      })
      .catch(e => console.log(e))
      .finally(() => setLucyLoading(false));
  };
  const fetchData101 = () => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=EnglishClass101&type=video&key=${Config.YOUTUBE_API_KEY}`,
    )
      .then(async res => {
        setEngCLass101Loading(true);
        await sleep(3000);
        return res.json();
      })
      .then(data => {
        setEnglishClass101List(data.items);
      })
      .catch(e => console.log(e))
      .finally(() => setEngCLass101Loading(false));
  };

  useEffect(() => {
    Promise.all([fetchData(), fetchDataLucy(), fetchData101()]).finally(
      () => {},
    );
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
      <ScrollView
        overScrollMode={'never'}
        contentContainerStyle={[
          {
            backgroundColor: AppColors.light_grey,
            // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : unit30 + unit24,
            paddingBottom: unit24,
          },
        ]}
        showsVerticalScrollIndicator={false}>
        {/* <AppText fontType={'bold'} style={styles.listTitle}>
          Oxford
        </AppText>
        <HorizontalVidListView list={genFakeVids()} /> */}
        <AppText fontType={'bold'} style={styles.listTitle}>
          English With Lucy
        </AppText>
        {lucyLoading ? (
          <View
            style={{
              minHeight: 160,
            }}>
            <ListLoading />
          </View>
        ) : (
          <HorizontalVidListView list={lucyList} />
        )}
        <AppText fontType={'bold'} style={styles.listTitle}>
          engVid: Learn English
        </AppText>
        {engVidLoading ? (
          <View
            style={{
              minHeight: 160,
            }}>
            <ListLoading />
          </View>
        ) : (
          <HorizontalVidListView list={engVidList} />
        )}

        <AppText fontType={'bold'} style={styles.listTitle}>
          EnglishClass101.com
        </AppText>
        {engClass101Loading ? (
          <View
            style={{
              minHeight: 160,
            }}>
            <ListLoading />
          </View>
        ) : (
          <HorizontalVidListView list={englishClass101List} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default VideoListScreen;

const styles = StyleSheet.create({
  listTitle: {
    marginStart: unit20,
    fontSize: fontSize20,
    marginTop: unit25,
    marginBottom: unit14,
  },
});

// function genFakeVids() {
//   let Data: any[] = [];
//   for (let i = 1; i < 4; i++) {
//     Data.push({
//       id: i,
//       title: 'Video' + ' ' + i.toString(),
//       thumbnail: FAKE_BOOK_IMG,
//     });
//   }
//   return Data;
// }
