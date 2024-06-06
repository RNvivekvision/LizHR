import { useState } from 'react';
import {
  LayoutAnimation,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Reanimated, { SlideInLeft } from 'react-native-reanimated';
import { Colors, FontSize, hp, wp } from '../../Theme';
import { RNImage, RNStyles, RNText } from '../../Common';
import { Images } from '../../Constants';

const RenderDrawer = ({ item, index, onPress, set }) => {
  const [State, setState] = useState({ showInner: false });
  const styles = useStyles({ isInner: !item.icon });

  const onItemPress = () => {
    if (item?.data?.length > 0) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setState(p => ({ ...p, showInner: !p.showInner }));
    } else {
      if (set) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        set(p => ({ ...p, showInner: !p.showInner }));
      }
      setTimeout(() => {
        onPress?.(item);
      }, 250);
    }
  };

  return (
    <Reanimated.View
      entering={SlideInLeft.delay(index * 100)}
      style={styles.renderContainer}>
      <TouchableOpacity
        onPress={onItemPress}
        style={styles.renderContentContainer}>
        <View style={RNStyles.flexRow}>
          {item.icon && (
            <View style={styles.renderIcon}>
              <RNImage source={item.icon} style={RNStyles.image50} />
            </View>
          )}
          <RNText style={styles.renderTitle}>{item.title}</RNText>
        </View>
        {item?.data?.length > 0 && (
          <RNImage
            source={Images.back}
            style={[
              styles.dropDownIcon,
              {
                transform: [{ rotate: State.showInner ? '90deg' : '-90deg' }],
              },
            ]}
          />
        )}
      </TouchableOpacity>

      {State.showInner &&
        item?.data?.map((v, i) => (
          <RenderDrawer
            key={i}
            item={v}
            index={i}
            onPress={onPress}
            set={setState}
          />
        ))}
    </Reanimated.View>
  );
};

const useStyles = ({ isInner }) => {
  return StyleSheet.create({
    renderContainer: {
      marginLeft: isInner ? wp(8) : wp(4),
    },
    renderContentContainer: {
      ...RNStyles.flexRowBetween,
      paddingVertical: hp(1.5),
      borderBottomWidth: isInner ? 0 : 1,
      borderBlockColor: Colors.drawerBorderColor,
      paddingRight: wp(4),
    },
    renderIcon: {
      ...RNStyles.center,
      width: wp(8),
      height: wp(8),
      borderRadius: 100,
      backgroundColor: Colors.drawerIconBgColor,
    },
    renderTitle: {
      paddingHorizontal: wp(4),
      fontSize: isInner ? FontSize.font12 : FontSize.font14,
    },
    dropDownIcon: {
      ...RNStyles.icon,
      tintColor: Colors.Black,
      transform: [{ rotate: '-90deg' }],
    },
  });
};

export default RenderDrawer;
