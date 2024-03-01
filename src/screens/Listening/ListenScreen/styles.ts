import {StyleSheet} from 'react-native';
import AppColors from '../../../styles/AppColors';
import {
  unit10,
  unit12,
  unit16,
  unit20,
  unit40,
  unit8,
} from '../../../utils/appUnit';

const styles = StyleSheet.create({
  scrollViewContentStyle: {
    paddingHorizontal: unit12,
    paddingBottom: unit40,
  },
  scrollViewStyle: {
    flex: 1,
    backgroundColor: AppColors.white,
    // paddingTop: unit8,
  },
  title: {
    fontSize: unit20,
    color: AppColors.black,
  },
  sliderWrapper: {
    height: 120,
    width: '100%',
    backgroundColor: AppColors.light_grey,
    paddingHorizontal: unit16,
    paddingTop: unit10,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  navButton: {
    padding: unit8,
    backgroundColor: AppColors.purple,
    borderRadius: unit40,
  },
  playButton: {
    padding: unit16,
    backgroundColor: AppColors.purple,
    borderRadius: unit40,
    alignItems: 'center',
  },
  coverImage: {
    width: '100%',
    height: 250,
    borderRadius: unit16,
  },
});

export default styles;
