import React from 'react';
import {useWindowDimensions, View, StyleSheet, Image} from 'react-native';
import {NavigationRef} from '../../../../App';
import AppText from '../../../components/AppText/AppText';
import PressView from '../../../components/PressView/PressView';
import AppColors from '../../../styles/AppColors';
import {unit12, unit14, unit16, unit20} from '../../../utils/appUnit';
import {IETLS_IMAGE, TOEIC_IAMGE} from '../../../assets/path';

interface VocabListItemProps {
  item: any;
  sourceImage?: any;
}

const VocabListItem: React.FC<VocabListItemProps> = props => {
  const {item, sourceImage} = props;
  const {width} = useWindowDimensions();
  return (
    <PressView
      onPress={() =>
        NavigationRef.current?.navigate('VocabListDetailScreen', {
          vocabList: item,
        })
      }>
      <View
        style={[
          styles.container,
          {
            width: 0.7 * width,
          },
        ]}>
        <Image
          resizeMode="stretch"
          style={[
            styles.image,
            {
              height: 0.43 * width,
            },
          ]}
          source={
            sourceImage
              ? sourceImage
              : item?.topicTitle?.includes('TOEIC')
              ? TOEIC_IAMGE
              : IETLS_IMAGE
          }
        />
        <AppText
          fontType={'medium'}
          style={{
            marginTop: unit14,
            marginHorizontal: unit12,
            fontSize: unit16,
            color: AppColors.black,
          }}>
          {item.topicTitle}
        </AppText>
      </View>
    </PressView>
  );
};

export const styles = StyleSheet.create({
  container: {
    height: 250,
    backgroundColor: AppColors.white,
    borderRadius: unit14,
    paddingBottom: unit20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0.5,
      height: 0.5,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  image: {
    width: '100%',
    borderTopLeftRadius: unit12,
    borderTopRightRadius: unit12,
  },
});
export default VocabListItem;
