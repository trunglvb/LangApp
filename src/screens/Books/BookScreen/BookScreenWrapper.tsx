import {ReaderProvider} from '@epubjs-react-native/core';
import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {RootStackParamList} from '../../../../App';
import BookScreen from './BookScreen';

type ScreenProps = RouteProp<RootStackParamList, 'BookScreen'>;

const BookScreenWrapper: React.FC = () => {
  const {params} = useRoute<ScreenProps>();

  return (
    <ReaderProvider>
      <BookScreen
        bookSrc={params?.book?.filePath}
        bookId={params?.book?._id}
        currentPosition={params?.book?.currentPosition}
        totalPage={params?.book?.totalLocation}
        title={params?.book?.title}
      />
    </ReaderProvider>
  );
};

export default BookScreenWrapper;
