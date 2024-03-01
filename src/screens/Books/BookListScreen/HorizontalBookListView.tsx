import React from 'react';
import {
  FlatList,
  FlatListProps,
  Image,
  View,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import {NavigationRef} from '../../../../App';
import AppText from '../../../components/AppText/AppText';
import PressView from '../../../components/PressView/PressView';
import AppColors from '../../../styles/AppColors';
import {isListEqual} from '../../../utils/Utils';
import {
  fontSize16,
  unit12,
  unit14,
  unit16,
  unit20,
  unit8,
} from '../../../utils/appUnit';

interface HorizontalBookListViewProps extends Partial<FlatListProps<any>> {
  list: any[];
}
const HorizontalBookListView: React.FC<HorizontalBookListViewProps> = props => {
  const {list} = props;

  const onRenderItemSeparotor = () => {
    return <View style={{width: unit16}} />;
  };
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
      ItemSeparatorComponent={onRenderItemSeparotor}
      renderItem={({item, index}) => {
        return <BookItem item={item} key={index} />;
      }}
    />
  );
};

export default React.memo(HorizontalBookListView, (prev, next) => {
  return isListEqual(prev.list, next.list, (itemA, itemB) => {
    return itemA.id === itemB.id;
  });
});

interface BookItemProps {
  item: any;
}

const BookItem: React.FC<BookItemProps> = props => {
  const {item} = props;
  const {width} = useWindowDimensions();
  return (
    <PressView
      onPress={() => {
        NavigationRef.current?.navigate('BookDetailScreen', {
          bookId: item._id,
        });
      }}>
      <View style={(styles.container, [{width: 0.4 * width}])}>
        <View style={styles.imageWrap}>
          <Image
            style={
              (styles.imageContent,
              [{height: 0.5 * width, borderRadius: unit12}])
            }
            source={{
              uri: item?.image,
            }}
          />
        </View>

        <AppText
          fontType={'medium'}
          style={{
            marginTop: unit14,
            marginHorizontal: unit12,
            fontSize: fontSize16,
            color: AppColors.black,
          }}>
          {item.title}
        </AppText>
      </View>
    </PressView>
  );
};

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: unit20,
    marginBottom: unit20,
  },
  imageWrap: {position: 'relative', width: '100%'},
  imageContent: {width: '100%'},
});
