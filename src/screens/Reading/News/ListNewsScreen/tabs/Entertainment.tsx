/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, View, StyleSheet} from 'react-native';

import ListNewsItem from '../components/ListNewsItem';
import {NewsModel} from '../../../../../model/NewsModel';
import {getListNews} from '../../../../../network/services/news.apis';
import {NavigationRef} from '../../../../../../App';
import useScreenState from '../../../../../hooks/useScreenState';
import {NewsCategory} from '../../../../../model/enum/NewsCategory';
import AppColors from '../../../../../styles/AppColors';
import {unit40} from '../../../../../utils/appUnit';

const EntertainmentTab: React.FC = () => {
  const [listNews, setListNews] = useState<NewsModel[]>([]);
  const {isLoading, setLoading, setError} = useScreenState();

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getListNews(
        `country=us&category=${NewsCategory.Entertainment}`,
      );
      if (res.data.status === 'ok') {
        setListNews(res.data.articles);
      }
      setError(undefined);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{
          backgroundColor: AppColors.white,
          paddingVertical: unit40,
        }}
        data={listNews}
        refreshing={isLoading}
        refreshControl={
          <RefreshControl onRefresh={fetchData} refreshing={isLoading} />
        }
        keyExtractor={(item, index) =>
          String(item.title + item.publishedAt + '_' + index + Math.random())
        }
        renderItem={({item}) => {
          return (
            <ListNewsItem
              onPress={() => {
                NavigationRef?.current?.navigate('NewsScreen', {
                  new: item,
                });
              }}
              content={item.description}
              imageUri={item.urlToImage}
              title={item.title}
            />
          );
        }}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
});

export default EntertainmentTab;
