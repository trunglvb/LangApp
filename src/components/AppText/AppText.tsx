import React, {useMemo} from 'react';
import {Text, TextProps} from 'react-native';
import AppColors from '../../styles/AppColors';

export type AppFontType = 'bold' | 'regular' | 'semiBold' | 'medium';

interface AppTextProps extends TextProps {
  fontType?: AppFontType;
}

const AppText: React.FC<AppTextProps> = props => {
  let {children, fontType} = props;

  const weight = useMemo(() => {
    switch (fontType) {
      case 'bold':
        return '700';
      case 'semiBold':
        return '600';
      case 'medium':
        return '500';
      case 'regular':
        return '400';
      default:
        return '400';
    }
  }, [fontType]);

  return (
    <Text
      style={[
        {
          fontWeight: weight,
          color: AppColors.black,
        },
        props.style,
      ]}>
      {children}
    </Text>
  );
};

export default AppText;
