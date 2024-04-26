import { StyleSheet, View } from 'react-native';
import RNImage from './RNImage';
import { hp, wp } from '../Theme';
import { Images } from '../Constants';

const LIOnboardingIcon = () => {
  return (
    <View style={styles.onboardingContainer}>
      <RNImage source={Images.circle} style={styles.leftCircle} />
      <RNImage source={Images.circle} style={styles.rightCircle} />
      <RNImage
        source={Images.onboarding}
        resizeMode={'stretch'}
        style={styles.onboarding}
      />
    </View>
  );
};

const circle = wp(40);
const styles = StyleSheet.create({
  onboarding: {
    width: wp(80),
    height: hp(27),
    marginVertical: hp(3),
    alignSelf: 'center',
  },
  leftCircle: {
    width: circle,
    height: circle,
    position: 'absolute',
    left: -wp(6),
    bottom: hp(4),
  },
  rightCircle: {
    width: circle - wp(12),
    height: circle - wp(12),
    position: 'absolute',
    right: -wp(4),
    top: hp(8),
  },
});

export default LIOnboardingIcon;
