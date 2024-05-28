import { useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { RNContainer, RNHeader } from '../../../Common';
import { LIDatePicker, RenderInOut } from '../../../Components';
import { useFlatlistStyles } from '../../../Hooks';
import { Functions } from '../../../Utils';
import { onInOut } from '../../../Services';
import { Colors } from '../../../Theme';

const InOutReport = () => {
  const { contentContainerStyle } = useFlatlistStyles();
  const { start, end } = Functions.getStartEndDates();
  const [State, setState] = useState({
    isLoading: false,
    refreshing: false,
    start: start,
    end: end,
    inOuts: [],
  });

  useEffect(() => {
    getAllInOutReports();
  }, [State.start, State.end]);

  const getAllInOutReports = async isRefreshing => {
    !isRefreshing && setState(p => ({ ...p, isLoading: true }));
    try {
      const response = await onInOut({
        fromDate: State.start,
        toDate: State.end,
      });
      setState(p => ({ ...p, inOuts: response.responseData }));
    } catch (e) {
      console.log('Error getAllLeaveApplications -> ', e);
    } finally {
      setState(p => ({ ...p, isLoading: false }));
    }
  };

  const onRefresh = async () => {
    setState(p => ({ ...p, refreshing: true }));
    await getAllInOutReports(true);
    setTimeout(() => {
      setState(p => ({ ...p, refreshing: false }));
    }, 1000);
  };

  return (
    <RNContainer>
      <RNHeader title={'In-Out Reports'} />

      <FlatList
        data={State.inOuts}
        keyExtractor={(v, i) => String(i)}
        contentContainerStyle={contentContainerStyle}
        ListHeaderComponent={
          <LIDatePicker
            onDateChange={d =>
              setState(p => ({ ...p, start: d.start, end: d.end }))
            }
          />
        }
        renderItem={({ item }) => <RenderInOut item={item} />}
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

export default InOutReport;
