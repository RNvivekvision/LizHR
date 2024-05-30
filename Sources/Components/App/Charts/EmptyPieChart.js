import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Colors, hp, wp } from '../../../Theme';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const EmptyPieChart = ({ size, color }) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, {
      duration: 2000,
      easing: Easing.inOut(Easing.ease),
    });
  }, []);

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: 2 * Math.PI * 50 * (1 - progress.value),
    };
  });

  return (
    <View style={styles.container}>
      <Svg
        width={wp(size)}
        height={hp(size / 2.1)}
        viewBox={`0 0 120 120`}
        style={{ transform: [{ rotate: '-90deg' }] }} // Rotate the SVG
      >
        <Circle
          cx="60"
          cy="60"
          r="50"
          stroke={Colors.chart.total}
          strokeWidth="2"
          fill="none"
        />
        <AnimatedCircle
          cx="60"
          cy="60"
          r="50"
          stroke={color ?? Colors.chart.present}
          strokeWidth="2"
          fill="none"
          strokeDasharray={2 * Math.PI * 50}
          animatedProps={animatedProps}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    position: 'absolute',
    zIndex: 1,
  },
});

export default EmptyPieChart;
