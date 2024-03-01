/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {IChoseFont} from './settingsTypes';
import AppText from '../../../../../components/AppText/AppText';

const ChoseFont = (props: IChoseFont) => {
  return (
    <View
      style={{
        width: '100%',
        marginTop: 20,
      }}>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 12,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => {
            props.changeFontFamily('Arial');
            props.setFontFamily('Arial');
          }}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Ionicons
            name="md-text"
            size={34}
            style={{
              color: props.fontFamily == 'Arial' ? '#702DF5' : 'white',
            }}
          />
          <AppText
            style={{
              color: props.fontFamily == 'Arial' ? '#702DF5' : 'gray',
              fontSize: 16,
            }}>
            Arial Serif
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.changeFontFamily('Verdana');
            props.setFontFamily('Verdana');
          }}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Ionicons
            name="ios-text-sharp"
            size={34}
            style={{
              color: props.fontFamily == 'Verdana' ? '#702DF5' : 'white',
            }}
          />
          <AppText
            style={{
              color: props.fontFamily == 'Verdana' ? '#702DF5' : 'gray',
              fontSize: 16,
            }}>
            Verdana
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.changeFontFamily('Times New Roman');
            props.setFontFamily('Times New Roman');
          }}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Ionicons
            name="ios-text-outline"
            size={34}
            style={{
              color:
                props.fontFamily == 'Times New Roman' ? '#702DF5' : 'white',
            }}
          />
          <AppText
            style={{
              color: props.fontFamily == 'Times New Roman' ? '#702DF5' : 'gray',
              fontSize: 16,
            }}>
            Times Roman
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChoseFont;
