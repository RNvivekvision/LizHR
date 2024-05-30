import { useCallback } from 'react';
import Reanimated, { FadeIn } from 'react-native-reanimated';
import { PieChart as Chart } from 'react-native-chart-kit';
import { hp, wp } from '../../../Theme';
import EmptyPieChart from './EmptyPieChart';

const PieChart = ({ data, chartConfig, accessor, backgroundColor }) => {
  const isEveryZero = data?.every(v => v.employees === 0);

  const Comp = useCallback(() => {
    return (
      data && (
        <Reanimated.View entering={FadeIn.duration(500)}>
          {isEveryZero && <EmptyPieChart size={52} />}

          <Chart
            data={data}
            width={wp(85)}
            height={hp(25)}
            chartConfig={{
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              ...chartConfig,
            }}
            accessor={accessor}
            backgroundColor={backgroundColor ?? '#fff'}
            paddingLeft={wp(5)}
            absolute={true}
          />
        </Reanimated.View>
      )
    );
  }, [data]);

  return <Comp />;
};

export default PieChart;
