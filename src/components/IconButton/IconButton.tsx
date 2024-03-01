import * as React from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  PressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import PressView from '../PressView/PressView';

interface IconButtonProps extends PressableProps {
  icon: ImageSourcePropType;
  iconStyle?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

const IconButton: React.FunctionComponent<IconButtonProps> = props => {
  const {icon, iconStyle, containerStyle} = props;
  return (
    <PressView style={containerStyle} {...props}>
      <Image source={icon} style={[{}, iconStyle]} />
    </PressView>
  );
};

export default IconButton;
