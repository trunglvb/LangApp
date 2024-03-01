/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppBar from '../../../components/AppBar/AppBar';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppColors from '../../../styles/AppColors';
import {unit10, unit14, unit16} from '../../../utils/appUnit';
import WebView from 'react-native-webview';

const GrammarScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AppBar
        leftIcon={
          <Icon
            style={{
              fontSize: unit16,
            }}
            name={'arrow-left'}
          />
        }
        title={'Grammar'}
        titleStyle={{
          fontSize: unit16,
        }}
        containerStyle={{
          backgroundColor: AppColors.light_grey,
        }}
      />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: AppColors.light_grey,
          paddingLeft: unit10,
          paddingRight: unit10,
        }}>
        <View>
          <WebView
            source={{
              html: `
                <div class="parentDiv">
                  <p>para-1</p>
                  <p>para-2</p>
                  <p>para-3</p>
                </div>
              `,
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.light_grey,
  },
});
export default GrammarScreen;
