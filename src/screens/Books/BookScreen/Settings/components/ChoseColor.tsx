import {Theme} from '@epubjs-react-native/core';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {IChoseColor} from './settingsTypes';
import {dark, light, sepia} from '../../themes/Theme';

const ChoseColor = (props: IChoseColor) => {
  const {changeTheme} = props;
  return (
    <View
      style={{
        width: '100%',
        marginTop: 16,
      }}>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 12,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={{
            borderWidth: props.theme.body.background == '#121212' ? 3 : 0,
            backgroundColor: '#121212',
            padding: 40,
            borderRadius: 9999,
          }}
          onPress={() => {
            changeTheme(dark);
          }}></TouchableOpacity>
        <TouchableOpacity
          style={{
            // borderWidth: props.theme.body.background == '#fff' ? 3 : 0,
            backgroundColor: 'white',
            padding: 40,
            borderRadius: 9999,
          }}
          onPress={() => {
            changeTheme(light);
          }}></TouchableOpacity>
        <TouchableOpacity
          style={{
            borderWidth: props.theme.body.background == '#e8dcb8' ? 3 : 0,
            backgroundColor: '#e8dcb8',
            padding: 40,
            borderRadius: 9999,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            changeTheme(sepia);
          }}></TouchableOpacity>
      </View>
    </View>
  );
};

export default ChoseColor;
