import React from 'react';
import {PressableProps, View} from 'react-native';

import AppImage from '../../../../../components/AppImage/AppImage';
import AppText from '../../../../../components/AppText/AppText';
import PressView from '../../../../../components/PressView/PressView';
import AppColors from '../../../../../styles/AppColors';
import {
  unit10,
  unit12,
  unit14,
  unit20,
  unit5,
  unit6,
} from '../../../../../utils/appUnit';

interface ListNewsItemProps extends PressableProps {
  title: string;
  imageUri: string;
  content: string;
}

const ListNewsItem: React.FC<ListNewsItemProps> = props => {
  const {title, imageUri, content} = props;

  return (
    <PressView
      {...props}
      style={{
        width: '100%',
        // backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'flex-start',
        // marginVertical: unit5,
        borderBottomWidth: 1,
        borderBottomColor: AppColors.light_grey,
        padding: unit10,
      }}>
      <View
        style={{
          flexGrow: 1,
          // backgroundColor: "blue",
          // paddingHorizontal: unit10,
          paddingRight: unit12,
          // paddingVertical: unit10,
          maxHeight: '100%',
          maxWidth: '70%',
        }}>
        <AppText
          style={{
            fontSize: unit20,
            color: AppColors.black,
          }}
          fontType="bold">
          {title}
        </AppText>
        <AppText
          style={{
            fontSize: unit14,
            color: AppColors.dark_grey,
            marginTop: unit6,
          }}>
          {content}
        </AppText>
      </View>
      <AppImage
        style={{
          width: '30%',
          aspectRatio: 1,
          borderRadius: unit5,
        }}
        source={{uri: imageUri}}
      />
    </PressView>
  );
};

export default ListNewsItem;
