import { useSafeAreaInsets } from 'react-native-safe-area-context';
export default function useInset() {
  const inset = useSafeAreaInsets();
  return {
    top: inset.top,
    bottom: inset.bottom,
    left: inset.left,
    right: inset.right,
  };
}
