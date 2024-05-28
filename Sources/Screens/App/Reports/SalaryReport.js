import { useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { LIDatePicker, RenderSalaryReport } from '../../../Components';
import { RNContainer, RNHeader } from '../../../Common';
import { useFlatlistStyles } from '../../../Hooks';
import { Functions } from '../../../Utils';
import { Colors } from '../../../Theme';
import { onSalary } from '../../../Services';

const SalaryReport = () => {
  const { contentContainerStyle } = useFlatlistStyles();
  const { start, end } = Functions.getStartEndDates();
  const [State, setState] = useState({
    isLoading: false,
    refreshing: false,
    start: start,
    end: end,
    salary: [],
  });

  useEffect(() => {
    getAllSalaryReport();
  }, [State.start, State.end]);

  const getAllSalaryReport = async isRefreshing => {
    !isRefreshing && setState(p => ({ ...p, isLoading: true }));
    try {
      const response = await onSalary({
        fromMonth: State.start,
        toMonth: State.end,
      });
      setState(p => ({ ...p, salary: response.responseData }));
    } catch (e) {
      console.log('Error getAllSalaryReport -> ', e);
    } finally {
      setState(p => ({ ...p, isLoading: false }));
    }
  };

  const onRefresh = async () => {
    setState(p => ({ ...p, refreshing: true }));
    await getAllSalaryReport(true);
    setTimeout(() => {
      setState(p => ({ ...p, refreshing: false }));
    }, 1000);
  };

  return (
    <RNContainer>
      <RNHeader title={'Salary Report'} />

      <FlatList
        data={State.salary}
        keyExtractor={(v, i) => String(i)}
        contentContainerStyle={contentContainerStyle}
        renderItem={({ item }) => <RenderSalaryReport item={item} />}
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

export default SalaryReport;
