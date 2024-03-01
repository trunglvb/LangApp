import {Platform} from 'react-native';
const AppConfig = {
  baseURL: 'https://api-langapp.vercel.app/api',

  // baseURL:
  //   Platform.OS === 'ios'
  //     ? 'http://localhost:8080/api'
  //     : 'http://10.0.2.2:8080/api',

  // baseURL: 'http://192.168.1.16:8080/api',
};

export default AppConfig;
