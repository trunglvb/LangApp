/* eslint-disable react-native/no-inline-styles */
import {Reader, useReader} from '@epubjs-react-native/core';
import {useFileSystem} from '@epubjs-react-native/file-system';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import AppLoading from '../../../components/Loading/AppLoading';
import AppColors from '../../../styles/AppColors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {updateBookPosition} from '../../../network/services/book.apis';
import {unit20, unit16, unit30, unit60} from '../../../utils/appUnit';
import Settings from './Settings/Settings';
import {light} from './themes/Theme';
import {NavigationRef} from '../../../../App';
import AppText from '../../../components/AppText/AppText';

interface IProps {
  bookSrc: string;
  bookId: string;
  currentPosition?: number;
  totalPage?: number;
  title: string;
}

// for Bare React Native project
const BookScreen: React.FC<IProps> = ({bookSrc, bookId, title}) => {
  const {width, height} = useWindowDimensions();

  const [isVisible, setIsVisible] = useState(false);
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);

  const [theme, setTheme] = useState(light);
  const [fontSize, setFontSize] = useState(18);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [toc, setToc] = useState([]);
  const [counter, setCounter] = useState<number>(0);

  const handleCheckPageChange = () => {
    setCounter(prev => prev + 1);
  };

  const {
    changeFontSize,
    currentLocation,
    searchResults,
    search,
    goToLocation,
    changeFontFamily,
    changeTheme,
    totalLocations,
  } = useReader();

  const {goBack} = useNavigation();

  return (
    <SafeAreaProvider
      style={{
        position: 'relative',
        height: '100%',
      }}>
      <StatusBar
        hidden={false}
        barStyle={
          theme.body.background === '#121212' ? 'light-content' : 'dark-content'
        }
      />
      <View style={styles.viewContainer}>
        <SafeAreaView style={styles.wrap}>
          <Reader
            src={bookSrc}
            width={width}
            height={height}
            renderOpeningBookComponent={() => <></>}
            fileSystem={useFileSystem}
            onPress={() => {
              setIsShowMenu(!isShowMenu);
              setIsVisible(false);
            }}
            // initialLocation={location}
            renderLoadingFileComponent={() => (
              <View style={[styles.loadingContainer]}>
                <View style={styles.loadingPosition}>
                  <AppLoading />
                </View>
              </View>
            )}
            enableSwipe={true}
            onNavigationLoaded={tocx => {
              setToc(tocx.toc);
            }}
            onLocationChange={(
              _totalLocations,
              currentLocations: any,
              _progress,
            ) => {
              handleCheckPageChange();
              if (counter > 1) {
                updateBookPosition(
                  bookId,
                  currentLocations?.start.cfi!,
                  totalLocations,
                );
                // setLocation(currentLocations?.start.cfi!);
                setIsShowMenu(false);
                setIsVisible(false);
              }
            }}
          />
        </SafeAreaView>
      </View>
      {isShowMenu ? (
        <SafeAreaView style={styles.topMenu}>
          <View
            style={[
              styles.topMenuContent,
              {marginTop: Platform.OS === 'ios' ? 0 : unit30},
            ]}>
            <Icon
              style={{
                fontSize: unit16,
              }}
              name={'arrow-left'}
              onPress={() => {
                NavigationRef?.current?.goBack();
              }}
            />
            <AppText>{title}</AppText>
            <Icon
              style={{
                fontSize: unit16,
              }}
              name={'home'}
              onPress={() => {
                setIsVisible(!isVisible);
              }}
            />
          </View>
        </SafeAreaView>
      ) : null}
      <Settings
        BookId={'1'}
        toc={toc}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        search={search}
        goBack={goBack}
        searchResults={searchResults}
        changeTheme={changeTheme}
        setTheme={setTheme}
        theme={theme}
        currentLocation={currentLocation}
        goToLocation={goToLocation}
        changeFontSize={changeFontSize}
        changeFontFamily={changeFontFamily}
        fontFamily={fontFamily}
        fontSize={fontSize}
        setFontFamily={setFontFamily}
        setFontSize={setFontSize}
      />
      <AppText style={styles.consider}>
        {currentLocation?.end.percentage
          ? (currentLocation.end.percentage * 100).toString().slice(0, 4) + '%'
          : 'Consider pages'}
      </AppText>
    </SafeAreaProvider>
  );
};

export default BookScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 100,
  },
  wrap: {
    paddingTop:
      Platform.OS === 'android' ? StatusBar.currentHeight || 0 + unit20 : 0,
  },
  viewContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    // zIndex: 100,
  },
  options: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  currentFormat: {
    textAlign: 'center',
  },
  consider: {
    position: 'absolute',
    bottom: 12,
    right: 4,
    zIndex: 10,
    padding: 4,
    color: 'gray',
    fontSize: 16,
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  loadingPosition: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
  topMenu: {
    zIndex: 100,
  },
  topMenuContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
    height: 50,
    backgroundColor: AppColors.light_grey2,
  },
});
