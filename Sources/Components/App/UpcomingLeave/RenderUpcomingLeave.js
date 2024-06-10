import { StyleSheet, View } from 'react-native';
import { Colors, FontSize, hp, wp } from '../../../Theme';
import { RNImage, RNStyles, RNText } from '../../../Common';
import { LIRow } from '../../Common';
import { Functions } from '../../../Utils';
import { Images } from '../../../Constants';
import { useEffect, useState } from 'react';

const RenderUpcomingLeave = ({ item }) => {
  const [State, setState] = useState({ proiflePic: Images.defaultUser });
  const fromDate = Functions.formatDate(item?.fromDate);
  const toDate = Functions.formatDate(item?.toDate);

  useEffect(() => {
    (async () => {
      const pic = await Functions.getProfilePic(
        item?.employee?.profileImageUrl,
      );
      setState(p => ({ ...p, proiflePic: pic }));
    })();
  }, []);

  return (
    <View style={styles.container}>
      <RNImage source={State.proiflePic} style={styles.img} />
      <View>
        <LIRow
          title={'Employee :  '}
          text={item?.employee?.displayName}
          isTitle={true}
          style={{ marginBottom: hp(0.5) }}
        />
        <LIRow title={'Leave Type  :  '} text={item.leaveName} />
        <LIRow title={'Approve By  :  '} text={item?.approver?.displayName} />
        <View style={RNStyles.flexRow}>
          <LIRow title={'From Date    :  '} text={fromDate} />
          <RNText size={FontSize.font10} color={Colors.Primary}>
            {'  To  '}
          </RNText>
          <LIRow title={''} text={toDate} />
        </View>
      </View>
    </View>
  );
};

const imgSize = wp(14);
const styles = StyleSheet.create({
  container: {
    ...RNStyles.shadow,
    flexDirection: 'row',
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    marginHorizontal: wp(4),
    marginBottom: hp(2),
    backgroundColor: Colors.White,
    borderRadius: wp(3),
  },
  img: {
    width: imgSize,
    height: imgSize,
    borderRadius: wp(3),
    marginRight: wp(3),
  },
});

export default RenderUpcomingLeave;
