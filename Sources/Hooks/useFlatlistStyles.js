import { hp } from '../Theme';
import useInset from './useInset';

const useFlatlistStyles = () => {
  const inset = useInset();

  return {
    contentContainerStyle: {
      paddingBottom: inset.bottom + hp(1),
    },
  };
};

export default useFlatlistStyles;
