import { StyleSheet, View } from 'react-native';
import { Colors, FontSize, hp, wp } from '../../../Theme';
import { RNText, RNStyles } from '../../../Common';

const RenderUpcomingLeave = ({ item }) => {
  return (
    <View style={styles.container}>
      <Row title={'Employee  :  '} text={item.employee} isTitle={true} />
      <Row title={'Leave Type  :  '} text={item.leaveType} />
      <Row title={'Approve By  :  '} text={item.approveBy} />
      <Row title={'From Date   :  '} text={item.fromDate} />
      <Row title={'To Date  :  '} text={item.toDate} />
    </View>
  );
};

const Row = ({ title, text, isTitle }) => {
  return (
    <View style={styles.rowContainer}>
      <RNText size={FontSize.font12} color={Colors.employee}>
        {title}
      </RNText>
      <RNText
        size={FontSize.font12}
        color={isTitle ? Colors.Primary : Colors.Black}>
        {text}
      </RNText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...RNStyles.shadow,
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    marginHorizontal: wp(4),
    marginBottom: hp(2),
    backgroundColor: Colors.White,
    borderRadius: wp(3),
  },
  rowContainer: {
    ...RNStyles.flexRow,
    paddingVertical: hp(0.3),
  },
});

export default RenderUpcomingLeave;
