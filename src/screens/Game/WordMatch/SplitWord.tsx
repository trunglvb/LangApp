/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
//import liraries
import React, {useState, useRef, useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import PressView from '../../../components/PressView/PressView';
import AppText from '../../../components/AppText/AppText';
import {
  unit12,
  unit14,
  unit18,
  unit20,
  unit30,
  unit4,
  unit40,
  unit8,
} from '../../../utils/appUnit';
import AppColors from '../../../styles/AppColors';
import {IC_Correct_Game, IC_Correct_Lost} from '../../../assets/path';

interface ISplitWordProps {
  mean: string;
  word: string;
  onCorrect: () => void;
  onWrong: () => void;
  resetFlag: number;
}
interface IUserSplit {
  ch: string;
  index: number;
}
const splitWord = (word: string = '') => {
  let splitArr: string[] = [];
  let failFlag = 1;

  while (failFlag) {
    if (failFlag >= 100) {
      break;
    }
    splitArr = word
      ?.trim()
      .split('')
      .sort(() => Math.random() - 0.5);

    if (splitArr.join('') === word) {
      failFlag++;
    } else {
      failFlag = 0;
      break;
    }
  }
  return splitArr;
};

const SplitWord = (props: ISplitWordProps) => {
  const {mean, word, onCorrect, onWrong, resetFlag} = props;
  const originSplit = useRef(
    splitWord(word?.trim().replace(/\s/g, '')?.toLowerCase()),
  );
  const [userSplit, setUserSplit] = useState<IUserSplit[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isShowWord, setIsShowWord] = useState<boolean>(false);

  const handleSelectCharacter = (index: number) => {
    const newUserSplit = [
      ...userSplit,
      {index, ch: originSplit.current[index]},
    ];
    setUserSplit(newUserSplit);

    if (newUserSplit.length === word.length) {
      setIsCheck(true);
    }
  };

  const handleReturnCharacter = (index: number) => {
    if (isCheck) {
      setIsCheck(false);
    }
    if (isShow) {
      setIsShow(false);
    }

    const newUserSplit = userSplit.slice(0, index);
    setUserSplit(newUserSplit);
  };

  const renderOriginSplit = () => {
    return originSplit.current.map((ch, index) => {
      const isSelected =
        userSplit?.findIndex(item => index === item.index) !== -1;

      return (
        <PressView
          disabled={isSelected}
          key={index + ch}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: unit40,
            height: unit40,
            alignContent: 'center',
            marginRight: unit4,
            marginBottom: unit4,
            borderWidth: 1,
            borderColor: AppColors.light_grey2,
            backgroundColor: AppColors.white,
            borderRadius: unit4,
          }}
          onPress={() => handleSelectCharacter(index)}>
          <AppText style={{fontSize: unit14}}> {isSelected ? '' : ch}</AppText>
        </PressView>
      );
    });
  };

  const renderUserSplit = () => {
    return userSplit.map((item, key) => {
      const correctClass =
        item.ch?.trim()?.replace(/\s/g, '') === word?.trim().toLowerCase()[key]
          ? 'right'
          : 'wrong';
      const bgColor = () => {
        if (correctClass === 'right') {
          return AppColors.right;
        }
        if (correctClass === 'wrong') {
          return AppColors.wrong;
        }
      };
      return (
        <PressView
          key={key + 100}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: unit40,
            height: unit40,
            alignContent: 'center',
            marginRight: unit4,
            backgroundColor: isCheck ? bgColor() : AppColors.white,
            borderWidth: 1,
            borderColor: AppColors.light_grey2,
            borderRadius: unit4,
          }}
          onPress={() => handleReturnCharacter(key)}>
          <AppText
            style={{
              fontSize: unit14,
              color: isCheck ? AppColors.white : AppColors.black,
            }}>
            {item?.ch}
          </AppText>
        </PressView>
      );
    });
  };

  // check is correct
  useEffect(() => {
    let isSub = true;

    if (!isCheck) {
      return;
    }

    const answer = userSplit.map(i => i.ch).join('');
    if (
      answer?.trim()?.replace(/\s/g, '')?.toLowerCase() ===
      word?.trim()?.replace(/\s/g, '')?.toLowerCase()
    ) {
      isSub && setIsCorrect(true);
      onCorrect();
    } else {
      isSub && setIsCorrect(false);
      onWrong();
    }

    return () => {
      isSub = false;
    };
  }, [isCheck]);

  useEffect(() => {
    let isSub = true;
    if (resetFlag === -1) {
      return;
    }

    if (isSub) {
      setIsShowWord(false);
      setIsCheck(false);
      setIsShow(false);
      setIsCorrect(false);
      setUserSplit([]);
      originSplit.current = splitWord(
        word?.trim()?.replace(/\s/g, '')?.toLowerCase(),
      );
    }

    return () => {
      isSub = false;
    };
  }, [resetFlag]);

  console.log('word', word);

  return (
    <View style={styles.container}>
      {/* <AppText>{word}</AppText> */}
      <View
        style={{
          height: 80,
          marginTop: unit14,
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {renderUserSplit()}
      </View>
      <View style={[styles.flexCenter, {height: 150}]}>
        <AppText style={styles.meanTitle}>{mean}</AppText>
        {!isShow ? (
          <PressView
            onPress={() => {
              setIsShow(true);
            }}>
            <AppText
              style={{
                marginTop: unit12,
                fontSize: unit14,
                fontWeight: '400',
                color: AppColors.blue_gradient_1,
                fontStyle: 'italic',
                textDecorationLine: 'underline',
                textDecorationColor: AppColors.blue_gradient_1,
              }}>
              View Answer
            </AppText>
          </PressView>
        ) : (
          <AppText
            style={{
              marginTop: unit12,
              fontSize: unit14,
              fontWeight: '600',
              color: AppColors.purple,
              fontStyle: 'italic',
              textDecorationLine: 'underline',
              textDecorationColor: AppColors.purple,
            }}>
            {word}
          </AppText>
        )}
        {isCheck && isCorrect && (
          <View
            style={[styles.flexRow, {alignItems: 'center', marginTop: unit8}]}>
            <AppText style={styles.correctTitle}>You are correct!</AppText>
            <Image
              source={IC_Correct_Game}
              style={{width: unit14, height: unit14}}
            />
          </View>
        )}
        {isCheck && !isCorrect && (
          <View
            style={[styles.flexRow, {alignItems: 'center', marginTop: unit8}]}>
            <AppText style={styles.lostTitle}>You were close!</AppText>
            <Image
              source={IC_Correct_Lost}
              style={{width: unit14, height: unit14}}
            />
          </View>
        )}
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {renderOriginSplit()}
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    paddingTop: unit12,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  meanTitle: {
    marginTop: unit20,
    fontWeight: '600',
    fontSize: unit18,
    textAlign: 'center',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
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
});

export default SplitWord;
