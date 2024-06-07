import { StyleSheet, View } from 'react-native';
import { RNStyles, RNText } from '../../Common';
import { Colors, FontSize, hp } from '../../Theme';

const LIRow = ({ title, text, isTitle, style }) => {
  const styles = useStyles({ isTitle });

  return (
    <View style={[styles.rowContainer, style]}>
      <RNText style={styles.title}>{title}</RNText>
      <RNText style={styles.text}>{text}</RNText>
    </View>
  );
};

const useStyles = ({ isTitle }) => {
  return StyleSheet.create({
    rowContainer: {
      ...RNStyles.flexRow,
      paddingVertical: hp(0.4),
    },
    title: {
      fontSize: isTitle ? FontSize.font12 : FontSize.font10,
      color: Colors.employee,
    },
    text: {
      fontSize: isTitle ? FontSize.font12 : FontSize.font10,
      color: isTitle ? Colors.Primary : Colors.Black,
    },
  });
};

export default LIRow;
