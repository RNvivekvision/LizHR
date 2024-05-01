import { StyleSheet, View } from 'react-native';
import { RNImage, RNStyles, RNText } from '../../Common';
import { Images } from '../../Constants';
import { Colors, FontSize, hp, wp } from '../../Theme';

const LIDatePicker = () => {
  return (
    <View style={styles.container}>
      <View style={RNStyles.flexRow}>
        <RNText size={FontSize.font12}>{'Today : '}</RNText>
        <RNText size={FontSize.font12}>{'18-Apr-2024'}</RNText>
      </View>

      <View style={styles.iconContainer}>
        <RNImage source={Images.calendar} style={RNStyles.image60} />
      </View>
    </View>
  );
};

const iconSize = wp(9);
const styles = StyleSheet.create({
  container: {
    ...RNStyles.flexRowBetween,
    ...RNStyles.shadow,
    backgroundColor: Colors.White,
    marginHorizontal: wp(4),
    marginVertical: hp(3),
    paddingLeft: wp(4),
    paddingRight: wp(2),
    paddingVertical: hp(1),
    borderRadius: wp(4),
  },
  iconContainer: {
    ...RNStyles.center,
    width: iconSize,
    height: iconSize,
    backgroundColor: Colors.dropDownYear,
    borderRadius: wp(3),
  },
});

export default LIDatePicker;
