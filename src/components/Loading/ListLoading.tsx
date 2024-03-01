import LottieView from 'lottie-react-native';
import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View, ViewProps} from 'react-native';
import {LIST_LOADING} from '../../assets/path';
import AppColors from '../../styles/AppColors';
import {unit100} from '../../utils/appUnit';

interface ListLoadingProps extends ViewProps {
  isOverlay?: boolean;
}

function ListLoading(props: ListLoadingProps) {
  const {isOverlay} = props;
  const overlayStyle = isOverlay ? StyleSheet.absoluteFill : undefined;

  const progress = useRef(new Animated.Value(0)).current;

  const handleLikeAnimation = () => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    handleLikeAnimation();
  }, []);

  return (
    <View
      {...props}
      style={[
        styles.container,
        {
          backgroundColor: isOverlay ? undefined : AppColors.transparent,
        },
        overlayStyle,
      ]}>
      <LottieView
        speed={0.1}
        style={styles.loadingView}
        source={LIST_LOADING}
        autoPlay
        progress={progress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingView: {
    width: unit100,
  },
});

export default React.memo(ListLoading);
