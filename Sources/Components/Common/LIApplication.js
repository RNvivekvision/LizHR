import { StyleSheet, View } from 'react-native';
import { RNStyles, RNText } from '../../Common';
import { Colors, hp, wp } from '../../Theme';

const LIApplication = ({ item }) => {
  return (
    <View style={styles.container}>
      <RNText>LIApplication</RNText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...RNStyles.shadow,
    backgroundColor: Colors.White,
    marginHorizontal: wp(4),
    marginBottom: hp(2),
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    borderRadius: wp(3),
  },
});

export default LIApplication;
