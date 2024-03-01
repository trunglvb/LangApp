import React, {useEffect} from 'react';
import {FlatList, FlatListProps, View} from 'react-native';
import {isListEqual} from '../../../utils/Utils';
import {unit16, unit20, unit8} from '../../../utils/appUnit';
import VocabListItem from './VocabListItem';
import {getUserDetails} from '../../../network/services/auth.apis';
import useAuth from '../../../hooks/useAuth';
import {useIsFocused} from '@react-navigation/native';
import {useAppDispatch} from '../../../store/store';
import {setVocabsUser} from '../../../store/slice/authSlice';

interface HorizontalListCastViewProps extends Partial<FlatListProps<any>> {
  list: any[];
  sourceImage?: any;
}
const onRenderSeparatorComponent = () => {
  return <View style={{width: unit16}} />;
};
const HorizontalListView: React.FC<HorizontalListCastViewProps> = props => {
  const dispatch = useAppDispatch();
  const {list, sourceImage} = props;
  const {authData} = useAuth();
  const isFocus = useIsFocused();

  useEffect(() => {
    getUserDetails(authData?.user?._id as string).then(res => {
      dispatch(setVocabsUser(res?.data.vocabs));
    });
  }, [isFocus]);

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
      ItemSeparatorComponent={onRenderSeparatorComponent}
      renderItem={({item}) => {
        return <VocabListItem item={item} sourceImage={sourceImage!} />;
      }}
    />
  );
};

export default React.memo(HorizontalListView, (prev, next) => {
  return isListEqual(prev.list, next.list, (itemA, itemB) => {
    return itemA.id === itemB.id;
  });
});
