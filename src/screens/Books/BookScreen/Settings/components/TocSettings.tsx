import React from 'react';
import {Text, View} from 'react-native';
import AppText from '../../../../../components/AppText/AppText';
import PressView from '../../../../../components/PressView/PressView';
import {IToc} from './settingsTypes';

const TocSettings = (props: IToc) => {
  return (
    <View
      style={{
        marginVertical: 16,
      }}>
      <Text
        style={{
          color: 'black',
          fontSize: 24,
          lineHeight: 32,
          marginBottom: 16,
        }}>
        Characters
      </Text>
      {props.toc.map(toc => (
        <PressView
          onPress={() => {
            props.goToLocation(toc.href);
            props.setIsVisible(false);
          }}
          key={toc.id}
          style={{
            backgroundColor: 'white',
            // props.theme.body.background == '#121212' ? 'gray' : '#1E212C',
            paddingHorizontal: 16,
            paddingVertical: 8,
            margin: 0,
            // minHeight: 40,
            // justifyContent: 'center',
            borderRadius: 8,
            // paddingLeft: 16,
            marginBottom: 8,
          }}>
          <AppText
            style={{
              color: 'black',
              textAlign: 'left',
              fontSize: 18,
              // margin: 0,
            }}>
            {toc.label.trim()}
          </AppText>
        </PressView>
      ))}
    </View>
  );
};

export default TocSettings;
