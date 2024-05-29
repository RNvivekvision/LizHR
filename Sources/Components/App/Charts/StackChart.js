import { useCallback } from 'react';
import Reanimated, { FadeIn } from 'react-native-reanimated';
import { StackedBarChart } from 'react-native-chart-kit';
import { Colors, hp, wp } from '../../../Theme';

const StackChart = ({
  labels,
  legend,
  data,
  barColors,
  width,
  height,
  chartConfig,
}) => {
  const hasEvery = data?.flat()?.every(v => v === null);
  const chart = {
    width: width ?? wp(50),
    height: height ?? hp(25),
  };

  const Comp = useCallback(() => {
    return (
      data && (
        <Reanimated.View entering={FadeIn.duration(500)}>
          <StackedBarChart
            data={{
              labels: labels,
              legend: legend,
              data: hasEvery ? [] : data,
              barColors: barColors,
            }}
            width={chart.width}
            height={chart.height}
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
