import { useCallback } from 'react';
import Reanimated, { FadeIn } from 'react-native-reanimated';
import { BarChart as Chart } from 'react-native-chart-kit';
import { Colors, hp, wp } from '../../../Theme';

const BarChart = ({ labels, data, width, height }) => {
  const chart = {
    width: width ?? wp(50),
    height: height ?? hp(25),
  };

  const Comp = useCallback(() => {
    return (
      data && (
        <Reanimated.View entering={FadeIn.duration(500)}>
          <Chart
            data={{
              labels: labels,
              datasets: [{ data: data }],
            }}
            width={chart.width}
            height={chart.height}
            chartConfig={{
              backgroundGradientFrom: Colors.White,
              backgroundGradientTo: Colors.White,
              color: o => `rgba(0, 0, 0, ${o})`,
            }}
            fromZero={true}
            segments={5}
            showBarTops={true}
            // withInnerLines={false}
          />
        </Reanimated.View>
      )
    );
  }, [data]);

  return <Comp />;
};

export default BarChart;
