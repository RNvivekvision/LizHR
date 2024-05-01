import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RNStyles, RNText, RNPopup, RNImage } from '../../Common';
import { Colors, FontFamily, FontSize, hp, wp } from '../../Theme';
import { Images } from '../../Constants';
import LIRow from './LIRow';

const LIApplication = ({ item }) => {
  const [State, setState] = useState({ showPopup: false, isApproved: null });

  const closePopUp = () => setState(p => ({ ...p, showPopup: false }));

  const onApprovedPress = async () => {
    closePopUp();
    setTimeout(() => {
      setState(p => ({ ...p, isApproved: true }));
    }, 400);
  };
  const onDisapprovedPress = async () => {
    closePopUp();
    setTimeout(() => {
      setState(p => ({ ...p, isApproved: false }));
    }, 400);
  };

  return (
    <View style={styles.container}>
      <View style={RNStyles.container}>
        <LIRow title={'Employee  :  '} text={item.name} isTitle={true} />
        <LIRow title={'Leave Type  :  '} text={item.type} />
        <LIRow title={'From Date  :  '} text={item.fromDate} />
        <LIRow title={'To Date  :  '} text={item.toDate} />
      </View>

      {State.isApproved === null && (
        <RNPopup
          visible={State.showPopup}
          position={'left'}
          onClose={closePopUp}
          from={
            <TouchableOpacity
              onPress={() => setState(p => ({ ...p, showPopup: true }))}
              style={styles.iconContainer}>
              <RNImage source={Images.more} style={RNStyles.image60} />
            </TouchableOpacity>
          }>
          <View style={styles.popContent}>
            <PopupButton title={'Approved'} onPress={onApprovedPress} />
            <PopupButton title={'Disapproved'} onPress={onDisapprovedPress} />
          </View>
        </RNPopup>
      )}

      {typeof State.isApproved === 'boolean' && (
        <TouchableOpacity
          onPress={() => setState(p => ({ ...p, showPopup: true }))}
          style={styles.iconContainer}>
          <RNImage
            source={State.isApproved ? Images.approveThumb : Images.missThumb}
            style={RNStyles.image60}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const PopupButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={styles.buttonContainer}>
      <RNText style={styles.buttonText}>{title}</RNText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    ...RNStyles.shadow,
    flexDirection: 'row',
    backgroundColor: Colors.White,
    marginHorizontal: wp(4),
    marginBottom: hp(2),
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    borderRadius: wp(3),
  },
  iconContainer: {
    ...RNStyles.center,
    backgroundColor: Colors.drawerIconBgColor,
    borderRadius: wp(2),
    width: wp(8),
    height: wp(8),
  },
  popContent: {
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
  },
  buttonContainer: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
  },
  buttonText: {
    fontSize: FontSize.font12,
    fontFamily: FontFamily.Medium,
  },
});

export default LIApplication;
