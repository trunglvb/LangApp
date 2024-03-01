/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import FastImage, {FastImageProps} from 'react-native-fast-image';

import {Image} from 'react-native';
import {IMG_NO_IMAGE} from '../../assets/path';
import useScreenState from '../../hooks/useScreenState';

interface AppImageProps extends FastImageProps {}

const AppImage: React.FC<AppImageProps> = props => {
  const {error, setError} = useScreenState();
  const {source} = props;

  useEffect(() => {
    if (typeof source !== 'number') {
      if (!source?.uri) {
        setError(new Error('Url can not be null'));
        return;
      }

      Image.getSize(
        source.uri,
        (_width, _height) => {
          setError(undefined);
        },
        () => {
          setError(new Error('Image load Fail'));
        },
      );
    } else {
      setError(new Error('Image load Fail'));
    }
  }, []);

  return (
    <FastImage
      resizeMode={'cover'}
      {...props}
      source={error ? IMG_NO_IMAGE : source}
    />
  );
};

export default AppImage;
