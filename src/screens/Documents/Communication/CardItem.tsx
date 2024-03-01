/* eslint-disable react-native/no-inline-styles */
//import liraries
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import AppColors from '../../../styles/AppColors';
import {unit13, unit14, unit16, unit4, unit8} from '../../../utils/appUnit';
import {ISentenseModel} from '../../../model/SentenseModel';
import Icon from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {updateSentenceChecked} from '../../../network/services/sentence';
import AppText from '../../../components/AppText/AppText';

interface ICardItemProps {
  item: ISentenseModel;
}
const CardItem = (props: ICardItemProps) => {
  const {item} = props;
  const [isChecked, setIsChecked] = useState<boolean>(item?.isChecked);

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <AppText style={{fontSize: unit14, marginBottom: unit4}}>
          {item?.sentence}
        </AppText>
        <AppText
          style={{
            color: AppColors.purple,
            fontSize: unit13,
            marginRight: unit8,
          }}>
          {item?.mean}
        </AppText>
      </View>
      <TouchableOpacity
        style={{marginRight: unit8, flexShrink: 0}}
        onPress={() => {
          setIsChecked(!isChecked);
          updateSentenceChecked(item?._id, !isChecked);
        }}>
        <Icon
          style={{
            fontSize: unit16,
          }}
          color={AppColors.purple}
          name={isChecked ? 'heart' : 'hearto'}
        />
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderRadius: unit8,
    borderColor: AppColors.light_grey2,
    padding: unit8,
    marginBottom: unit8,
    shadowColor: AppColors.purple,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
});

//make this component available to the app
export default CardItem;
