import { FlatList, RefreshControl } from 'react-native';
import { RNContainer, RNHeader } from '../../../Common';
import { LIAttendence, LIDatePicker } from '../../../Components';
import { useFlatlistStyles } from '../../../Hooks';
import { Functions } from '../../../Utils';
import { Colors } from '../../../Theme';
import { useEffect, useState } from 'react';
import { getAttendence, onAttendence } from '../../../Services';

const AttendanceReport = () => {
  const { contentContainerStyle } = useFlatlistStyles();
  const { start, end } = Functions.getStartEndDates();
  const [State, setState] = useState({
    isLoading: false,
    refreshing: false,
    start: start,
    end: end,
    attendence: [],
  });

  useEffect(() => {
    getAllAttendenceReport();
  }, [State.start, State.end]);

  const getAllAttendenceReport = async isRefreshing => {
    !isRefreshing && setState(p => ({ ...p, isLoading: true }));
    try {
      const response = await getAttendence({ toDate: State.end });
      // console.log('Attendence -> ', JSON.stringify(response, null, 2));
      setState(p => ({ ...p, attendence: response.responseData }));
    } catch (e) {
      console.log('Error getAllAttendenceReport -> ', e);
    } finally {
      setState(p => ({ ...p, isLoading: false }));
    }
  };

  const onRefresh = async () => {
    setState(p => ({ ...p, refreshing: true }));
    await getAllAttendenceReport(true);
    setTimeout(() => {
      setState(p => ({ ...p, refreshing: false }));
    }, 1000);
  };

  return (
    <RNContainer>
      <RNHeader title={'Attendance Report'} />

      <FlatList
        data={State.attendence}
        keyExtractor={(v, i) => String(i)}
        contentContainerStyle={contentContainerStyle}
        renderItem={({ item }) => <LIAttendence item={item} />}
        ListHeaderComponent={
          <LIDatePicker
            onDateChange={d =>
              setState(p => ({ ...p, start: d.start, end: d.end }))
            }
          />
        }
        refreshControl={
          <RefreshControl
            refreshing={State.refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.Primary}
            colors={[Colors.Primary]}
          />
        }
      />
    </RNContainer>
  );
};

export default AttendanceReport;
