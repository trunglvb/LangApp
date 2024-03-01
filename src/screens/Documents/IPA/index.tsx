/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View, Image} from 'react-native';
import AppBar from '../../../components/AppBar/AppBar';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppColors from '../../../styles/AppColors';
import {unit12, unit14, unit16, unit8} from '../../../utils/appUnit';
import CollapseView from '../../../components/CollapseView';
import {CONSONANTS, DIPHTHONGS, VOWELS} from '../../../utils/Utils';
import {ipa_summary} from '../../../assets/path';
import AppText from '../../../components/AppText/AppText';
const IPAScreen = () => {
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
        title={'International Phonetic Alphabet'}
        titleStyle={{
          fontSize: unit16,
        }}
        containerStyle={{
          backgroundColor: AppColors.light_grey,
          borderBottomWidth: 1,
          borderBottomColor: AppColors.light_grey2,
        }}
      />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: AppColors.light_grey,
        }}>
        <View style={{padding: unit12}}>
          <AppText
            style={{fontSize: unit16, fontWeight: '600', marginBottom: unit8}}>
            1. Nguyên âm đơn (Vowels)
          </AppText>

          {VOWELS.map(item => (
            <CollapseView item={item} key={item?.title} />
          ))}
          <AppText
            style={{
              fontSize: unit16,
              fontWeight: '600',
              marginBottom: unit8,
              marginTop: unit8,
            }}>
            2. Nguyên âm đôi (Diphthongs)
          </AppText>

          {DIPHTHONGS.map(item => (
            <CollapseView item={item} key={item?.title} />
          ))}
          <AppText
            style={{
              fontSize: unit16,
              fontWeight: '600',
              marginBottom: unit8,
              marginTop: unit8,
            }}>
            3. Phụ âm (Consonants)
          </AppText>

          {CONSONANTS.map(item => (
            <CollapseView item={item} key={item?.title} />
          ))}
          <AppText
            style={{
              fontSize: unit16,
              fontWeight: '600',
              marginTop: unit8,
            }}>
            4: Biểu đồ IPA (IPA Chart)
          </AppText>
          <Image
            source={ipa_summary}
            style={{
              width: '100%',
              height: 250,
              resizeMode: 'contain',
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
export default IPAScreen;
