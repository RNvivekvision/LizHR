import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, FontFamily, FontSize, hp, wp } from '../Theme';
import { RNIcon, RNStyles, RNText, RNScrollView, RNImage } from './index';
import { Images } from '../Constants';
import { useInset } from '../Hooks';

const RNHeader = ({
  title,
  scrollProps,
  containerStyle,
  titleStyle,
  children,
  style,
  footer,
}) => {
  const navigation = useNavigation();
  const styles = useStyles();

  return (
    <View style={RNStyles.container}>
      <View style={[styles.Container, containerStyle]}>
        <RNImage
          source={Images.background}
          resizeMode={'cover'}
          style={styles.bgImage}
        />
        <RNIcon
          icon={Images.back}
          iconStyle={RNStyles.image90}
          onPress={() => navigation.goBack()}
          containerStyle={styles.icon}
        />
        <RNText style={[styles.title, titleStyle]}>{title}</RNText>
      </View>

      <RNScrollView style={style} scrollProps={scrollProps}>
        {children}
      </RNScrollView>

      {footer && <View style={styles.footer}>{footer}</View>}
    </View>
  );
};

const iconSize = wp(7);
const radius = wp(4);
const useStyles = () => {
  const inset = useInset();

  return StyleSheet.create({
    footer: {
      paddingBottom: inset.bottom,
    },
    Container: {
      ...RNStyles.flexRow,
      backgroundColor: Colors.Primary,
      paddingHorizontal: wp(4),
      paddingTop: inset.top + hp(2),
      paddingVertical: hp(2),
      borderBottomLeftRadius: radius,
      borderBottomRightRadius: radius,
      overflow: 'hidden',
    },
    bgImage: {
      ...StyleSheet.absoluteFillObject,
      width: wp(100),
      height: 150,
    },
    icon: {
      ...RNStyles.center,
      width: iconSize,
      height: iconSize,
    },
    title: {
      flex: 1,
      paddingHorizontal: hp(1),
      marginHorizontal: hp(1),
      fontSize: FontSize.font18,
      fontFamily: FontFamily.Bold,
      color: Colors.White,
    },
  });
};

export default RNHeader;
