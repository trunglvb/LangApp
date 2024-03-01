import Slider from '@react-native-community/slider';
import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppColors from '../../../../styles/AppColors';
import ChoseColor from './components/ChoseColor';
import ChoseFont from './components/ChoseFont';
import TocSettings from './components/TocSettings';
import {IReadSettings} from './readerTypes';

const Settings = (props: IReadSettings) => {
  return (
    <>
      {props.isVisible && (
        <SafeAreaView style={styles.wrap}>
          <ScrollView style={styles.constainer}>
            <View style={styles.content}>
              <MaterialCommunityIcons
                name="format-font-size-decrease"
                size={24}
                color="gray"
              />
              <Slider
                style={styles.slider}
                minimumValue={0}
                onValueChange={value => {
                  props.changeFontSize(`${value}px`);
                  props.setFontSize(value);
                }}
                maximumValue={40}
                thumbTintColor="gray"
                step={1}
                value={props.fontSize}
                tapToSeek={true}
                minimumTrackTintColor="gray"
                maximumTrackTintColor="#fff"
              />
              <MaterialCommunityIcons
                name="format-font-size-increase"
                size={24}
                color="gray"
              />
            </View>

            <ChoseFont
              setFontFamily={props.setFontFamily}
              fontFamily={props.fontFamily}
              changeFontFamily={props.changeFontFamily}
            />

            <ChoseColor
              theme={props.theme}
              setTheme={props.setTheme}
              changeTheme={props.changeTheme}
            />

            <TocSettings
              toc={props.toc}
              theme={props.theme}
              goToLocation={props.goToLocation}
              setIsVisible={props.setIsVisible}
            />
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    height: '70%',
    width: '100%',
    zIndex: 10,
    bottom: 0,
  },
  constainer: {
    padding: 10,
    backgroundColor: AppColors.light_grey2,
    height: '100%',
    width: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  slider: {width: 300, height: 50},
});

export default Settings;
