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
  console.log(JSON.stringify({ data }, null, 2));
  const styles = useStyles();

  const values = {
    Gross: data?.netSalary,
    Absent: `${data?.absentSalary} (${data?.absentDays})`,
    Earn: data?.pfNo,
    'Paid Leave': `${data?.paidLeaveAmount} (${data?.paidLeaveCount})`,
    'OT (Over Time)': data?.overtimeSalary,
    'Extra Pay': data?.extraPay,
    'PT (Professional Tex)': data?.professionalTax,
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

            <Row />
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
      <RNText style={styles.title}>{title}</RNText>
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
      width: '92%',
      height: '50%',
      backgroundColor: Colors.White,
      alignSelf: 'center',
      marginBottom: inset.bottom + hp(2),
      borderRadius: wp(5),
      paddingVertical: hp(2),
      paddingHorizontal: wp(4),
    },
    rowContainer: {
      ...RNStyles.flexRow,
      paddingVertical: hp(0.3),
    },
    title: {
      fontSize: FontSize.font10,
      color: Colors.employee,
    },
    text: {
      fontSize: FontSize.font10,
      color: Colors.Black,
    },
  });
};

export default SalaryDetail;
