/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useRef, useEffect} from 'react';
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
import AppText from '../../../components/AppText/AppText';
import {IMatchGameModel} from '../../../model/Game';
import AppColors from '../../../styles/AppColors';
import {
  dimension,
  unit10,
  unit12,
  unit14,
  unit16,
  unit18,
  unit20,
  unit22,
  unit30,
  unit4,
  unit50,
  unit8,
} from '../../../utils/appUnit';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/AntDesign';
import AppBar from '../../../components/AppBar/AppBar';
import {getQuestionMatchGameList} from '../../../network/services/game.apis';
import SplitWord from './SplitWord';
import AppLoading from '../../../components/Loading/AppLoading';
import LinearButton from '../../../components/LinearButton/LinearButton';
import {IC_GAME} from '../../../assets/path';
import {NavigationRef} from '../../../../App';
import WordItem from '../../../components/WordItem';

type PlayWordScreenProps = RouteProp<
  RootStackParamList,
  'PlayCorrectWordScreen'
>;
const UX = {
  DELAY_TIME: 1500,
  DELAY_ANSWER: 2000,
};

// create a component
const PlayWordMatchScreen = () => {
  const navigation = NavigationRef.current;
  const [isShowHistory, setIsShowHistory] = useState<boolean>(false);
  const isForcused = useIsFocused();
  const {params} = useRoute<PlayWordScreenProps>();
  const {level, n: numberQuestion, specialty, topics, type} = params;
  const [list, setList] = useState<IMatchGameModel[]>([]);
  const nQuestion = numberQuestion;
  const [state, setState] = useState({
    current: 0,
    nRight: 0,
    nWrong: 0,
    resetFlag: -1,
  });
  const [isDone, setIsDone] = useState<boolean>(false);
  const {current, nRight, nWrong, resetFlag} = state;
  const nRightConsecutive = useRef({top: 0, n: 0});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isForcused) {
      setIsLoading(true);
      getQuestionMatchGameList(
        type,
        level,
        specialty,
        JSON.stringify(topics),
        numberQuestion,
      ).then(res => {
        setIsLoading(false);
        setList(res.data?.data?.wordPack);
      });
    }
  }, [isForcused]);

  const handleDone = () => {
    setIsDone(true);
  };

  const handleCorrect = () => {
    nRightConsecutive.current.n++;
    if (nRightConsecutive.current.n > nRightConsecutive.current.top) {
      nRightConsecutive.current.top = nRightConsecutive.current.n;
    }
    setTimeout(() => {
      if (current >= nQuestion) {
        handleDone();
      } else {
        setState({
          current: current + 1,
          nRight: nRight + 1,
          resetFlag: current,
          nWrong,
        });
      }
    }, UX.DELAY_ANSWER);
  };

  const handleWrong = () => {
    nRightConsecutive.current.n = 0;
    setState({...state, nWrong: nWrong + 1});
  };

  const handleReplay = () => {
    setIsDone(false);
    setState({
      current: 0,
      nRight: 0,
      nWrong: 0,
      resetFlag: -1,
    });
    nRightConsecutive.current = {top: 0, n: 0};
  };

  useEffect(() => {
    if (current >= nQuestion) {
      handleDone();
    }
  }, [current]);

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
        title={'Word Matching'}
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
                  <AppText>{`No. ${current + 1} / ${nQuestion}`}</AppText>
                  <View style={styles.flexRow}>
                    <View style={styles.flexRow}>
                      <AppText style={styles.mr8}>{nRight}</AppText>
                      <View style={styles.flexRow}>
                        <AppText style={{marginRight: unit4}}>Correct</AppText>
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
                      <AppText style={styles.mr8}>{nWrong}</AppText>
                      <View style={styles.flexRow}>
                        <AppText style={{marginRight: unit4}}>Wrong</AppText>
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

                {list?.length > 0 && (
                  <SplitWord
                    mean={list[current]?.mean}
                    word={list[current]?.word}
                    onCorrect={handleCorrect}
                    onWrong={handleWrong}
                    resetFlag={resetFlag}
                  />
                )}
              </View>
            ) : (
              <View
                style={[
                  styles.flexCenter,
                  {justifyContent: 'center', alignItems: 'center'},
                ]}>
                <Image source={IC_GAME} style={{width: unit50}} />
                <View style={{marginBottom: unit16, marginTop: unit16}}>
                  <View style={styles.flexRow}>
                    <View style={styles.flexRow}>
                      <AppText style={styles.mr4}>{nRight}</AppText>
                      <View style={styles.flexRow}>
                        <AppText style={{marginRight: unit4}}>Correct</AppText>
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
                      <AppText style={styles.mr4}>{nWrong}</AppText>
                      <View style={styles.flexRow}>
                        <AppText style={{marginRight: unit4}}>Wrong</AppText>
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

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.light_grey,
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
    color: AppColors.green,
    marginRight: unit8,
  },
  lostTitle: {
    fontSize: unit14,
    color: AppColors.red,
    marginRight: unit8,
  },
  mr8: {
    marginRight: unit8,
  },
  mr4: {
    marginRight: unit4,
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

export default PlayWordMatchScreen;
