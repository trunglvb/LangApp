import {StackActions} from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import {SafeAreaView, View} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationRef} from '../../../../App';
import AppBar from '../../../components/AppBar/AppBar';
import AppLoading from '../../../components/Loading/AppLoading';
import PressView from '../../../components/PressView/PressView';
import useScreenState from '../../../hooks/useScreenState';
import AppColors from '../../../styles/AppColors';
import AppConfig from '../../../utils/AppConfig';
import {showToastError, showToastSuccess} from '../../../utils/Toaster';
import {unit100, unit16, unit20} from '../../../utils/appUnit';
import useAuth from '../../../hooks/useAuth';

const UploadBookScreen: React.FC = () => {
  const {authData} = useAuth();
  const {isLoading, setLoading} = useScreenState();
  const handleUpload = async () => {
    try {
      const doc = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      const formData = new FormData();
      formData.append('file', {
        uri: doc.uri,
        name: doc.name,
        type: doc.type,
      });

      setLoading(true);
      const bookUrl = await axios.post(
        `${AppConfig.baseURL}/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log('response', bookUrl?.data?.data);
      const response = await axios.post(`${AppConfig.baseURL}/add-book`, {
        title: doc.name,
        image:
          'https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149330605.jpg?w=2000',
        filePath: bookUrl?.data?.data,
        userId: authData?.user?._id,
      });
      if (response.status === 200) {
        NavigationRef.current?.dispatch(StackActions.replace('BookListScreen'));
        showToastSuccess('Uploaded successfully');
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        showToastError(error);
      } else {
        showToastError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: AppColors.light_grey,
        flex: 1,
      }}>
      <AppBar
        leftIcon={
          <Icon
            style={{
              fontSize: unit16,
            }}
            name={'arrow-left'}
          />
        }
        title={'Upload Book'}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignSelf: 'center',
          alignItems: 'center',
        }}>
        <PressView
          onPress={async () => {
            await handleUpload();
          }}
          style={{
            width: 300,
            height: 200,
            // backgroundColor: 'green',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: AppColors.bookLightPurple,
            borderRadius: unit20,
            borderStyle: 'dashed',
          }}>
          <MaterialCommunityIcons
            name="book-plus"
            style={{
              fontSize: unit100,
              alignSelf: 'center',
              color: AppColors.purple,
              opacity: 0.6,
            }}
          />
        </PressView>
      </View>
    </SafeAreaView>
  );
};

export default UploadBookScreen;
