import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllLocationWise } from '../../../Redux/ExtraReducers';
import { Colors } from '../../../Theme';
import { StackChart } from '../Charts';
import { LIChart } from '../../Common';

const LocationWise = () => {
  const dispatch = useDispatch();
  const [State, setState] = useState({ labels: [], data: [[], []] });
  const { locationWiseLoading, locationWise } = useSelector(
    ({ UserReducer }) => UserReducer,
  );

  useEffect(() => {
    if (!locationWise?.length > 0) {
      setState(p => ({ ...p, labels: [], data: [[], []] }));
      return;
    }
    const labels = locationWise?.map(v => v?.locationName);
    const data = locationWise?.map(v => [
      v?.totalPresent === 0 ? null : v?.totalPresent,
      v?.totalAbsent === 0 ? null : v?.totalAbsent,
      v?.totalLeave === 0 ? null : v?.totalLeave,
    ]);
    setState(p => ({ ...p, labels, data }));
  }, [locationWise]);

  return (
    <LIChart
      title={'Location Wise'}
      isLoading={locationWiseLoading}
      onDateChange={d => dispatch(getAllLocationWise({ toDate: d }))}
      chart={
        <StackChart
          labels={State.labels}
          legend={['Present', 'Absent', 'Leave']}
          data={State.data}
          barColors={[
            Colors.chart.present,
            Colors.chart.absent,
            Colors.chart.leave,
          ]}
        />
      }
    />
  );
};

export default LocationWise;
