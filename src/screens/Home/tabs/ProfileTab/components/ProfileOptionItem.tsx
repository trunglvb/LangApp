import React from 'react';
import {Image, ImageSourcePropType, PressableProps, View} from 'react-native';
import AppText from '../../../../../components/AppText/AppText';
import PressView from '../../../../../components/PressView/PressView';
import AppColors from '../../../../../styles/AppColors';
import AppStyles from '../../../../../styles/AppStyles';
import {unit12} from '../../../../../utils/appUnit';
import styles from '../styles';

interface ProfileOptionItemProps extends PressableProps {
  optionTitle: string;
  rightIcon: ImageSourcePropType;
  leftIcon: ImageSourcePropType;
}

const ProfileOptionItem: React.FC<ProfileOptionItemProps> = props => {
  const {optionTitle, rightIcon, leftIcon} = props;
  return (
    <PressView
      {...props}
      style={[
        styles.logoutBtn,
        {
          borderRadius: 0,
          shadowColor: AppColors.transparent,
          margin: 0,
          padding: 0,
        },
      ]}>
      <View style={AppStyles.alignRow}>
        <Image
          style={[
            AppStyles.icon24,
            {
              marginEnd: unit12,
              tintColor: AppColors.dark_grey,
            },
          ]}
          source={leftIcon}
        />
        <AppText fontType={'medium'} style={styles.logoutText}>
          {optionTitle}
        </AppText>
      </View>
      <Image style={AppStyles.icon24} source={rightIcon} />
    </PressView>
  );
};

export default ProfileOptionItem;
