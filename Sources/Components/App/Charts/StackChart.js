import { useCallback } from 'react';
import Reanimated, { FadeIn } from 'react-native-reanimated';
import { StackedBarChart } from 'react-native-chart-kit';
import { Colors, hp, wp } from '../../../Theme';

const StackChart = ({ labels, legend, data, barColors, chartConfig }) => {
  const isEveryNull = data?.flat()?.every(v => v === null);

  const Comp = useCallback(() => {
    return (
      data && (
        <Reanimated.View entering={FadeIn.duration(500)}>
          <StackedBarChart
            data={{
              labels: labels,
              legend: legend,
              data: isEveryNull ? [] : data,
              barColors: barColors,
            }}
            width={wp(85)}
            height={hp(25)}
            decimalPlaces={0}
            fromZero={true}
            chartConfig={{
              backgroundGradientFrom: Colors.White,
              backgroundGradientTo: Colors.White,
              color: o => `rgba(0, 0, 0, ${o})`,
              ...chartConfig,
            }}
          />
        </Reanimated.View>
      )
    );
  }, [data]);

  return <Comp />;
};

export default StackChart;
