import { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { RNContainer, RNHeader } from '../../Common';
import { LIDatePicker, LIApplication } from '../../Components';
import { DummyData } from '../../Utils';
import { useFlatlistStyles } from '../../Hooks';
import { onLeaveApplication } from '../../Services';
import { Colors } from '../../Theme';

const { employeeLeaves } = DummyData.leaveApplication;

const LeaveApplication = () => {
  const { contentContainerStyle } = useFlatlistStyles();
  const [State, setState] = useState({
    isLoading: false,
    refreshing: false,
    start: null,
    end: null,
    leaves: [],
  });

  useEffect(() => {
    getAllLeaveApplications();
  }, [State.start, State.end]);

  // console.log('State -> ', JSON.stringify(State, null, 2));
  const getAllLeaveApplications = async isRefreshing => {
    !isRefreshing && setState(p => ({ ...p, isLoading: true }));
    try {
      const response = await onLeaveApplication({
        appStatus: 0,
        fromDate: State.start,
        toDate: State.end,
      });
      setState(p => ({ ...p, leaves: response.responseData }));
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

  const onDateChange = useCallback(
    d => setState(p => ({ ...p, start: d.start, end: d.end })),
    [],
  );

  const Header = useCallback(() => {
    return <LIDatePicker onDateChange={onDateChange} />;
  }, []);

  return (
    <RNContainer isLoading={State.isLoading}>
      <RNHeader title={'Leave Application'} />
      <FlatList
        // data={employeeLeaves}
        data={State.leaves}
        keyExtractor={(v, i) => String(i)}
        ListHeaderComponent={<Header />}
        contentContainerStyle={contentContainerStyle}
        renderItem={({ item }) => <LIApplication item={item} />}
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
