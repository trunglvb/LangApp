/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View, Modal} from 'react-native';
import AppBar from '../../../components/AppBar/AppBar';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppColors from '../../../styles/AppColors';
import TopicItem from './TopicItem';
import {
  unit10,
  unit12,
  unit14,
  dimension,
  unit16,
  unit8,
  unit22,
  unit20,
  unit25,
} from '../../../utils/appUnit';
import CardItem from './CardItem';
import {
  getSentenceList,
  getSentenceTotal,
} from '../../../network/services/sentence';
import AppLoading from '../../../components/Loading/AppLoading';
import LinearButton from '../../../components/LinearButton/LinearButton';
import Pagination from '../../../components/Pagination';
import {TOPICS} from '../../../utils/Utils';

const CommunicationScreen = () => {
  const perPage = 50;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowPopup, setIsShowPopup] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(13);
  const [topics, setTopics] = useState<string[]>([]);
  const [topicsRetrieve, setTopicsRetrieve] = useState<string[]>([]);
  const [sentenceList, setSentenceList] = useState<any>([]);
  const [isRetrieve, setIsRetrieve] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getSentenceList(
      page,
      perPage,
      topicsRetrieve?.length > 0 ? JSON.stringify(topicsRetrieve) : [],
    ).then(res => {
      const sentenceData = res.data?.data.sentenceList;
      setSentenceList(sentenceData);
      setIsLoading(false);
    });
  }, [page, isRetrieve]);

  useEffect(() => {
    getSentenceTotal(
      topicsRetrieve?.length > 0 ? JSON.stringify(topicsRetrieve) : [],
    ).then(res => {
      const total = res?.data?.data?.total;
      setTotalPage(Math.ceil(total / perPage));
    });
  }, [isRetrieve]);

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
        titleType="center"
        titleStyle={{
          fontSize: unit16,
        }}
        title={'1000+ Normal Communication'}
        containerStyle={{
          backgroundColor: AppColors.light_grey,
        }}
      />

      {isLoading ? (
        <AppLoading />
      ) : (
        <>
          <View
            style={{
              paddingLeft: unit10,
              paddingRight: unit10,
            }}>
            <LinearButton
              buttonTitle={'Choose Topics'}
              linearStyle={[styles.button]}
              titleStyle={[
                styles.buttonText,
                {
                  color: AppColors.white,
                },
              ]}
              linearColors={[
                AppColors.purple_gradient_1,
                AppColors.purple_gradient_2,
              ]}
              onPress={() => setIsShowPopup(true)}
            />
          </View>

          <ScrollView
            style={{
              flex: 1,
              backgroundColor: AppColors.light_grey,
              paddingLeft: unit10,
              paddingRight: unit10,
              paddingTop: unit20,
            }}>
            {sentenceList?.map((item: any) => (
              <CardItem key={item?._id} item={item} />
            ))}
          </ScrollView>
        </>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={isShowPopup}
        onRequestClose={() => {
          setIsShowPopup(!isShowPopup);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {TOPICS.map(item => (
                <TopicItem
                  key={item?.title}
                  item={item}
                  topics={topics}
                  setTopics={setTopics}
                />
              ))}
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: dimension.width - unit22,
              }}>
              <LinearButton
                buttonTitle={'Cancel'}
                linearStyle={{
                  paddingVertical: unit12,
                  borderRadius: unit8,
                  marginBottom: unit8,
                  width: (dimension.width - unit22 - unit22 - unit8) / 2,
                  borderWidth: 1,
                  borderColor: AppColors.light_grey2,
                }}
                titleStyle={[
                  styles.buttonText,
                  {
                    color: AppColors.black,
                    marginRight: unit8,
                  },
                ]}
                linearColors={[AppColors.white, AppColors.white]}
                onPress={() => {
                  setIsShowPopup(false);
                }}
              />
              <LinearButton
                buttonTitle={'OK'}
                linearStyle={{
                  paddingVertical: unit12,
                  borderRadius: unit8,
                  marginBottom: unit8,
                  width: (dimension.width - unit22 - unit22 - unit8) / 2,
                  marginLeft: unit8,
                }}
                titleStyle={[
                  styles.buttonText,
                  {
                    color: AppColors.white,
                  },
                ]}
                linearColors={[
                  AppColors.purple_gradient_1,
                  AppColors.purple_gradient_2,
                ]}
                onPress={() => {
                  setPage(1);
                  setTopicsRetrieve(topics);
                  setIsRetrieve(!isRetrieve);
                  setIsShowPopup(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Pagination page={page} pageSize={totalPage} setPage={setPage} />
    </SafeAreaView>
  );
};
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.light_grey,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: unit16,
  },
  button: {
    paddingVertical: unit12,
    borderRadius: unit8,
    marginBottom: unit8,
    width: '100%',
  },
  buttonText: {
    fontSize: unit14,
    fontWeight: '600',
  },
  modalView: {
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: unit16,
    padding: unit12,
    width: dimension.width - unit10 - unit10,
    height: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
});
export default CommunicationScreen;
