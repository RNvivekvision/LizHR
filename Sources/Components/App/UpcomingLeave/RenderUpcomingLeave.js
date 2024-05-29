import { StyleSheet, View } from 'react-native';
import { Colors, hp, wp } from '../../../Theme';
import { RNStyles } from '../../../Common';
import { LIRow } from '../../Common';
import { Functions } from '../../../Utils';

const RenderUpcomingLeave = ({ item }) => {
  const fromDate = Functions.formatDate(item?.fromDate);
  const toDate = Functions.formatDate(item?.toDate);

  return (
    <View style={styles.container}>
      <LIRow
        title={'Employee  :  '}
        text={item?.employee?.displayName}
        isTitle={true}
      />
      <LIRow title={'Leave Type  :  '} text={item.leaveName} />
      <LIRow title={'Approve By  :  '} text={item?.approver?.displayName} />
      <LIRow title={'From Date   :  '} text={fromDate} />
      <LIRow title={'To Date  :  '} text={toDate} />
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
