import React from 'react';
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { RNStyles, RNText } from '../../../Common';
import { Colors, FontSize, hp, wp } from '../../../Theme';
import { useInset } from '../../../Hooks';
import { LIRow } from '../../Common';

const SalaryDetail = ({ visible, onClose, data }) => {
  const styles = useStyles();

  const values = {
    Gross: data?.basicSalary,
    Absent: `${data?.absentSalary} (${data?.absentDays})`,
    Earn: data?.netSalary,
    'Paid Leave': `${data?.paidLeaveAmount} (${data?.paidLeaveCount})`,
    'OT (Over Time)': data?.overtimeSalary,
    'Extra Pay': data?.extraPay,
    'PT (Professional Tax)': data?.professionalTax,
    TDS: data?.totalTDSAmount,
  };

  return (
    <Modal
      visible={visible}
      animationType={'slide'}
      onRequestClose={onClose}
      transparent={true}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <View style={styles.content}>
            <LIRow
              title={'Employee : '}
              text={data?.displayName}
              isTitle={true}
              style={{ marginBottom: hp(0.5) }}
            />

            {Object.entries(values).map(([key, value]) => (
              <Row key={key} title={`${key}`} text={value} />
            ))}

            <View style={styles.devider} />

            <Row title={'Final Salary'} text={data?.payableSalary} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const Row = ({ title, text }) => {
  const styles = useStyles();

  return (
    <View style={styles.rowContainer}>
      <View style={{ ...RNStyles.flexRowBetween, flex: 1 }}>
        <RNText style={styles.title}>{title}</RNText>
        <RNText style={styles.title}>{':'}</RNText>
      </View>
      <RNText style={styles.text}>{text}</RNText>
    </View>
  );
};

const useStyles = () => {
  const inset = useInset();
  return StyleSheet.create({
    overlay: {
      ...RNStyles.container,
      justifyContent: 'flex-end',
      backgroundColor: Colors.Black + '40',
    },
    content: {
      width: wp(92),
      backgroundColor: Colors.White,
      alignSelf: 'center',
      marginBottom: inset.bottom + hp(2),
      borderRadius: wp(5),
      paddingVertical: hp(3),
      paddingHorizontal: wp(5),
    },
    rowContainer: {
      ...RNStyles.flexRowBetween,
      paddingVertical: hp(0.7),
    },
    title: {
      fontSize: FontSize.font11,
      color: Colors.employee,
    },
    text: {
      flex: 1,
      fontSize: FontSize.font11,
      color: Colors.Black,
      textAlign: 'right',
    },
    devider: {
      ...RNStyles.devider,
      marginVertical: hp(2),
      backgroundColor: Colors.drawerBorderColor,
    },
  });
};

export default SalaryDetail;
