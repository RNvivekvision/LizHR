import { useMemo, useState } from 'react';
import { Calendar } from 'react-native-calendars';
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Colors, wp } from '../Theme';
import RNStyles from './RNStyles';

const RNCalendar = ({ visible, onClose, onDateSelect, isSingle }) => {
  const [range, setRange] = useState({
    start: null,
    end: null,
    singleDate: null,
  });

  const onDayPress = day => {
    const { dateString } = day;

    if (isSingle) {
      setRange(p => ({ ...p, singleDate: dateString }));
      onDateSelect?.(new Date(dateString));
      return;
    }

    if (!range.start || (range.start && range.end)) {
      setRange({ start: dateString, end: null });
    } else {
      let start = new Date(range.start);
      let end = new Date(dateString);
      if (end < start) {
        [start, end] = [end, start];
      }
      setRange(prev => ({ ...prev, end, start }));
      onDateSelect?.({ start, end });
    }
  };

  const getDatesInRange = (start, end) => {
    const dates = [];
    const currentDate = new Date(start);
    const endDate = new Date(end);
    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const markedDates = useMemo(() => {
    if (isSingle) {
      return {
        [range.singleDate]: {
          selected: true,
          selectedColor: Colors.Primary,
          textColor: Colors.White,
          customStyles: {
            container: {
              backgroundColor: Colors.Primary,
              borderRadius: 16,
            },
            text: {
              color: Colors.White,
            },
          },
        },
      };
    }
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
              markingType={isSingle ? 'custom' : 'period'}
              style={styles.calendar}
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
  calendar: {
    borderRadius: wp(4),
    overflow: 'hidden',
  },
});

export default RNCalendar;
