import { StyleSheet, View } from 'react-native';
import { hp, wp } from '../../Theme';
import { Images } from '../../Constants';
import { useInset } from '../../Hooks';
import { RNImage } from '../../Common';

const LIOnboardingIcon = () => {
  const styles = useStyles();
  return (
    <View>
      <RNImage source={Images.appIcon} style={styles.appIcon} />

      <View style={styles.onboardingContainer}>
        <RNImage source={Images.circle} style={styles.leftCircle} />
        <RNImage source={Images.circle} style={styles.rightCircle} />
        <RNImage
          source={Images.onboarding}
          resizeMode={'stretch'}
          style={styles.onboarding}
        />
      </View>
    </View>
  );
};

const circle = wp(40);
const useStyles = () => {
  const inset = useInset();
  return StyleSheet.create({
    onboarding: {
      width: wp(70),
      height: wp(52),
      marginVertical: hp(3),
      alignSelf: 'center',
    },
    appIcon: {
      width: wp(50),
      height: hp(6),
      alignSelf: 'center',
      marginTop: inset.top + hp(1),
    },
    leftCircle: {
      width: circle,
      height: circle,
      position: 'absolute',
      left: -wp(6),
      bottom: hp(2),
    },
    rightCircle: {
      width: circle - wp(12),
      height: circle - wp(12),
      position: 'absolute',
      right: -wp(4),
      top: hp(6),
    },
  });
};

export default LIOnboardingIcon;
