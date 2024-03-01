/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, PressableProps, View} from 'react-native';
import AppText from '../../../../../components/AppText/AppText';
import PressView from '../../../../../components/PressView/PressView';
import AppColors from '../../../../../styles/AppColors';
import {
  fontSize18,
  unit10,
  unit15,
  unit20,
  unit25,
  unit26,
  unit30,
  unit34,
  unit4,
} from '../../../../../utils/appUnit';

export interface LearnItemProps extends PressableProps {
  id: number;
  name: string;
  icon: any;
}

const LearnItem: React.FunctionComponent<LearnItemProps> = props => {
  const {name, onPress, icon} = props;
  // const { authData } = useAuth();

  return (
    <PressView {...props}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: AppColors.white,
          paddingHorizontal: unit26,
          paddingVertical: unit20,
          marginBottom: unit15,
          marginHorizontal: unit25,
          borderRadius: unit20,
        }}>
        <Image
          style={{
            width: unit34,
            aspectRatio: 1,
            borderRadius: unit4,
          }}
          source={icon}
        />
        <View style={{marginStart: unit30, flex: 1}}>
          <AppText
            style={{
              fontSize: fontSize18,
              color: AppColors.black,
            }}
            fontType={'medium'}>
            {name}
          </AppText>
        </View>
      </View>
    </PressView>
  );
};

export default LearnItem;
