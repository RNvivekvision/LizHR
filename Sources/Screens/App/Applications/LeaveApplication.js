import { useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { RNContainer, RNHeader } from '../../../Common';
import { LIDatePicker, LIApplication } from '../../../Components';
import { Functions } from '../../../Utils';
import { useFlatlistStyles } from '../../../Hooks';
import { onLeaveApplication } from '../../../Services';
import { Colors } from '../../../Theme';

const LeaveApplication = () => {
  const { contentContainerStyle } = useFlatlistStyles();
  const { start, end } = Functions.getStartEndDates();
  const [State, setState] = useState({
    isLoading: false,
    refreshing: false,
    start: start,
    end: end,
    leaves: [],
  });

  useEffect(() => {
    getAllLeaveApplications();
  }, [State.start, State.end]);

  const getAllLeaveApplications = async isRefreshing => {
    !isRefreshing && setState(p => ({ ...p, isLoading: true }));
    try {
      const response = await onLeaveApplication({
        fromDate: State.start,
        toDate: State.end,
      });
      setState(p => ({ ...p, leaves: response?.responseData }));
    } catch (e) {
      console.log('Error getAllLeaveApplications -> ', e);
    } finally {
      setState(p => ({ ...p, isLoading: false }));
    }
  };

  const onRefresh = async () => {
    setState(p => ({ ...p, refreshing: true }));
    await getAllLeaveApplications(true);
    setTimeout(() => {
      setState(p => ({ ...p, refreshing: false }));
    }, 1000);
  };

  return (
    <RNContainer isLoading={State.isLoading}>
      <RNHeader title={'Leave Application'} />
      <FlatList
        data={State.leaves}
        keyExtractor={(v, i) => String(i)}
        ListHeaderComponent={
          <LIDatePicker
            onDateChange={d =>
              setState(p => ({ ...p, start: d.start, end: d.end }))
            }
          />
        }
        contentContainerStyle={contentContainerStyle}
        renderItem={({ item }) => <LIApplication item={item} type={1} />}
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

export default LeaveApplication;
