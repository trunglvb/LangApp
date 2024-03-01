/* eslint-disable react-hooks/exhaustive-deps */
import {useFocusEffect} from '@react-navigation/native';
import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationRef} from '../../../../App';
import AppBar from '../../../components/AppBar/AppBar';
import AppText from '../../../components/AppText/AppText';
import AppLoading from '../../../components/Loading/AppLoading';
import PressView from '../../../components/PressView/PressView';
import useScreenState from '../../../hooks/useScreenState';
import {getAllBooks} from '../../../network/services/book.apis';
import AppColors from '../../../styles/AppColors';
import {
  fontSize18,
  unit15,
  unit16,
  unit20,
  unit24,
  unit25,
} from '../../../utils/appUnit';
import HorizontalBookListView from './HorizontalBookListView';
import useAuth from '../../../hooks/useAuth';
import {getUserDetails} from '../../../network/services/auth.apis';

const BookListScreen: React.FC = () => {
  const {authData} = useAuth();
  const {isLoading, setLoading} = useScreenState();
  const [bookList, setBookList] = useState([]);
  const [myBookList, setMyBookList] = useState([]);

  const fetchAllBooksData = async () => {
    try {
      setLoading(true);
      const res = await getAllBooks();
      setBookList(res.data.data.books?.filter((item: any) => !item?.userId));
    } catch (error: any) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchAllBooksData().finally(() => {});
      getUserDetails(authData?.user?._id as string).then(res => {
        setMyBookList(res?.data.books);
      });
    }, []),
  );

  const navigateToUploadScreen = () =>
    NavigationRef.current?.navigate('UploadBookScreen');

  if (isLoading) {
    return <AppLoading />;
  }

  const renderRightAppBarButton: () => React.ReactNode = () => {
    return (
      <PressView
        onPress={navigateToUploadScreen}
        style={{
          marginRight: unit20,
          marginLeft: unit15,
          // width: '100%',
        }}>
        <MaterialCommunityIcons name="book-plus" style={styles.bookIcons} />
      </PressView>
    );
  };

  return (
    <SafeAreaView style={styles.appbarContainer}>
      <AppBar
        leftIcon={
          <Icon
            style={{
              fontSize: unit16,
            }}
            name={'arrow-left'}
          />
        }
        title={'Books'}
        rightIcon={renderRightAppBarButton()}
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
        <AppText fontType={'bold'} style={styles.listTitle}>
          Popular
        </AppText>
        <HorizontalBookListView list={bookList} />
        <AppText fontType={'bold'} style={styles.listTitle}>
          Fantasy
        </AppText>
        <HorizontalBookListView list={bookList} />
        <AppText fontType={'bold'} style={styles.listTitle}>
          My Books
        </AppText>
        <HorizontalBookListView list={myBookList} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookListScreen;

const styles = StyleSheet.create({
  listTitle: {
    marginStart: unit20,
    fontSize: fontSize18,
    marginTop: unit16,
    marginBottom: unit16,
  },
  bookIcons: {
    fontSize: unit25,
    alignSelf: 'center',
  },
  appbarContainer: {
    backgroundColor: AppColors.light_grey,
    flex: 1,
  },
});

export const FAKE_BOOK_IMG =
  'data:image/jpeg;base64,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';
