import { StyleSheet, View } from 'react-native';
import { Colors, hp, wp } from '../../../Theme';
import { RNStyles } from '../../../Common';
import { LIRow } from '../../Common';

const RenderUpcomingLeave = ({ item }) => {
  return (
    <View style={styles.container}>
      <LIRow title={'Employee  :  '} text={item.employee} isTitle={true} />
      <LIRow title={'Leave Type  :  '} text={item.leaveType} />
      <LIRow title={'Approve By  :  '} text={item.approveBy} />
      <LIRow title={'From Date   :  '} text={item.fromDate} />
      <LIRow title={'To Date  :  '} text={item.toDate} />
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
});

export default RenderUpcomingLeave;
