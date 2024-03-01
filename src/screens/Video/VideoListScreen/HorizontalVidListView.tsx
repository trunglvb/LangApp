import React from 'react';
import {FlatList, FlatListProps, View, useWindowDimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {NavigationRef} from '../../../../App';
import AppImage from '../../../components/AppImage/AppImage';
import AppText from '../../../components/AppText/AppText';
import PressView from '../../../components/PressView/PressView';
import AppColors from '../../../styles/AppColors';
import {isListEqual} from '../../../utils/Utils';
import {unit16, unit20, unit8} from '../../../utils/appUnit';

interface HorizontalBookListViewProps extends Partial<FlatListProps<any>> {
  list: any[];
}
const HorizontalBookListView: React.FC<HorizontalBookListViewProps> = props => {
  const {list} = props;
  const renderSeparatorView = () => <View style={{width: unit16}} />;
  return (
    <FlatList
      {...props}
      overScrollMode={'never'}
      data={list}
      horizontal
      keyExtractor={(item, index) => String(item.id + '_' + index)}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[
        props.contentContainerStyle,
        {
          paddingHorizontal: unit20,
          paddingVertical: unit8,
        },
      ]}
      ItemSeparatorComponent={renderSeparatorView}
      renderItem={({item, index}) => {
        return <VideoListItem item={item} />;
      }}
    />
  );
};

export default React.memo(HorizontalBookListView, (prev, next) => {
  return isListEqual(prev.list, next.list, (itemA, itemB) => {
    return itemA.id === itemB.id;
  });
});

interface VideoListItemProps {
  item: any;
}

const VideoListItem: React.FC<VideoListItemProps> = props => {
  const {item} = props;
  const {width} = useWindowDimensions();
  return (
    <PressView
      onPress={() => {
        NavigationRef.current?.navigate('VideoDetailScreen', {
          videoId: item.id.videoId,
          videoTitle: item?.snippet?.title,
          videoDescription: item?.snippet?.description,
        });
      }}>
      <View
        style={{
          width: width * 0.6,
          alignItems: 'flex-start',
          position: 'relative',
        }}>
        <View
          style={{
            width: '100%',
            height: 160,
            position: 'relative',
          }}>
          <AppImage
            source={{uri: item?.snippet?.thumbnails?.high?.url}}
            resizeMode="cover"
            // source={{
            //   uri: 'https://www.schoolnetindia.com/blog/wp-content/uploads/2022/07/How-to-Learn-English-Speaking-at-Home-960x540.jpg',
            // }}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 20,
              opacity: 0.85,
            }}
          />
          <View
            style={{
              position: 'absolute',
              backgroundColor: AppColors.transparent,
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon
              name="play"
              style={{
                color: AppColors.white,
                fontSize: 30,
              }}
            />
          </View>
        </View>
        <View
          style={{
            width: '100%',
            paddingHorizontal: 16,
            paddingTop: 16,
          }}>
          <AppText
            style={{
              fontSize: 17,
              fontWeight: '600',
            }}>
            {item?.snippet?.title}
          </AppText>
        </View>
      </View>
    </PressView>
  );
};
