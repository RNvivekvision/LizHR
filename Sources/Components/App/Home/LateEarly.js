import { useEffect, useState } from 'react';
import { Functions } from '../../../Utils';
import { BarChart } from '../Charts';
import { useDispatch, useSelector } from 'react-redux';
import { getAllLateEarly } from '../../../Redux/ExtraReducers';
import { LIChart } from '../../Common';

const LateEarly = () => {
  const { lateEarlyLoading, lateEarly } = useSelector(
    ({ UserReducer }) => UserReducer,
  );
  const dispatch = useDispatch();
  const [State, setState] = useState({
    data: [],
    date: new Date(),
  });

  useEffect(() => {
    if (!lateEarly?.length > 0) return;
    const obj = lateEarly?.find(v => {
      const d = Functions.formatDate(v.eventDate);
      const today = Functions.formatDate(State.date);
      return d === today;
    });
    setState(p => ({
      ...p,
      data: [
        obj?.lateCount ?? null,
        obj?.earlyCount ?? null,
        obj?.missingThumbCount ?? null,
      ],
    }));
  }, [lateEarly]);

  return (
    <LIChart
      title={'Late/Early'}
      isLoading={lateEarlyLoading}
      onDateChange={d => {
        setState(p => ({ ...p, date: d }));
        dispatch(getAllLateEarly({ toDate: d }));
      }}
      chart={
        <BarChart
          labels={['Late In', 'Early Out', 'Missing Thumb']}
          data={State.data}
        />
      }
    />
  );
};

export default LateEarly;
