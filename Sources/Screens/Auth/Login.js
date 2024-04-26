import { ScrollView, StyleSheet, View } from 'react-native';
import {
  RNImage,
  RNStyles,
  RNText,
  LIOnboardingIcon,
  LIInput,
} from '../../Common';
import { Colors, FontFamily, FontSize, hp, wp } from '../../Theme';
import { Images } from '../../Constants';
import { useInset } from '../../Hooks';

const Login = () => {
  const styles = useStyles();

  return (
    <View style={RNStyles.container}>
      <ScrollView>
        <RNImage source={Images.appIcon} style={styles.appIcon} />

        <LIOnboardingIcon />

        <View style={styles.content}>
          <RNText style={styles.title}>{'Login'}</RNText>
          <RNText style={styles.description}>
            {'Log In Now To Begin An Amazing Journey.'}
          </RNText>

          <LIInput />
          <LIInput />
        </View>
      </ScrollView>
    </View>
  );
};

const useStyles = () => {
  const inset = useInset();

  return StyleSheet.create({
    appIcon: {
      width: wp(50),
      height: hp(6),
      alignSelf: 'center',
      marginTop: inset.top + hp(1),
    },
    content: {
      borderWidth: 1,
      paddingHorizontal: wp(4),
    },
    title: {
      fontSize: FontSize.font24,
      fontFamily: FontFamily.Bold,
      color: Colors.Primary,
      paddingVertical: hp(1),
    },
    description: {
      fontSize: FontSize.font12,
    },
  });
};

export default Login;
