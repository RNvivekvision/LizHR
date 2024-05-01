import { ScrollView, StyleSheet, View } from 'react-native';
import { RNText, RNContainer, RNKeyboardAvoid, RNButton } from '../../Common';
import { DontHaveAccount, LIInput, LIOnboardingIcon } from '../../Components';
import { Colors, FontFamily, FontSize, hp, wp } from '../../Theme';
import { NavRoutes } from '../../Navigation';

const ForgotPassword = ({ navigation }) => {
  const styles = useStyles();

  const onGetCodePress = () => {
    navigation.navigate(NavRoutes.VerifyCode);
  };

  return (
    <RNContainer barStyle={'dark-content'}>
      <RNKeyboardAvoid>
        <ScrollView showsVerticalScrollIndicator={false}>
          <LIOnboardingIcon />

          <View style={styles.content}>
            <RNText style={styles.title}>{'Forgot Password'}</RNText>
            <RNText style={styles.description}>
              {`Forgot your password let's change it.`}
            </RNText>

            <LIInput
              title={'Email'}
              placeholder={'Enter your email'}
              keyboardType={'email-address'}
              returnKeyType={'done'}
            />

            <RNButton
              title={'Get Code'}
              style={styles.button}
              onPress={onGetCodePress}
            />

            <DontHaveAccount />
          </View>
        </ScrollView>
      </RNKeyboardAvoid>
    </RNContainer>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    content: {
      paddingHorizontal: wp(4),
      flex: 1,
    },
    title: {
      fontSize: FontSize.font24,
      fontFamily: FontFamily.Bold,
      color: Colors.Primary,
      paddingVertical: hp(1),
    },
    description: {
      fontSize: FontSize.font12,
      paddingBottom: hp(1),
    },
    button: {
      marginTop: hp(4),
    },
  });
};

export default ForgotPassword;
