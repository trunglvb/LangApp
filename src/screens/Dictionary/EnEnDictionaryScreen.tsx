/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import AppColors from '../../styles/AppColors';
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
import AppBar from '../../components/AppBar/AppBar';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React, {Fragment, useEffect, useState} from 'react';
import DefaultTextInput from '../../components/DefaultTextInput';
import AppLoading from '../../components/Loading/AppLoading';
import {IC_REDUCE, IC_RIGHT, IC_SEARCH} from '../../assets/path';
import {IWordDetails} from '../../model/DitionaryViEnModel';
import {useDebounce} from '../../hooks/useDebounce';
import {getListWords} from '../../network/services/dictionaryvien.apis';
import {getEnEnWordsDetails} from '../../network/services/dictionaryenen';
import {APP_PADDING} from '../../styles/AppStyles';
import AppText from '../../components/AppText/AppText';

const width = dimension.width;
const EnEnDictionaryScreen = () => {
  const [wordValue, setWordValue] = useState<string>('');
  const [wordDetails, setWordDetails] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isShowPopup, setIsShowPopup] = useState<boolean>(false);
  const [isDropdownLoading, setIsDropdownLoading] = useState<boolean>(false);
  const [wordList, setWordList] = useState<IWordDetails[]>([]);
  const wordQuery = useDebounce(wordValue, 1000);

  const onRenderContent = () => {
    if (wordDetails) {
      return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          overScrollMode={'never'}
          style={{
            flex: 1,
            marginTop: unit10,
          }}>
          <View style={styles.wordWrap}>
            <AppText style={styles.wordTitle}>
              {wordDetails?.word ?? ''}
            </AppText>
            <AppText style={styles.wordSpell}>
              {wordDetails?.phonetics
                ? `[${
                    wordDetails?.phonetics?.find((item: any) => item?.text)
                      ?.text
                  }]`
                : ''}
            </AppText>
          </View>

          {wordDetails?.meanings?.map((meaning: any) => (
            <Fragment
              key={meaning?.partOfSpeech + Math.floor(Math.random() * 100)}>
              <AppText style={styles.synonymsWordTitle}>
                {meaning?.partOfSpeech ?? ''}
              </AppText>
              <View>
                {meaning?.definitions?.map((item: any) => (
                  <Fragment key={'key' + Math.floor(Math.random() * 100)}>
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
                      <AppText
                        key={item?.definition + Math.floor(Math.random() * 100)}
                        style={styles.meaningTitle}>
                        {item.definition ?? ''}
                      </AppText>
                    </View>
                    {item?.example ? (
                      <View style={styles.detailsWrap}>
                        <AppText
                          style={{
                            fontSize: unit14,
                            color: AppColors.blue_gradient_1,
                            textDecorationLine: 'underline',
                          }}>
                          {item?.example}
                        </AppText>
                      </View>
                    ) : null}
                  </Fragment>
                ))}
              </View>
              {meaning?.synonyms?.length > 0 ? (
                <AppText style={styles.synonymsWordTitle}>synonyms</AppText>
              ) : null}
              {meaning?.synonyms?.length > 0 ? (
                <AppText style={styles.synonymsWord}>
                  {meaning?.synonyms?.join(', ')}
                </AppText>
              ) : null}

              {meaning?.antonyms?.length > 0 ? (
                <AppText style={styles.synonymsWordTitle}>antonyms</AppText>
              ) : null}
              {meaning?.antonyms?.length > 0 ? (
                <AppText style={styles.synonymsWord}>
                  {meaning?.antonyms?.join(', ')}
                </AppText>
              ) : null}
            </Fragment>
          ))}
        </ScrollView>
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    const searchCharacter = async () => {
      try {
        setIsDropdownLoading(true);
        const response = await getListWords(wordQuery);
        const data = response?.data?.data?.word?.map(item => {
          return {
            ...item,
            word: item?.word.split(/[ -.]/)[0],
          };
        });
        const uniqueArray = data.reduce((acc: any, curr: any) => {
          const existingWord = acc.find(
            (item: any) => item?.word === curr.word,
          );
          if (!existingWord) {
            acc.push(curr);
          }
          return acc;
        }, []);
        setWordList(uniqueArray);

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
        titleStyle={{
          fontSize: unit16,
        }}
        title={'En-En Dictionary'}
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
              style={{
                position: 'absolute',
                zIndex: 100,
                top: 65,
                maxHeight: 500,
                width: '100%',
                backgroundColor: AppColors.white,
                borderRadius: 5,
              }}>
              {!isDropdownLoading ? (
                wordList?.map(item => (
                  <TouchableOpacity
                    style={styles.itemWrap}
                    key={Math.floor(Math.random() * 100)}
                    onPress={() => {
                      setWordValue(item?.word?.replace(/@/g, '') ?? '');
                      setIsShowPopup(false);
                      setIsLoading(true);
                      getEnEnWordsDetails(item?.word?.replace(/@/g, '')).then(
                        res => {
                          const data = res?.data;
                          setIsLoading(false);
                          setWordDetails(data ? data[0] : []);
                        },
                      );
                    }}>
                    <Image
                      style={{
                        width: unit14,
                        aspectRatio: 1,
                        marginRight: unit4,
                        tintColor: AppColors.black,
                      }}
                      source={IC_SEARCH}
                    />
                    <View style={styles.itemContent}>
                      <AppText style={[styles.itemTitle, {marginLeft: unit8}]}>
                        {item?.word?.replace(/@/g, '') ?? ''}
                      </AppText>
                    </View>
                    <Image
                      style={{
                        width: unit25,
                        aspectRatio: 1,
                        borderRadius: unit16,
                        margin: 'auto',
                        tintColor: AppColors.black,
                      }}
                      source={IC_RIGHT}
                    />
                  </TouchableOpacity>
                ))
              ) : (
                <AppLoading />
              )}
            </ScrollView>
          ) : null}
        </View>

        {isLoading ? <AppLoading /> : onRenderContent()}
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
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: AppColors.grey,
    paddingTop: unit8,
    paddingBottom: unit8,
    paddingLeft: unit10,
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
  synonymsWord: {
    fontSize: unit14,
    marginTop: unit8,
  },
  synonymsWordTitle: {
    fontSize: unit14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginTop: unit10,
  },
  meaningWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: unit4,
    marginBottom: unit2,
  },
  meaningTitle: {
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
export default EnEnDictionaryScreen;
