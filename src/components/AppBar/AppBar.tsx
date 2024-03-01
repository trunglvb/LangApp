/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ImageStyle,
  Platform,
  StatusBar,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {NavigationRef} from '../../../App';
import AppColors from '../../styles/AppColors';
import {
  dimension,
  unit10,
  unit16,
  unit18,
  unit2,
  unit20,
  unit25,
  unit4,
  unit50,
  unit6,
  unit8,
} from '../../utils/appUnit';
import PressView from '../PressView/PressView';

type AppBarProps = {
  title: string;
  titleType?: 'center' | 'left';
  titleStyle?: StyleProp<TextStyle>;
  leftIcon?: any;
  leftIconStyle?: StyleProp<ImageStyle>;
  leftIconOnClick?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  rightIcon?: React.ReactNode;
  onPress?: any;
};

const AppBar: React.FC<AppBarProps> = ({
  containerStyle,
  title,
  titleStyle,
  titleType,
  leftIcon,
  leftIconStyle,
  leftIconOnClick,
  rightIcon,
  onPress,
}) => {
  const navigation = NavigationRef.current;

  if (!leftIconOnClick) {
    leftIconOnClick = () => {
      navigation?.goBack();
      if (onPress) {
        onPress();
      }
    };
  }
  const isCenter = titleType === 'center';

  return (
    <View style={[styles.container, containerStyle]}>
      <StatusBar translucent={true} backgroundColor={AppColors.white} />
      {leftIcon && (
        <PressView
          onPress={leftIconOnClick}
          style={[
            leftIconStyle,
            {
              zIndex: 1, // make sure title not over rightIcon
              position: isCenter ? 'absolute' : 'relative',
              marginStart: isCenter ? unit16 : 0,
              padding: unit6,
            },
          ]}>
          <View style={styles.leftIcon}>{leftIcon}</View>
        </PressView>
      )}
      <View
        style={{
          minWidth: dimension.width - unit50 * 2,
          marginLeft: unit25,
          // backgroundColor: 'green',
        }}>
        <Text
          style={[
            styles.title,
            titleStyle,
            {
              textAlign: isCenter ? 'center' : 'left',
            },
          ]}>
          {title}
        </Text>
      </View>
      {rightIcon}
    </View>
  );
};

AppBar.defaultProps = {
  leftIcon: undefined,
  titleType: 'center',
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop:
      (Platform.OS === 'android' ? StatusBar.currentHeight || 0 : unit10) +
      unit8,
    paddingVertical: unit18,
    paddingHorizontal: unit16,
    alignItems: 'center',
    backgroundColor: AppColors.light_grey,
  },
  title: {
    fontSize: unit20,
    flexGrow: 1,
    fontWeight: '500',
    paddingHorizontal: unit10,
    marginLeft: unit8,
    color: AppColors.black,
    marginTop: Platform.OS === 'android' ? unit4 : 0,
  },
  leftIcon: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export default AppBar;
