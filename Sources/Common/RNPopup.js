import { Easing, StyleSheet } from 'react-native';
import Popover from 'react-native-popover-view';
import { Colors, hp, isIOS, normalize, wp } from '../Theme';

const RNPopover = ({
  from,
  visible,
  onClose,
  children,
  position,
  backgroundStyle,
  popoverStyle,
  arrowSize,
}) => {
  return (
    <Popover
      from={from}
      isVisible={visible}
      onRequestClose={onClose}
      animationConfig={{ duration: 200, easing: Easing.inOut(Easing.quad) }}
      popoverStyle={[styles.popover, popoverStyle]}
      placement={position || 'auto'}
      backgroundStyle={[styles.backgroundStyle, backgroundStyle]}
      verticalOffset={isIOS ? 0 : -hp(4)}>
      {children}
    </Popover>
  );
};
const size = wp(5);
const styles = StyleSheet.create({
  popover: {
    borderRadius: wp(2),
  },
  arrowSize: {},
  backgroundStyle: {
    backgroundColor: Colors.Black + '40',
  },
});
export default RNPopover;
