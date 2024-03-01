import React from 'react';
import {PressableProps, View, StyleSheet} from 'react-native';
import AppImage from '../AppImage/AppImage';
import AppText from '../AppText/AppText';
import PressView from '../PressView/PressView';
import AppColors from '../../styles/AppColors';
import {
  fontSize14,
  fontSize16,
  unit12,
  unit16,
  unit20,
} from '../../utils/appUnit';

interface IWordItem {
  mean?: string;
  word?: string;
  phonetic?: string;
  picture?: string;
  wrongList?: any;
}
interface WordItemProps extends PressableProps {
  item: IWordItem;
}

const WordItem: React.FC<WordItemProps> = props => {
  const {item} = props;
  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <AppImage
          source={{uri: item?.picture}}
          resizeMode="cover"
          style={styles.image}
        />
      </View>
      <View style={styles.content}>
        <AppText
          style={{
            fontSize: fontSize16,
            color: AppColors.black,
          }}
          fontType={'bold'}>
          {item?.word}
        </AppText>
        <AppText
          style={{
            fontSize: fontSize14,
            color: AppColors.dark_grey,
          }}
          fontType={'medium'}>
          {item?.mean}
        </AppText>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    marginBottom: unit16,
    marginHorizontal: unit20,
    paddingHorizontal: unit16,
    paddingVertical: unit12,
    borderRadius: unit12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    shadowColor: AppColors.grey,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  wrap: {
    height: 60,
    shadowColor: AppColors.grey,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  image: {
    width: 60,
    height: '100%',
    borderRadius: 10,
  },
  content: {
    flex: 1,
    marginLeft: 16,
  },
});
export default WordItem;
