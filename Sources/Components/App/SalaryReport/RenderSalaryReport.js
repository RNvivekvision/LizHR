import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors, FontSize, hp, wp } from '../../../Theme';
import { RNImage, RNStyles, RNText } from '../../../Common';
import { Images } from '../../../Constants';
import { LIRow } from '../../Common';

const RenderSalaryReport = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => onPress?.(item)}
      style={styles.container}>
      <RNImage source={Images.defaultUser} style={styles.userImage} />
      <View style={{ flex: 1 }}>
        <RNText pBottom={hp(0.5)} size={FontSize.font12} color={Colors.Primary}>
          {item?.displayName}
        </RNText>
        <LIRow title={'Gross : '} text={item?.finalSalary} />
        <LIRow
          title={'Absent : '}
          text={`${item?.absentSalary} (${item?.absentDays})`}
        />
        <LIRow title={'Final Salary : '} text={item?.netSalary} />
      </View>
    </TouchableOpacity>
  );
};

const imgSize = wp(15);
const styles = StyleSheet.create({
  container: {
    ...RNStyles.shadow,
    flexDirection: 'row',
    backgroundColor: Colors.White,
    marginHorizontal: wp(4),
    marginBottom: hp(2),
    borderRadius: wp(4),
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
  },
  userImage: {
    width: imgSize,
    height: imgSize,
    borderRadius: wp(3),
    marginRight: wp(3),
  },
});

export default RenderSalaryReport;
