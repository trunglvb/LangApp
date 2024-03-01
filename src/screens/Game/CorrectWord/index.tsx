/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Modal, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import AppBar from '../../../components/AppBar/AppBar';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppColors from '../../../styles/AppColors';
import {
  unit10,
  unit12,
  unit14,
  unit16,
  unit20,
  unit22,
  unit24,
  unit8,
  dimension,
} from '../../../utils/appUnit';
import AppText from '../../../components/AppText/AppText';
import Icons from 'react-native-vector-icons/AntDesign';
import {NavigationRef} from '../../../../App';
import {
  NUMBERS,
  TOPICS_WORD_GAME,
  WORD_LEVELS,
  WORD_SPECIALTY,
  WORD_TYPES,
} from '../../../utils/Utils';
import LinearButton from '../../../components/LinearButton/LinearButton';
import OptionCard from './OptionCard';
import PressView from '../../../components/PressView/PressView';
import usePrevious from '../../../hooks/usePrevious';
import TopicCard from './TopicCard';

const CorrectWordScreen = () => {
  const navigation = NavigationRef.current;
  const [activeId, setActiveId] = useState({
    type: '-1',
    level: '-1',
    specialty: '-1',
    numberQuestion: '10',
  });
  const [type, setType] = useState({
    key: '-1',
    title: '',
    isShowType: false,
  });
  const [numberQuestion, setNumberQuestion] = useState({
    key: '10',
    title: '10',
    isShowNumber: false,
  });
  const [numberResult, setNumberResult] = useState({
    key: '10',
    title: '10',
    isShowNumber: false,
  });

  const [typeResult, setTypeResult] = useState({
    key: '-1',
    title: '',
    isShowType: false,
  });
  const [level, setLevel] = useState({
    key: '-1',
    title: '',
    isShowLevel: false,
  });
  const [levelResult, setLevelResult] = useState({
    key: '-1',
    title: '',
    isShowLevel: false,
  });
  const [specialty, setSpecialty] = useState({
    key: '-1',
    title: '',
    isShowSpec: false,
  });
  const [specialtyResult, setSpecialtyResult] = useState({
    key: '-1',
    title: '',
    isShowSpec: false,
  });

  const [topics, setTopics] = useState<string[]>([]);
  const [topicsRetrieve, setTopicsRetrieve] = useState<string[]>([]);
  const [isShowPopup, setIsShowPopup] = useState<boolean>(false);

  const previousType = usePrevious(type);
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
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: AppColors.light_grey,
          paddingLeft: unit10,
          paddingRight: unit10,
        }}>
        <View>
          <AppText style={{fontSize: unit14}}>
            Review vocabulary by choosing the one most correct answer out of
            four answers whose meaning matches the given word.
          </AppText>
          <View>
            <AppText
              style={{
                fontSize: unit14,
                marginBottom: unit12,
                marginTop: unit12,
                fontWeight: '500',
              }}>
              Select vocabulary package:
            </AppText>
            <View style={styles.cardOption}>
              <View>
                <AppText style={styles.optionTitle}>Type</AppText>
                <AppText style={{fontSize: unit14}}>
                  {typeResult?.title ? typeResult?.title : 'All'}
                </AppText>
              </View>
              <PressView
                onPress={() => {
                  setType({
                    ...type,
                    isShowType: true,
                  });
                  setTypeResult({
                    ...typeResult,
                    isShowType: true,
                  });
                }}>
                <Icons
                  style={{
                    fontSize: unit14,
                  }}
                  name={'filter'}
                />
              </PressView>
            </View>
            <View style={styles.cardOption}>
              <View>
                <AppText style={styles.optionTitle}>Level</AppText>
                <AppText style={{fontSize: unit14}}>
                  {levelResult?.title ? levelResult.title : 'All'}
                </AppText>
              </View>
              <PressView
                onPress={() => {
                  setLevel({
                    ...level,
                    isShowLevel: true,
                  });
                  setLevelResult({
                    ...levelResult,
                    isShowLevel: true,
                  });
                }}>
                <Icons
                  style={{
                    fontSize: unit14,
                  }}
                  name={'filter'}
                />
              </PressView>
            </View>
            <View style={styles.cardOption}>
              <View>
                <AppText style={styles.optionTitle}>Specialty</AppText>
                <AppText style={{fontSize: unit14}}>
                  {specialtyResult?.title ? specialtyResult.title : 'All'}
                </AppText>
              </View>
              <PressView
                onPress={() => {
                  setSpecialty({
                    ...specialty,
                    isShowSpec: true,
                  });
                  setSpecialtyResult({
                    ...levelResult,
                    isShowSpec: true,
                  });
                }}>
                <Icons
                  style={{
                    fontSize: unit14,
                  }}
                  name={'filter'}
                />
              </PressView>
            </View>
            <View style={styles.cardOption}>
              <View>
                <AppText style={styles.optionTitle}>Topics</AppText>
                <AppText style={{fontSize: unit14}}>
                  {topics?.length > 0
                    ? `${topicsRetrieve?.length} selected items`
                    : 'All'}
                </AppText>
              </View>
              <PressView
                onPress={() => {
                  setIsShowPopup(true);
                }}>
                <Icons
                  style={{
                    fontSize: unit14,
                  }}
                  name={'filter'}
                />
              </PressView>
            </View>
            <View style={styles.cardOption}>
              <View>
                <AppText style={styles.optionTitle}>Number question</AppText>
                <AppText style={{fontSize: unit14}}>
                  {numberResult?.title ? numberResult?.title : '10'}
                </AppText>
              </View>

              <PressView
                onPress={() => {
                  setNumberQuestion({
                    ...numberQuestion,
                    isShowNumber: true,
                  });
                  setNumberResult({
                    ...numberResult,
                    isShowNumber: true,
                  });
                }}>
                <Icons
                  style={{
                    fontSize: unit14,
                  }}
                  name={'filter'}
                />
              </PressView>
            </View>
          </View>
        </View>
        <LinearButton
          buttonTitle={'Start'}
          linearStyle={{
            paddingVertical: unit12,
            borderRadius: unit8,
            marginBottom: unit8,
            width: '100%',
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
            navigation?.navigate('PlayCorrectWordScreen', {
              type: typeResult?.key,
              level: levelResult?.key,
              specialty: specialtyResult?.key,
              topics: topicsRetrieve,
              n: Number(numberResult?.key),
            });
          }}
        />
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={type.isShowType}
        onRequestClose={() => {
          setType({
            ...type,
            isShowType: !type.isShowType,
          });
          setTypeResult({
            ...typeResult,
            isShowType: !typeResult.isShowType,
          });
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {WORD_TYPES.map(item => (
                <OptionCard
                  activeId={activeId.type}
                  setActiveId={(id: string) =>
                    setActiveId({
                      ...activeId,
                      type: id,
                    })
                  }
                  data={typeResult}
                  key={item?.title}
                  item={item}
                  setOption={setType}
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
                  setType({
                    ...type,
                    isShowType: false,
                  });
                  setTypeResult({
                    ...typeResult,
                    isShowType: false,
                  });
                  setActiveId({
                    ...activeId,
                    type: typeResult.key,
                  });
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
                  setType({
                    ...type,
                    isShowType: false,
                  });
                  setTypeResult({
                    ...typeResult,
                    key: type.key,
                    title: type.title,
                    isShowType: false,
                  });
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={numberQuestion?.isShowNumber}
        onRequestClose={() => {
          setNumberQuestion({
            ...numberQuestion,
            isShowNumber: !numberQuestion.isShowNumber,
          });
          setNumberResult({
            ...numberResult,
            isShowNumber: !numberResult?.isShowNumber,
          });
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {NUMBERS.map(item => (
                <OptionCard
                  activeId={activeId.numberQuestion}
                  setActiveId={(id: string) =>
                    setActiveId({
                      ...activeId,
                      numberQuestion: id,
                    })
                  }
                  data={numberResult}
                  key={item?.title}
                  item={item}
                  setOption={setNumberQuestion}
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
                  setNumberQuestion({
                    ...numberQuestion,
                    isShowNumber: false,
                  });
                  setNumberResult({
                    ...numberResult,
                    isShowNumber: false,
                  });
                  setActiveId({
                    ...activeId,
                    numberQuestion: numberResult.key,
                  });
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
                  setNumberQuestion({
                    ...numberQuestion,
                    isShowNumber: false,
                  });
                  setNumberResult({
                    ...numberResult,
                    key: numberQuestion.key,
                    title: numberQuestion.title,
                    isShowNumber: false,
                  });
                }}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={level.isShowLevel}
        onRequestClose={() => {
          setLevel({
            ...level,
            isShowLevel: !level.isShowLevel,
          });
          setLevelResult({
            ...typeResult,
            isShowLevel: !level.isShowLevel,
          });
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {WORD_LEVELS.map(item => (
                <OptionCard
                  activeId={activeId.level}
                  setActiveId={(id: string) =>
                    setActiveId({
                      ...activeId,
                      level: id,
                    })
                  }
                  data={levelResult}
                  key={item?.title}
                  item={item}
                  setOption={setLevel}
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
                  setLevel({
                    ...level,
                    isShowLevel: false,
                  });
                  setLevelResult({
                    ...levelResult,
                    isShowLevel: false,
                  });
                  setActiveId({
                    ...activeId,
                    level: levelResult.key,
                  });
                }}
              />
              <LinearButton
                buttonTitle={'OK'}
                linearStyle={{
                  paddingVertical: unit14,
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
                  setLevel({
                    ...level,
                    isShowLevel: false,
                  });
                  setLevelResult({
                    ...levelResult,
                    key: level.key,
                    title: level.title,
                    isShowLevel: false,
                  });
                }}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={specialty.isShowSpec}
        onRequestClose={() => {
          setSpecialty({
            ...specialty,
            isShowSpec: !specialty.isShowSpec,
          });
          setSpecialtyResult({
            ...specialtyResult,
            isShowSpec: !specialtyResult.isShowSpec,
          });
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView
              overScrollMode={'never'}
              contentContainerStyle={[
                {
                  paddingBottom: unit24,
                },
              ]}
              showsVerticalScrollIndicator={false}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                {WORD_SPECIALTY.map(item => (
                  <OptionCard
                    activeId={activeId.specialty}
                    setActiveId={(id: string) =>
                      setActiveId({
                        ...activeId,
                        specialty: id,
                      })
                    }
                    data={specialtyResult}
                    key={item?.title}
                    item={item}
                    setOption={setSpecialty}
                  />
                ))}
              </View>
            </ScrollView>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: dimension.width - unit22,
                marginTop: unit20,
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
                  setSpecialty({
                    ...specialty,
                    isShowSpec: false,
                  });
                  setSpecialtyResult({
                    ...specialtyResult,
                    isShowSpec: false,
                  });
                  setActiveId({
                    ...activeId,
                    specialty: specialtyResult.key,
                  });
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
                  setSpecialty({
                    ...specialty,
                    isShowSpec: false,
                  });
                  setSpecialtyResult({
                    ...specialtyResult,
                    key: specialty.key,
                    title: specialty.title,
                    isShowSpec: false,
                  });
                }}
              />
            </View>
          </View>
        </View>
      </Modal>

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
              {TOPICS_WORD_GAME.map(item => (
                <TopicCard
                  key={item?.title}
                  item={item}
                  topics={topics}
                  setTopics={setTopics}
                  topicsRetrieve={topicsRetrieve}
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
                  setIsShowPopup(false);
                  setTopicsRetrieve(topics);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.light_grey,
  },
  cardOption: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: unit8,
    paddingHorizontal: unit12,
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderRadius: unit8,
    borderColor: AppColors.light_grey2,
    padding: unit8,
    marginBottom: unit14,
    shadowColor: AppColors.purple,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardNumber: {
    width: '100%',
    paddingVertical: unit8,
    paddingHorizontal: unit12,
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderRadius: unit8,
    borderColor: AppColors.light_grey2,
    padding: unit8,
    marginBottom: unit14,
    shadowColor: AppColors.purple,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectTitle: {
    fontSize: unit14,
    marginBottom: unit12,
    marginTop: unit12,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  optionTitle: {
    fontSize: unit12,
    color: AppColors.purple,
    marginBottom: unit8,
    fontStyle: 'italic',
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
export default CorrectWordScreen;
