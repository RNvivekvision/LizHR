import { useEffect, useState } from 'react';
import { DummyData } from '../../../Utils';
import { PieChart } from '../Charts';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPresentAbsent } from '../../../Redux/ExtraReducers';
import { LIChart } from '../../Common';

const { pieChartData } = DummyData.Home;

const PresentAbsent = () => {
  const { presentAbsent, presentAbsentLoading } = useSelector(
    ({ UserReducer }) => UserReducer,
  );
  const dispatch = useDispatch();
  const [State, setState] = useState({
    width: 100,
    height: 100,
    date: new Date(),
    openDatePicker: false,
    data: pieChartData,
  });

  useEffect(() => {
    const update = State.data.map(v => {
      const value = presentAbsent?.[v.key] ?? 0;
      return { ...v, employees: value };
    });
    setState(p => ({ ...p, data: update }));
  }, [presentAbsent]);

  return (
    <LIChart
      title={'Present/Absent'}
      isLoading={presentAbsentLoading}
      chart={<PieChart data={State.data} accessor={'employees'} />}
      onDateChange={d => dispatch(getAllPresentAbsent({ toDate: d }))}
    />
  );
};

export default PresentAbsent;
