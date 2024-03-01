import {StyleSheet} from 'react-native';
import AppColors from '../../../../styles/AppColors';
import {
  fontSize14,
  fontSize16,
  fontSize20,
  unit10,
  unit110,
  unit12,
  unit16,
  unit2,
  unit4,
  unit80,
} from '../../../../utils/appUnit';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
    paddingHorizontal: unit16,
  },
  avatarContainer: {
    alignSelf: 'center',
    marginTop: unit80,
    padding: unit16,
    backgroundColor: AppColors.light_grey2,
    borderRadius: unit110,

    position: 'relative',
  },
  avatarImage: {
    width: unit110,
    height: unit110,
    alignSelf: 'center',
  },
  accountVerified: {
    position: 'absolute',
    right: 0,
    bottom: unit12,
    backgroundColor: AppColors.light_grey,
    paddingHorizontal: unit4,
    paddingVertical: unit2,
    borderRadius: unit110,
  },
  verified: {
    color: AppColors.green,
    fontSize: fontSize14,
  },
  profileName: {
    textAlign: 'center',
    fontSize: fontSize20,
    color: AppColors.black,

    marginTop: unit16,
  },
  profileInfo: {
    textAlign: 'center',
    fontSize: fontSize14,
    color: AppColors.textGray,

    marginTop: unit10,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: AppColors.white,
    paddingVertical: unit12,
    borderRadius: unit16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  logoutText: {
    fontSize: fontSize16,
    color: AppColors.dark_grey,
  },
});

export default styles;
