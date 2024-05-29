import { View } from 'react-native';
import { hp } from '../../../Theme';
import { RNPagginationLoader, RNStyles } from '../../../Common';

const ChartLoader = ({ visible, children }) => {
  return (
    <View style={{ height: hp(25), ...RNStyles.center }}>
      {visible ? <RNPagginationLoader /> : children}
    </View>
  );
};

export default ChartLoader;
