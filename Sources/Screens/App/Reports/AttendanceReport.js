import { useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { RNContainer, RNHeader } from '../../../Common';
import { LIAttendence, LIDatePicker } from '../../../Components';
import { useFlatlistStyles } from '../../../Hooks';
import { getAttendence } from '../../../Services';
import { Colors } from '../../../Theme';

const AttendanceReport = () => {
  const { contentContainerStyle } = useFlatlistStyles();
  const [State, setState] = useState({
    isLoading: false,
    refreshing: false,
    date: new Date(),
    attendence: [],
  });

  useEffect(() => {
    getAllAttendenceReport();
  }, [State.date]);

  const getAllAttendenceReport = async isRefreshing => {
    !isRefreshing && setState(p => ({ ...p, isLoading: true }));
    try {
      const response = await getAttendence({ toDate: State.date });
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
    <RNContainer isLoading={State.isLoading}>
      <RNHeader title={'Attendance Report'} />

      <FlatList
        data={State.attendence}
        keyExtractor={(v, i) => String(i)}
        contentContainerStyle={contentContainerStyle}
        renderItem={({ item }) => <LIAttendence item={item} />}
        ListHeaderComponent={
          <LIDatePicker
            isSingle={true}
            onDateChange={d => setState(p => ({ ...p, date: d }))}
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
