import { useMemo, useState } from 'react';
import { Colors } from '../Theme';
import { Calendar } from 'react-native-calendars';
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import RNStyles from './RNStyles';

const RNCalendar = ({ visible, onClose, onDateSelect }) => {
  const [range, setRange] = useState({
    start: null,
    end: null,
  });

  const onDayPress = day => {
    const { dateString } = day;
    if (!range.start || (range.start && range.end)) {
      setRange({ start: dateString, end: null });
    } else {
      setRange(prev => ({ ...prev, end: dateString }));
      onDateSelect?.({ start: range.start, end: dateString });
    }
  };

  const getDatesInRange = (start, end) => {
    let dates = [];
    let currentDate = new Date(start);
    const endDate = new Date(end);
    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const markedDates = useMemo(() => {
    if (!range.start) return {};
    if (!range.end) {
      return {
        [range.start]: {
          startingDay: true,
          color: Colors.Primary,
          textColor: Colors.White,
        },
      };
    }
    const dates = getDatesInRange(range.start, range.end);
    return dates.reduce((acc, date, idx) => {
      acc[date] = {
        color: Colors.Primary,
        textColor: Colors.White,
        startingDay: idx === 0,
        endingDay: idx === dates.length - 1,
      };
      return acc;
    }, {});
  }, [range]);

  return (
    <Modal
      visible={visible}
      animationType={'fade'}
      onRequestClose={onClose}
      transparent={true}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <View style={styles.content}>
            <Calendar
              onDayPress={onDayPress}
              markedDates={markedDates}
              markingType={'period'}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
const styles = StyleSheet.create({
  overlay: {
    ...RNStyles.container,
    ...RNStyles.center,
    backgroundColor: Colors.Black + '40',
  },
  content: {
    width: '80%',
  },
});

export default RNCalendar;
