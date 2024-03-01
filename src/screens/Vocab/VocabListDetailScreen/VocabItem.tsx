import React from 'react';
import {PressableProps, View, StyleSheet} from 'react-native';
import AppImage from '../../../components/AppImage/AppImage';
import AppText from '../../../components/AppText/AppText';
import PressView from '../../../components/PressView/PressView';
import AppColors from '../../../styles/AppColors';
import {
  fontSize14,
  fontSize16,
  unit12,
  unit16,
  unit20,
} from '../../../utils/appUnit';
export interface VocabModel {
  id: number;
  name: string;
  meaning: string;
  complexity: number;
  image: string;
}

interface VocabItemProps extends PressableProps {
  item: any;
  onPress?: any;
}

const VocabItem: React.FC<VocabItemProps> = props => {
  const {item} = props;
  return (
    <PressView {...props} style={styles.container} onPress={props?.onPress}>
      <View style={styles.wrap}>
        <AppImage
          source={{uri: item.image}}
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
          {item.word}
        </AppText>
        <AppText
          style={{
            fontSize: fontSize14,
            color: AppColors.dark_grey,
          }}
          fontType={'medium'}>
          {item.meaning}
        </AppText>
      </View>
    </PressView>
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
export default VocabItem;
