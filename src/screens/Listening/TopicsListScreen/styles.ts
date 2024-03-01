import {StyleSheet} from 'react-native';
import AppColors from '../../../styles/AppColors';
import {
  unit10,
  unit12,
  unit14,
  unit16,
  unit18,
  unit20,
  unit5,
  unit8,
} from '../../../utils/appUnit';

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: unit16,
  },
  titleStyle: {
    fontSize: unit20,
    color: AppColors.black,
    marginBottom: unit16,
    marginTop: unit20,
  },
  itemWrapper: {
    width: '100%',
    // marginRight: unit16,
    backgroundColor: AppColors.white,
    marginBottom: unit20,
    position: 'relative',
    shadowColor: AppColors.dark_grey,
    borderRadius: unit16,
    shadowOffset: {
      width: 0.5,
      height: 0.5,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  itemImage: {
    flex: 1,
    minHeight: 180,
    // opacity: 0.7,
    borderRadius: unit16,
  },
  textWrapper: {
    width: '100%',
    paddingHorizontal: unit12,
    paddingVertical: unit10,
  },
  itemTitle: {
    fontSize: unit18,
    color: AppColors.black,
    marginTop: unit8,
  },
  itemDesc: {
    fontSize: unit14,
    color: AppColors.dark_grey,
    marginTop: unit5,
    lineHeight: unit20,
  },
});

export default styles;
