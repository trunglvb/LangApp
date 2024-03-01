/* eslint-disable react-native/no-inline-styles */
import React, {Fragment, useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import AppBar from '../../components/AppBar/AppBar';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppText from '../../components/AppText/AppText';
import {
  dimension,
  unit10,
  unit14,
  unit16,
  unit18,
  unit2,
  unit25,
  unit4,
  unit8,
} from '../../utils/appUnit';
import AppColors from '../../styles/AppColors';
import DefaultTextInput from '../../components/DefaultTextInput';
import {IC_REDUCE, IC_RIGHT, IC_SEARCH} from '../../assets/path';
import {useDebounce} from '../../hooks/useDebounce';
import {
  getListWords,
  getWordsDetails,
} from '../../network/services/dictionaryvien.apis';
import {IDataWordDetails, IWordDetails} from '../../model/DitionaryViEnModel';
import AppLoading from '../../components/Loading/AppLoading';
import {APP_PADDING} from '../../styles/AppStyles';

const width = dimension.width;
const ViEngDictionaryScreen = () => {
  const [isShowPopup, setIsShowPopup] = useState<boolean>(false);
  const [wordValue, setWordValue] = useState<string>('');
  const [wordDetails, setWordDetails] = useState<IWordDetails>();
  const [wordList, setWordList] = useState<IWordDetails[]>([]);
  const [isDropdownLoading, setIsDropdownLoading] = useState<boolean>(false);
  const wordQuery = useDebounce(wordValue, 1000);

  useEffect(() => {
    const searchCharacter = async () => {
      try {
        setIsDropdownLoading(true);
        const response = await getListWords(wordQuery);
        setWordList(response?.data?.data?.word);
        setIsDropdownLoading(false);
      } catch (error) {
        throw error;
      }
    };
    if (wordQuery) {
      searchCharacter();
    }
  }, [wordQuery]);

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
        title={'Vi-En Dictionary'}
        titleStyle={{
          fontSize: unit16,
        }}
        containerStyle={{
          backgroundColor: AppColors.light_grey,
        }}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: AppColors.light_grey,
          paddingLeft: unit10,
          paddingRight: unit10,
        }}>
        <View style={styles.inputWrap}>
          <DefaultTextInput
            style={{
              width: width - APP_PADDING * 2 - unit25 * 2 - unit18 - unit10,
            }}
            autoCapitalize={'none'}
            placeholder={'Find here'}
            value={wordValue}
            onChangeText={value => {
              if (value === '') {
                setIsShowPopup(false);
                setWordValue('');
                setWordList([]);
              } else {
                setIsShowPopup(true);
                setWordValue(value);
              }
            }}
            onFocus={() => {
              setIsShowPopup(true);
            }}
          />
          {isShowPopup ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              overScrollMode={'never'}
              nestedScrollEnabled
              style={{
                position: 'absolute',
                zIndex: 100,
                top: 65,
                maxHeight: 500,
                width: '100%',
                paddingLeft: unit10,
                paddingRight: unit10,
                backgroundColor: AppColors.white,
                borderRadius: 5,
                borderWidth: isShowPopup ? 1 : 0,
                borderColor: AppColors.light_grey,
              }}>
              {!isDropdownLoading ? (
                <View>
                  {wordList?.map(item => (
                    <TouchableOpacity
                      style={styles.itemWrap}
                      key={item?.word + Math.floor(Math.random() * 100)}
                      onPress={() => {
                        setWordValue(item?.word?.replace(/@/g, '') ?? '');
                        setIsShowPopup(false);
                        getWordsDetails(item?.word ?? '').then((res: any) => {
                          setWordDetails(res?.data?.data?.word[0]);
                        });
                      }}>
                      <Image
                        style={{
                          width: unit14,
                          aspectRatio: 1,
                          marginRight: unit4,
                          tintColor: AppColors.black,
                          marginTop: 2,
                        }}
                        source={IC_SEARCH}
                      />
                      <View style={styles.itemContent}>
                        <AppText style={styles.itemTitle}>
                          {item?.word?.replace(/@/g, '') ?? ''}
                        </AppText>
                        <AppText style={styles.mb4}>
                          {item?.spell ?? ''}
                        </AppText>
                        <AppText style={styles.mb4}>
                          {item?.data[0]?.meanings[0]?.definition ?? ''}
                        </AppText>
                      </View>
                      <Image
                        style={{
                          width: unit25,
                          aspectRatio: 1,
                          marginTop: 10,
                          borderRadius: unit16,
                          margin: 'auto',
                          tintColor: AppColors.black,
                        }}
                        source={IC_RIGHT}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <AppLoading />
              )}
            </ScrollView>
          ) : null}
        </View>
        {wordDetails ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            overScrollMode={'never'}
            style={{
              flex: 1,
              marginTop: unit10,
            }}>
            <View style={styles.wordWrap}>
              <AppText style={styles.wordTitle}>
                {wordDetails?.word?.substring(1) ?? ''}
              </AppText>
              <AppText style={styles.wordSpell}>
                {wordDetails?.spell ? `[${wordDetails?.spell}]` : ''}
              </AppText>
            </View>
            {wordDetails?.data?.map((item: IDataWordDetails) => (
              <View
                key={item.partOfSpeech + Math.floor(Math.random() * 100)}
                style={{marginBottom: unit8}}>
                <AppText style={styles.wordTitle}>{item.partOfSpeech}</AppText>
                {item?.meanings?.map(meaning => (
                  <Fragment
                    key={meaning.definition + Math.floor(Math.random() * 100)}>
                    <View style={styles.meaningWrap}>
                      <Image
                        style={{
                          width: unit14,
                          aspectRatio: 1,
                          borderRadius: unit14,
                          tintColor: AppColors.purple,
                          marginTop: unit2,
                          marginRight: unit2,
                        }}
                        source={IC_REDUCE}
                      />
                      <AppText style={styles.meaningTitle}>
                        {meaning.definition}
                      </AppText>
                    </View>
                    {meaning.details.map(detail => (
                      <View
                        key={detail?.detail + Math.floor(Math.random() * 100)}
                        style={styles.detailsWrap}>
                        <AppText
                          style={{
                            fontSize: unit14,
                            color: AppColors.blue_gradient_1,
                            textDecorationLine: 'underline',
                          }}>
                          {detail?.detail
                            ? `${detail?.detail?.split('+')[0]}`
                            : ''}
                        </AppText>
                        <AppText style={{fontSize: unit14}}>
                          {detail?.detail?.split('+')[1].trim() ?? ''}
                        </AppText>
                      </View>
                    ))}
                  </Fragment>
                ))}
              </View>
            ))}
          </ScrollView>
        ) : (
          ''
        )}
      </View>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.light_grey,
  },
  inputWrap: {
    position: 'relative',
    zIndex: 100,
  },
  itemWrap: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: AppColors.grey,
    marginTop: 5,
  },
  itemContent: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  itemTitle: {
    fontSize: unit16,
    fontWeight: 'bold',
    marginBottom: 2,
    color: AppColors.black,
  },
  mb4: {
    marginBottom: 4,
    color: AppColors.black,
  },
  wordWrap: {
    display: 'flex',
    flexDirection: 'row',
    gap: unit10,
    alignItems: 'center',
    marginBottom: unit8,
  },
  wordTitle: {
    fontSize: unit14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  wordSpell: {
    fontSize: unit14,
    marginLeft: unit8,
  },
  meaningWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: unit8,
  },
  meaningTitle: {
    flexWrap: 'wrap',
    fontSize: unit14,
    color: AppColors.purple,
  },
  detailsWrap: {
    marginLeft: unit16,
    marginBottom: unit2,
  },
  volumnIcon: {
    fontSize: unit25,
    color: AppColors.white,
    position: 'absolute',
    right: 20,
  },
});
export default ViEngDictionaryScreen;
