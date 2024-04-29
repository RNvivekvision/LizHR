import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors, FontFamily, FontSize, hp } from '../../Theme';
import { RNText, RNStyles } from '../../Common';
import { NavRoutes } from '../../Navigation';
import { useNavigation } from '@react-navigation/native';

const DontHaveAccount = ({ isSignup }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.signUpContainer}>
      <RNText size={FontSize.font12}>
        {isSignup ? `You have an account? ` : `Don't have an account? `}
      </RNText>
      <TouchableOpacity
        onPress={() =>
          navigation.replace(isSignup ? NavRoutes.Login : NavRoutes.SignUp)
        }
        activeOpacity={0.6}>
        <RNText
          size={FontSize.font12}
          family={FontFamily.Medium}
          color={Colors.Primary}>
          {isSignup ? 'Login' : 'Sign Up'}
        </RNText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  signUpContainer: {
    ...RNStyles.flexRow,
    alignSelf: 'center',
    paddingVertical: hp(2),
    paddingBottom: hp(4),
  },
});

export default DontHaveAccount;
