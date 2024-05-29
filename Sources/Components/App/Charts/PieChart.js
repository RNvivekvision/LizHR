import { useCallback } from 'react';
import Reanimated, { FadeIn } from 'react-native-reanimated';
import { PieChart as Chart } from 'react-native-chart-kit';
import { hp, wp } from '../../../Theme';

const PieChart = ({
  data,
  width,
  height,
  chartConfig,
  accessor,
  backgroundColor,
}) => {
  const chart = {
    width: width ?? wp(50),
    height: height ?? hp(25),
  };

  const Comp = useCallback(() => {
    return (
      data && (
        <Reanimated.View entering={FadeIn.duration(500)}>
          <Chart
            data={data}
            width={chart.width}
            height={chart.height}
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
