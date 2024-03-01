/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {RouteProp, useRoute, useIsFocused} from '@react-navigation/native';
import {RootStackParamList} from '../../../../App';
import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/AntDesign';
import AppBar from '../../../components/AppBar/AppBar';
import {NavigationRef} from '../../../../App';
import {
  unit12,
  unit13,
  unit14,
  unit16,
  unit18,
  unit20,
  unit30,
  unit4,
  unit8,
  dimension,
  unit22,
  unit50,
  unit80,
  unit10,
} from '../../../utils/appUnit';
import AppColors from '../../../styles/AppColors';
import {getQuestionCorrectGameList} from '../../../network/services/game.apis';
import {ICorrectGameModel, IWrongList} from '../../../model/Game';
import AppText from '../../../components/AppText/AppText';
import {IC_Correct_Game, IC_Correct_Lost, IC_GAME} from '../../../assets/path';
import PressView from '../../../components/PressView/PressView';
import AppLoading from '../../../components/Loading/AppLoading';
import LinearButton from '../../../components/LinearButton/LinearButton';
import WordItem from '../../../components/WordItem';

type CorrectWordScreenProps = RouteProp<
  RootStackParamList,
  'PlayCorrectWordScreen'
>;
const UX = {
  DELAY_TIME: 1500,
  DELAY_ANSWER: 2000,
};
const shuffleAnswers = (
  word: string,
  phonetic: string,
  wrongList: IWrongList[],
) => {
  let mergeList = [...wrongList, {word, phonetic}];
  return mergeList.sort(() => Math.random() - 0.5);
};

const addClassAnswerItem = (
  status: number,
  answerIndex: number,
  index: number,
  word: string,
  answer: string,
) => {
  if (status !== 0) {
    if (word === answer) {
      return AppColors?.green;
    }
    if (answerIndex === index) {
      return AppColors.red;
    }
  }
  return AppColors.light_grey2;
};

