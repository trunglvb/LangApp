/* eslint-disable react-hooks/exhaustive-deps */
import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  View,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {NavigationRef, RootStackParamList} from '../../../../App';
import AppBar from '../../../components/AppBar/AppBar';
import AppText from '../../../components/AppText/AppText';
import AppLoading from '../../../components/Loading/AppLoading';
import PressView from '../../../components/PressView/PressView';
import useScreenState from '../../../hooks/useScreenState';
import {getBookDetail} from '../../../network/services/book.apis';
import AppColors from '../../../styles/AppColors';
import {
  fontSize14,
  fontSize18,
  fontSize20,
  unit10,
  unit12,
  unit14,
  unit16,
  unit20,
  unit24,
  unit8,
} from '../../../utils/appUnit';
import {FAKE_BOOK_IMG} from '../BookListScreen/BookListScreen';

type ScreenProps = RouteProp<RootStackParamList, 'BookDetailScreen'>;

const BookDetailScreen: React.FC = () => {
  const {width, height} = useWindowDimensions();
  const {params} = useRoute<ScreenProps>();
  const [bookDetail, setBookDetail] = useState<any>();
  const {isLoading, setLoading} = useScreenState();

  const fetchBookDetailData = async () => {
    try {
      setLoading(true);
      const res = await getBookDetail(params?.bookId);
      setBookDetail(res.data.data.book);
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookDetailData();
  }, []);

  if (isLoading) {
    return <AppLoading />;
  }

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
        title={''}
      />
      <ScrollView
        overScrollMode={'never'}
        contentContainerStyle={[
          {
            backgroundColor: AppColors.light_grey,
            // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : unit30 + unit24,
            paddingBottom: unit24,
            paddingHorizontal: unit20,
          },
        ]}
        showsVerticalScrollIndicator={false}>
        {/* General Information */}
        <View style={styles.imageContainer}>
          <Image
            style={{
              width: 0.3 * width,
              height: 0.2 * height,
              borderRadius: unit12,
            }}
            source={{
              uri: bookDetail?.image ?? FAKE_BOOK_IMG,
            }}
          />
          <View style={styles.content}>
            <AppText
              fontType="bold"
              style={{
                fontSize: fontSize20,
                color: AppColors.black,
              }}>
              {bookDetail?.title}
            </AppText>
            <AppText
              style={{
                fontSize: fontSize14,
                color: AppColors.textGray,
                marginTop: unit8,
              }}>
              Author: {bookDetail?.author ?? ''}
            </AppText>
            <AppText
              style={{
                fontSize: fontSize14,
                color: AppColors.textGray,
                marginTop: unit8,
              }}>
              Category: {bookDetail?.category ?? ''}
            </AppText>
            <View>
              <PressView
                onPress={() => {
                  NavigationRef.current?.navigate('BookScreen', {
                    book: bookDetail,
                  });
                }}
                style={{
                  marginTop: unit14,
                }}>
                <View style={styles.buttonWrap}>
                  <AppText style={styles.buttonContent}>Read Now</AppText>
                </View>
              </PressView>
            </View>
          </View>
        </View>

        {/* Description */}

        <View
          style={{
            marginTop: unit20,
          }}>
          <AppText
            fontType="bold"
            style={{
              fontSize: fontSize18,
              color: AppColors.black,
            }}>
            Description
          </AppText>
          <AppText
            style={{
              fontSize: fontSize14,
              color: AppColors.textGray,
              marginTop: unit10,
            }}>
            {bookDetail?.description}
          </AppText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.light_grey,
    flex: 1,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  content: {
    flex: 1,
    marginLeft: unit16,
  },
  buttonContainer: {display: 'flex', flexDirection: 'row'},
  buttonWrap: {
    width: '100%',
    padding: 15,
    paddingVertical: unit10,
    borderRadius: unit10,
    backgroundColor: AppColors.purple,
  },
  buttonDownloadWrap: {
    width: '100%',
    padding: 15,
    paddingVertical: unit10,
    borderRadius: unit10,
    backgroundColor: AppColors.white,
  },
  buttonContent: {
    color: AppColors.white,
    fontSize: unit14,
    textAlign: 'center',
  },
  buttonContentDownload: {
    color: AppColors.purple,
    fontSize: unit14,
    textAlign: 'center',
  },
});
export default BookDetailScreen;
