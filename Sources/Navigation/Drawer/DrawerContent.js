import { useState } from 'react';
import {
  FlatList,
  LayoutAnimation,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors, FontFamily, FontSize, hp, wp } from '../../Theme';
import { RNIcon, RNImage, RNStyles, RNText } from '../../Common';
import { Images } from '../../Constants';
import { useInset } from '../../Hooks';
import { DummyData } from '../../Utils';

const DrawerContent = ({ navigation }) => {
  const styles = useStyles({});

  const onItemPress = item => {
    if (item.navigate) {
      navigation.closeDrawer();
      setTimeout(() => {
        navigation.navigate(item.navigate);
      }, 0);
    }
  };

  return (
    <View style={RNStyles.container}>
      <View style={styles.headerContainer}>
        <RNIcon
          icon={Images.back}
          iconStyle={{ tintColor: Colors.Black }}
          containerStyle={styles.backIcon}
          onPress={() => navigation.closeDrawer()}
        />
        <RNText family={FontFamily.Bold}>{'Settings'}</RNText>
      </View>

      <FlatList
        data={DummyData.drawerScreens}
        keyExtractor={(v, i) => String(i)}
        contentContainerStyle={{ paddingVertical: hp(1) }}
        renderItem={({ item }) => (
          <RenderDrawerItems item={item} onPress={onItemPress} />
        )}
      />
    </View>
  );
};

const RenderDrawerItems = ({ item, onPress }) => {
  const [State, setState] = useState({ showInner: false });
  const styles = useStyles({ isInner: !item.icon });

  const onItemPress = () => {
    if (item?.data?.length > 0) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setState(p => ({ ...p, showInner: !p.showInner }));
    } else {
      onPress?.(item);
    }
  };

  return (
    <View style={styles.renderContainer}>
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
          <RenderDrawerItems item={v} key={i} onPress={onPress} />
        ))}
    </View>
  );
};

const useStyles = ({ isInner }) => {
  const inset = useInset();

  return StyleSheet.create({
    headerContainer: {
      ...RNStyles.flexRow,
      paddingTop: inset.top + hp(2),
      paddingVertical: hp(2),
      borderBottomWidth: 1,
      borderBlockColor: Colors.drawerBorderColor,
    },
    backIcon: {
      width: wp(8),
      height: wp(8),
      marginLeft: wp(4),
      marginRight: wp(2),
    },
    renderContainer: {
      marginLeft: isInner ? wp(8) : wp(4),
    },
    renderContentContainer: {
      ...RNStyles.flexRowBetween,
      // marginLeft: wp(4),
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

export default DrawerContent;