const PlayCorrectWordScreen = () => {
  const navigation = NavigationRef.current;
  const isForcused = useIsFocused();
  const {params} = useRoute<CorrectWordScreenProps>();
  const {level, n: numberQuestion, specialty, topics, type} = params;
  const [list, setList] = useState<ICorrectGameModel[]>([]);
  const [isShowHistory, setIsShowHistory] = useState<boolean>(false);

  // fix Can't perform a React state update on an unmounted component
  const isSubscribe = useRef(true);
  const [state, setState] = useState({
    current: 0,
    nRight: 0,
    nWrong: 0,
    // status 0 - reading question, 1 - show right result, 2 - show wrong result
    status: 0,
    answerList: shuffleAnswers(
      list[0]?.word ?? '',
      list[0]?.phonetic ?? '',
      list[0]?.wrongList ?? [],
    ),
    answerIndex: -1,
  });
  const [isDone, setIsDone] = useState<boolean>(false);
  const nQuestion = list?.length ?? 0;
  const {status, current, nRight, nWrong, answerList, answerIndex} = state;
  const {word, mean} = list[state.current ?? 0]! ?? '';
  const nRightConsecutive = useRef({top: 0, n: 0});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onAnswer = (answer: string, answerIndexNumber: number) => {
    if (answer === word) {
      setState({
        ...state,
        nRight: nRight + 1,
        status: 1,
        answerIndex: answerIndexNumber,
      });
      nRightConsecutive.current.n++;
    } else {
      setState({
        ...state,
        nWrong: nWrong + 1,
        status: 2,
        answerIndex: answerIndexNumber,
      });
      const {top, n} = nRightConsecutive.current;
      if (top < n) {
        nRightConsecutive.current.top = n;
      }
    }

    if (current !== list?.length - 1) {
      setTimeout(() => {
        const newAnswerList = shuffleAnswers(
          list[current + 1]?.word ?? '',
          list[current + 1]?.phonetic ?? '',
          list[current + 1]?.wrongList ?? [],
        );

        isSubscribe.current &&
          setState(preState => ({
            ...preState,
            status: 0,
            answerIndex: -1,
            current: current + 1,
            answerList: newAnswerList,
          }));
      }, UX.DELAY_ANSWER);
    } else {
      setTimeout(() => {
        isSubscribe.current && setIsDone(true);
      }, UX.DELAY_ANSWER);
    }
  };

  const handleReplay = () => {
    setIsDone(false);
    setState({
      current: 0,
      nRight: 0,
      nWrong: 0,
      status: 0,
      answerList: shuffleAnswers(
        list[0]?.word,
        list[0]?.phonetic,
        list[0]?.wrongList,
      ),
      answerIndex: -1,
    });
    nRightConsecutive.current = {top: 0, n: 0};
  };

  useEffect(() => {
    if (isForcused) {
      setIsLoading(true);
      getQuestionCorrectGameList(
        type,
        level,
        specialty,
        JSON.stringify(topics),
        numberQuestion,
      ).then(res => {
        setIsLoading(false);
        setList(res.data?.data?.wordPack);
        setState({
          ...state,
          answerList: shuffleAnswers(
            res.data?.data?.wordPack[0]?.word,
            res.data?.data?.wordPack[0]?.phonetic,
            res.data?.data?.wordPack[0]?.wrongList,
          ),
        });
      });
    }
    return () => {
      isSubscribe.current = false;
    };
  }, [isForcused]);

  return (
    <SafeAreaView style={styles.container}>
      <AppBar
        leftIcon={
          <Icon
            style={{
              fontSize: unit14,
            }}
            name={'arrow-left'}
          />
        }
        titleStyle={{
          fontSize: unit14,
        }}
        title={'Correct Word'}
        containerStyle={{
          backgroundColor: AppColors.light_grey,
        }}
      />
      {isLoading ? (
        <AppLoading />
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            overScrollMode={'never'}
            nestedScrollEnabled>
            {!isDone ? (
              <View style={{padding: unit12}}>
                <View style={styles.headerWrap}>
                  <AppText>{`No.${current + 1} / ${nQuestion}`}</AppText>
                  <View style={styles.flexRow}>
                    <View style={styles.flexRow}>
                      <AppText>{nRight}</AppText>
                      <View style={styles.flexRow}>
                        <AppText style={{marginRight: unit4}}> Correct</AppText>
                        <Icons
                          style={{
                            fontSize: unit14,
                          }}
                          color={AppColors.green}
                          name={'checkcircle'}
                        />
                      </View>
                      <AppText style={{marginRight: unit4}}>{' -'}</AppText>
                    </View>
                    <View style={styles.flexRow}>
                      <AppText>{nWrong}</AppText>
                      <View style={styles.flexRow}>
                        <AppText style={{marginRight: unit4}}> Wrong</AppText>
                        <Icons
                          style={{
                            fontSize: unit14,
                          }}
                          color={AppColors.red}
                          name={'closecircle'}
                        />
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  style={[styles.flexCenter, {marginTop: unit20, height: 100}]}>
                  <AppText style={styles.meanTitle}>{mean}</AppText>
                  {status === 1 && (
                    <View
                      style={[
                        styles.flexRow,
                        {alignItems: 'center', marginTop: unit8},
                      ]}>
                      <AppText style={styles.correctTitle}>
                        You are correct!
                      </AppText>
                      <Image
                        source={IC_Correct_Game}
                        style={{width: unit14, height: unit14}}
                      />
                    </View>
                  )}
                  {status === 2 && (
                    <View
                      style={[
                        styles.flexRow,
                        {alignItems: 'center', marginTop: unit8},
                      ]}>
                      <AppText style={styles.lostTitle}>
                        You were close!
                      </AppText>
                      <Image
                        source={IC_Correct_Lost}
                        style={{width: unit14, height: unit14}}
                      />
                    </View>
                  )}
                </View>
                <View
                  style={[
                    styles.flexCenter,
                    {
                      flex: 1,
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: unit30,
                    },
                  ]}>
                  {answerList?.map((item, index) => (
                    <PressView
                      onPress={() => onAnswer(item.word, index)}
                      key={item?.word}
                      style={{
                        backgroundColor: AppColors.white,
                        flexBasis: '49%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 'auto',
                        marginBottom: unit8,
                        height: 150,
                        borderWidth: 1,
                        borderColor: addClassAnswerItem(
                          status,
                          answerIndex,
                          index,
                          word,
                          item.word,
                        ),
                        borderRadius: unit8,
                      }}>
                      <AppText style={{fontSize: unit14, marginBottom: unit4}}>
                        {item?.word}
                      </AppText>
                      <AppText
                        style={{color: AppColors.purple, fontSize: unit13}}>
                        {item?.phonetic ? `/${item?.phonetic}/` : ''}
                      </AppText>
                    </PressView>
                  ))}
                </View>
              </View>
            ) : (
              <View
                style={[
                  styles.flexCenter,
                  {justifyContent: 'center', alignItems: 'center'},
                ]}>
                <Image source={IC_GAME} style={{width: unit80}} />
                <View style={{marginTop: unit16}}>
                  <View style={styles.flexRow}>
                    <View style={styles.flexRow}>
                      <AppText>{nRight}</AppText>
                      <View style={styles.flexRow}>
                        <AppText style={{marginRight: unit4}}> Correct</AppText>
                        <Icons
                          style={{
                            fontSize: unit14,
                          }}
                          color={AppColors.right}
                          name={'checkcircle'}
                        />
                      </View>
                      <AppText style={{marginRight: unit4}}>{' -'}</AppText>
                    </View>
                    <View style={styles.flexRow}>
                      <AppText>{nWrong}</AppText>
                      <View style={styles.flexRow}>
                        <AppText style={{marginRight: unit4}}> Wrong</AppText>
                        <Icons
                          style={{
                            fontSize: unit14,
                          }}
                          color={AppColors.wrong}
                          name={'closecircle'}
                        />
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: dimension.width - unit22 - unit22,
                    marginTop: unit30,
                  }}>
                  <LinearButton
                    buttonTitle={'View'}
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
                      setIsShowHistory(true);
                    }}
                  />
                  <LinearButton
                    buttonTitle={'Replay'}
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
                      handleReplay();
                    }}
                  />
                </View>
              </View>
            )}
          </ScrollView>
          <Modal
            animationType="slide"
            transparent={true}
            visible={isShowHistory}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <ScrollView>
                  {list?.map(item => (
                    <WordItem item={item} key={item?.mean} />
                  ))}
                </ScrollView>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: dimension.width - unit22,
                  }}>
                  <LinearButton
                    buttonTitle={'OK'}
                    linearStyle={{
                      paddingVertical: unit12,
                      borderRadius: unit8,
                      marginBottom: unit8,
                      width: dimension.width - unit22 - unit22 - unit8,
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
                      setIsShowHistory(false);
                    }}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </>
      )}
    </SafeAreaView>
  );
};

export default PlayCorrectWordScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.light_grey,
  },
  button: {
    paddingVertical: unit12,
    borderRadius: unit8,
    marginBottom: unit8,
    width: '100%',
  },
  headerWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  meanTitle: {
    marginTop: unit20,
    fontWeight: '600',
    fontSize: unit18,
    textAlign: 'center',
  },
  correctTitle: {
    fontSize: unit14,
    color: AppColors.right,
    marginRight: unit8,
  },
  lostTitle: {
    fontSize: unit14,
    color: AppColors.wrong,
    marginRight: unit8,
  },
  mr8: {
    marginRight: unit8,
  },
  mr4: {
    marginRight: unit4,
  },
  right: {
    borderColor: AppColors.right,
  },
  wrong: {
    borderColor: AppColors.wrong,
  },
  buttonText: {
    fontSize: unit14,
    fontWeight: '600',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: unit16,
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
