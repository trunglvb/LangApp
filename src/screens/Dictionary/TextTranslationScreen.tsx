/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import AppBar from '../../components/AppBar/AppBar';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {unit10, unit14, unit15, unit16} from '../../utils/appUnit';
import AppColors from '../../styles/AppColors';
import MultilineTextInput from '../../components/MultilineTextInput';
import {
  getTranslationEnVi,
  getTranslationViEn,
} from '../../network/services/dictionaryvien.apis';
import AppText from '../../components/AppText/AppText';
import LinearGradient from 'react-native-linear-gradient';

const TextTranslationScreen = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [resultViEn, setResultViEn] = useState<string>('');
  const [isViEnLoading, setIsViEnLoading] = useState<boolean>(false);

  const [isEnViLoading, setIsEnViLoading] = useState<boolean>(false);

  const handleTranslateViEn = () => {
    setIsViEnLoading(true);
    getTranslationViEn({text: searchValue})
      .then(res => {
        setIsViEnLoading(false);
        if (res?.data?.from?.language?.iso === 'vi') {
          setResultViEn(res?.data?.text ?? '');
        } else {
          setResultViEn('');
        }
      })
      .catch(_err => {
        setIsViEnLoading(false);
        setResultViEn('Không có kết quả');
      });
  };

  const handleTranslateEnVi = () => {
    setIsEnViLoading(true);
    getTranslationEnVi({text: searchValue})
      .then((res: any) => {
        if (res?.data?.from?.language?.iso === 'en') {
          setIsEnViLoading(false);
          setResultViEn(res?.data?.text ?? '');
        } else {
          setIsEnViLoading(false);
          setResultViEn('');
        }
      })
      .catch(_err => {
        setIsEnViLoading(false);
        setResultViEn('No data');
      });
  };

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
        title={'Text Translation'}
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
        <MultilineTextInput
          autoCapitalize={'none'}
          value={searchValue}
          onChangeText={value => {
            setSearchValue(value);
          }}
        />

        <View style={styles.buttonWrap}>
          <TouchableOpacity
            disabled={!searchValue.trim()}
            style={[
              styles.buttonContent,
              {opacity: !searchValue.trim() || isViEnLoading ? 0.7 : 1},
            ]}
            onPress={() => {
              handleTranslateViEn();
            }}>
            {isViEnLoading && (
              <ActivityIndicator
                size={'small'}
                color={AppColors.white}
                style={{
                  position: 'absolute',
                  zIndex: 1000,
                }}
              />
            )}
            <LinearGradient
              style={{
                width: 150,
                padding: unit14,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: unit10,
              }}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              colors={[
                AppColors.purple_gradient_1,
                AppColors.purple_gradient_2,
              ]}>
              <AppText style={styles.buttonText}>Viet-Eng</AppText>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={!searchValue.trim()}
            style={[
              styles.buttonContent,
              {opacity: !searchValue.trim() || isEnViLoading ? 0.7 : 1},
            ]}
            onPress={() => {
              handleTranslateEnVi();
            }}>
            {isEnViLoading && (
              <ActivityIndicator
                size={'small'}
                color={AppColors.white}
                style={{
                  position: 'absolute',
                  zIndex: 1000,
                }}
              />
            )}
            <LinearGradient
              style={{
                width: 150,
                padding: unit14,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: unit10,
              }}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              colors={[
                AppColors.purple_gradient_1,
                AppColors.purple_gradient_2,
              ]}>
              <AppText style={styles.buttonText}>Eng-Viet</AppText>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {resultViEn ? (
          <MultilineTextInput
            autoCapitalize={'none'}
            value={resultViEn}
            editable={false}
            inputContainerStyle={
              {
                // backgroundColor: AppColors.smoke,
              }
            }
          />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.light_grey,
  },
  buttonWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: unit15,
    marginBottom: unit16,
  },
  buttonContent: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.purple,
    // padding: unit14,
    width: 150,
    borderRadius: unit10,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: unit14,
    color: AppColors.white,
  },
});
export default TextTranslationScreen;
