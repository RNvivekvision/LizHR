import React from 'react';
import { Image } from 'react-native';
import RNStyles from './RNStyles';

const RNImage = ({ source, resizeMode, style }) => {
  const img = source?.uri ? { uri: source.uri, ...source } : source;
  return (
    <Image
      source={img}
      resizeMode={resizeMode || 'contain'}
      style={[RNStyles.image100, style]}
    />
  );
};

export default RNImage;
