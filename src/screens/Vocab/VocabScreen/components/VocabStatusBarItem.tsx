import React, {useMemo} from 'react';
import {View} from 'react-native';
import AppText from '../../../../components/AppText/AppText';
import {VocabLearnStatus} from '../../../../model/enum/VocabLearnStatus';
import AppColors from '../../../../styles/AppColors';
import {
  fontSize13,
  fontSize20,
  unit12,
  unit15,
} from '../../../../utils/appUnit';

interface VocabStatusBarItemProps {
  statusType?: VocabLearnStatus;
  amount: number;
}

const VocabStatusBarItem: React.FC<VocabStatusBarItemProps> = props => {
  const {statusType, amount} = props;

  const statusColor: string | undefined = useMemo(() => {
    switch (statusType) {
      case VocabLearnStatus.Learning: {
        return AppColors.purple;
      }
      case VocabLearnStatus.Reviewing: {
        return AppColors.dark_grey;
      }
      case VocabLearnStatus.Mastered: {
        return AppColors.green;
      }
    }
  }, [statusType]);

  const statusText: string | undefined = useMemo(() => {
    switch (statusType) {
      case VocabLearnStatus.Learning: {
        return 'Learning';
      }
      case VocabLearnStatus.Reviewing: {
        return 'Reviewing';
      }
      case VocabLearnStatus.Mastered: {
        return 'Mastered';
      }
    }
  }, [statusType]);

  return (
    <View
      style={[
        {
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: unit12,
        },
      ]}>
      <View
        style={{
          backgroundColor: statusColor,
          width: unit12,
          height: unit12,
          borderRadius: unit12,
        }}
      />
      <AppText
        style={{
          fontSize: fontSize13,
          color: AppColors.dark_grey,
          marginTop: unit15,
        }}>
        {statusText}
      </AppText>
      <AppText
        fontType={'medium'}
        style={{
          fontSize: fontSize20,
          color: AppColors.black,
          marginTop: unit12,
        }}>
        {amount}
      </AppText>
    </View>
  );
};

export default VocabStatusBarItem;
