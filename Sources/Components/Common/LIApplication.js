import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RNStyles, RNText, RNPopup, RNImage } from '../../Common';
import { Colors, FontFamily, FontSize, hp, wp } from '../../Theme';
import { Images } from '../../Constants';
import { Functions } from '../../Utils';
import LIRow from './LIRow';
import {
  onUpdateCompansation,
  onUpdateFuel,
  onUpdateLeave,
} from '../../Services';

/* 
  type = {
    fuel: 0,
    leave: 1,
    compensation: 2,
  }
*/

const LIApplication = ({ item, type }) => {
  const [State, setState] = useState({ showPopup: false, isApproved: null });
  const empName = item?.employee?.displayName;
  const fromDate = Functions.formatDate(item?.fromDateTime);
  const toDate = Functions.formatDate(item?.toDateTime);
  const types = {
    0: {
      key: 'Fuel',
      value: item?.fuelAllowanceStatusType,
      func: onUpdateFuel,
    },
    1: { key: 'Leave', value: item?.leaveType?.leaveName, func: onUpdateLeave },
    2: {
      key: 'Compansation',
      value: item?.compensationType?.compensationName,
      func: onUpdateCompansation,
    },
  };

  const closePopUp = () => setState(p => ({ ...p, showPopup: false }));

  const onApprovedPress = async () => {
    try {
      const response = await types[type].func({
        ids: [item.id],
        status: 1,
      });
      if (!response?.ResponseData) return;
      setTimeout(() => {
        setState(p => ({ ...p, isApproved: true }));
      }, 400);
    } catch (e) {
      console.log('Error onDisapprovedPress -> ', e);
    } finally {
      closePopUp();
    }
  };

  const onDisapprovedPress = async () => {
    try {
      const response = await onUpdateCompansation({
        ids: [item.id],
        status: 2,
      });
      if (!response?.ResponseData) return;
      setTimeout(() => {
        setState(p => ({ ...p, isApproved: false }));
      }, 400);
    } catch (e) {
      console.log('Error onDisapprovedPress -> ', e);
    } finally {
      closePopUp();
    }
  };

  return (
    <View style={styles.container}>
      <View style={RNStyles.container}>
        <LIRow
          title={'Employee  :  '}
          text={empName ?? item.name}
          isTitle={true}
        />
        <LIRow
          title={`${types[type].key} Type  :  `}
          text={types[type].value ?? item.type}
        />
        <LIRow title={'From Date  :  '} text={fromDate ?? item.fromDate} />
        <LIRow title={'To Date  :  '} text={toDate ?? item.toDate} />
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
