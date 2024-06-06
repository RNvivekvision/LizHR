import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Colors, FontFamily, hp, wp } from '../Theme';
import RNStyles from './RNStyles';

const RNDropDown = ({
  data,
  value,
  placeholder,
  maxHeight,
  onChange,
  position,
  containerStyle,
  dropdownStyle,
  dropdownPlaceholderStyle,
  dropDownSelectedTextStyle,
  dropDownIconStyle,
  dropDownItemTextStyle,
  search,
  searchPlaceholder,
  renderInputSearch,
  inputSearchStyle,
  renderLeftIcon,
  itemContainerStyle,
  dropDownContainerStyle,
  ...rest
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {data?.length > 0 && (
        <Dropdown
          style={[styles.dropdownStyle, dropdownStyle]}
          placeholderStyle={[styles.placeholderStyle, dropdownPlaceholderStyle]}
          selectedTextStyle={[
            styles.selectedTextStyle,
            dropDownSelectedTextStyle,
          ]}
          iconStyle={[styles.iconStyle, dropDownIconStyle]}
          itemContainerStyle={[styles.itemContainerStyle, itemContainerStyle]}
          containerStyle={[styles.containerStyle, dropDownContainerStyle]}
          itemTextStyle={[styles.itemTextStyle, dropDownItemTextStyle]}
          activeColor={Colors.Primary + '80'}
          autoScroll={false}
          data={data}
          maxHeight={maxHeight ?? wp(55)}
          labelField="label"
          valueField="value"
          placeholder={placeholder ?? ''}
          value={value}
          onChange={onChange}
          dropdownPosition={position ?? 'auto'}
          search={search}
          searchPlaceholder={searchPlaceholder}
          renderInputSearch={
            renderInputSearch ? v => renderInputSearch?.(v) : null
          }
          inputSearchStyle={[styles.inputSearchStyle, inputSearchStyle]}
          renderLeftIcon={renderLeftIcon}
          {...rest}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(1),
  },
  dropdownStyle: {
    borderRadius: wp(3),
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.5),
    backgroundColor: Colors.White,
  },
  placeholderStyle: {
    color: Colors.Black,
    fontFamily: FontFamily.Regular,
  },
  selectedTextStyle: {
    fontFamily: FontFamily.Medium,
    color: Colors.Black,
  },
  itemTextStyle: {
    fontFamily: FontFamily.Medium,
    color: Colors.Black,
  },
  iconStyle: {
    width: wp(8),
    height: wp(8),
    tintColor: Colors.Black,
  },
  inputSearchStyle: {
    backgroundColor: '#f00',
  },
  itemContainerStyle: {
    backgroundColor: Colors.White,
  },
  containerStyle: {
    ...RNStyles.shadow,
    backgroundColor: Colors.White,
    borderRadius: wp(3),
  },
});

export default RNDropDown;
