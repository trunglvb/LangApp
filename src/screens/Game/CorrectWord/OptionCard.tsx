/* eslint-disable react-native/no-inline-styles */
//import liraries
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import AppColors from '../../../styles/AppColors';
import {unit10, unit12, unit14, unit8} from '../../../utils/appUnit';
import LinearButton from '../../../components/LinearButton/LinearButton';

interface IItemProps {
  key: string;
  title: string;
}
interface ICardItemProps {
  data: any;
  item: IItemProps;
  setOption: any;
  activeId: string;
  setActiveId: any;
}
const OptionCard = (props: ICardItemProps) => {
  const {item, setOption, data, activeId, setActiveId} = props;

  return (
    <View style={styles.container}>
      <LinearButton
        buttonTitle={item?.title}
        linearStyle={[
          styles.button,
          {
            borderWidth: 1,
            borderColor:
              activeId === item?.key ? AppColors.white : AppColors.light_grey2,
          },
        ]}
        titleStyle={[
          styles.buttonText,
          {
            color: activeId === item?.key ? AppColors.white : AppColors.black,
            fontWeight: 'normal',
            fontSize: unit14,
          },
        ]}
        linearColors={
          activeId === item?.key
            ? [AppColors.purple, AppColors.purple_gradient_2]
            : [AppColors.white, AppColors.white]
        }
        onPress={() => {
          setActiveId(item?.key);
          setOption({
            ...data,
            key: item?.key,
            title: item?.title,
          });
        }}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    marginRight: unit8,
  },
  button: {
    padding: unit10,
    borderRadius: unit8,
    marginBottom: unit8,
    width: '100%',
  },
  buttonText: {
    fontSize: unit14,
    fontWeight: '600',
  },
});

//make this component available to the app
export default OptionCard;
