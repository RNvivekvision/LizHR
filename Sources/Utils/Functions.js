import { Alert, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';

const ALERT = ({ Title, Text, Buttons }) => Alert.alert(Title, Text, Buttons);

const OpenUrl = url => Linking.openURL(url);

const setAppData = async data => {
  const previousValue = await getAppData();
  if (previousValue) {
    await AsyncStorage.setItem(
      'appdata',
      JSON.stringify({ ...previousValue, ...data }),
    );
  } else {
    await AsyncStorage.setItem('appdata', JSON.stringify(data));
  }
};

const getAppData = async () => {
  const value = await AsyncStorage.getItem('appdata');
  return JSON.parse(value);
};

const formatDate = (date, format) => {
  return dayjs(date ?? new Date()).format(format ?? 'DD-MMM-YYYY');
};

const getStartEndDates = () => {
  const now = new Date();
  const start = new Date(Date.UTC(now.getFullYear(), now.getMonth(), 1));
  const end = new Date(
    Date.UTC(now.getFullYear(), now.getMonth() + 1, 0, 0, 0, 0, 0),
  );
  return { start, end };
};

const handleResponse = response => {
  // console.log('response -> ', JSON.stringify(response, null, 2));
  if (response?.isSuccess) {
    return response;
  } else {
    alert(
      response?.errorMessage ??
        response?.ErrorMessage ??
        'Something went wrong. Please try again.',
    );
    return { responseData: [] };
  }
};

const Functions = {
  ALERT,
  OpenUrl,
  setAppData,
  getAppData,
  formatDate,
  getStartEndDates,
  handleResponse,
};

export default Functions;
