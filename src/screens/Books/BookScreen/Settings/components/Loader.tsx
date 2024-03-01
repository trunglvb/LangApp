import React from 'react';
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleSheet,
} from 'react-native';

interface LoaderProps extends ActivityIndicatorProps {}

const Loader: React.FC<LoaderProps> = props => {
  return (
    <ActivityIndicator
      color="#702DF5"
      style={[styles.content, props.style]}
      size={'large'}
      {...props}
    />
  );
};

export const styles = StyleSheet.create({
  content: {height: '100%', justifyContent: 'center', alignItems: 'center'},
});

export default Loader;
